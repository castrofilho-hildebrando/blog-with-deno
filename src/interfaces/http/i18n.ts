import { MessageKey } from "./messageKeys.ts";

export const messages: Record<
    "pt" | "en",
    Record<MessageKey, string>
> = {
    pt: {
        TITLE_AND_CONTENT_ARE_MANDATORY:
            "Título e conteúdo são obrigatórios"
    },
    en: {
        TITLE_AND_CONTENT_ARE_MANDATORY:
            "Title and content are required"
    }
};

export function translate(
    code: MessageKey,
    lang: "pt" | "en"
): string {
    return messages[lang][code];
}
