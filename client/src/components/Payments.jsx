import React from "react";
import StripeCheckout from "react-stripe-checkout";

export const Payments = () => {
  return (
    <StripeCheckout
      amount={500}
      token={(token) => console.log(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    />
  );
};
