import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import ApexChart from 'react-apexcharts';

interface IHistorical {
    time_open: string;
    time_close: string;
    close: number;
    high: number;
    low: number;
    market_cap: number;
    open: number;
    volume: number;
}

const Chart = () => {
    const { coinId } = useParams();
    const { isLoading, data } = useQuery<IHistorical[]>(
        ['ohlcv', coinId],
        () => fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
    )
    /*time_open: "2022-06-09T00:00:00Z"
    time_close: "2022-06-09T23:59:59Z"
    open: 30237.73744737871
    high: 30622.970089757222
    low: 30043.419812899345
    close: 30108.44093713553
    volume: 22655809291
    market_cap: 573963050622*/
    const arr = data?.map((price) => {
        return {
            x: new Date(price.time_open),
            y: [price.open, price.high, price.low, price.close]
        }
    });
    console.log(arr)

    return(
        <div>
            {isLoading ? (
                'Loading...'
            ) : (
                <ApexChart
                    type='candlestick'
                    series={[
                        {
                            data: arr as {x: any; y: any;}[]
                        },
                    ]}
                    options={{
                        theme: {
                            mode: "dark",
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        grid: { show: false },
                        title: {
                            text: 'CandleStick Chart',
                            align: 'left'
                        },
                        xaxis: {
                            type: 'datetime',
                            axisBorder: { show: false },
                            axisTicks: { show: false },
                            labels: { show: false },
                        },
                        yaxis: {
                            tooltip: {
                                enabled: true
                            },
                            show: false,
                        },
                    }}
                ></ApexChart>
            )}
        </div>
    )
}

export default Chart