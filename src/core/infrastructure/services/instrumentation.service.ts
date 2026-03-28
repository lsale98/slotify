/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Sentry from '@sentry/nextjs';

import { IInstrumentationService } from '@/core/application/services/instrumentation.service.interface';

export class InstrumentationService implements IInstrumentationService {
  startSpan<T>(
    _options: {
      name: string;
      op?: string;
      attributes?: Record<string, string>;
    },
    callback: () => T,
  ): T {
    return callback();
  }

  instrumentServerAction<T>(
    name: string,
    options: Record<string, any>,
    callback: () => T,
  ): Promise<T> {
    return Sentry.withServerActionInstrumentation(name, options, callback);
  }
}
