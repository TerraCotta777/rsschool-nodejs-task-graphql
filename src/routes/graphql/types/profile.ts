import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { memberType } from './memberType.js';

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
          console.log('-------------', user)
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