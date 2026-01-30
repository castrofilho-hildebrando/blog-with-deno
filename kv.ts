const kv = await Deno.openKv();

export type Post = {
    id: number;
    title: string;
    summary?: string;
    content: string;
    createdAt: string;
};

const PAGE_SIZE = 5;

export async function getPostById(id: number): Promise<Post | null> {
    const result = await kv.get<Post>(["post", id]);
    return result.value ?? null;
}

export async function listPosts(page: number) {
    const offset = (page - 1) * PAGE_SIZE;
    const limit = PAGE_SIZE + 1;

    const entries: Post[] = [];
    let index = 0;

    for await (const entry of kv.list<Post>({
        prefix: ["posts_by_date"]
    })) {
        if (index >= offset && entries.length < limit) {
            entries.push(entry.value);
        }
        index++;
        if (entries.length >= limit) break;
    }

    const hasNext = entries.length > PAGE_SIZE;

    return {
        data: entries.slice(0, PAGE_SIZE).map(p => ({
            id: p.id,
            title: p.title,
            summary: p.summary
        })),
        hasNext
    };
}
