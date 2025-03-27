import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createId } from "@paralleldrive/cuid2";
import slugify from "@sindresorhus/slugify";
import { createClient } from '@supabase/supabase-js';
import sharp from "sharp";

import { Config } from "../config/schema";

// Objects are stored under the following path in the storage:
// "<type>/<userId>/<fileName>",
// where `type` can either be "pictures", "previews" or "resumes",
// where `userId` is a unique identifier (cuid) for the user,
// and where `fileName` is a unique identifier (cuid) for the file.

type ImageUploadType = "pictures" | "previews";
type DocumentUploadType = "resumes";
export type UploadType = ImageUploadType | DocumentUploadType;

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);
  private supabase;

  constructor(
    private readonly configService: ConfigService<Config>,
  ) {
    const supabaseUrl = this.configService.getOrThrow<string>("SUPABASE_URL");
    const supabaseKey = this.configService.getOrThrow<string>("SUPABASE_SERVICE_ROLE_KEY");
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async onModuleInit() {
    try {
      // Verify connection by attempting to get bucket info
      const { data: buckets } = await this.supabase.storage.listBuckets();
      
      // Check if required buckets exist, create them if they don't
      const requiredBuckets = ['pictures', 'previews', 'resumes'];
      
      for (const bucket of requiredBuckets) {
        if (!buckets?.find(b => b.name === bucket)) {
          const { error } = await this.supabase.storage.createBucket(bucket, {
            public: true,
            fileSizeLimit: bucket === 'resumes' ? '10MB' : '5MB'
          });
          
          if (error) throw error;
        }
      }

      this.logger.log("Successfully connected to Supabase Storage.");
    } catch (error) {
      this.logger.error("Failed to initialize Supabase Storage:", error);
      throw new InternalServerErrorException("Storage initialization failed");
    }
  }

  async uploadObject(
    userId: string,
    type: UploadType,
    buffer: Buffer,
    filename: string = createId(),
  ): Promise<string> {
    const extension = type === "resumes" ? "pdf" : "jpg";
    
    let normalizedFilename = slugify(filename);
    if (!normalizedFilename) normalizedFilename = createId();

    const filepath = `${userId}/${normalizedFilename}.${extension}`;

    try {
      if (extension === "jpg") {
        // If the uploaded file is an image, resize it
        buffer = await sharp(buffer)
          .resize({ width: 600, height: 600, fit: sharp.fit.outside })
          .jpeg({ quality: 80 })
          .toBuffer();
      }

      const { error: uploadError, data } = await this.supabase.storage
        .from(type)
        .upload(filepath, buffer, {
          contentType: extension === "jpg" ? "image/jpeg" : "application/pdf",
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = this.supabase.storage
        .from(type)
        .getPublicUrl(filepath);

      return publicUrl;
    } catch (error) {
      this.logger.error("File upload failed:", error);
      throw new InternalServerErrorException("There was an error while uploading the file.");
    }
  }

  async deleteObject(userId: string, type: UploadType, filename: string): Promise<void> {
    const extension = type === "resumes" ? "pdf" : "jpg";
    const path = `${userId}/${filename}.${extension}`;

    try {
      const { error } = await this.supabase.storage
        .from(type)
        .remove([path]);

      if (error) throw error;
    } catch (error) {
      throw new InternalServerErrorException(
        `There was an error while deleting the document at the specified path: ${path}.`,
      );
    }
  }

  async deleteFolder(userId: string, type: UploadType): Promise<void> {
    try {
      const { data: files } = await this.supabase.storage
        .from(type)
        .list(userId);

      if (!files?.length) return;

      const filePaths = files.map(file => `${userId}/${file.name}`);
      
      const { error } = await this.supabase.storage
        .from(type)
        .remove(filePaths);

      if (error) throw error;
    } catch (error) {
      throw new InternalServerErrorException(
        `There was an error while deleting the folder for user: ${userId} in ${type}.`,
      );
    }
  }
}
