import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeId, memberType } from './memberType.js';

export const createProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeId },
  }),
});

export const changeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
  }),
});

export const profileType = new GraphQLObjectType({
  name: 'profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberType: {
      type: memberType,
      resolve: async (user, args, { prisma }) => {
        try {
          return await prisma.memberType.findUnique({
            where: { id: user.memberTypeId },
          });
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
    },
  }),
});
