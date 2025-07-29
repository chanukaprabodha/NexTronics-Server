import User from '../model/user.model';
import { UserDto } from '../dto/user.dto';

export const registerUser = async (user:UserDto):Promise<UserDto> => {
  return await User.create(user);
}