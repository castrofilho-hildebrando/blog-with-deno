import { Subscriber } from "../../domain/Subscriber.ts";

export interface SubscriberRepository {
    save(subscriber: Subscriber): Promise<void>;
    findByEmail(email: string): Promise<Subscriber | null>;
    listActive(): Promise<Subscriber[]>;
}
