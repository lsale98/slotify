// src/core/infrastructure/services/transaction-manager.service.ts

import { prisma } from '@/lib/prisma';
import type { ITransactionManagerService } from '@/core/application/services/transaction-manager.service.interface';
import type { PrismaClient } from '@/generated/prisma';

// Prisma transaction tip
export type Transaction = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;

export class TransactionManagerService implements ITransactionManagerService {
  public startTransaction<T>(
    clb: (tx: Transaction) => Promise<T>,
    parent?: Transaction,
  ): Promise<T> {
    // Ako postoji parent transaction — koristi ga (nested)
    // Ako ne — kreiraj novi
    if (parent) {
      return clb(parent);
    }

    return prisma.$transaction((tx) => clb(tx));
  }
}
