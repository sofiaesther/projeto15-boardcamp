import connection from "../db/database.js";
import dayjs from 'dayjs';
import joi from 'joi';

const newRentalSchema = joi.object({
    customerId: joi.number().required(),
    gameId: joi.number().required(),
    daysRented: joi.number().required().min(1)
});


const newRent = async (req,res)=>{
    const validation = newRentalSchema.validate(req.body);
    if(validation.error){
        return res.sendStatus(400);
    };


    const {customerId, gameId, daysRented } = req.body;
    const returnDate = null; 
    const delayFee = null;
    const rentDate = dayjs().format('YYYY-MM-DD');

    try {

        const hasCustomer = await connection.query(`
        SELECT
            *
        FROM
            customers
        WHERE
            id=$1
        ;`, [customerId]);

        if(hasCustomer.rows.length ===0){
            return res.sendStatus(400);
        }

        const hasGame = await connection.query(`
        SELECT
            *
        FROM
            games
        WHERE
            id=$1
        ;`, [gameId]);
        if(hasGame.rows.length ===0){
            return res.sendStatus(400);
        }
        

        const dayPrice = await connection.query(`
        SELECT
            "pricePerDay"
        FROM
            games
        WHERE
            id =$1
        LIMIT
            1
        ;`, [gameId]);

        const originalPrice = dayPrice.rows[0].pricePerDay * daysRented;

        const query = await connection.query(`
        INSERT INTO
            rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES
            ($1, $2, '$3', $4, $5, $6, $7)
        ;`,[customerId, gameId, `${rentDate}`, daysRented, returnDate, originalPrice, delayFee]);
        
        res.sendStatus(201);

    } catch (err) {
        res.send(err);
    }

};

const getRentals = async (req,res) =>{
    const customerId = req.query.customerId;
    const gameId = req.query.gameId;

    try {
        const rentals = await connection.query(`
        SELECT
            rentals.*,
            customers.name 
                AS
                    "customerName",
            games.name
                AS
                    "gameName",
            games."categoryId",
            categories.name
                AS
                    "categoryName"
            
        FROM
            rentals
        JOIN
            customers
                ON
                rentals."customerId" = customers.id
        JOIN
            games
                ON
                rentals."gameId" = games.id
        JOIN
            categories
                ON
                games."categoryId" = categories.id
        ${(customerId||gameId)?'WHERE':''}
        ${customerId?`rentals."customerId"=$1`:''}
        ${gameId?` rentals."gameId"=$2`:''}
        ;`,[customerId,gameId]);
        console.log(rentals.rows);

        const allRentals = [];

        rentals.rows.map((r)=>{
            const rent = {
                id: r.id,
                customerId: r.customerId,
                gameId: r.gameId,
                rentDate: r.rentDate,
                daysRented: r.daysRented,
                returnDate: r.returnDate,
                originalPrice: r.originalPrice,
                delayFee: r.delayFee,
                customer: {
                 id: r.customerId,
                 name: r.customerName
                },
                game: {
                  id: r.gameId,
                  name: r.gameName,
                  categoryId: r.categoryId,
                  categoryName: r.categoryName
                }
              };
            allRentals.push(rent);
        });
        console.log(allRentals)
        res.send(allRentals);
        

        
    } catch (error) {
        res.send(error);
    }
};

const returnRental = async (req,res)=>{
    const id = req.params.id;
    const returnDate = dayjs().format('YYYY-MM-DD');
    
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

        if(!getId.rows){
            return res.sendStatus(404);
        };

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

        if(returned.rows[0]){
            return res.sendStatus(400);
        };

        const rentalinfo = await connection.query(`
        SELECT
        "rentDate", "daysRented", "originalPrice"
        FROM
            rentals
        WHERE
            id= $1
        LIMIT
            1
        ;`,[id]);
        const rentDate = dayjs(rentalinfo.rows[0].rentDate);
        const diff = rentDate.diff(returnDate ,'day',true);


        const extradays = rentalinfo.rows[0].daysRented + diff;

        const delayFee = 0;
        if(extradays<0){
            delayFee = (rentalinfo.rows[0].originalPrice/rentalinfo.rows[0].daysRented) *(extradays*-1);
        };


        const query = await connection.query(`
        UPDATE
            rentals
        SET
            "delayFee" = $1,
            "returnDate" = $2
        WHERE
            id = $3
        ;`,[delayFee,`${returnDate}`,id]);
        console.log(diff);

        res.sendStatus(200);
        
    } catch (error) {
        console.log(error)
        res.send(error);
    };


};
const deletRent = async(req,res)=>{
    const id = req.params.id;

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

        if(!getId.rows){
            return res.sendStatus(404);
        };

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

        if(returned.rows[0]){
            return res.sendStatus(400);
        };

    try {
        const query = await connection.query(`
        DELETE 
        FROM 
            rentals 
        WHERE 
            id = $1
        ;
        `,[id])
        
    } catch (error) {
        res.send(error);
    }
}
export{newRent,getRentals,returnRental,deletRent};