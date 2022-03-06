import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Font } from '@reactive-resume/schema';
import { get } from 'lodash';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FontsService {
  constructor(private configService: ConfigService, private httpService: HttpService) {}

  async getAll(): Promise<Font[]> {
    const apiKey = this.configService.get<string>('google.apiKey');
    const url = 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiKey;

    const response = await firstValueFrom(this.httpService.get(url));
    const data = get(response.data, 'items', []);

    return data;
  }
}
