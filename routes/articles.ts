import { ArticleController } from "../src/interfaces/http/ArticleController.ts";

export const handler = {
    async GET(): Promise<Response> {
        const controller = new ArticleController();
        return controller.list();
    }
};
