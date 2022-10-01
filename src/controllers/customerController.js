import connection from '../db/database.js';

const allClients = async (req,res) =>{
    try{
        console.log('oi')
        const clients = await connection.query(`
        SELECT 
            *
        FROM
            customers 
        ;
        `);
        res.send(clients.rows);

    }catch(err){
        res.send(err);
    }
};

const customerId = async (req,res) =>{
    const id = req.params.id;
    try{
        console.log('oi')
        const client = await connection.query(`
        SELECT 
            *
        FROM
            customers 
        WHERE
            id = $1
        LIMIT
            1
        ;
        `, [id]);
        res.send(client);

    }catch(err){
        res.send(err);
    }
};

export{allClients,customerId};