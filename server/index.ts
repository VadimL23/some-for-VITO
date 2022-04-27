import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql';
import { MovieSchema } from './schema/schema';

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
	'/graphql',
	graphqlHTTP({
		schema: MovieSchema,
		graphiql: true
	})
);

app.use('/test', (req, resp) => {
	return resp.send('Response ok').status(200);
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
	console.log(`Server started on ${port} port`);
});
