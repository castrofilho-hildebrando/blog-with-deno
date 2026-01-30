import { serve, serveDir } from "./deps.ts";
import { getPostById, listPosts } from "./kv.ts";

function json(data: unknown, status = 200, headers: HeadersInit = {}) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json",
            ...headers
        }
    });
}

serve(async (req) => {
    const url = new URL(req.url);

    // ========================
    // API: listar posts
    // ========================
    if (url.pathname === "/posts" && req.method === "GET") {
        const pageParam = url.searchParams.get("page");
        const page = pageParam ? Number(pageParam) : 1;

        if (!Number.isInteger(page) || page < 1) {
            return json({ error: "Invalid page" }, 400);
        }

        const result = await listPosts(page);

        return json(
            {
                data: result.data,
                page,
                hasNext: result.hasNext
            },
            200,
            {
                "Cache-Control": "public, max-age=60"
            }
        );
    }

    // ========================
    // API: post individual (/posts/:id)
    // ========================
    const postMatch = url.pathname.match(/^\/posts\/(\d+)$/);

    if (postMatch && req.method === "GET") {
        const id = Number(postMatch[1]);

        const post = await getPostById(id);

        if (!post) {
            return json({ error: "Not found" }, 404);
        }

        return json(post, 200, {
            "Cache-Control": "public, max-age=300"
        });
    }

    // ========================
    // Front-end estático
    // ========================
    return serveDir(req, {
        fsRoot: "public",
        urlRoot: "",
        headers: {
            "Cache-Control": "public, max-age=3600"
        }
    });
});
