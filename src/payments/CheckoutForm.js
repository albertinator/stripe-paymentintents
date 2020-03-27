import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './CardSection';

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) { return }

    // TODO: use actual client secret
    const result = await stripe.confirmCardPayment('{CLIENT_SECRET}', {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { email, name },
      },
    })

    if (result.error) {
      setErrorMsg(result.error.message)
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        setErrorMsg('')
        setSuccess(true)
      }
    }
  }

  return (
    success ?
    <div className="text-center">
      <div class="alert alert-success text-left" role="alert">
        You've successfully contributed $10 to Allan's campaign!
      </div>
    </div> :
    <form className="text-center" onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="email"
        name="email"
        placeholder="Your e-mail address"
        autoFocus={true}
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <div className="mb-2"></div>

      <input
        className="form-control"
        type="text"
        name="name"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <div className="mb-4"></div>

      <CardSection />
      <div className="mb-4"></div>
      {
        errorMsg ?
        <div class="alert alert-danger text-left" role="alert">
          {errorMsg}
        </div> : ''
      }
      <div className="mb-4"></div>

      <button
        className="btn btn-primary"
        disabled={!stripe}
      >Contribute $10</button>

    </form>
  )
}

export default CheckoutForm;
