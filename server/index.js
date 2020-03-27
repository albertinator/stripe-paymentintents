const express = require('express');
const bodyParser = require('body-parser');

const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send({
    backendName: 'stripe-paymentintents',
    status: 'ok',
  });
})

app.listen(port, () => console.log(`Listening on port ${port}`))
