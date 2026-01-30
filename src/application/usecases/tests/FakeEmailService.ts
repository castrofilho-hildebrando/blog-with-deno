import { EmailService } from "../../ports/EmailService.ts";

export class FakeEmailService
    implements EmailService {

    public sent: {
        to: string;
        subject: string;
        body: string;
    }[] = [];

    async send(
        to: string,
        subject: string,
        body: string
    ): Promise<void> {
        this.sent.push({ to, subject, body });
    }
}
