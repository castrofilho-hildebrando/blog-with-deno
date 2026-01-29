import { Article } from "../../domain/Article.ts";
import { SubscriberRepository } from "../ports/SubscriberRepository.ts";
import { EmailService } from "../ports/EmailService.ts";

export class NotifySubscribers {
    constructor(
        private readonly subscriberRepository: SubscriberRepository,
        private readonly emailService: EmailService
    ) {}

    async execute(article: Article): Promise<void> {
        const subscribers =
            await this.subscriberRepository.listActive();

        for (const subscriber of subscribers) {
            await this.emailService.send(
                subscriber.email,
                "Novo artigo publicado",
                article.title
            );
        }
    }
}
