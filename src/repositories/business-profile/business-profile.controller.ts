import { Controller, Get, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { BusinessProfileService } from './business-profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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
}
