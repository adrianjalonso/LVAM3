import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv"

dotenv.config();

const app = express()
app.use(express.json())
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.post("/create-payment-intent", async (req, res) => {
  try {
    const {amount} = req.body

    if(!amount|| amount < 1){
      res.status(400).json({error: "Monto invalido!"})
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "brl",
      automatic_payment_methods:{
        enabled: true
      }

    })
    res.json({clientSecret: paymentIntent.client_secret})
  } catch (error) {
    console.log("Erro Stripe:", error)
    res.status(500).json({error: error.message});
  }
})

app.listen(3000, () => {
  console.log( "servidor funcionando")
})
