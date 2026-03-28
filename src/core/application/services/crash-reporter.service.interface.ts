/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICrashReporterService {
  report(error: any): string;
}
