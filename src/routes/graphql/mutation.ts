import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { changePostInput, createPostInput, postType } from './types/post.js';
import { changeUserInput, createUserInput, userType } from './types/user.js';
import { changeProfileInput, createProfileInput, profileType } from './types/profile.js';
import { UUIDType } from './types/uuid.js';

export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: postType,
      args: { dto: { type: new GraphQLNonNull(createPostInput) } },
      resolve: async (source, args, context) => {
        return await context.prisma.post.create({ data: args.dto });
      },
    },

    changePost: {
      type: postType,
      args: {
        id: { type: UUIDType },
        dto: { type: new GraphQLNonNull(changePostInput) },
      },
      resolve: async (source, args, context) => {
        return await context.prisma.post.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },

    deletePost: {
      type: GraphQLString,
      args: { id: { type: UUIDType } },
      resolve: async (source, args, context) => {
        await context.prisma.post.delete({
          where: {
            id: args.id,
          },
        });
        return null;
      },
    },

    createUser: {
      type: userType,
      args: { dto: { type: new GraphQLNonNull(createUserInput) } },
      resolve: async (source, args, context) =>
        await context.prisma.user.create({ data: args.dto }),
    },

    changeUser: {
      type: userType,
      args: {
        id: { type: UUIDType },
        dto: { type: new GraphQLNonNull(changeUserInput) },
      },
      resolve: async (source, args, context) => {
        return await context.prisma.user.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },

    deleteUser: {
      type: GraphQLString,
      args: { id: { type: UUIDType } },
      resolve: async (source, args, context) => {
        await context.prisma.user.delete({
          where: {
            id: args.id,
          },
        });
        return null;
      },
    },

    createProfile: {
      type: profileType,
      args: { dto: { type: new GraphQLNonNull(createProfileInput) } },
      resolve: async (source, args, context) =>
        await context.prisma.profile.create({ data: args.dto }),
    },

    changeProfile: {
      type: profileType,
      args: {
        id: { type: UUIDType },
        dto: { type: new GraphQLNonNull(changeProfileInput) },
      },
      resolve: async (source, args, context) => {
        return await context.prisma.profile.update({
          where: { id: args.id },
          data: args.dto,
        });
      },
    },

    deleteProfile: {
      type: GraphQLString,
      args: { id: { type: UUIDType } },
      resolve: async (source, args, context) => {
        await context.prisma.profile.delete({
          where: {
            id: args.id,
          },
        });
        return null;
      },
    },

    subscribeTo: {
      type: userType,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (source, args, context) => {
        return await context.prisma.user.update({
          where: {
            id: args.userId,
          },
          data: {
            userSubscribedTo: {
              create: {
                authorId: args.authorId,
              },
            },
          },
        });
      },
    },

    unsubscribeFrom: {
      type: GraphQLString,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType } },
      resolve: async (source, args, context) => {
        await context.prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });
        return null;
      },
    },
  },
});
