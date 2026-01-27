import express from "express";
import Stripe from "stripe";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

app.post("/webhook", express.raw({type: "application/json"}), async (req, res) => {
  console.log("🚀 ¡PETICIÓN RECIBIDA EN EL WEBHOOK!")
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send("webhook error");
  }
  if (event.type === "payment_intent.succeeded") {
    console.log("Pagamento confirmado!");
    const paymentIntent = event.data.object;
    const pedidoId = paymentIntent.metadata?.pedido_id;
    if (pedidoId) {
      const { data, error } = await supabase
        .from("pedidos")
        .update({ status: "aprovado" })
        .eq("id", parseInt(pedidoId));
      

      if (error) {
        console.log("Erro ao atualizar status do pedido:", error);
      } else {
        console.log("Pedido atualizado com sucesso:", data);
      }
    }
  }

  res.json({ received: true });
});


app.use(express.json());

app.post("/pedidos/create", async(req, res)=>{
  const { amount, userId, itens } = req.body;

   if (!amount || amount < 1) {
      res.status(400).json({ error: "Monto invalido!" });
    }

    if (!itens || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ error: "Itens do pedido inválidos" });
    }

  try{
    const { data: pedido, error: pedidoError } = await supabase
      .from("pedidos")
      .insert([
        {
          user_id: userId,
          status: "pendente",
          total_pedido: amount / 100,
        },
      ])
      .select()
      .single();

    if (pedidoError) throw pedidoError


    const itensDoPedidoInsert = itens.map((item) => ({
      pedido_id: pedido.id,
      perfume_id: item.produto_id,
      quantidade: item.quantidade,
      preco: item.preco,
    }));
    const { error: itensError } = await supabase
      .from("itens_pedidos")
      .insert(itensDoPedidoInsert);

    if (itensError) throw itensError

    return res.json({pedidoID: pedido.id})
  } catch (error) {
    console.log("Erro Supabase:", error);
    res.status(500).json({ error: error.message });
  }
})

app.post("/create-payment-intent", async (req, res) => {
  const {pedidoId} = req.body;

  if (!pedidoId) {
    return res.status(400).json({ error: "pedidoId é obrigatório" });
  }

  try {

    const { data: pedido, error } = await supabase
      .from("pedidos")
      .select("id, total_pedido")
      .eq("id", pedidoId)
      .single();

      if (error || !pedido) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(pedido.total_pedido *100),
      currency: "brl",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: { pedido_id: pedido.id.toString() },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log("Erro Stripe:", error);
    res.status(500).json({ error: error.message });
  }
});



app.post("/user/cadastro", async (req, res) => {
  const { name, email, senha } = req.body;
  const emailNormalizado = email.trim().toLowerCase();

  if (!emailNormalizado || !senha || !name) {
    return res.status(400).json({
      error: "Dados obrigatorios",
    });
  }
  const senhaHash = await bcrypt.hash(senha, 10);
  const { error } = await supabase
    .from("usuarios")
    .insert([{ name, email: emailNormalizado, senha_hash: senhaHash }]);
  if (error) {
    return res.status(500).json({ error: "Erro ao cadastrar" });
  }
  console.log("Email Recebido!", emailNormalizado);
  res.status(200).json({
    message: "Success!",
  });
});

app.post("/user/login", async (req, res) => {
  const { email, senha } = req.body;
  const emailNormalizado = email.trim().toLowerCase();
  if (!emailNormalizado || !senha) {
    return res.status(400).json({
      error: "Dados obrigatorios",
    });
  }
  const { data, error } = await supabase
    .from("usuarios")
    .select()
    .eq("email", emailNormalizado)
    .single();
  if (error || !data) {
    return res.status(400).json({
      error: "Email ou senha errados!",
    });
  }

  const senhaCorreta = await bcrypt.compare(senha, data.senha_hash);
  if (!senhaCorreta) {
    return res.status(401).json({
      error: "Email ou senha errados!",
    });
  }
  console.log(data.id);
  res.status(200).json({
    message: "Login realizado com sucesso",
    userID: data.id,
  });
});

app.get("/ping", (req, res) => {
  console.log("ping");
  res.send("pong");
});

app.listen(3000, () => {
  console.log("servidor funcionando");
});
