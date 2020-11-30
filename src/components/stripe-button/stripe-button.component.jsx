import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51HtEZ2B9yWXQhmuqmf786lZMPj0vYy7wTk5mmMjJEKDmWpqwYHxQrFFeJVtH1SqvBGCNnRIVhqBHcFmltqk5ktlD00woYD6mI1';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful')
  }

  return(
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton
