// @ts-ignore Zed TS does not support Deno std imports yet
import { DB } from "https://deno.land/x/sqlite/mod.ts";

let db: DB | null = null;

export function getDb(): DB {
    if (!db) {
        db = new DB("blog.db");
        db.execute(`
            CREATE TABLE IF NOT EXISTS articles (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                slug TEXT NOT NULL UNIQUE,
                content TEXT NOT NULL,
                published_at TEXT NOT NULL,
                updated_at TEXT
            )
        `);
    }

    return db;
}
