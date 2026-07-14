import { Injectable, OnModuleInit, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand, CreateBucketCommand, HeadBucketCommand, PutBucketPolicyCommand } from '@aws-sdk/client-s3';
import { UserRepository } from '../user/repositories/user.repository';
import { BusinessProfileRepository } from '../business-profile/repositories/business-profile.repository';

@Injectable()
export class UploadService implements OnModuleInit {
  private s3Client: S3Client;
  private bucket: string;

  constructor(
    private readonly userRepo: UserRepository,
    private readonly profileRepo: BusinessProfileRepository,
  ) {
    const endpoint = process.env.S3_ENDPOINT;
    this.bucket = process.env.S3_BUCKET || 'bercario';

    this.s3Client = new S3Client({
      endpoint,
      region: process.env.S3_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || 'minioadmin',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'minioadminpassword',
      },
      forcePathStyle: true, // Requerido para MinIO local
    });
  }

  async validateCatalogLimit(userId: string): Promise<void> {
    const user = await this.userRepo.find()
      .leftJoinAndSelect('user.membershipPackage', 'membershipPackage')
      .where('user.id = :id', { id: userId })
      .getOne();

    const profile = await this.profileRepo.findById({ userId });

    if (profile && user?.membershipPackage) {
      const currentImagesCount = profile.products ? profile.products.length : 0;
      if (currentImagesCount >= user.membershipPackage.maxCatalogImages) {
        throw new BadRequestException('Has alcanzado el límite de imágenes permitidas en tu plan actual. Actualiza tu membresía.');
      }
    }
  }

  async onModuleInit() {
    try {
      await this.s3Client.send(new HeadBucketCommand({ Bucket: this.bucket }));
      console.log(`Bucket "${this.bucket}" ya existe en S3/MinIO.`);
    } catch (err: any) {
      console.log(`Bucket "${this.bucket}" no existe. Creándolo...`);
      try {
        await this.s3Client.send(new CreateBucketCommand({ Bucket: this.bucket }));
        
        // Política de lectura pública para las imágenes cargadas
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

        await this.s3Client.send(
          new PutBucketPolicyCommand({
            Bucket: this.bucket,
            Policy: JSON.stringify(publicPolicy),
          }),
        );
        console.log(`Bucket "${this.bucket}" creado y configurado con acceso público.`);
      } catch (createErr) {
        console.error('Error al crear el bucket en S3/MinIO:', createErr);
      }
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const extension = file.originalname.split('.').pop();
    const uniqueKey = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}.${extension}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: uniqueKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    const publicPrefix = process.env.S3_PUBLIC_URL_PREFIX || `http://localhost:9000/${this.bucket}`;
    return `${publicPrefix}/${uniqueKey}`;
  }
}
