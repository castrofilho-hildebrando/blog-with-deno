// @ts-ignore Zed TS does not support Deno std imports yet
import { assertRejects } from "@std/testing/asserts.ts";
// @ts-ignore Zed TS does not support Deno std imports yet
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { CreateArticle } from "../CreateArticle.ts";
import { FakeArticleRepository } from "./FakeArticleRepository.ts";
import { MissingArticleDataError } from "../../errors/MissingArticleDataError.ts";

// @ts-ignore Deno global is not recognized by Zed yet
Deno.test(
    "CreateArticle throws MissingArticleDataError when title is missing",
    async () => {
        const repository = new FakeArticleRepository();
        const useCase = new CreateArticle(repository);

        await assertRejects(
            () =>
                useCase.execute({
                    title: "",
                    content: "Some content"
                }),
            MissingArticleDataError
        );
    }
);

// @ts-ignore Deno global is not recognized by Zed yet
Deno.test(
    "CreateArticle throws MissingArticleDataError when content is missing",
    async () => {
        const repository = new FakeArticleRepository();
        const useCase = new CreateArticle(repository);

        await assertRejects(
            () =>
                useCase.execute({
                    title: "Valid title",
                    content: ""
                }),
            MissingArticleDataError
        );
    }
);

// @ts-ignore Deno global is not recognized by Zed yet
Deno.test(
    "CreateArticle creates and persists an article when data is valid",
    async () => {
        const repository = new FakeArticleRepository();
        const useCase = new CreateArticle(repository);

        const article = await useCase.execute({
            title: "Clean Architecture com Deno",
            content: "Conteúdo do artigo"
        });

        assertEquals(repository.articles.length, 1);
        assertEquals(article.title, "Clean Architecture com Deno");
        assertEquals(article.slug, "clean-architecture-com-deno");
        assertEquals(article.content, "Conteúdo do artigo");
        assertEquals(article, repository.articles[0]);
    }
);
