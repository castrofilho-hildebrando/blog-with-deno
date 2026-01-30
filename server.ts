import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

serve(async (req) => {
    const url = new URL(req.url);

    if (url.pathname.startsWith("/posts")) {
        // aqui entra seu handler de API
        return handlePosts(req);
    }

    return serveDir(req, {
        fsRoot: "public",
        urlRoot: "",
        index: "index.html"
    });
});

