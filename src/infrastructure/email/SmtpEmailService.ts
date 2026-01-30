import { EmailService } from "../../application/ports/EmailService.ts";

export class SmtpEmailService implements EmailService {
    async send(
        to: string,
        subject: string,
        body: string
    ): Promise<void> {
        // Implementação mínima intencional.
        // Em produção, isso seria SMTP, API externa, etc.

        console.log("Sending email");
        console.log("To:", to);
        console.log("Subject:", subject);
        console.log("Body:", body);

        // Simula envio bem-sucedido
        return;
    }
}
