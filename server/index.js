const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SK);

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send({
    backendName: 'stripe-paymentintents',
    status: 'ok',
  })
})

app.post('/declare-payment-intent', async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: 'usd',
    metadata: {integration_check: 'accept_a_payment'},
  })

  res.send({ cs: paymentIntent.client_secret })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
