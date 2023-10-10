import express from 'express';
import morgan from 'morgan'
import routerApi from "./routes/index.js" 
import cookieParser from 'cookie-parser';


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

routerApi(app);

export default app;
