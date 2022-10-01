import { serialize } from 'bson';
import joi from 'joi';
import connection from '../db/database.js';

const categoriesSchema = joi.object({
    name: joi.string().required().empty()
}
);

const verify = (req,res,next)=>{

    const verification = categoriesSchema.validate(req.body);

    if (verification.error){
        return res.sendStatus(400);        
    };

    next();
};

const isNew = async (req,res,next)=>{
    const {name} = req.body;
    console.log(name);

    try{
        const query = await connection.query(`
        SELECT
            *
        FROM
            categories
        WHERE
            name = $1
        ;
        `,[name]);

        console.log(query.rows.length)

        if (query.rows.length === 0){
            return next();
        };

       res.sendStatus(409);


    }catch(err){
        res.send(err);
    };
};

export{verify, isNew};