require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();


const fileUpload = require("express-fileupload");
// cloudinary / use v2 compulsory
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})
// connect db
const connectDB = require("./database/connect");

// product router
const productRouter = require("./routes/productRoutes");

//error handler middlewares
const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");

app.use(express.static("./public"));
app.use(express.json());
app.use(fileUpload({useTempFiles:true}));

app.get("/", (req,res)=> {
    res.send("file upload api");
});

app.use("/api/v1/products", productRouter);


// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=> {
            console.log(`server is listening to port ${port}`);
        })
    } catch (error){
        console.log(error);
    }
}
start();