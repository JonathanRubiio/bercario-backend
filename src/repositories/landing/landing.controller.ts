import { Controller, Get, Post, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { LandingService } from './landing.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateLeadDto } from './dto/landing.dto';
import { UpdateLandingConfigDto } from '../business-profile/dto/landing-config.dto';

@Controller()
export class LandingController {
  constructor(private readonly landingService: LandingService) {}

  // A) Ruta Pública: Obtener data consolidada de la landing page
  @Get('public/landing/:slug')
  async getPublicLandingData(@Param('slug') slug: string) {
    return this.landingService.getPublicLandingData(slug);
  }

  // B) Ruta Pública: Capturar leads del formulario de conversión
  @Post('public/landing/:slug/lead')
  async createLead(@Param('slug') slug: string, @Body() body: CreateLeadDto) {
    return this.landingService.createLead(slug, body);
  }

  // C) Ruta Privada: Guardar configuración del constructor
  @UseGuards(JwtAuthGuard)
  @Put('platform/landing/config')
  async saveLandingConfig(@Request() req: any, @Body() body: UpdateLandingConfigDto) {
    return this.landingService.saveLandingConfig(req.user.id, body);
  }

  // D) Ruta Privada: Obtener prospectos registrados para el usuario autenticado
  @UseGuards(JwtAuthGuard)
  @Get('platform/landing/leads')
  async getLeads(@Request() req: any) {
    return this.landingService.getLeadsByUser(req.user.id);
  }
}
