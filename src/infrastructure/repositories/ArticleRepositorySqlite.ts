import { ArticleRepository } from "../../application/ports/ArticleRepository.ts";
import { Article } from "../../domain/Article.ts";
import { getDb } from "../db/connection.ts";

export class ArticleRepositorySqlite
    implements ArticleRepository {

    async save(article: Article): Promise<void> {
        const db = getDb();

        db.query(
            `
            INSERT INTO articles (
                id, title, slug, content,
                published_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?)
            `,
            [
                article.id,
                article.title,
                article.slug,
                article.content,
                article.publishedAt.toISOString(),
                article.updatedAt?.toISOString() ?? null
            ]
        );
    }

    async findBySlug(slug: string): Promise<Article | null> {
        const db = getDb();

        const result = [
            ...db.query(
                `
                SELECT
                    id, title, slug, content,
                    published_at, updated_at
                FROM articles
                WHERE slug = ?
                `,
                [slug]
            )
        ][0];

        if (!result) {
            return null;
        }

        const [
            id,
            title,
            slugValue,
            content,
            publishedAt,
            updatedAt
        ] = result as [
            string,
            string,
            string,
            string,
            string,
            string | null
        ];

        return new Article(
            id,
            title,
            slugValue,
            content,
            new Date(publishedAt),
            updatedAt ? new Date(updatedAt) : undefined
        );
    }

    async list(): Promise<Article[]> {
        const db = getDb();

        const results = db.query(`
            SELECT
                id, title, slug, content,
                published_at, updated_at
            FROM articles
            ORDER BY published_at DESC
        `);

        return [...results].map(
            (row) => {
                const [
                    id,
                    title,
                    slug,
                    content,
                    publishedAt,
                    updatedAt
                ] = row as [
                    string,
                    string,
                    string,
                    string,
                    string,
                    string | null
                ];

                return new Article(
                    id,
                    title,
                    slug,
                    content,
                    new Date(publishedAt),
                    updatedAt ? new Date(updatedAt) : undefined
                );
            }
        );
    }
}
