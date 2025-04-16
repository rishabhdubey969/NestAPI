import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticationGuard } from '../../guard/authentication.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/profile')
  @UseGuards(AuthenticationGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  findAll(@Request() req) {
    return this.userService.findAll();
  }

  @Get('/profile/:id')
  @UseGuards(AuthenticationGuard)
  findOne(@Param('id') id: string, @Request() req) {
    console.log(req.user);
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthenticationGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard)
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
