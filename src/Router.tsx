import {BrowserRouter, Route, Routes} from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import React from "react";
import Price from "./routes/Price";
import Chart from "./routes/Chart";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/react-mastercalss/:coinId/" element={<Coin />}>
                    <Route path={`price`} element={<Price />}></Route>
                    <Route path={`chart`} element={<Chart />}></Route>
                </Route>
                <Route path="/react-mastercalss/" element={<Coins />}></Route>
            </Routes>
            {/*<Routes>
                <Route path="/:coinId/*" element={<Coin/>} />
            </Routes>*/}
        </BrowserRouter>
    )
}

export default Router;