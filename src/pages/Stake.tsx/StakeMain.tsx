import styled from "styled-components";
import imgBox from "assets/images/mint-box.png";
import gifBox from "assets/images/mint.gif";
import iconBox from "assets/images/box.png";
import Button from "components/core/Button";
import { useTranslation } from "react-i18next";
import Title from "components/core/Title";
import configColor from "constants/configColor";
import { useEffect, useState } from "react";
import { subStringAddress } from "helpers/format/subStringAddress";
import numeral from "numeral";
import ListStaking from "./ListStaking";
import ListNonStaking from "./ListNonStaking";

type TopItem = {
    address: string,
    amount: number
}

interface ISM {
    onShowBoard: () => void
}

const StakeMain = ({ onShowBoard }: ISM) => {
    const { t } = useTranslation();
    const [tab, setTab] = useState<"nonStaking" | "staking">("staking")

    const [data, setData] = useState({
        earnPerDay: 435345,
        earned: 7686,
        tokenStealed: 12479,
        humanStealed: 9523,
        staked: 47,
        nonStake: 823
    })

    return (
        <Wrap className="">
            <div className="stake-left">
                <Title classText="text-4 uppercase" text={t("stakingStats")} borderLeft borderRight />
                <div className="sl-table">
                    <div className="slt-row">
                        <div className="slt-col-1">
                            <span className="text-2 color-green">$WAR {t("earnPerDay")}</span>
                        </div>
                        <div className="slt-col-2">
                            <span className="uppercase text-22 color-green">{numeral(data.earnPerDay).format("0,0.[00]")}  <span className="uppercase text-2 color-green">$WAR</span></span>
                        </div>
                    </div>
                    <div className="slt-row">
                        <div className="slt-col-1">
                            <span className="text-2 color-green">{t("yourWarEarned")}</span>
                        </div>
                        <div className="slt-col-2">
                            <span className="uppercase text-22 color-green">{numeral(data.earned).format("0,0.[00]")}  <span className="uppercase text-2 color-green">$WAR</span></span>
                        </div>
                    </div>
                    <div className="slt-row">
                        <div className="slt-col-1">
                            <span className="text-2 color-green">$WAR {t("stealed")}</span>
                        </div>
                        <div className="slt-col-2">
                            <span className="uppercase text-22 color-green">{numeral(data.tokenStealed).format("0,0.[00]")}  <span className="uppercase text-2 color-green">$WAR</span></span>
                        </div>
                    </div>
                    <div className="slt-row">
                        <div className="slt-col-1">
                            <span className="text-2 color-green">{t("humanStealed")}</span>
                        </div>
                        <div className="slt-col-2">
                            <span className="uppercase text-22 color-green">{numeral(data.humanStealed).format("0,0.[00]")}  <span className="uppercase text-2 color-green">$WAR</span></span>
                        </div>
                    </div>
                    <div className="slt-row">
                        <div className="slt-col-1">
                            <span className="text-2 color-green">{t("nftStaked")}</span>
                        </div>
                        <div className="slt-col-2">
                            <span className="uppercase text-22 color-green">{numeral(data.staked).format("0,0.[00]")}</span>
                        </div>
                    </div>
                    <div className="slt-row">
                        <div className="slt-col-1">
                            <span className="text-2 color-green">{t("nonStake")}</span>
                        </div>
                        <div className="slt-col-2">
                            <span className="uppercase text-22 color-green">{numeral(data.nonStake).format("0,0.[00]")}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="stake-right">
                <div className="sr-tabs cursor-pointer">
                    <Title
                        isActive={tab === "staking"}
                        classText="text-4 uppercase"
                        text={t("staking")}
                        borderLeft
                        borderRight
                        onClick={() => { setTab("staking") }}
                    />
                    <Title
                        isActive={tab === "nonStaking"}
                        classText="text-4 uppercase"
                        text={t("nonStaking")}
                        borderLeft
                        borderRight
                        variant="red"
                        onClick={() => { setTab("nonStaking") }}
                    />
                    <span className="text-3 color-yellow uppercase" onClick={onShowBoard}>{t("leaderboard")}</span>
                </div>
                <div className={`sr-list`}>
                    {tab === "staking" ? <ListStaking /> : <ListNonStaking />}
                </div>
            </div>
        </Wrap>
    )
}

export default StakeMain
const Wrap = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
    gap: 30px;
    align-items: center;
        .stake-left {
            display: flex;
            max-height: 100%;
            height: fit-content;
            width: 30%;
            min-width: 400px;
            overflow: hidden;
            flex-direction: column;
            background: rgba(0, 255, 163, 0.2);
            margin-bottom: 30px;
            .sl-table {
                margin-top: 16px;
                height: fit-content;
                width: 100%;
                display: flex;
                flex-direction: column;
                .slt-row {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    height: 53px;
                    .slt-col-1 {
                        width: 50%;
                        border-right: 1px solid rgba(0, 255, 163, 0.2);
                        display: flex;
                        height: 100%;
                        padding: 20px;
                        align-items: center;
                        text-align: left;
                    }
                    .slt-col-2 {
                        width: 50%;
                        padding: 20px;
                        display: flex;
                        > span {
                            text-align: right;
                            margin-left: auto;
                        }
                    }
                    &:nth-child(2n + 1) {
                        background: rgba(4, 43, 21, 0.829);
                    }
                }
            }
        }
        .stake-right {
            flex: 1;
            display: flex;
            height: 100%;
            flex-direction: column;
            .sr-tabs {
                display: flex;
                align-items: center;
                /* width: fit-content; */
                width: 100%;
                > div {
                    width: fit-content;
                }
                > span {
                    margin-left: auto;
                }
            }
            .sr-list {
                position: relative;
                flex: 1;
                overflow: hidden;
            }
        }
`