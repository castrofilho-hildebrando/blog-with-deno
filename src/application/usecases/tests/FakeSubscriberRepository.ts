import { Subscriber } from "../../../domain/Subscriber.ts";
import { SubscriberRepository } from "../../ports/SubscriberRepository.ts";

export class FakeSubscriberRepository

    implements SubscriberRepository {

    private subscribers: Subscriber[] = [];

    add(subscriber: Subscriber): void {
        this.subscribers.push(subscriber);
    }

    async save(subscriber: Subscriber): Promise<void> {
        this.subscribers.push(subscriber);
    }

    async findByEmail(email: string): Promise<Subscriber | null> {
        return this.subscribers.find(
            (s) => s.email === email
        ) ?? null;
    }

    async listActive(): Promise<Subscriber[]> {
        return this.subscribers.filter(
            (s) => s.active
        );
    }
}
