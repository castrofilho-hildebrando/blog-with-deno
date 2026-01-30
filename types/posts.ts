export interface PostSummary {
    id: number;
    title: string;
    summary: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
}

export type PostParams = {
    id: string;
};
