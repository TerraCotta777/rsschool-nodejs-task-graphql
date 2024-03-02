import { GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { postType } from './types/post.js';

export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: postType,
      args: {
        postObject: {
          type: GraphQLNonNull(CreatePostInput),
        },
      },
      resolve: (source, args, context) =>
        context.prisma.post.create({ data: args.postObject }),
    },
  },
});
