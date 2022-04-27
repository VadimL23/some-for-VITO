import graphql, { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLSchema } from 'graphql';

const MovieType = new GraphQLObjectType({
	name: 'movie',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
});

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		movie: {
			type: MovieType,
			args: {
				id: { type: GraphQLID }
			},
			resolve(parent, args) {
				const a = 1;
			}
		}
	})
});

export const MovieSchema = new GraphQLSchema({
	query: Query
});
