import User from '../model/user.model';
import { UserDto } from '../dto/user.dto';

export const registerUser = async (user:UserDto):Promise<UserDto> => {
  return await User.create(user);
}

export const getUserById = async (id: string): Promise<any> => {
  const user = await User.findOne({id: id});
  if (!user) {
    return null;
  }
  return user;
}