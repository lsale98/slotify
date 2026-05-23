import { ITransaction } from '@/core/entities/models/transaction.interface';
import { CreateUser, User } from '@/core/entities/models/user';

export interface IUsersRepository {
  getUserById(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(input: CreateUser, tx?: ITransaction): Promise<User>;
  activateUserAccount(token: string, otp: string): Promise<User | undefined>;
  updatePassword(userId: string, newPassword: string): Promise<void>;
}
