import { IsString, IsNumber, IsBoolean, IsObject, IsNotEmpty, IsArray, ValidateNested, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class ElementDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsObject()
  @IsOptional()
  content?: Record<string, any>;

  @IsObject()
  @IsOptional()
  styles?: Record<string, any>;
}

export class ColumnDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  width: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ElementDto)
  elements: ElementDto[];
}

export class LandingConfigItemDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  order: number;

  @IsBoolean()
  visible: boolean;

  @IsString()
  @IsOptional()
  label?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsObject()
  @IsOptional()
  styles?: Record<string, any>;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ColumnDto)
  columns?: ColumnDto[];

  @IsObject()
  @IsOptional()
  content?: Record<string, any>;
}

export class GlobalStylesDto {
  @IsString()
  @IsNotEmpty()
  paletteId: string;

  @IsString()
  @IsNotEmpty()
  fontPairId: string;

  @IsEnum(['rounded', 'square', 'pill'])
  buttonStyle: 'rounded' | 'square' | 'pill';
}

export class UpdateLandingConfigDto {
  @IsString()
  @IsOptional()
  templateId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LandingConfigItemDto)
  landingConfig: LandingConfigItemDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => GlobalStylesDto)
  globalStyles: GlobalStylesDto;
}
