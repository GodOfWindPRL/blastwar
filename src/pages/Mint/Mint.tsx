import { useEffect, useState } from "react";
import styled from "styled-components";
import bgMint from "assets/images/bg-mint.png";
import Logo from "components/core/Logo";
import Wallet from "components/core/Wallet";
import Footer from "components/footer/Footer";
import MintBid from "./MintBid";
import MintBuy from "./MintBuy";
import { breakpointsMedias } from "constants/breakpoints";

const Mint = () => {
    const [stage, setStage] = useState<"bid" | "mint">("bid");

    useEffect(() => {
        setTimeout(() => {
            setStage("mint")
        }, 5000)
    }, [])

    return (
        <Wrap className="">
            <div className="wrap-home relative">
                {stage === "bid" ? <MintBid /> : <MintBuy />}
                <Logo />
                <Wallet />
                {<Footer />}
            </div>
        </Wrap>
    )
}

export default Mint

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
        padding: 190px 40px 190px 100px;
        align-items: center;
        justify-content: center;
        z-index: 1;
        position: relative;
    }
    ${breakpointsMedias.max1599} {
        padding: 36px 78px;
        .wrap-home {
            padding: 200px 40px 190px 70px;
        }
    }
    ${breakpointsMedias.max1199} {
        padding: 36px;
        .wrap-home {
            padding: 200px 40px 170px 50px;
        }
    }
    ${breakpointsMedias.max991} {
        padding: 40px 20px;
        z-index: 1;
        position: relative;
        height: fit-content;
        .footer {
            display: none;
        }
        .wrap-home {
            background-image: none;
            padding: 0;
            max-width: 600px;
            margin: auto;
        }
    }
`