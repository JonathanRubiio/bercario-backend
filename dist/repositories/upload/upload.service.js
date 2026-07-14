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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
let UploadService = class UploadService {
    s3Client;
    bucket;
    constructor() {
        const endpoint = process.env.S3_ENDPOINT;
        this.bucket = process.env.S3_BUCKET || 'bercario';
        this.s3Client = new client_s3_1.S3Client({
            endpoint,
            region: process.env.S3_REGION || 'us-east-1',
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || 'minioadmin',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'minioadminpassword',
            },
            forcePathStyle: true,
        });
    }
    async onModuleInit() {
        try {
            await this.s3Client.send(new client_s3_1.HeadBucketCommand({ Bucket: this.bucket }));
            console.log(`Bucket "${this.bucket}" ya existe en S3/MinIO.`);
        }
        catch (err) {
            console.log(`Bucket "${this.bucket}" no existe. Creándolo...`);
            try {
                await this.s3Client.send(new client_s3_1.CreateBucketCommand({ Bucket: this.bucket }));
                const publicPolicy = {
                    Version: '2012-10-17',
                    Statement: [
                        {
                            Sid: 'PublicRead',
                            Effect: 'Allow',
                            Principal: '*',
                            Action: ['s3:GetObject'],
                            Resource: [`arn:aws:s3:::${this.bucket}/*`],
                        },
                    ],
                };
                await this.s3Client.send(new client_s3_1.PutBucketPolicyCommand({
                    Bucket: this.bucket,
                    Policy: JSON.stringify(publicPolicy),
                }));
                console.log(`Bucket "${this.bucket}" creado y configurado con acceso público.`);
            }
            catch (createErr) {
                console.error('Error al crear el bucket en S3/MinIO:', createErr);
            }
        }
    }
    async uploadFile(file) {
        const extension = file.originalname.split('.').pop();
        const uniqueKey = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}.${extension}`;
        await this.s3Client.send(new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: uniqueKey,
            Body: file.buffer,
            ContentType: file.mimetype,
        }));
        const publicPrefix = process.env.S3_PUBLIC_URL_PREFIX || `http://localhost:9000/${this.bucket}`;
        return `${publicPrefix}/${uniqueKey}`;
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map