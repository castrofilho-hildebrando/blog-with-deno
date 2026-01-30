// @ts-ignore Zed TS does not support Deno std imports yet
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { PublishArticle } from "../PublishArticle.ts";
import { FakeArticleRepository } from "./FakeArticleRepository.ts";
import { FakeSubscriberRepository } from "./FakeSubscriberRepository.ts";
import { FakeEmailService } from "./FakeEmailService.ts";
import { FakeEventPublisher } from "./FakeEventPublisher.ts";
import { Subscriber } from "../../../domain/Subscriber.ts";

// @ts-ignore Deno global is not recognized by Zed yet
Deno.test(
    "PublishArticle creates article and notifies subscribers",
    async () => {

        const articleRepo = new FakeArticleRepository();
        const subscriberRepo = new FakeSubscriberRepository();
        const emailService = new FakeEmailService();
        const eventPublisher = new FakeEventPublisher();

        subscriberRepo.add(
            new Subscriber(
                "1",
                "user@test.com",
                new Date(),
                true
            )
        );

        const useCase = new PublishArticle(
            articleRepo,
            eventPublisher
        );

        const article = await useCase.execute({
            title: "Novo artigo",
            content: "Conteúdo"
        });

        assertEquals(articleRepo.articles.length, 1);
        assertEquals(
            eventPublisher.publishedEvents.length,
            1
        );
        assertEquals(
            (eventPublisher.publishedEvents[0].payload as any)
                .articleId,
            article.id
        );
    }
);
