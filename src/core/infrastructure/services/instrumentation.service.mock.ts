import { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';

export class MockInstrumentationService implements IInstrumentationService {
  startSpan<T>(
    _: { name: string; op?: string; attributes?: Record<string, unknown> },
    callback: () => T,
  ): T {
    return callback();
  }

  async instrumentServerAction<T>(
    _: string,
    __: Record<string, unknown>,
    callback: () => T,
  ): Promise<T> {
    return callback();
  }
}
