import express from 'express';
import cors from 'cors';

import { corsOptions } from '*/config/cors';
import { connectDB } from '*/config/mongodb';
// import { env } from '*/config/environment';
import { apiV1 } from '*/routes/v1';

connectDB()
	.then(() => console.log('Connected successfully to database first!'))
	.then(() => bootServer())
	.catch((error) => {
		console.log(error);
		process.exit(1);
	});

const bootServer = () => {
	const app = express();

	app.use(cors(corsOptions));

	// Enable req.body data
	app.use(express.json());

	//Use APIs v1
	app.use('/v1', apiV1);

	app.listen(process.env.PORT, () => {
		console.log(`Server is listening on ${process.env.PORT}/`);
	});
};
