import { EmailService } from "../../ports/EmailService.ts";

interface SentEmail {
    to: string;
    subject: string;
    body: string;
}

export class FakeEmailService implements EmailService {

    public sentEmails: SentEmail[] = [];

    async send(
        to: string,
        subject: string,
        body: string
    ): Promise<void> {
        this.sentEmails.push({ to, subject, body });
    }
}
