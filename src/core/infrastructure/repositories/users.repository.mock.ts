import type { IUsersRepository } from '@/core/application/repositories/users.repository.interface';
import type { CreateUser, User } from '@/core/entities/models/user';

export const MOCK_USER: User = {
  id: 'test-user-id',
  email: 'test@example.com',
  name: 'Test',
  lastname: 'User',
  passwordHash: 'hashed-password',
  role: 'USER',
  status: 'ACTIVE',
  emailVerified: false,
  avatarUrl: null,
  agreedTerms: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
};

export const MOCK_PENDING_USER: User = {
  ...MOCK_USER,
  id: 'test-pending-user-id',
  email: 'pending@example.com',
  status: 'PENDING',
};

export const MOCK_SUSPENDED_USER: User = {
  ...MOCK_USER,
  id: 'test-suspended-user-id',
  email: 'suspended@example.com',
  status: 'SUSPENDED',
};

export class MockUsersRepository implements IUsersRepository {
  private _users: User[] = [MOCK_USER, MOCK_PENDING_USER, MOCK_SUSPENDED_USER];

  async getUserById(id: string): Promise<User | undefined> {
    return this._users.find((u) => u.id === id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this._users.find((u) => u.email === email);
  }

  async createUser(input: CreateUser): Promise<User> {
    const user: User = {
      id: input.id,
      email: input.email,
      name: input.name,
      lastname: input.lastname,
      passwordHash: 'hashed-' + input.password,
      role: input.role ?? 'USER',
      status: input.status ?? 'PENDING',
      emailVerified: false,
      avatarUrl: null,
      agreedTerms: input.agreedTerms ?? true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this._users.push(user);
    return user;
  }

  async updateStatus(id: string, status: User['status']): Promise<User> {
    const index = this._users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error(`User ${id} not found`);

    this._users[index] = {
      ...this._users[index],
      status,
      updatedAt: new Date(),
    };
    return this._users[index];
  }

  async activateUserAccount(
    _token: string,
    _otp: string,
  ): Promise<User | undefined> {
    const user = this._users.find((u) => u.status === 'PENDING');
    if (!user) return undefined;

    return this.updateStatus(user.id, 'ACTIVE');
  }

  _reset(): void {
    this._users = [MOCK_USER, MOCK_PENDING_USER, MOCK_SUSPENDED_USER];
  }

  _getAll(): User[] {
    return this._users;
  }

  _addUser(user: User): void {
    this._users.push(user);
  }
}
