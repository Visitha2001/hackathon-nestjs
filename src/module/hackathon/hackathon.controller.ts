import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HackathonService } from './hackathon.service';
import { CreateHackathonDto } from './dto/create-hackathon.dto';
import { UpdateHackathonDto } from './dto/update-hackathon.dto';
import { AuthGuard, Roles, Session } from '@thallesp/nestjs-better-auth';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Controller('hackathon')
export class HackathonController {
  constructor(private readonly hackathonService: HackathonService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles(['ADMIN'])
  async create(
    @Body() createHackathonDto: CreateHackathonDto,
    @Session() session: UserSession,
  ) {
    const hackathon = await this.hackathonService.create(
      createHackathonDto,
      session.user.id,
    );
    return {
      message: 'Hackathon created successfully',
      data: hackathon,
    };
  }

  @Get()
  async findAll() {
    return this.hackathonService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.hackathonService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @Roles(['ADMIN'])
  async update(
    @Param('id') id: string,
    @Body() updateHackathonDto: UpdateHackathonDto,
  ) {
    const hackathon = await this.hackathonService.update(id, updateHackathonDto);
    return {
      message: 'Hackathon updated successfully',
      data: hackathon,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Roles(['ADMIN'])
  async remove(@Param('id') id: string) {
    await this.hackathonService.remove(id);
    return {
      message: 'Hackathon deleted successfully',
    };
  }
}
