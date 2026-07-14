import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { LeadRepository } from './repositories/lead.repository';
import { UserRepository } from '../user/repositories/user.repository';
import { BusinessProfileRepository } from '../business-profile/repositories/business-profile.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LeadService {
  constructor(
    private readonly leadRepo: LeadRepository,
    private readonly userRepo: UserRepository,
    private readonly profileRepo: BusinessProfileRepository,
  ) {}

  async createLead(data: {
    businessName: string;
    email: string;
    city: string;
    message?: string;
    website?: string; // honeypot field
  }) {
    // 1. FILTRO HONEYPOT: Si el bot rellenó este campo oculto
    if (data.website && data.website.trim() !== '') {
      console.warn('Bot detectado mediante Honeypot. Ignorando petición silenciosamente.');
      return { success: true, message: 'Solicitud enviada exitosamente.' }; // Falsa confirmación de éxito
    }

    // 2. Validación básica
    if (!data.businessName || !data.email || !data.city) {
      throw new BadRequestException('Faltan campos obligatorios');
    }

    if (!data.email.includes('@')) {
      throw new BadRequestException('El formato de correo no es válido');
    }

    // Límite de longitud para evitar ataques de carga de texto gigantesco
    if (data.businessName.length > 100 || data.city.length > 100 || (data.message && data.message.length > 1000)) {
      throw new BadRequestException('Los datos exceden el límite de longitud permitido');
    }

    // 2.5 Evitar envíos duplicados continuos para un mismo correo pendiente
    const existingLead = await this.leadRepo.findById({
      email: data.email,
      status: 'PENDING',
    });

    if (existingLead) {
      console.warn(`Lead duplicado detectado para el correo: ${data.email}. Ignorando duplicado silenciosamente.`);
      return { success: true, message: 'Solicitud enviada exitosamente.' }; // Falso éxito silencioso
    }

    // 3. Crear el Lead en la base de datos
    const lead = await this.leadRepo.create({
      businessName: data.businessName,
      email: data.email,
      city: data.city,
      message: data.message || '',
      status: 'PENDING',
    });

    return { success: true, leadId: lead.id };
  }

  async getAllLeads() {
    return this.leadRepo.find()
      .orderBy('lead.createdAt', 'DESC')
      .getMany();
  }

  async updateLeadStatus(id: string, status: 'ACCEPTED' | 'REJECTED') {
    const lead = await this.leadRepo.findById({ id });

    if (!lead) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    if (lead.status !== 'PENDING') {
      throw new BadRequestException('Esta solicitud ya fue procesada');
    }

    // Si se acepta la solicitud, creamos el usuario y su perfil
    if (status === 'ACCEPTED') {
      // Verificar si el correo ya está registrado en el sistema
      const existingUser = await this.userRepo.findById({ email: lead.email });

      if (!existingUser) {
        // Crear contraseña por defecto
        const defaultPassword = 'password1234';
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        // Generar slug para el negocio
        const slug = lead.businessName
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');

        // Validar si el slug ya existe, si existe agregar sufijo
        let uniqueSlug = slug;
        let counter = 1;
        while (await this.profileRepo.findById({ slug: uniqueSlug })) {
          uniqueSlug = `${slug}-${counter}`;
          counter++;
        }

        // Crear el usuario mayorista
        const newUser = await this.userRepo.create({
          email: lead.email,
          password: hashedPassword,
          name: lead.businessName,
          role: 'mayorista',
        });

        // Crear su perfil inicial
        await this.profileRepo.create({
          userId: newUser.id,
          name: lead.businessName,
          tagline: 'Nuevo negocio en Berçário',
          description: lead.message || 'Descripción del negocio...',
          phone: '',
          email: lead.email,
          address: lead.city,
          banner: '/images/company-banner.png',
          logo: '/images/company-logo.png',
          slug: uniqueSlug,
          products: [],
          testimonials: [],
          faqs: [],
          gallery: [],
          sections: [
            {
              id: 'banner',
              type: 'banner',
              label: 'Banner principal',
              description: 'Imagen destacada, logo y nombre del negocio.',
            },
            {
              id: 'about',
              type: 'about',
              label: 'Quiénes somos',
              description: 'Descripción y propuesta de valor del negocio.',
            },
          ],
        });
      }
    }

    // Actualizar el estado del lead
    await this.leadRepo.update({ id }, { status });

    const updated = await this.leadRepo.findById({ id });
    if (!updated) {
      throw new NotFoundException('Error al recuperar solicitud actualizada');
    }
    return updated;
  }
}
