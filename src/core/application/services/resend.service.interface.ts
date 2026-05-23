export interface IResendService {
  sendEmail(
    to: string,
    subject: string,
    htmlContent: string | React.ReactNode,
  ): Promise<boolean>;
}
