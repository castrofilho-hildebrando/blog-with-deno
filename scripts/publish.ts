import { marked } from "https://esm.sh/marked@12.0.2";

type PostMeta = {
    id: number;
    title: string;
    summary?: string;
    date: string;
    draft?: boolean;
};

function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function parseFrontMatter(source: string): { meta: PostMeta; content: string } {
    const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) throw new Error("Front-matter inválido");

    const meta: Record<string, string> = {};
    for (const line of match[1].split("\n")) {
        const [key, ...rest] = line.split(":");
        meta[key.trim()] = rest.join(":").trim();
    }

    return {
        meta: {
            id: Number(meta.id),
            title: meta.title,
            summary: meta.summary,
            date: meta.date,
            draft: meta.draft === "true"
        },
        content: match[2]
    };
}

function sanitizarHTML(html: string): string {
    return html
        .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
        .replace(/on\w+="[^"]*"/g, "")
        .replace(/javascript:/gi, "");
}

const filePath = Deno.args[0];
if (!filePath) {
    console.error("Uso: publish.ts posts/post.md");
    Deno.exit(1);
}

const source = await Deno.readTextFile(filePath);
const { meta, content } = parseFrontMatter(source);

if (meta.draft) {
    console.log("Post em draft — não publicado.");
    Deno.exit(0);
}

const html = sanitizarHTML(marked.parse(content));
const slug = slugify(meta.title);

const kv = await Deno.openKv();

const post = {
    id: meta.id,
    slug,
    title: meta.title,
    summary: meta.summary,
    content: html,
    createdAt: meta.date
};

await kv.set(["post", post.id], post);

await kv.set(
    ["posts_by_date", post.createdAt, post.id],
    {
        id: post.id,
        slug: post.slug,
        title: post.title,
        summary: post.summary
    }
);

console.log(`Post publicado: ${post.title}`);
console.log(`Slug: ${slug}`);
