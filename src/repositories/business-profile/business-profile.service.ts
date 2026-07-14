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

  getInitialLandingConfig(profile: BusinessProfileEntity) {
    return [
      {
        id: 'banner',
        type: 'banner',
        order: 1,
        visible: true,
        content: {
          title: profile.name || 'Mi Negocio',
          tagline: profile.tagline || 'Slogan del negocio',
          bgGradientFrom: '#ffffff',
          bgGradientTo: '#f4f4f5',
          textColor: '#09090b',
        },
      },
      {
        id: 'about',
        type: 'about',
        order: 2,
        visible: true,
        content: {
          title: 'Quiénes somos',
          description: profile.description || 'Descripción del negocio...',
          bgGradientFrom: '#f4f4f5',
          bgGradientTo: '#ffffff',
        },
      },
      {
        id: 'products',
        type: 'products',
        order: 3,
        visible: true,
        content: {
          title: 'Catálogo Destacado',
          showPrice: true,
          buttonText: 'Hacer Pedido',
        },
      },
      {
        id: 'contact',
        type: 'contact',
        order: 4,
        visible: true,
        content: {
          title: 'Contacto',
          phone: profile.phone || '',
          email: profile.email || '',
          address: profile.address || '',
        },
      },
    ];
  }

  async getLandingConfig(userId: string): Promise<any[]> {
    const profile = await this.profileRepo.findById({ userId });
    if (!profile) {
      throw new NotFoundException('Perfil de negocio no encontrado');
    }

    if (!profile.landingConfig || profile.landingConfig.length === 0) {
      return this.getInitialLandingConfig(profile);
    }

    // Asegurarse de ordenar por order
    return profile.landingConfig.sort((a, b) => a.order - b.order);
  }

  async updateLandingConfig(userId: string, config: any[]): Promise<any[]> {
    const profile = await this.profileRepo.findById({ userId });
    if (!profile) {
      throw new NotFoundException('Perfil de negocio no encontrado');
    }

    const sortedConfig = config.sort((a, b) => a.order - b.order);

    await this.profileRepo.update({ id: profile.id }, { landingConfig: sortedConfig });
    return sortedConfig;
  }
}
