export declare class ElementDto {
    id: string;
    type: string;
    content?: Record<string, any>;
    styles?: Record<string, any>;
}
export declare class ColumnDto {
    id: string;
    width: string;
    elements: ElementDto[];
}
export declare class LandingConfigItemDto {
    id: string;
    type: string;
    order: number;
    visible: boolean;
    label?: string;
    description?: string;
    styles?: Record<string, any>;
    columns?: ColumnDto[];
    content?: Record<string, any>;
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
