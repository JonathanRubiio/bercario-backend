import { Controller, Get, Put, Post, Body, Query, Headers, UseGuards, Request, NotFoundException, BadRequestException } from '@nestjs/common';
import { DomainService } from './domain.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { LinkDomainDto } from '../business-profile/dto/domain-config.dto';

@Controller()
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  // 1. Endpoint de verificación seguro para Caddy (SSL bajo demanda)
  // GET /api/domains/check?domain=lafrontera.co
  @Get('domains/check')
  async checkDomain(@Query('domain') domain: string) {
    if (!domain) {
      throw new BadRequestException('El parámetro domain es obligatorio.');
    }
    const isAllowed = await this.domainService.validateDomainForCaddy(domain);
    if (!isAllowed) {
      throw new NotFoundException('Dominio no autorizado o no verificado para emitir SSL');
    }
    return { status: 'authorized' };
  }

  // 2. Obtener la landing page a través de la cabecera Host (Resolución Wildcard)
  // GET /api/public/landing/host
  @Get('public/landing/host')
  async getLandingByHost(@Headers('host') host: string) {
    if (!host) {
      throw new BadRequestException('Falta la cabecera Host');
    }
    return this.domainService.getLandingDataByHost(host);
  }

  // 3. Vincular dominio o subdominio en el perfil (Privado)
  // PUT /api/profile/domain
  @UseGuards(JwtAuthGuard)
  @Put('profile/domain')
  async linkDomain(@Request() req: any, @Body() dto: LinkDomainDto) {
    return this.domainService.linkDomain(req.user.id, dto);
  }

  // 4. Trigger de Verificación DNS (Simula o chequea CNAME/A records y valida)
  // POST /api/profile/domain/verify
  @UseGuards(JwtAuthGuard)
  @Post('profile/domain/verify')
  async verifyDomain(@Request() req: any) {
    return this.domainService.verifyDomainDns(req.user.id);
  }
}
