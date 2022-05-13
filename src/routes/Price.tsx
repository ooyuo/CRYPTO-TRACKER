import { useQuery } from "react-query";
import { fetchCoinHistory, fetchCoinTickers } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import { text } from "stream/consumers";

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

interface PriceProps {
    coinId: string;
}

function Price({coinId}: PriceProps) {
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
    )
    let dataArr: { x: string; y: number[]; }[] = [];
    {data?.map((item, idx) => {
        dataArr[idx] = {x: item.time_close, y: [item.open, item.high, item.low, item.close]}
    })}
   console.log(dataArr)
    return (
        
        <div>
            {isLoading ? (
                "Loading price..."
            ) : (
                <ApexChart 
                    type="candlestick"
                    series={[
                        {
                          data: dataArr
                        }
                    ]}
 
                    options={{
                        theme: {
                            mode: isDark ? "dark" : "light",
                        },
                        chart: {
                            type: 'candlestick',
                            height: 350,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        xaxis: {
                            type: 'datetime',
                        },
                        yaxis: {
                            tooltip: {
                                enabled: true,
                            },
                            labels: {
                                formatter: (value) => {return value.toFixed(3)}
                            }
                        },
                    }}
                />
            )}
        </div>
    )
}

export default Price;