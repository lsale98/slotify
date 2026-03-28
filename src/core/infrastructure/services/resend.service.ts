import { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';
import { IResendService } from '@/core/application/services/resend.service.interface';
import { Resend } from 'resend';

export class ResendService implements IResendService {
  private resend: Resend;

  constructor(
    private readonly _instrumentationService: IInstrumentationService,
  ) {
    const api = process.env.RESEND_API_KEY;
    if (!api) {
      throw new Error(
        'Missing RESEND_API_KEY. Please set it in your environment variables.',
      );
    }
    this.resend = new Resend(api);
  }

  async sendEmail(
    to: string,
    subject: string,
    htmlContent: string,
  ): Promise<boolean> {
    return this._instrumentationService.startSpan(
      { name: 'ResendService > sendEmail', op: 'function' },
      async () => {
        try {
          const { data, error } = await this.resend.emails.send({
            from: 'Slotify <onboarding@resend.dev>',
            to,
            subject,
            html: htmlContent,
          });

          if (error) {
            console.error('Resend error:', error);
            return false;
          }

          console.log('Email sent successfully:', data?.id);
          return true;
        } catch (error) {
          console.error('Email sending failed:', error);
          return false;
        }
      },
    );
  }
}
