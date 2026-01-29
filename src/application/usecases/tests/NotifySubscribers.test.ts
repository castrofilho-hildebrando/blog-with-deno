// @ts-ignore Zed TS does not support Deno std imports yet
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { NotifySubscribers } from "../NotifySubscribers.ts";
import { Article } from "../../../domain/Article.ts";
import { Subscriber } from "../../../domain/Subscriber.ts";
import { FakeSubscriberRepository } from "./FakeSubscriberRepository.ts";
import { FakeEmailService } from "./FakeEmailService.ts";

// @ts-ignore Deno global is not recognized by Zed yet
Deno.test(
    "NotifySubscribers sends email to active subscribers only",
    async () => {
        const subscriberRepo = new FakeSubscriberRepository();
        const emailService = new FakeEmailService();

        const activeSubscriber = new Subscriber(
            "1",
            "active@email.com",
            new Date(),
            true
        );

        const inactiveSubscriber = new Subscriber(
            "2",
            "inactive@email.com",
            new Date(),
            false
        );

        subscriberRepo.add(activeSubscriber);
        subscriberRepo.add(inactiveSubscriber);

        const article = new Article(
            "a1",
            "Novo artigo",
            "novo-artigo",
            "conteúdo",
            new Date()
        );

        const useCase = new NotifySubscribers(
            subscriberRepo,
            emailService
        );

        await useCase.execute(article);

        assertEquals(emailService.sentEmails.length, 1);
        assertEquals(
            emailService.sentEmails[0].to,
            "active@email.com"
        );
        assertEquals(
            emailService.sentEmails[0].subject,
            "Novo artigo publicado"
        );
    }
);
