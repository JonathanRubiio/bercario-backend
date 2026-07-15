export declare class LandingConfigItemDto {
    id: string;
    type: string;
    order: number;
    visible: boolean;
    content: Record<string, any>;
}
export declare class GlobalStylesDto {
    paletteId: string;
    fontPairId: string;
    buttonStyle: 'rounded' | 'square' | 'pill';
}
export declare class UpdateLandingConfigDto {
    templateId?: string;
    landingConfig: LandingConfigItemDto[];
    globalStyles: GlobalStylesDto;
}
