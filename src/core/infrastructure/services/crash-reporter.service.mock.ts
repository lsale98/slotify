import { ICrashReporterService } from '@/core/application/services/crash-reporter.service.interface';

export class MockCrashReporterService implements ICrashReporterService {
  report(_error: unknown): string {
    return 'errorId';
  }
}
