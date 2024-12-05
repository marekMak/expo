import React from 'react';

const PriceDisplay = ({ price }) => {
  const formattedPrice = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);

  return <>{formattedPrice}</>;
};

export default PriceDisplay;
