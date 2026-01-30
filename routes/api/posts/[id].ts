import { Handler, HandlerContext } from "$fresh/server.ts";
import { Post, PostParams } from "../../../types/posts.ts";

export const handler: Handler<PostParams> = (
    _req: Request,
    ctx: HandlerContext<PostParams>
) => {
    const id = Number(ctx.params.id);

    if (Number.isNaN(id)) {
        return new Response(
            JSON.stringify({ error: "ID inválido" }),
            {
                status: 400,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    const posts: Post[] = [
        {
            id: 1,
            title: "Primeiro post",
            content: "Conteúdo completo do primeiro post"
        },
        {
            id: 2,
            title: "Segundo post",
            content: "Conteúdo completo do segundo post"
        }
    ];

    const post = posts.find(p => p.id === id);

    if (!post) {
        return new Response(
            JSON.stringify({ error: "Post não encontrado" }),
            {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }

    return new Response(
        JSON.stringify(post),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
};
