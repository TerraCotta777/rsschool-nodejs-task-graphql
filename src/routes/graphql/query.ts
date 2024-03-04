import { GraphQLList, GraphQLObjectType } from 'graphql';
import { MemberTypeId, memberType } from './types/memberType.js';
import { postType } from './types/post.js';
import { UUIDType } from './types/uuid.js';
import { userType } from './types/user.js';
import { profileType } from './types/profile.js';

export const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    memberTypes: {
      type: new GraphQLList(memberType),
      resolve: async (source, args, context) => {
        return context.prisma.memberType.findMany();
      },
    },

    memberType: {
      type: memberType,
      args: {
        id: {
          type: MemberTypeId,
        },
      },
      resolve: async (source, args, context) => {
        try {
          const memberType = await context.prisma.memberType.findUnique({
            where: {
              id: args.id,
            },
          });
          if (memberType === null) {
            throw context.httpErrors.notFound();
          }
          return memberType;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },

    posts: {
      type: new GraphQLList(postType),
      resolve: async (source, args, context) => {
        return context.prisma.post.findMany();
      },
    },

    post: {
      type: postType,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (source, args, context) => {
        try {
          return await context.prisma.post.findUnique({
            where: {
              id: args.id,
            },
          });
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },

    users: {
      type: new GraphQLList(userType),
      resolve: async (source, args, context) => {
        return context.prisma.user.findMany();
      },
    },

    user: {
      type: userType,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (source, args, context) => {
        try {
          return await context.prisma.user.findUnique({
            where: {
              id: args.id,
            },
          });
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },

    profiles: {
      type: new GraphQLList(profileType),
      resolve: async (source, args, context) => {
        return context.prisma.profile.findMany();
      },
    },

    profile: {
      type: profileType,
      args: {
        id: {
          type: UUIDType,
        },
      },
      resolve: async (source, args, context) => {
        try {
          return await context.prisma.profile.findUnique({
            where: {
              id: args.id,
            },
          });
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
  },
});
