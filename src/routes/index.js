import express  from "express";
import authRouters from "./auth.routes.js"

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/auth', authRouters);

}

export default routerApi;
