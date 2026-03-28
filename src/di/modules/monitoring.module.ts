import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '../types';
import { MockInstrumentationService } from '@/core/infrastructure/services/instrumentation.service.mock';
import { MockCrashReporterService } from '@/core/infrastructure/services/crash-reporter.service.mock';
import { InstrumentationService } from '@/core/infrastructure/services/instrumentation.service';
import { CrashReporterService } from '@/core/infrastructure/services/crash-reporter.service';

export function createMonitoringModule() {
  const monitoringModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    monitoringModule
      .bind(DI_SYMBOLS.IInstrumentationService)
      .toClass(MockInstrumentationService);
    monitoringModule
      .bind(DI_SYMBOLS.ICrashReporterService)
      .toClass(MockCrashReporterService);
  } else {
    monitoringModule
      .bind(DI_SYMBOLS.IInstrumentationService)
      .toClass(InstrumentationService);
    monitoringModule
      .bind(DI_SYMBOLS.ICrashReporterService)
      .toClass(CrashReporterService);
  }

  return monitoringModule;
}
