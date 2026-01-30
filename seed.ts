// seed.ts
const kv = await Deno.openKv();

const post = {
    id: 1,
    title: "Meu primeiro post",
    summary: "Resumo do post",
    content: "<p>Conteúdo do post</p>",
    createdAt: "2026-01-01"
};

await kv.set(["post", post.id], post);

await kv.set(
    ["posts_by_date", post.createdAt, post.id],
    post
);

console.log("Post inserido");
