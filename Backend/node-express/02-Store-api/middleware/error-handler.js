const errorHandlerMiddleware = (error, req, res, next) => {
    console.log(error);
    return res.status(500).json({message: "something went wrong, please try again later"});
}

module.exports = errorHandlerMiddleware;