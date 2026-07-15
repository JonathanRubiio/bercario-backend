import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { LandingLeadRepository } from './repositories/landing-lead.repository';
import { LandingFaqRepository } from './repositories/landing-faq.repository';
import { LandingTestimonialRepository } from './repositories/landing-testimonial.repository';
import { BusinessProfileRepository } from '../business-profile/repositories/business-profile.repository';
import { CreateLeadDto } from './dto/landing.dto';
import { UpdateLandingConfigDto } from '../business-profile/dto/landing-config.dto';

@Injectable()
export class LandingService {
  constructor(
    private readonly leadRepo: LandingLeadRepository,
    private readonly faqRepo: LandingFaqRepository,
    private readonly testimonialRepo: LandingTestimonialRepository,
    private readonly profileRepo: BusinessProfileRepository,
  ) {}

  // A) Guardar nuevo prospecto capturado en la landing pública
  async createLead(slug: string, dto: CreateLeadDto) {
    const profile = await this.profileRepo.findById({ slug });
    if (!profile) {
      throw new NotFoundException('El negocio solicitado no existe.');
    }

    // Validaciones extra de seguridad
    if (!dto.email.includes('@')) {
      throw new BadRequestException('El formato de correo no es válido.');
    }

    // Crear y registrar prospecto
    const lead = await this.leadRepo.create({
      userId: profile.userId,
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      metadata: dto.metadata || {},
    });

    return {
      success: true,
      message: 'Prospecto registrado exitosamente.',
      leadId: lead.id,
    };
  }

  // B) Obtener leads de prospectos registrados para el panel de administración
  async getLeadsByUser(userId: string) {
    return this.leadRepo.findAll({ userId });
  }

  // C) Recupera data consolidada de la landing page (público)
  async getPublicLandingData(slug: string) {
    const profile = await this.profileRepo.findById({ slug });
    if (!profile) {
      throw new NotFoundException('El negocio solicitado no existe.');
    }

    // FAQs y Testimonios relacionados al usuario dueño
    const faqs = await this.faqRepo.findAll({ userId: profile.userId });
    const testimonials = await this.testimonialRepo.findAll({ userId: profile.userId });

    // Ordenar FAQs y Testimonios
    const sortedFaqs = faqs.sort((a, b) => a.order - b.order);
    const sortedTestimonies = testimonials.sort((a, b) => a.order - b.order);

    return {
      profile: {
        name: profile.name,
        tagline: profile.tagline,
        description: profile.description,
        phone: profile.phone,
        email: profile.email,
        address: profile.address,
        banner: profile.banner,
        logo: profile.logo,
        slug: profile.slug,
        products: profile.products || [],
        gallery: profile.gallery || [],
      },
      templateId: profile.templateId || 'minimalist_dark',
      globalStyles: profile.globalStyles || {
        paletteId: 'pizarra',
        fontPairId: 'modern_serif',
        buttonStyle: 'rounded',
      },
      landingConfig: profile.landingConfig || [],
      faqs: sortedFaqs,
      testimonials: sortedTestimonies,
    };
  }

  // D) Guardar la configuración desde el constructor privado
  async saveLandingConfig(userId: string, data: UpdateLandingConfigDto) {
    const profile = await this.profileRepo.findById({ userId });
    if (!profile) {
      throw new NotFoundException('Perfil de negocio no encontrado.');
    }

    const sortedConfig = (data.landingConfig || []).sort((a, b) => a.order - b.order);

    await this.profileRepo.update(
      { id: profile.id },
      {
        templateId: data.templateId || profile.templateId || 'minimalist_dark',
        landingConfig: sortedConfig as any,
        globalStyles: data.globalStyles as any,
      },
    );

    return {
      templateId: data.templateId || profile.templateId || 'minimalist_dark',
      landingConfig: sortedConfig,
      globalStyles: data.globalStyles,
    };
  }
}
