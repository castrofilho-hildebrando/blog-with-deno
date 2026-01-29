import { Subscriber } from "../../domain/Subscriber.ts";
import { SubscriberRepository } from "../ports/SubscriberRepository.ts";

export class SubscribeUser {

    constructor(
        private readonly subscriberRepository: SubscriberRepository
    ) {}

    async execute(email: string): Promise<Subscriber> {

        const existing =
            await this.subscriberRepository.findByEmail(email);

        if (existing) {
            return existing;
        }

        const subscriber = new Subscriber(
            crypto.randomUUID(),
            email,
            new Date()
        );

        await this.subscriberRepository.save(subscriber);

        return subscriber;
    }
}
