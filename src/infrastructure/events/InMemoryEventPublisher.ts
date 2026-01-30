import { EventPublisher } from "../../application/ports/EventPublisher.ts";

type Handler<T> = (payload: T) => Promise<void>;

export class InMemoryEventPublisher
    implements EventPublisher {

    private handlers: Map<
        string,
        Handler<unknown>[]
    > = new Map();

    subscribe<T>(
        eventName: string,
        handler: Handler<T>
    ): void {
        const existing =
            this.handlers.get(eventName) ?? [];

        this.handlers.set(
            eventName,
            [...existing, handler as Handler<unknown>]
        );
    }

    async publish<T>(
        eventName: string,
        payload: T
    ): Promise<void> {
        const handlers =
            this.handlers.get(eventName) ?? [];

        for (const handler of handlers) {
            await handler(payload);
        }
    }
}
