import graphql, {
	GraphQLObjectType,
	GraphQLString,
	GraphQLID,
	GraphQLSchema,
	GraphQLList,
	GraphQLFloat
} from 'graphql';
import { IMovie } from '../interfaces';
import { Movie } from '../models';

const MovieType = new GraphQLObjectType({
	name: 'movie',
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: new GraphQLList(GraphQLString) },
		castsId: { type: new GraphQLList(GraphQLString) },
		directorId: { type: new GraphQLList(GraphQLString) },
		stars: { type: GraphQLFloat },
		country: { type: GraphQLString }
	})
});

const Query = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		movie: {
			type: MovieType,
			args: {
				_id: { type: GraphQLID }
			},
			async resolve(parent, args) {
				return await new Movie().getById(args._id);
			}
		},
		movies: {
			type: new GraphQLList(MovieType),
			async resolve(parent, args) {
				return await new Movie().getAll();
			}
		}
	})
});

export const MovieSchema = new GraphQLSchema({
	query: Query
});
