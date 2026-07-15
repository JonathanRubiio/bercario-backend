import { IsString, IsOptional, Length } from 'class-validator';

export class LinkDomainDto {
  @IsOptional()
  @IsString()
  @Length(3, 255)
  customDomain?: string;

  @IsOptional()
  @IsString()
  @Length(3, 100)
  subdomain?: string;
}
