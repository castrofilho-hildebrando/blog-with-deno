import { SubscriberController } from "../src/interfaces/http/SubscriberController.ts";

export const handler = {
    async POST(req: Request): Promise<Response> {
        const controller = new SubscriberController();
        return controller.subscribe(req);
    }
};
