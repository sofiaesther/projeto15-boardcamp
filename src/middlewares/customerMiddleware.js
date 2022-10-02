import connection from "../db/database.js";
import joi from 'joi';

const customerSchema = joi.object({
    name: joi.string().required().empty(),
    phone: joi.string().min(10).max(11).pattern(new RegExp('^[0-9]{11}$')).required(),
    cpf: joi.string().length(11).pattern(new RegExp('^[0-9]{11}$')).required(),
    birthday:joi.date().iso().required()
}
);

const verifySchema = (req,res,next)=>{
    const validation = customerSchema.validate(req.body,{abortEarly:true});
    if(validation.error){
        return res.sendStatus(400);
    };
    next();
}

const verify = async (req,res,next)=>{
    const cpf = req.body.cpf;

    try {
         const onlyCustomer = await connection.query(`
         SELECT
            *
         FROM
            customers
        WHERE
            cpf = $1
         ;
         `,[cpf]);
         if(onlyCustomer.rowCount!==0){
            return res.sendStatus(409);
         }
         next();

    } catch (error) {
        res.send(error);
    }
};

export {verify, verifySchema};
