import { MessageKey } from "./messageKeys.ts";

export const messages: Record<
    "pt" | "en",
    Record<MessageKey, string>
> = {
    pt: {
        TITLE_AND_CONTENT_ARE_MANDATORY:
            "Título e conteúdo são obrigatórios",
        ARTICLE_NOT_FOUND:
            "Artigo não encontrado",
        ARTICLE_PUBLISHED_SUBJECT:
            "Novo artigo publicado"
    },
    en: {
        TITLE_AND_CONTENT_ARE_MANDATORY:
            "Title and content are required",
        ARTICLE_NOT_FOUND:
            "Article not found",
        ARTICLE_PUBLISHED_SUBJECT:
            "New article published"
    }
};

export function translate(
    code: MessageKey,
    lang: "pt" | "en"
): string {
    return messages[lang][code];
}
