import { Injectable, InternalServerErrorException, Logger, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createId } from "@paralleldrive/cuid2";
import { MinioClient, MinioService } from "nestjs-minio-client";
import sharp from "sharp";

import { Config } from "../config/schema";

// Objects are stored under the following path in the bucket:
// "<bucketName>/<userId>/<type>/<fileName>",
// where `userId` is a unique identifier (cuid) for the user,
// where `type` can either be "pictures", "previews" or "resumes",
// and where `fileName` is a unique identifier (cuid) for the file.

type ImageUploadType = "pictures" | "previews";
type DocumentUploadType = "resumes";
export type UploadType = ImageUploadType | DocumentUploadType;

const PUBLIC_ACCESS_POLICY = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicAccess",
      Effect: "Allow",
      Action: ["s3:GetObject"],
      Principal: { AWS: ["*"] },
      Resource: [
        "arn:aws:s3:::{{bucketName}}/*/pictures/*",
        "arn:aws:s3:::{{bucketName}}/*/previews/*",
        "arn:aws:s3:::{{bucketName}}/*/resumes/*",
      ],
    },
  ],
} as const;

@Injectable()
export class StorageService implements OnModuleInit {
  private readonly logger = new Logger(StorageService.name);

  private client: MinioClient;
  private bucketName: string;

  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly minioService: MinioService,
  ) {}

  async onModuleInit() {
    this.client = this.minioService.client;
    this.bucketName = this.configService.getOrThrow<string>("STORAGE_BUCKET");

    const skipBucketCheck = this.configService.getOrThrow<boolean>("STORAGE_SKIP_BUCKET_CHECK");

    if (skipBucketCheck) {
      this.logger.warn("Skipping the verification of whether the storage bucket exists.");
      this.logger.warn(
        "Make sure that the following paths are publicly accessible: `/{pictures,previews,resumes}/*`",
      );

      return;
    }

    try {
      // Create a storage bucket if it doesn't exist
      // if it exists, log that we were able to connect to the storage service
      const bucketExists = await this.client.bucketExists(this.bucketName);

      if (bucketExists) {
        this.logger.log("Successfully connected to the storage service.");
      } else {
        const bucketPolicy = JSON.stringify(PUBLIC_ACCESS_POLICY).replace(
          /{{bucketName}}/g,
          this.bucketName,
        );

        try {
          await this.client.makeBucket(this.bucketName);
        } catch {
          throw new InternalServerErrorException(
            "There was an error while creating the storage bucket.",
          );
        }

        try {
          await this.client.setBucketPolicy(this.bucketName, bucketPolicy);
        } catch {
          throw new InternalServerErrorException(
            "There was an error while applying the policy to the storage bucket.",
          );
        }

        this.logger.log(
          "A new storage bucket has been created and the policy has been applied successfully.",
        );
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async bucketExists() {
    const exists = await this.client.bucketExists(this.bucketName);

    if (!exists) {
      throw new InternalServerErrorException(
        "There was an error while checking if the storage bucket exists.",
      );
    }
  }

  async uploadObject(
    userId: string,
    type: UploadType,
    buffer: Buffer,
    filename: string = createId(),
  ) {
    const extension = type === "resumes" ? "pdf" : "jpg";
    const storageUrl = this.configService.getOrThrow<string>("STORAGE_URL");
    const filepath = `${userId}/${type}/${filename}.${extension}`;
    const url = `${storageUrl}/${filepath}`;
    const metadata =
      extension === "jpg"
        ? { "Content-Type": "image/jpeg" }
        : {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=${filename}.${extension}`,
          };

    try {
      if (extension === "jpg") {
        // If the uploaded file is an image, use sharp to resize the image to a maximum width/height of 600px
        buffer = await sharp(buffer)
          .resize({ width: 600, height: 600, fit: sharp.fit.outside })
          .jpeg({ quality: 80 })
          .toBuffer();
      }

      await this.client.putObject(this.bucketName, filepath, buffer, metadata);

      return url;
    } catch {
      throw new InternalServerErrorException("There was an error while uploading the file.");
    }
  }

  async deleteObject(userId: string, type: UploadType, filename: string) {
    const extension = type === "resumes" ? "pdf" : "jpg";
    const path = `${userId}/${type}/${filename}.${extension}`;

    try {
      await this.client.removeObject(this.bucketName, path);
      return;
    } catch {
      throw new InternalServerErrorException(
        `There was an error while deleting the document at the specified path: ${path}.`,
      );
    }
  }

  async deleteFolder(prefix: string) {
    const objectsList = [];

    const objectsStream = this.client.listObjectsV2(this.bucketName, prefix, true);

    for await (const object of objectsStream) {
      objectsList.push(object.name);
    }

    try {
      await this.client.removeObjects(this.bucketName, objectsList);
      return;
    } catch {
      throw new InternalServerErrorException(
        `There was an error while deleting the folder at the specified path: ${this.bucketName}/${prefix}.`,
      );
    }
  }
}
