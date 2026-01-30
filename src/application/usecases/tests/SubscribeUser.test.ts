// @ts-ignore Zed TS does not support Deno std imports yet
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { SubscribeUser } from "../SubscribeUser.ts";
import { Subscriber } from "../../../domain/Subscriber.ts";
import { SubscriberRepository } from "../../ports/SubscriberRepository.ts";

class FakeSubscriberRepository
    implements SubscriberRepository {

    private subscribers: Subscriber[] = [];

    async save(subscriber: Subscriber): Promise<void> {
        this.subscribers.push(subscriber);
    }

    async findByEmail(
        email: string
    ): Promise<Subscriber | null> {
        return (
            this.subscribers.find(
                (s) => s.email === email
            ) ?? null
        );
    }

    async listActive(): Promise<Subscriber[]> {
        return this.subscribers.filter(
            (s) => s.active
        );
    }
}

Deno.test(
    "SubscribeUser creates a new subscriber",
    async () => {
        const repo = new FakeSubscriberRepository();
        const useCase = new SubscribeUser(repo);

        const subscriber = await useCase.execute(
            "test@email.com"
        );

        assertEquals(subscriber.email, "test@email.com");
    }
);

Deno.test(
    "SubscribeUser does not create duplicate subscriber",
    async () => {
        const repo = new FakeSubscriberRepository();
        const useCase = new SubscribeUser(repo);

        const first = await useCase.execute(
            "test@email.com"
        );
        const second = await useCase.execute(
            "test@email.com"
        );

        assertEquals(first.id, second.id);
    }
);
