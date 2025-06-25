import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";

@Injectable()
export class Common{
    constructor(
        private readonly mailerService: MailerService
    ){}
    async sendMail(to_mail :string,subject: string, data: string){
        await this.mailerService.sendMail({
                to: to_mail,
                subject: subject,
                html: data,
        });
    }
}