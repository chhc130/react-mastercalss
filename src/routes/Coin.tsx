import {BrowserRouter, Route, Routes, useLocation, useParams, useMatch, Link, Outlet} from "react-router-dom";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {QueryClientProvider, useQuery} from "react-query";
import { Helmet } from "react-helmet";
import {fetchCoinInfo, fetchCoins, fetchCoinTickers} from "../api";


const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  flex: 4;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const BackButton = styled.button`
    flex: 1;
`
const Span = styled.span`
    flex: 1;
`

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
   display: grid;
   grid-template-columns: repeat(2, 1fr);
   margin: 25px 0px;
   gap: 10px;
 `;

const Tab = styled.span<{ isActive: boolean }>`
   text-align: center;
   text-transform: uppercase;
   font-size: 12px;
   font-weight: 400;
   background-color: rgba(0, 0, 0, 0.5);
   padding: 7px 0px;
   border-radius: 10px;
   color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
   a {
     display: block;
   }
 `;

interface RouteParams {
    coinId: string;
}

interface IInfo {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}
interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: string;
    price_usd: number;
    price_btc: number;
    volume_24h_usd: number;
    market_cap_usd: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    percent_change_1h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    last_updated: string;
}

interface RouteState {
    state : {
        name: string;
    }
}

const Coin = () => {
    const { coinId } = useParams();
    const { state } = useLocation() as unknown as RouteState;
    const { isLoading : tickersLoading, data : tickersData }  = useQuery<PriceData>(
        ['tickers', coinId],
        () => fetchCoinTickers(coinId),
        {
            refetchInterval : 5000
        }
    );
    const priceMatch = useMatch('/:coinId/price');
    const chartMatch = useMatch('/:coinId/chart');
    const { isLoading : infoLoading, data: infoData } = useQuery<IInfo>(
        ['info', coinId],
        () => fetchCoinInfo(coinId)
    );

    const loading = infoLoading || tickersLoading;
    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </title>
            </Helmet>
            <Header>
                <Link to={`/react-mastercalss`}>
                    <BackButton>Back</BackButton>
                </Link>

                <Title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </Title>
                <Span></Span>
            </Header>
            {loading ? <Loader>Loading....</Loader> :
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>${tickersData?.price_usd}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{ infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link
                                to={`/${coinId}/price`}
                                state={{
                                    price_usd : tickersData?.price_usd,
                                    price_btc: tickersData?.price_btc,
                                    volume_24h_usd: tickersData?.volume_24h_usd,
                                    market_cap_usd: tickersData?.market_cap_usd,
                                    circulating_supply: tickersData?.circulating_supply,
                                    total_supply: tickersData?.total_supply,
                                    max_supply: tickersData?.max_supply,
                                    percent_change_1h: tickersData?.percent_change_1h,
                                    percent_change_24h: tickersData?.percent_change_24h,
                                    percent_change_7d: tickersData?.percent_change_7d,
                                }}
                            >Price</Link>
                        </Tab>
                    </Tabs>
                    <Outlet />
                </>
            }
        </Container>
    )
}

export default Coin;