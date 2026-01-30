// @ts-ignore Zed TS does not support Deno std imports yet
import { Handlers } from "$fresh/server.ts";

import { PublishArticle } from "../src/application/usecases/PublishArticle.ts";
import { MissingArticleDataError } from "../src/application/errors/MissingArticleDataError.ts";

import { ArticleRepositorySqlite } from "../src/infrastructure/repositories/ArticleRepositorySqlite.ts";
import { SubscriberRepositorySqlite } from "../src/infrastructure/repositories/SubscriberRepositorySqlite.ts";
import { SmtpEmailService } from "../src/infrastructure/email/SmtpEmailService.ts";

import { translate } from "../src/interfaces/http/i18n.ts";
import { createArticlePublishedHandler } from "../src/infrastructure/events/ArticlePublishedHandler.ts";
import { InMemoryEventPublisher } from "../src/infrastructure/events/InMemoryEventPublisher.ts";

export const handler: Handlers = {
    async POST(req: Request): Promise<Response> {
        try {
            const body = await req.json();
            const eventBus = new InMemoryEventPublisher();

            eventBus.subscribe(
                "ArticlePublished",
                createArticlePublishedHandler(
                    new ArticleRepositorySqlite(),
                    new SubscriberRepositorySqlite(),
                    new SmtpEmailService()
                )
            );

            const useCase = new PublishArticle(
                new ArticleRepositorySqlite(),
                eventBus
            );

            const article = await useCase.execute({
                title: body.title,
                content: body.content
            });

            return new Response(
                JSON.stringify(article),
                {
                    status: 201,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        } catch (error) {
            if (error instanceof MissingArticleDataError) {
                return new Response(
                    JSON.stringify({
                        error: translate(
                            error.code,
                            "pt"
                        )
                    }),
                    { status: 400 }
                );
            }

            throw error;
        }
    }
};
