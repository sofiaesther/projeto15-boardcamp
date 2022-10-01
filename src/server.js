import express from 'express';
import cors from 'cors';

import categoriesRouter from './routes/categoriesRouter.js';
import gamesRouter from './routes/gamesRouter.js';
import customerRouter from './routes/customerRouter.js';

const server = express();
server.use(cors());
server.use(express.json());

server.use('/categories',categoriesRouter);
server.use('/customer',customerRouter);
server.use('/games',gamesRouter);


server.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
});


