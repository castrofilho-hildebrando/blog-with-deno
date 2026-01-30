// @ts-ignore Zed TS does not support Deno std imports yet
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { createArticlePublishedHandler } from
    "../../../infrastructure/events/ArticlePublishedHandler.ts";

import { Article } from "../../../domain/Article.ts";
import { Subscriber } from "../../../domain/Subscriber.ts";

import { FakeArticleRepository } from "./FakeArticleRepository.ts";
import { FakeSubscriberRepository } from "./FakeSubscriberRepository.ts";
import { FakeEmailService } from "./FakeEmailService.ts";

// @ts-ignore Deno global is not recognized by Zed yet
Deno.test(
    "ArticlePublishedHandler notifies active subscribers",
    async () => {
        const articleRepo = new FakeArticleRepository();
        const subscriberRepo = new FakeSubscriberRepository();
        const emailService = new FakeEmailService();

        const article = new Article(
            "a1",
            "Novo artigo",
            "novo-artigo",
            "conteúdo",
            new Date()
        );

        await articleRepo.save(article);

        subscriberRepo.add(
            new Subscriber(
                "s1",
                "active@test.com",
                new Date(),
                true
            )
        );

        subscriberRepo.add(
            new Subscriber(
                "s2",
                "inactive@test.com",
                new Date(),
                false
            )
        );

        const handler =
            createArticlePublishedHandler(
                articleRepo,
                subscriberRepo,
                emailService
            );

        await handler({
            articleId: article.id
        });

        assertEquals(emailService.sent.length, 1);
        assertEquals(
            emailService.sent[0].to,
            "active@test.com"
        );
    }
);
