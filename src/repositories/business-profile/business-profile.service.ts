import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessProfileRepository } from './repositories/business-profile.repository';
import { BusinessProfileEntity } from './entities/business-profile.entity';

@Injectable()
export class BusinessProfileService {
  constructor(
    private readonly profileRepo: BusinessProfileRepository,
  ) {}

  async getProfileBySlug(slug: string): Promise<BusinessProfileEntity> {
    const profile = await this.profileRepo.findById({ slug });
    if (!profile) {
      throw new NotFoundException('Perfil de negocio no encontrado');
    }
    return profile;
  }

  async getProfileByUserId(userId: string): Promise<BusinessProfileEntity> {
    const profile = await this.profileRepo.findById({ userId });
    if (!profile) {
      throw new NotFoundException('Perfil de negocio no encontrado para este usuario');
    }
    return profile;
  }

  async updateProfile(userId: string, updateData: Partial<BusinessProfileEntity>): Promise<BusinessProfileEntity> {
    const profile = await this.profileRepo.findById({ userId });
    if (!profile) {
      throw new NotFoundException('Perfil de negocio no encontrado');
    }

    // Campos permitidos a actualizar
    const allowedFields: (keyof BusinessProfileEntity)[] = [
      'name', 'tagline', 'description', 'phone', 'email', 'address',
      'banner', 'logo', 'slug', 'products', 'testimonials', 'faqs', 'gallery', 'sections'
    ];

    const cleanUpdateData: any = {};
    for (const key of allowedFields) {
      if (updateData[key] !== undefined) {
        cleanUpdateData[key] = updateData[key];
      }
    }

    // Actualizar el perfil en la base de datos
    await this.profileRepo.update({ id: profile.id }, cleanUpdateData);

    // Retornar perfil actualizado
    const updated = await this.profileRepo.findById({ id: profile.id });
    if (!updated) {
      throw new NotFoundException('Error al recuperar perfil actualizado');
    }
    return updated;
  }

  async updateSections(userId: string, sections: any[]): Promise<BusinessProfileEntity> {
    const profile = await this.profileRepo.findById({ userId });
    if (!profile) {
      throw new NotFoundException('Perfil de negocio no encontrado');
    }

    await this.profileRepo.update({ id: profile.id }, { sections });

    const updated = await this.profileRepo.findById({ id: profile.id });
    if (!updated) {
      throw new NotFoundException('Error al recuperar perfil actualizado');
    }
    return updated;
  }
}
