import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { FertilizerPumpConfig } from "../models";
import { Service } from "../service";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const service = new Service();

    const { body } = req;

    const rowKey: string = body?.pump || body?.rowKey || "1";
    const execute: boolean = body?.execute || false;
    const duration: number = body?.duration;

    const data = {
        execute
    } as FertilizerPumpConfig

    if (execute) {
        data.lastExecuted = new Date().toString();
        data.duration = duration;
    }

    const result = await service.updateItem(`${rowKey}`, data)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { success: true, ...result }
    };

    context.log('HTTP trigger function processed a request.');
};

export default httpTrigger;