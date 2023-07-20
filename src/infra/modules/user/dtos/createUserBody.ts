import { IsEmailCustom } from 'src/infra/classValidator/decorators/isEmailCustom';
import { IsNotEmptyCustom } from 'src/infra/classValidator/decorators/isNotEmptyCustom';

export class CreateUserBody {
  @IsNotEmptyCustom()
  @IsEmailCustom()
  email: string;

  @IsNotEmptyCustom()
  first_name: string;

  @IsNotEmptyCustom()
  last_name: string;
}
