import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    float: right;
  }
`;

const CoinsList = styled.ul`
`;

const Coin = styled.li`
  background-color: ${props => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-color: 15px;
  margin-bottom: 10px;
  border: 1px solid white;
  a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a{
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
    text-align: center;
    display: block;
`;


interface ICoin {
    "id": string;
    "name": string;
    "symbol": string;
    "rank": number;
    "is_new": boolean;
    "is_active": boolean;
    "type": string;
}

interface ICoinsProps {}

function Coins({}:ICoinsProps) {
   const isDark = useRecoilValue(isDarkAtom);
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom(prev => !prev);
    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins);
      console.log(toggleDarkAtom)
    return (
        <Container>
          <Helmet>
            <title>코인</title>
          </Helmet>
            <Header>
                <Title>코인</Title>
                <button onClick={toggleDarkAtom}>{isDark ? <MdOutlineDarkMode/> : <MdDarkMode/>}</button>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link to={{
                              pathname: `${coin.id}`,
                              state: {name: coin.name},
                            }}
                            >
                              <Img 
                                src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                              />
                              {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
}

export default Coins;