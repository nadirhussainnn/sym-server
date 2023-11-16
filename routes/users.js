import express from 'express'
import { getUser, getUserFriends, addRemoveFrinds} from '../controller/users.js'
const router = express.Router();
import verifyToken from '../middleware/auth.js'

// get the user
router.get('/:id',verifyToken, getUser)
//get user friends data
router.get('/:id/friends',verifyToken, getUserFriends)

//update
router.patch('/:id/:friendId',verifyToken, addRemoveFrinds)

export default router;