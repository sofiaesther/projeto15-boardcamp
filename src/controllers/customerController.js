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

        if (client.rowCount ===0 ){
            return res.sendStatus(404);
        }

        res.send(client);

    }catch(err){
        res.send(err);
    }
};

const addCustomer = async (req,res) =>{
    const {name, phone, cpf, birthday} = req.body;

    try {
        const query = connection.query(`
        
        INSERT INTO
            customers (name, phone, cpf, birthday)
        VALUES
            ('${name}', '${phone}', '${cpf}', '${birthday}')
        ;`);
        res.sendStatus(201);
        
    } catch (err) {
        res.send(err);
    }
};
const editCustomer = async(req,res) =>{
    const {name, phone, cpf, birthday} = req.body;
    const id = req.params.id;
    try {
        const query = connection.query(`
            UPDATE
                customers
            SET
                name = '${name}',
                phone = '${phone}',
                cpf = '${cpf}',
                birthday = '${birthday}'
            WHERE
                id =${id}
        ;`);

        res.sendStatus(200);
        
    } catch (err) {
        res.send(err);
    };
};

export{allClients,customerId, addCustomer, editCustomer};