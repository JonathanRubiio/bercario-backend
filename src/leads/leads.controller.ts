import { Controller, Post, Get, Put, Body, Param, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller()
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  // POST /leads - Envío de solicitudes (Público y protegido contra spam)
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // Máximo 5 peticiones por minuto desde la misma IP
  @Post('leads')
  async createLead(@Body() body: any) {
    return this.leadsService.createLead(body);
  }

  // GET /admin/leads - Obtención de solicitudes (Solo Admin)
  @UseGuards(JwtAuthGuard)
  @Get('admin/leads')
  async getAllLeads(@Request() req: any) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('No tienes permisos para ver las solicitudes.');
    }
    return this.leadsService.getAllLeads();
  }

  // PUT /admin/leads/:id - Actualización de estado de la solicitud (Solo Admin)
  @UseGuards(JwtAuthGuard)
  @Put('admin/leads/:id')
  async updateLeadStatus(
    @Param('id') id: string,
    @Body('status') status: 'ACCEPTED' | 'REJECTED',
    @Request() req: any,
  ) {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('No tienes permisos para gestionar solicitudes.');
    }
    return this.leadsService.updateLeadStatus(id, status);
  }
}
