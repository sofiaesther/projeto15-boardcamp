import connection from '../db/database.js';

const getCategories = async (req,res) =>{
    try{
        const categories = await connection.query(`
        SELECT 
            *
        FROM
            categories
        ;
        `);
        res.send(categories.rows);

    }catch(err){
        res.send(err);
    }
};

const postCategories = async (req,res) =>{
    const { name } = req.body;
    try{

        const query = connection.query(`
        INSERT INTO
            categories (name)
        VALUES
            ($1)
        ;
        `,[name]);

        res.sendStatus(201);

    }catch(err){
        res.send(err)
    }
}

export {getCategories, postCategories};