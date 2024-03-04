import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLSchema, graphql, parse, validate } from 'graphql';
import { rootMutation } from './mutation.js';
import { rootQuery } from './query.js';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma, httpErrors } = fastify;

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
      const { query, variables: variableValues } = req.body;
      const contextValue = { prisma, httpErrors };
      const validationErrors = validate(schema, parse(query), [depthLimit(5)]);
      return validationErrors.length > 0
        ? { data: null, errors: validationErrors }
        : await graphql({ schema, source: query, variableValues, contextValue });
    },
  });
};

export default plugin;
