export class Article {

    constructor(
        public readonly id: string,
        public title: string,
        public slug: string,
        public content: string,
        public publishedAt: Date,
        public updatedAt?: Date,
    ) {}

    updateContent(newContent: string): void {
        this.content = newContent;
        this.updatedAt = new Date();
    }

    rename(newTitle: string, newSlug: string): void {
        this.title = newTitle;
        this.slug = newSlug;
        this.updatedAt = new Date();
    }
}
