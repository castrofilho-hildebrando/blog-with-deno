import { SubscribeUser } from "../../application/usecases/SubscribeUser.ts";
import { SubscriberRepositorySqlite } from "../../infrastructure/repositories/SubscriberRepositorySqlite.ts";

export class SubscriberController {

    async subscribe(request: Request): Promise<Response> {
        const body = await request.json();
        const email = body.email;

        if (!email) {
            return new Response(
                JSON.stringify({
                    error: "Email is required"
                }),
                { status: 400 }
            );
        }

        const useCase = new SubscribeUser(
            new SubscriberRepositorySqlite()
        );

        const subscriber = await useCase.execute(email);

        return new Response(
            JSON.stringify({
                id: subscriber.id,
                email: subscriber.email
            }),
            { status: 201 }
        );
    }
}
