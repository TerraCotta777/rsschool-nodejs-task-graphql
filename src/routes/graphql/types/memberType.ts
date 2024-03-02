import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import { MemberTypeId as MemberTypeIdEnum } from '../../member-types/schemas.js';

// const enumValues = Object.entries(MemberTypeIdEnum).reduce((acc, [key, value]) => {
//   acc[key] = { value };
//   return acc;
// }, {});

// export const MemberTypeId = new GraphQLEnumType({
//   name: 'MemberTypeId',
//   values: enumValues,
// });

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: { value: MemberTypeIdEnum.BASIC },
    business: { value: MemberTypeIdEnum.BUSINESS },
  },
});

export const memberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }),
});
