import connection from "../db/database.js";

const getGames = async (req,res)=> {
    const startsWith = req.query.name;
    try{
        const games = await connection.query(`
        SELECT 
            *
        FROM
            games
        WHERE
            (lower(name) LIKE '${startsWith}%' )
        ;
        `);

        res.send(games.rows);

    }catch(err){
        console.log('to aqui2')
        res.send(err);
    };

};
const postGame = async (req,res) => {
    const {name,image,stockTotal,categoryId,pricePerDay} = req.body;
    try{
        const query = await connection.query(`
        INSERT INTO
            games (name, image , "stockTotal" , "categoryId" , "pricePerDay" )
        VALUES
           ('${name}', '${image}', ${stockTotal}, ${categoryId}, ${pricePerDay})
        ;
        `);

        res.sendStatus(201);

    }catch(err){
        res.send(err);
    }
};

export{getGames,postGame};