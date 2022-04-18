import { Query, Resolver } from '@nestjs/graphql';
import { User } from './model/user.model';

@Resolver(() => User)
export class UserResolver {
  // constructor() {}

  @Query(() => User)
  getUser(): User {
    return {} as User;
  }
}
