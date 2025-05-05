import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Thread, Prisma } from 'generated/prisma';

@Injectable()
export class ThreadService {
  constructor(private prisma: PrismaService) {}

  async thread(
    threadWhereUniqueInput: Prisma.ThreadWhereUniqueInput,
  ): Promise<Thread | null> {
    return this.prisma.thread.findUnique({
      where: threadWhereUniqueInput,
    });
  }

  async threads(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ThreadWhereUniqueInput;
    where?: Prisma.ThreadWhereInput;
    orderBy?: Prisma.ThreadOrderByWithRelationInput;
  }): Promise<Thread[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.thread.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createThread(data: Prisma.ThreadCreateInput): Promise<Thread> {
    return this.prisma.thread.create({
      data,
    });
  }

  async updateThread(params: {
    where: Prisma.ThreadWhereUniqueInput;
    data: Prisma.ThreadUpdateInput;
  }): Promise<Thread> {
    const { where, data } = params;
    return this.prisma.thread.update({
      data,
      where,
    });
  }

  async deleteThread(where: Prisma.ThreadWhereUniqueInput): Promise<Thread> {
    return this.prisma.thread.delete({
      where,
    });
  }
}
