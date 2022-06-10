const BASE_URL = 'https://api.coinpaprika.com/v1';

export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then(response => {
        return response.json();
    })
}

export function fetchCoinInfo(coinId: string | undefined) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then(response => {
        return response.json();
    })
}

export function fetchCoinTickers(coinId: string | undefined) {
    return fetch(`${BASE_URL}/ticker/${coinId}`).then(response => {
        return response.json();
    })
}

export function fetchCoinHistory(coinId: string | undefined) {
    const endDate = Math.floor(Date.now()/1000);
    const startDate = endDate - 60*60*24*6;
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?end=${endDate}&start=${startDate}`).then(response => {
        return response.json();
    })
}

