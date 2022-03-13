import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { Service } from "../service";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    const rowkey = req?.query?.pump || "1";
    const service = new Service();

    const currentTime = service.getCurrentTime();

    let responseMessage = await new Service().getItem(rowkey);

    const { execute, hour, minute } = responseMessage;

    if (!execute) {
        if (currentTime.hour === hour && currentTime.minutes === minute) {
            responseMessage.execute = true;
        }
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

    context.log('HTTP trigger function processed a request.');
};

export default httpTrigger;