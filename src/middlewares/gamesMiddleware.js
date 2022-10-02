import joi from 'joi';
import connection from '../db/database.js';

const isValid = async (req,res,next) => {

    const gamesSchema = joi.object({
        name: joi.string().required().empty(),
        image: joi.string().required(),
        stockTotal: joi.number().required().min(1),
        categoryId: joi.number().required(),
        pricePerDay: joi.number().required().min(1),
      });
    const body = req.body;
    const validation = gamesSchema.validate(body);
    if(validation.error){
        return res.sendStatus(400);
    };

    const categoryId = body.categoryId;
    const name = body.name;

    try{
        const hasCategory = await connection.query(`
        SELECT
            *
        FROM
            categories
        WHERE
            id = $1
            ;
        `,[categoryId]);

        if(!hasCategory.rows){
            return res.sendStatus(400);
        };

        const hasName = await connection.query(`
        SELECT
            *
        FROM
            games
        WHERE
            name = $1
        ;
        `,[name]);

        console.log(hasName.rows)

        if (hasName.rows.length !== 0){
            return res.sendStatus(409);
        };
        next();

    }catch(err){
        res.send(err);
    };

};

export {isValid};