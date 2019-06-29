export const displayCardNumber = (onlyShowLastNumber, cardNumber) => {
  if (onlyShowLastNumber) {
    const last4Digits = cardNumber.slice(-4);
    const maskedNumber = last4Digits.padStart(cardNumber.length, '•');

    return maskedNumber.match(/.{1,4}/g);
  }

  return cardNumber ? cardNumber.match(/.{1,4}/g) : [];
}
