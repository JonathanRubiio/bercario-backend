import { Controller, Get, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // Endpoint público para obtener perfil comercial por slug
  @Get('profiles/:slug')
  async getProfileBySlug(@Param('slug') slug: string) {
    return this.profileService.getProfileBySlug(slug);
  }

  // Endpoints protegidos para el usuario autenticado
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getMyProfile(@Request() req: any) {
    return this.profileService.getProfileByUserId(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(@Request() req: any, @Body() body: any) {
    return this.profileService.updateProfile(req.user.id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile/sections')
  async updateSections(@Request() req: any, @Body() body: any) {
    // El frontend manda { sections }
    return this.profileService.updateSections(req.user.id, body.sections);
  }
}
