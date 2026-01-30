import { ArticlePublished } from "../../application/events/ArticlePublished.ts";
import { NotifySubscribers } from "../../application/usecases/NotifySubscribers.ts";
import { ArticleRepository } from "../../application/ports/ArticleRepository.ts";
import { SubscriberRepository } from "../../application/ports/SubscriberRepository.ts";
import { EmailService } from "../../application/ports/EmailService.ts";
import { translate } from "../../interfaces/http/i18n.ts";

const DEFAULT_LANG = "pt";

export function createArticlePublishedHandler(
    articleRepository: ArticleRepository,
    subscriberRepository: SubscriberRepository,
    emailService: EmailService
) {
    const notifySubscribers =
        new NotifySubscribers(
            subscriberRepository,
            emailService
        );

    return async (
        event: ArticlePublished
    ): Promise<void> => {
        const article =
            await articleRepository.findById(
                event.articleId
            );

        if (!article) {
            return;
        }

        const subject = translate(
            "ARTICLE_PUBLISHED_SUBJECT",
            DEFAULT_LANG
        );

        await notifySubscribers.execute(
            article,
            subject
        );
    };
}
