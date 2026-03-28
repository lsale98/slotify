import { IResendService } from '@/core/application/services/resend.service.interface';

export class MockResendService implements IResendService {
  async sendEmail(
    to: string,
    subject: string,
    htmlContent: string,
  ): Promise<boolean> {
    console.log(
      `Mocked sendEmail called with: to=${to}, subject=${subject}, content=${htmlContent}`,
    );

    // Simulating success
    return true;
  }
}
