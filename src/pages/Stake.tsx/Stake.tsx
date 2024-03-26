import { useState } from "react";
import styled from "styled-components";
import bgMint from "assets/images/bg-stake.png";
import Logo from "components/core/Logo";
import Wallet from "components/core/Wallet";
import Statistic from "components/footer/Statistic";
import StakeMain from "./StakeMain";
import Leaderboard from "./Leaderboard";
import { breakpointsMedias } from "constants/breakpoints";
import useStaking from "helpers/contracts/useStaking";

const Stake = () => {
    const [showBoard, setShowBoard] = useState(false);
    const { listStaking } = useStaking();

    return (
        <Wrap className="">
            <div className="wrap-home relative">
                {showBoard ? <Leaderboard onShowMain={() => { setShowBoard(false) }} /> : <StakeMain onShowBoard={() => { setShowBoard(true) }} listStaking={listStaking} />}
                <Logo />
                <Wallet />
                <Statistic listStaking={listStaking} />
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
    ${breakpointsMedias.max1599} {
        padding: 36px 78px;
        .wrap-home {
            padding: 158px 4.8% 102px 7%;
        }
    }
    ${breakpointsMedias.max1199} {
        padding: 36px;
        .wrap-home {
            padding: 158px 4.8% 142px 7%;
        }
    }
    ${breakpointsMedias.max991} {
        padding: 40px 20px;
        z-index: 1;
        position: relative;
        height: fit-content;
        .statistic {
            position: unset;
        }
        .wrap-home {
            background-image: none;
            padding: 0;
            /* max-width: 600px; */
            margin: auto;
            flex-direction: column;
        }
    }
`