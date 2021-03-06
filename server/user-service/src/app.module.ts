import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { join } from 'path';
import { GraphQLError } from 'graphql';
import { UserResolver } from './user/user.resolver';
import { UserService } from './user/user.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: process.env.NODE_ENV !== 'production',
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: false,
      disableHealthCheck: false,
      formatError: (error: GraphQLError) => {
        return error;
      },
      onHealthCheck: () => {
        return new Promise((resolve, reject) => {
          // Replace the `true` in this conditional with more specific checks!
          if (true) {
            resolve(true);
          } else {
            reject();
          }
        });
      },
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [UserResolver, UserService, PrismaService],
})
export class AppModule {}
