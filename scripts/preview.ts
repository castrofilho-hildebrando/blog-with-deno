import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { marked } from "https://esm.sh/marked@12.0.2";

const filePath = Deno.args[0];
if (!filePath) {
    console.error("Uso: preview.ts posts/post.md");
    Deno.exit(1);
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function parseFrontMatter(source: string) {
    const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) throw new Error("Front-matter inválido");

    const meta: Record<string, string> = {};
    for (const line of match[1].split("\n")) {
        const [key, ...rest] = line.split(":");
        meta[key.trim()] = rest.join(":").trim();
    }

    return { meta, content: match[2] };
}

function sanitizar(html: string): string {
    return html
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
        .replace(/on\w+="[^"]*"/g, "")
        .replace(/javascript:/gi, "");
}

let currentHtml = "";

async function render() {
    const source = await Deno.readTextFile(filePath);
    const { meta, content } = parseFrontMatter(source);

    const slug = slugify(meta.title ?? "preview");
    const html = sanitizar(marked.parse(content));

    currentHtml = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8" />
    <title>${meta.title ?? "Preview"}</title>
    <link rel="stylesheet" href="/style.css" />
</head>
<body>
    <header>
        <h1>${meta.title ?? ""}</h1>
        ${meta.summary ? `<p><em>${meta.summary}</em></p>` : ""}
        <p style="font-size:0.85rem;color:#666">
            slug: <code>${slug}</code>
            ${meta.draft === "true" ? "— DRAFT" : ""}
        </p>
    </header>
    <main>
        ${html}
    </main>
</body>
</html>`;
}

await render();

/* WATCH MODE COM DEBOUNCE */
let debounceTimer: number | null = null;

(async () => {
    const watcher = Deno.watchFs(filePath);
    for await (const event of watcher) {
        if (event.kind !== "modify") continue;

        if (debounceTimer !== null) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(async () => {
            await render();
            console.log("Preview atualizado");
            debounceTimer = null;
        }, 200);
    }
})();

console.log("Preview em http://localhost:8080");

await serve(async (req) => {
    const url = new URL(req.url);

    if (url.pathname === "/style.css") {
        const css = await Deno.readFile("public/css/style.css");
        return new Response(css, {
            headers: { "Content-Type": "text/css" }
        });
    }

    return new Response(currentHtml, {
        headers: { "Content-Type": "text/html" }
    });
}, { port: 8080 });
