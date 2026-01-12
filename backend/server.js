import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import { createClient } from "@supabase/supabase-js";



dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_KEY)
const app = express()
app.use("/webhook",express.raw({type: "application/json"}))
app.use(express.json())
app.use(cors());




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

app.post("/webhook", (req,res)=>{
  const sig = req.headers["stripe-signature"];

  let event ;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return res.status(400).send("webhook error")
  }

  if (event.type=== "payment_intent.succeeded"){
     console.log("Pagamento confirmado!");
  }
 
  res.json({received: true})
})

app.post("/user/cadastro", async (req,res)=>{
  const {name,email,senha} = req.body
   if(!email||!senha||!name){
    return res.status(400).json({
      error: "Dados obrigatorios"
    })
   }
   const senhaHash = await bcrypt.hash(senha,10)
   const {error} = await supabase.from("usuarios").insert([{name,email,senha_hash: senhaHash}])
   if (error){
    return res.status(500).json({error: "Erro ao cadastrar"});
   }
   console.log("Email Recebido!", email)
   res.status(200).json({
    message: "Success!"
   })
})

app.post("/user/login", async(req,res)=> {
  const {email,senha} = req.body
  if(!email||!senha){
    return res.status(400).json({
      error: "Dados obrigatorios"
    })
  }
  const {data,error} = await supabase.from("usuarios").select().eq("email",email).single()
  if(error||!data){ return res.status(400).json({
    error:  "Email ou senha errados!"
  })}

  const senhaCorreta =  await bcrypt.compare(senha,data.senha_hash) 
  if (!senhaCorreta){
    return res.status(400).json({
      error: "Email ou senha errados!"
    })
  }
  res.status(200).json({
    message: "Login realizado com sucesso"
  })
  
})

app.listen(3000, () => {
  console.log( "servidor funcionando")
})
