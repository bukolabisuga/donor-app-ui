export const checkCurrency = (currency, amount) => {
    if(currency === "btc") return convertToBtc(amount);
    else if(currency === "euro") return convertToEuro(amount);
}

export const getProjectedDonation = (frequency, amount) => {
    if(frequency === "yearly") return amount * 12;
    return amount;
}

export const convertToBtc = (amount) => {
    fetch(`https://web-api.coinmarketcap.com/v1/tools/price-conversion?amount=${amount}&convert_id=2781&id=2790`)
    .then(res => console.log('res', res))
    .catch(err => console.log("err", err))
    return amount * 400;
}

export const convertToEuro = (amount) => {
    fetch(`https://web-api.coinmarketcap.com/v1/tools/price-conversion?amount=${amount}&convert_id=2781&id=1`)
    .then(res => console.log('res', res))
    .catch(err => console.log("err", err))
    return amount * 10;
}
