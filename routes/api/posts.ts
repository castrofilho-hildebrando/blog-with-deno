// @ts-ignore Zed TS does not support Deno std imports yet
import { Handler } from "$fresh/server.ts";
import { PostSummary } from "../../types/posts.ts";

export const handler: Handler = async () => {

    const posts: PostSummary[] = [
        {
            id: 1,
            title: "Primeiro post",
            summary: "Resumo do primeiro post"
        },
        {
            id: 2,
            title: "Segundo post",
            summary: "Outro resumo"
        }
    ];

    return new Response(
        globalThis.JSON.stringify(posts),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
};
