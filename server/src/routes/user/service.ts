import { PrismaClient } from "@prisma/client";
import { CreateUserData } from "../auth/types";

export class UserService {
  constructor(private db: PrismaClient) {}

  async create(data: CreateUserData) {
    return this.db.user.create({ data });
  }

  async get(where: { email?: string; id?: number }) {
    return this.db.user.findFirst({ where });
  }

  async getList() {
    return this.db.user.findMany();
  }

  async update() {
    return "update";
  }

  async delete() {
    return "delete";
  }
}
