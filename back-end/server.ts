import express from 'express';
import cors from 'cors';
import { connect } from './other_helpers/connect-db';
import userRouter from './users/user-router';
import { ErrorRequestHandler } from 'express';
import { StandardResponseError } from './error_helpers/response_error';
import { jwt_authorization } from './other_helpers/jwt_authorization';
import productRouter from './product/product-router';

const app = express();

connect();

//middleware
app.use(cors());

app.use('/users', userRouter);
app.use('/products', jwt_authorization, productRouter);

//Handler
app.use(StandardResponseError);

//Port
app.listen(4000, () => console.log("Listening on port 4000"));