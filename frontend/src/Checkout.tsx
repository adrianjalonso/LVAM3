import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import * as React from "react";
import { Perfume } from "./types/ComponetsInterface";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export interface CheckoutPageProps {
  stripePromise: Promise<Stripe | null>;
  valor: number,
  userID: number,
  pedidoId: number,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCarrinho:React.Dispatch<React.SetStateAction<Perfume[]>>
}

function CheckoutForm({ valor,userID, pedidoId, setCarrinho,setOpen }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!stripe || !elements) {
  setLoading(false);
  return;
}


    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/sucesso",
      },
      redirect: "if_required"
    });

    if (result.error) {
      console.log(result.error.message);
      setLoading(false)
      return
    } else if(result.paymentIntent?.status === "succeeded"){
      setLoading(false)
      setOpen(false)
      window.location.href = "/sucesso";
      setCarrinho([]);
  localStorage.removeItem("carrinho");
    }
    

    setLoading(false);
  };
  return (
    <div className="flex justify-center items-center">
      <form
        className="w-full content-center text-center h-36"
        onSubmit={handleSubmit}
      >
        <PaymentElement />
        <button
          className="w-36 p-1 mt-5 rounded-lg bg-primary text-white"
          disabled={!stripe || loading}
        >{`Pagar R$${valor.toFixed(2)}`}</button>
      </form>
    </div>
  );
}

export default function CheckoutPage({
  stripePromise,
  valor,
  userID,
  pedidoId,
  setOpen,
  setCarrinho
}: CheckoutPageProps) {

  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pedidoId }),
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
      .catch(err => console.log(err));
  }, [pedidoId]);

  if (!clientSecret) return <div>Carregando pagamento...</div>;

  return (
     
      <Elements
      stripe={stripePromise}
      options={{ 
        clientSecret,
        appearance: { theme: "stripe" },
        locale: "pt",
      }}
    >
      <CheckoutForm setOpen={setOpen} setCarrinho={setCarrinho} pedidoId={pedidoId} userID={userID} valor={valor} />
    </Elements>
  );
}
