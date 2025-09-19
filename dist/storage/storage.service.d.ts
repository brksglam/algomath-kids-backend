import { ConfigService } from '@nestjs/config';
export declare class StorageService {
    private readonly configService;
    private readonly s3Client;
    constructor(configService: ConfigService);
    private getCredentials;
    upload(file: Express.Multer.File, keyPrefix: string): Promise<string>;
}
