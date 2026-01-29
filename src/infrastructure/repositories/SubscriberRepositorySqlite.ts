import { Subscriber } from "../../domain/Subscriber.ts";
import { SubscriberRepository } from "../../application/ports/SubscriberRepository.ts";
import { getDb } from "../db/connection.ts";

export class SubscriberRepositorySqlite

    implements SubscriberRepository {

    async save(subscriber: Subscriber): Promise<void> {
        const db = getDb();

        db.query(
            `
            INSERT INTO subscribers (
                id, email, subscribed_at, active
            ) VALUES (?, ?, ?, ?)
            `,
            [
                subscriber.id,
                subscriber.email,
                subscriber.subscribedAt.toISOString(),
                subscriber.active ? 1 : 0
            ]
        );
    }

    async findByEmail(
        email: string
    ): Promise<Subscriber | null> {
        const db = getDb();

        const result = [
            ...db.query(
                `
                SELECT id, email, subscribed_at, active
                FROM subscribers
                WHERE email = ?
                `,
                [email]
            )
        ][0];

        if (!result) {
            return null;
        }

        const [
            id,
            emailValue,
            subscribedAt,
            active
        ] = result as [
            string,
            string,
            string,
            number
        ];

        return new Subscriber(
            id,
            emailValue,
            new Date(subscribedAt),
            Boolean(active)
        );
    }

    async listActive(): Promise<Subscriber[]> {
        const db = getDb();

        const results = db.query(
            `
            SELECT id, email, subscribed_at, active
            FROM subscribers
            WHERE active = 1
            `
        );

        return [...results].map(
            (row) => {
                const [
                    id,
                    email,
                    subscribedAt,
                    active
                ] = row as [
                    string,
                    string,
                    string,
                    number
                ];

                return new Subscriber(
                    id,
                    email,
                    new Date(subscribedAt),
                    Boolean(active)
                );
            }
        );
    }
}
