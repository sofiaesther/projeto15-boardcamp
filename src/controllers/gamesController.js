import connection from "../db/database.js";

const getGames = async (req,res)=> {
    console.log('passou aqui');
    const startsWith = req.query.name;
    console.log('passou aqui');
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
    onsole.log('to aqui5')
    const {name,image,stockTotal,categoryId,pricePerDay} = req.body;

    const newgame = `"${name}","${image}",${stockTotal},${categoryId},${pricePerDay}`;
    try{
        const query = await connection.query(`
        INSERT INTO
            games (name,image,stockTotal,categoryId,pricePerDay)
        VALUES
            ($[1])
        ;
        `,[newgame]);

    }catch(err){
        console.log('to aqui')
        res.send(err);
    }
};

export{getGames,postGame};