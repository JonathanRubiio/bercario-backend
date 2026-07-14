import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfileBySlug(slug: string) {
    const profile = await this.prisma.businessProfile.findUnique({
      where: { slug },
    });
    if (!profile) {
      throw new NotFoundException('Perfil comercial no encontrado');
    }
    return profile;
  }

  async getProfileByUserId(userId: string) {
    const profile = await this.prisma.businessProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('Perfil comercial no encontrado');
    }
    return profile;
  }

  async updateProfile(userId: string, data: any) {
    const profile = await this.prisma.businessProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('Perfil comercial no encontrado');
    }

    // Filtramos los campos que vienen del frontend para mapearlos a la base de datos
    const { id, userId: _, createdAt, updatedAt, ...updateData } = data;

    return this.prisma.businessProfile.update({
      where: { userId },
      data: {
        ...updateData,
        // Convertimos a JSON los campos estructurados si vienen
        products: updateData.products !== undefined ? (updateData.products as any) : undefined,
        testimonials: updateData.testimonials !== undefined ? (updateData.testimonials as any) : undefined,
        faqs: updateData.faqs !== undefined ? (updateData.faqs as any) : undefined,
        gallery: updateData.gallery !== undefined ? (updateData.gallery as any) : undefined,
        sections: updateData.sections !== undefined ? (updateData.sections as any) : undefined,
      },
    });
  }

  async updateSections(userId: string, sections: any[]) {
    const profile = await this.prisma.businessProfile.findUnique({
      where: { userId },
    });
    if (!profile) {
      throw new NotFoundException('Perfil comercial no encontrado');
    }

    return this.prisma.businessProfile.update({
      where: { userId },
      data: {
        sections: sections as any,
      },
    });
  }
}
