import express from 'express';
import { get_one_user, user_signin_handler, user_signup_handler } from './user-handler';

const userRouter = express.Router();

userRouter.post('/signup', express.json(), user_signup_handler);
userRouter.post('/signin', express.json(), user_signin_handler);
userRouter.get('/:user_id', get_one_user);
// userRouter.get('/', );
// userRouter.put('/', express.json() );
// userRouter.delete('/', );

export default userRouter;