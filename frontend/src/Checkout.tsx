import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Stripe, StripeConstructorOptions } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutPageProps {
  stripePromise: Promise<Stripe | null>;
  valor: number,
  userID: number
}

function CheckoutForm({ valor,userID }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {error:submitEror} = await elements.submit();
    if (submitEror) {
      console.log(submitEror.message)
      setLoading(false)
      return
    }
    

    const res = await fetch("http://localhost:3000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        amount: Math.round(valor * 100),
        userId: userID
       }),
    });

    const { clientSecret } = await res.json();

    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:5173/sucesso",
      },
    });

    if (result.error) {
      console.log(result.error.message);
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
  userID
}: CheckoutPageProps) {
  return (
    <Elements
      stripe={stripePromise}
      options={{ 
        mode: "payment",
        currency: "brl",
        amount: Math.round(valor * 100),
        appearance: { theme: "stripe" },
        locale: "pt",
      }}
    >
      <CheckoutForm userID={userID} valor={valor} />
    </Elements>
  );
}
