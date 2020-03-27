# Stripe PaymentIntents

This is an application that uses Stripe PaymentIntents to let a user make a one-time purchase.

## System dependencies
```bash
$ brew install node  # if "node -v" command not found
$ brew install yarn  # if "yarn -v" command not found
$ brew install stripe/stripe-cli/stripe  # if "stripe" command not found
```

## Set up
```bash
$ echo REACT_APP_STRIPE_PK=<your stripe publishable key at https://dashboard.stripe.com/apikeys> > .env
$ echo STRIPE_SK=<your stripe secret key at https://dashboard.stripe.com/apikeys> > server/.env
$ yarn install
```

## Run and monitor
```bash
$ yarn dev  # this will run both the client (on port 3000) and server (on port 5000)
```

```bash
$ stripe login
$ stripe listen --forward-to http://localhost:5000/webhook  # forward webhooks from Stripe
```

```bash
$ tail -f server/successful_payments.log  # watch successful payments log
```
