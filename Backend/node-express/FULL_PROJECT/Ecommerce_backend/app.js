require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

// rest of the packages
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const xss = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimiter = require("express-rate-limit");

// database
const connectDB = require("./db/connect");

// router
const AuthRouter = require("./routes/authRoutes");
const UserRouter = require("./routes/userRoutes");
const ProductRouter = require("./routes/productRoutes");
const ReviewRouter = require("./routes/reviewRoutes");
const OrderRouter = require("./routes/orderRoutes");
//middlewares
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");

app.set("trust proxy", 1);


app.use(cors());
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60
}));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(express.static("./public"));
app.use(fileUpload());

app.get("/", (req, res)=> {
    res.send('<h1 style="text-align: center">Ecommerce</h1>')
});

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/products", ProductRouter);
app.use("/api/v1/reviews", ReviewRouter);
app.use("/api/v1/orders", OrderRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;


const start = async()=> {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=> {
            console.log(`server is listening to port ${port}`);
        })
    } catch(error){

    }
}
start();