import { TableClient, TableUpdateEntityHeaders, UpdateMode } from "@azure/data-tables";
import { Constants } from "./constants";
import { Environment } from "./environment";
import { FertilizerPumpConfig } from "./models";

// https://docs.microsoft.com/en-us/azure/cosmos-db/table/how-to-use-nodejs

export class Service {

    partitionKey = "1";
    tableClient = new TableClient(Environment.tableSASUrl, Constants.fertilizer,);

    async getItem(rowKey: string): Promise<FertilizerPumpConfig> {
        const { hour, minute, pump, execute, duration, lastExecuted } = await this.tableClient.getEntity<FertilizerPumpConfig>(this.partitionKey, rowKey);
        return { hour, minute, pump, execute, duration, lastExecuted };
    }

    async updateItem(rowKey: string, data: FertilizerPumpConfig): Promise<TableUpdateEntityHeaders> {
        return this.tableClient.updateEntity({
            partitionKey: this.partitionKey,
            rowKey, ...data
        }, "Merge");
    }

    getCurrentTime(): { hour: number, minutes: number } {
        const now = new Date();
        return {
            hour: now.getHours(),
            minutes: now.getMinutes(),
        };
    }

}