import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  graphql,
} from 'graphql';

const memberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'ID',
    },
    discount: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: 'Discount',
    },
    postsLimitPerMonth: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'postsLimitPerMonth',
    },
  }),
});

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma, httpErrors } = fastify;

  const rootQuery = new GraphQLObjectType({
    name: 'Query',
    fields: {
      memberTypes: {
        type: new GraphQLList(memberType),
        resolve: async () => {
          return prisma.memberType.findMany();
        },
      },

      memberType: {
        type: memberType,
        args: {
          memberTypeId: {
            type: new GraphQLNonNull(GraphQLID),
          },
        },
        resolve: async (_, args) => {
          const memberType = await prisma.memberType.findUnique({
            where: {
              id: args.memberTypeId,
            },
          });
          if (memberType === null) {
            throw httpErrors.notFound();
          }
          return memberType;
        },
      },
    },
  });

  const rootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      create: {
        type: GraphQLBoolean,
        resolve: () => true,
      },
    },
  });

  const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation,
  });

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query } = req.body;
      return { data: await graphql({ schema, source: query }), errors: {} };
    },
  });
};

export default plugin;
