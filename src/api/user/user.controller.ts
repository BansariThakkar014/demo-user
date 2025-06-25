import { Body, Controller, Post, Get, Delete, Param, Patch, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {  ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('Users-api')
export class UserController {
  constructor(private readonly userService: UserService) {
  }
  @Post('add-user')
  create(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Get('get-all-users')
  getUsers(@Query('search') search: string,@Query('page') page = 1, @Query('limit') limit = 10 ){
    return this.userService.getAllUsers(search,Number(page), Number(limit))
  }

  @Get('get-user-id/:id')
  getUserbyUsername(@Param('id') id: number){
    return this.userService.getUserbyId(id)
  }

  @Delete('delete-user-id/:id')
  deleteByUsername(@Param('id') id: number){
    return this.userService.deleteUserById(id)
  }

  @Patch('update-user-id/:id')
  updateUserById(@Param('id') id: number, @Body() body: UpdateUserDto){
    return this.userService.updateUserById(id, body)
  }

}