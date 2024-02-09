import { useState } from "react";
import styled from "styled-components";
import bgMint from "assets/images/bg-stake.png";
import Logo from "components/core/Logo";
import Wallet from "components/core/Wallet";
import Statistic from "components/footer/Statistic";
import StakeMain from "./StakeMain";
import Leaderboard from "./Leaderboard";

const Stake = () => {
    const [showBoard, setShowBoard] = useState(false);


    return (
        <Wrap className="">
            <div className="wrap-home relative">
                {showBoard ? <Leaderboard onShowMain={() => { setShowBoard(false) }} /> : <StakeMain onShowBoard={() => { setShowBoard(true) }} />}
                <Logo />
                <Wallet />
                <Statistic />
            </div>
        </Wrap>
    )
}

export default Stake

const Wrap = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
    align-items: center;
    min-height: 100vh;
    padding: 36px 108px;
    z-index: 1;
    position: relative;
    &::before {
        position: absolute;
        width: 100%;
        height: 100%;
        content: "";
        background-color: #00000074;
        z-index: 0;
        top: 0;
        left: 0;
    }
    .wrap-home {
        background-image: url(${bgMint});
        background-size: 100% 100%;
        background-position: center;
        width: 100%;
        height: 100%;
        display: flex;
        min-height: 100% !important;
        padding: 158px 90px 102px 128px;
        align-items: center;
        justify-content: center;
        z-index: 1;
        position: relative;
    }
`