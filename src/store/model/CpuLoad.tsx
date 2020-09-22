export interface CpuLoad {
    recordedAt: number;
    value: number;
}

export enum TrendDirection {
    Down,
    Flat,
    Up
}

export interface CpuLoadHistoryItem {
    startedAt: number,
    endedAt?: number,
}


export interface CpuLoadTrend {
    percentage: number;
    direction: TrendDirection;
}
