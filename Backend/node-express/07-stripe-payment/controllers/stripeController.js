const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripeController = async (req, res) => {
    console.log(req.body);
    const {purchase, total_amount, shipping_fee} = req.body;
    const calculateOrderAmount = () => {
        // verifying price from the database but here we dont have so lets do some child stuff for now
        return total_amount + shipping_fee
    
    }
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
    })
    res.json({clientSecret: paymentIntent.client_secret});
}

module.exports = stripeController;