"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let StorageService = class StorageService {
    configService;
    s3Client;
    constructor(configService) {
        this.configService = configService;
        this.s3Client = new client_s3_1.S3Client({
            region: this.configService.get('AWS_REGION'),
            credentials: this.getCredentials(),
        });
    }
    getCredentials() {
        const accessKeyId = this.configService.get('AWS_ACCESS_KEY_ID');
        const secretAccessKey = this.configService.get('AWS_SECRET_ACCESS_KEY');
        if (accessKeyId && secretAccessKey) {
            return { accessKeyId, secretAccessKey };
        }
        return undefined;
    }
    async upload(file, keyPrefix) {
        if (!file) {
            throw new Error('File is required for upload');
        }
        const bucket = this.configService.get('AWS_S3_BUCKET');
        if (!bucket) {
            throw new Error('AWS_S3_BUCKET is not configured');
        }
        const key = keyPrefix + '/' + Date.now() + '-' + file.originalname;
        await this.s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        }));
        const publicBaseUrl = this.configService.get('AWS_S3_PUBLIC_URL');
        if (publicBaseUrl) {
            return publicBaseUrl.replace(/\/+$/, '') + '/' + key;
        }
        const region = this.configService.get('AWS_REGION');
        const regionSegment = region ? region + '.amazonaws.com' : 'amazonaws.com';
        return 'https://' + bucket + '.s3.' + regionSegment + '/' + key;
    }
};
exports.StorageService = StorageService;
exports.StorageService = StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
//# sourceMappingURL=storage.service.js.map