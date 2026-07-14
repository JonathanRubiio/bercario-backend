import { Controller, Get, Put, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BusinessProfileService } from './business-profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SaveLandingConfigDto } from './dto/landing-config.dto';

@Controller()
export class BusinessProfileController {
  constructor(private readonly profileService: BusinessProfileService) {}

  // GET /profiles/:slug - Obtener perfil público por slug (Público)
  @Get('profiles/:slug')
  async getProfileBySlug(@Param('slug') slug: string) {
    return this.profileService.getProfileBySlug(slug);
  }

  // GET /profile - Obtener perfil del usuario logueado (Privado)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: any) {
    return this.profileService.getProfileByUserId(req.user.id);
  }

  // PUT /profile - Guardar/actualizar información del perfil y catálogo (Privado)
  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(@Request() req: any, @Body() body: any) {
    return this.profileService.updateProfile(req.user.id, body);
  }

  // PUT /profile/sections - Guardar/actualizar secciones de la landing (Privado)
  @UseGuards(JwtAuthGuard)
  @Put('profile/sections')
  async updateSections(@Request() req: any, @Body('sections') sections: any[]) {
    return this.profileService.updateSections(req.user.id, sections);
  }

  // GET /landing-page/config - Obtener la configuración del constructor de la landing page (Privado)
  @UseGuards(JwtAuthGuard)
  @Get('landing-page/config')
  async getLandingConfig(@Request() req: any) {
    return this.profileService.getLandingConfig(req.user.id);
  }

  // POST /landing-page/config - Guardar la configuración del constructor de la landing page (Privado)
  @UseGuards(JwtAuthGuard)
  @Post('landing-page/config')
  async updateLandingConfig(@Request() req: any, @Body() body: SaveLandingConfigDto) {
    return this.profileService.updateLandingConfig(req.user.id, body.config);
  }
}
