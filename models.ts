export interface FertilizerPumpConfig {
    hour: number;
    minute: number;
    pump: number;
    execute: boolean;
    duration: number;
    lastExecuted: string;
}