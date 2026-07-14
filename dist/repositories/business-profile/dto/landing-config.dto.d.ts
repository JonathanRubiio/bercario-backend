export declare class LandingConfigItemDto {
    id: string;
    type: string;
    order: number;
    visible: boolean;
    content: Record<string, any>;
}
export declare class SaveLandingConfigDto {
    config: LandingConfigItemDto[];
}
