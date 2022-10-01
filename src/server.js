import express from 'express';
import cors from 'cors';
import connection from './db/database.js'; 

import categoriesRouter from './routes/categoriesRouter.js';

 const server = express();
 server.use(cors());
 server.use(express.json());

server.use(categoriesRouter);


 server.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
});


