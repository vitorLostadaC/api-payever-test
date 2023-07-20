import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserUseCase } from '../../../../modules/user/useCases/createUserUseCase/createUserUseCase';
import { CreateUserBody } from '../dtos/createUserBody';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidV4 } from 'uuid';
import { UserViewModel } from '../viewModels/userViewModel';

@Controller('users')
export class UsersController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const extensionFile = extname(file.originalname);
          const fileName = `${uuidV4()}${extensionFile}`;
          callback(null, fileName);
        },
      }),
    }),
  )
  async create(
    @Body() body: CreateUserBody,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { first_name, last_name, email } = body;

    const user = await this.createUserUseCase.execute({
      first_name,
      last_name,
      email,
      avatar: file.filename,
    });

    return UserViewModel.toHTTP(user);
  }
}
