const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({});
    const total = products.length;
    res.status(200).json({
        total,
        products
    });
}

const getAllProducts = async (req, res) => {

    const {featured, name, company, sort, fields, numericFilters} = req.query;
    const queryObj = {};

    if(featured){
        queryObj.featured = featured === 'true' ? true: false;
    }
    if(company){
        queryObj.company = company;
    }
    if(name){
       queryObj.name = {$regex: name, $options: "i"}; 
    }
    if(numericFilters){
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
          };
          const regex = /\b(<|>|>=|=|<|<=)\b/g;
          let filters = numericFilters.replace(
            regex,
            (match) => `-${operatorMap[match]}-`
          );
            const options = ["price", "rating"];
            filters = filters.split(",").forEach((item)=>{
                const [field, operator, value] = item.split("-");
                if(options.includes(field)){
                    queryObj[field] = {[operator]:Number(value)}
                }
            })
    }

    console.log(queryObj);
    let result = Product.find(queryObj);
    
    if(sort){
        const sortList = sort.replaceAll(",", " ");
        result = result.sort(sortList);
    } else{
        result = result.sort("createdAt");
    }
    if(fields){
        const fieldsList = fields.replaceAll(",", " ");
        result = result.select(fieldsList);
    }
    const page = Number(req.query.page)  || 1;
    const limit = Number(req.query.limit)|| 10;
    const skip = (page -1) * limit;
    result = result.skip(skip).limit(limit);
    const products = await result;
    const total = products.length
    res.status(200).json({
        total,
        // nextPage: "kera",
        products 
    });
}

module.exports = {
    getAllProducts, 
    getAllProductsStatic
}