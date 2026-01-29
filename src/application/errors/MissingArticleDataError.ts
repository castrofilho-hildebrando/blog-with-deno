import { ApplicationError } from "./ApplicationError.ts";

export class MissingArticleDataError extends ApplicationError {

    readonly code = "TITLE_AND_CONTENT_ARE_MANDATORY";

    constructor() {
        super();
    }
}
