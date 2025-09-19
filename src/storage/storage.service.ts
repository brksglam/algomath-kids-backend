import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Express } from 'express';

@Injectable()
export class StorageService {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: this.getCredentials(),
    });
  }

  private getCredentials() {
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');

    if (accessKeyId && secretAccessKey) {
      return { accessKeyId, secretAccessKey };
    }

    return undefined;
  }

  async upload(file: Express.Multer.File, keyPrefix: string): Promise<string> {
    if (!file) {
      throw new Error('File is required for upload');
    }

    const bucket = this.configService.get<string>('AWS_S3_BUCKET');
    if (!bucket) {
      throw new Error('AWS_S3_BUCKET is not configured');
    }

    const key = keyPrefix + '/' + Date.now() + '-' + file.originalname;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    const publicBaseUrl = this.configService.get<string>('AWS_S3_PUBLIC_URL');
    if (publicBaseUrl) {
      return publicBaseUrl.replace(/\/+$/, '') + '/' + key;
    }

    const region = this.configService.get<string>('AWS_REGION');
    const regionSegment = region ? region + '.amazonaws.com' : 'amazonaws.com';
    return 'https://' + bucket + '.s3.' + regionSegment + '/' + key;
  }
}
