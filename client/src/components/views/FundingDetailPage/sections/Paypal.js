import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

function Paypal() {
  const onSuccess = (payment) => {
    console.log('The payment was succeeded!', payment);
  };
  const onCancel = (data) => {
    console.log('The payment was cancelled!', data);
  };
  const onError = (err) => {
    console.log('Error!', err);
  };
  let env = 'sandbox';
  let currency = 'USD';
  let total = 1;
  const client = {
    sandbox:
      'AXJf4Wtemjub4R5CsvHwgPr1qczaIlLp4mwqfymjpVPuyItc8CwgnwQZM57xaaGz8Ekt-bqlAK9kDVzD',
    production: 'YOUR-PRODUCTION-APP-ID',
  };

  return (
    <PaypalExpressBtn
      env={env}
      client={client}
      currency={currency}
      total={total}
      onError={onError}
      onSuccess={onSuccess}
      onCancel={onCancel}
      style={{ size: 'small', shape: 'rect', color: 'blue' }}
    />
  );
}

export default Paypal;
