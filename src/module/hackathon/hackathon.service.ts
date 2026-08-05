import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../lib/database/prisma.service';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';

@Injectable()
export class HackathonService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHackathonDto: CreateHackathonDto, authorId: string) {
    const { startsAt, endsAt, ...rest } = createHackathonDto;
    return this.prisma.hackathon.create({
      data: {
        ...rest,
        startDate: startsAt,
        endDate: endsAt,
        authorId,
      },
    });
  }

  async findAll() {
    return this.prisma.hackathon.findMany();
  }

  async findOne(id: string) {
    const hackathon = await this.prisma.hackathon.findUnique({
      where: { id },
    });
    if (!hackathon) {
      throw new NotFoundException(`Hackathon with ID ${id} not found`);
    }
    return hackathon;
  }

  async update(id: string, updateHackathonDto: UpdateHackathonDto) {
    await this.findOne(id); // Ensure the hackathon exists
    const { startsAt, endsAt, ...rest } = updateHackathonDto;
    return this.prisma.hackathon.update({
      where: { id },
      data: {
        ...rest,
        ...(startsAt && { startDate: startsAt }),
        ...(endsAt && { endDate: endsAt }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Ensure the hackathon exists
    return this.prisma.hackathon.delete({
      where: { id },
    });
  }
}
