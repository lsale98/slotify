import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '../types';
import { MockResendService } from '@/core/infrastructure/services/resend.service.mock';
import { ResendService } from '@/core/infrastructure/services/resend.service';

export function createResendModule() {
  const resendModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    resendModule.bind(DI_SYMBOLS.IResendService).toClass(MockResendService);
  } else {
    resendModule
      .bind(DI_SYMBOLS.IResendService)
      .toClass(ResendService, [DI_SYMBOLS.IInstrumentationService]);
  }

  return resendModule;
}
