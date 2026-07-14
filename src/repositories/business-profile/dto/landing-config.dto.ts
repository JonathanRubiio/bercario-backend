import { IsString, IsNumber, IsBoolean, IsObject, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

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

  @IsObject()
  content: Record<string, any>;
}

export class SaveLandingConfigDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LandingConfigItemDto)
  config: LandingConfigItemDto[];
}
