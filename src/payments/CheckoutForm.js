import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './CardSection';

function CheckoutForm() {
  const [cs, setCs] = useState('')
  const fetchCs = () => {
    (async () => {
      const response = await fetch('/declare-payment-intent', { method: 'POST' })
      const body = await response.json()
      if (response.status !== 200) throw Error(body.message)
      setCs(body.cs)
    })()
  }
  useEffect(fetchCs, []);

  const stripe = useStripe()
  const elements = useElements()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const disabled = !stripe || submitting

  const handleSubmit = async event => {
    event.preventDefault()

    setSubmitting(true)

    if (!stripe || !elements) { return }

    const result = await stripe.confirmCardPayment(cs, {
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

    setSubmitting(false)
  }

  return (
    success ?
    <div className="text-center">
      <div className="alert alert-success text-left" role="alert">
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
        disabled={disabled}
      />

      <div className="mb-2"></div>

      <input
        className="form-control"
        type="text"
        name="name"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        disabled={disabled}
      />
      <div className="mb-4"></div>

      <CardSection />
      <div className="mb-4"></div>
      {
        errorMsg ?
        <div className="alert alert-danger text-left" role="alert">
          {errorMsg}
        </div> : ''
      }
      <div className="mb-4"></div>

      <button
        className="btn btn-primary"
        disabled={disabled}
      >Contribute $10</button>

    </form>
  )
}

export default CheckoutForm;
