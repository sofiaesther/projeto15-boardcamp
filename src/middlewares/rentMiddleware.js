import joi from 'joi';
import connection from '../db/database.js';

const validateId = async (req,res,next)=>{
    const id = req.params.id;
    try {

        const getId = await connection.query(`
        SELECT
            *
        FROM
            rentals
        WHERE
            id = $1
        LIMIT
            1
        ;`,[id]);
        if(getId.rows){
            return res.sendStatus(404);
        };

        next();
        
    } catch (err) {
        console.log(err)
        res.send(err);
    };
};

const isReturned = async (req,res,next)=>{
    const id = req.params.id;

    try {
        const returned = await connection.query(`
        SELECT
            "returnDate"
        FROM
            rentals
        WHERE
            id = $1
        LIMIT
            1
        ;`,[id]);
        console.log(id,'id');

        if(returned.rows[0]){
            return res.sendStatus(400);
        };
    } catch (err) {
        console.log('ta aqui')
        return res.send(err);
    }
    next();
};

export{validateId, isReturned};

