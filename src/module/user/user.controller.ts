import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard, Roles } from '@thallesp/nestjs-better-auth';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @Roles(['ADMIN'])
  @ResponseMessage('fetch all users...')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
