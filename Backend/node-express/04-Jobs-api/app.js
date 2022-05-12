require("dotenv").config();
require("express-async-errors");

// extra packages / security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();

// connect database
const connectDB = require("./database/connect");
const authenticationMiddleware = require("./middleware/authentication");

app.set("trust proxy", 1);
app.use(rateLimiter({
    windowMs: 15 *60 *1000, //15 minutes
    max: 100, //limit each ip to 100 requests per windowMs
}));

app.use(express.json());
app.use(helmet())
app.use(cors());
app.use(xss());

// router
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

 // error handler
 const errorHandlerMiddleware = require("./middleware/error-handler");
 const notFoundMiddleware = require("./middleware/not-found");
  

// routes
app.get("/", (req,res)=> {
    res.send("jobs api");
});
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs',authenticationMiddleware ,jobsRouter);



// notfound and errorhandler middleware will be there
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=>{
            console.log(`server is listening to port ${port}...`);
        })
    } catch(error){
        console.log(error);
    }
}
start();
