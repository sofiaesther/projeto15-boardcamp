 import express from 'express';
 import cors from 'cors';
 import pg from 'pg';

 import './setup.js';

 const server = express();
 server.use(cors());
 server.use(express.json());

 

 server.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`);
});


