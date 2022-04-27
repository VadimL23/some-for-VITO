import express from 'express';
import helmet from 'helmet'; // Защита от HTTP заголовков
import cors from 'cors';

require('dotenv').config();

const app = express();
app.use(cors());
app.use(helmet());

const port = process.env.PORT || 80;

app.listen(port, () => {
	console.log(`Server started on ${port} port`);
});
