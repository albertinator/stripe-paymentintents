import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './CardSection';

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) { return }

    // TODO: use actual client secret
    const result = await stripe.confirmCardPayment('{CLIENT_SECRET}', {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',  // TODO: use actual name from input
          // TODO: add email from input
        },
      },
    })

    if (result.error) {
      // TODO: show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // TODO: show a success message to your customer
      }
    }
  }

  return (
    <form className="text-center" onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="email"
        name="email"
        placeholder="Your e-mail address"
        autoFocus={true}
      />
      <div className="mb-2"></div>
      <input
        className="form-control"
        type="text"
        name="name"
        placeholder="Your name"
      />
      <div className="mb-4"></div>
      <CardSection />
      <div className="mb-4"></div>
      <button
        className="btn btn-primary"
        disabled={!stripe}
      >Contribute $10</button>
    </form>
  )
}

export default CheckoutForm;
