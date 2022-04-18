import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { LikeModule } from './like/like.module';
import { LikeResolver } from './like/like.resolver';
import { LikeService } from './like/like.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      debug: process.env.NODE_ENV !== 'production',
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      disableHealthCheck: false,
      installSubscriptionHandlers: false,
    }),
    LikeModule,
  ],
  providers: [LikeResolver, LikeService, PrismaService],
})
export class AppModule {}
