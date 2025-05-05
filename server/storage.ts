import { users, type User, type InsertUser } from "@shared/schema";
import { Role } from "@shared/roles";

// Storage interface
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;

    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password,
      role: insertUser.role ?? Role.Member, // ✅ default to "member" if role is missing
    };

    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
