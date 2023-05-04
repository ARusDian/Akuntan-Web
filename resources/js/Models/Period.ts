export interface BasePeriod {
    id?: number;
    start: string;
    end: string;
    is_active: boolean;
}

export interface Period extends BasePeriod {
    id: number;
}
