import express from 'express';
import { isValid } from "../middlewares/gamesMiddleware.js";
import { getGames, postGame } from "../controllers/gamesController.js";

const router = express.Router();

router.get('/', getGames);

router.use(isValid);
router.post('/',postGame);

export default router;