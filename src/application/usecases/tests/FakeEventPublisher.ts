import { EventPublisher } from "../../ports/EventPublisher.ts";

export class FakeEventPublisher implements EventPublisher {
    public publishedEvents: {
        name: string;
        payload: unknown;
    }[] = [];

    async publish<T>(
        eventName: string,
        payload: T
    ): Promise<void> {
        this.publishedEvents.push({
            name: eventName,
            payload
        });
    }
}
