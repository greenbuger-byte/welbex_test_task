const express = require('express');
const cors = require('cors');
const infoRouter = require("./routers/info.router");
require('dotenv').config();

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
};
const PORT = process.env.PORT | 5000;
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(infoRouter);

const main = async () => {
    try{
        await app.listen(PORT, () => {
            console.log(`server started on port ${PORT}`);
        });
    }catch(error){
        console.error(error.message)
    }
}

main();