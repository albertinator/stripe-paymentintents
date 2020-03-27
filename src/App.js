import React from 'react';
// import './App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './payments/CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK)

function App() {
  return (
    <div className="container">
      <div className="mb-6">&nbsp;</div>
      <div className="row">
        <div className="col-md-6">
          <img className="img-fluid" src="/bill.gif" alt="My bill" />
        </div>
        <div className="col-md-6 my-auto">
          <h1>Allan's Electric Bill</h1>
          <p>
            Allan is a contract worker for FCA recently laid off
            during the COVID-19 pandemic.
          </p>
          <p>
            Let's all pitch in $10 to help him with his electric bill this month!
          </p>
          <div className="mb-6">&nbsp;</div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  )
}

export default App;
