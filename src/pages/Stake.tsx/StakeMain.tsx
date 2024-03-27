import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Title from "components/core/Title";
import { useEffect, useMemo, useState } from "react";
import numeral from "numeral";
import ListStaking from "./ListStaking";
import ListNonStaking from "./ListNonStaking";
import { breakpointsMedias } from "constants/breakpoints";
import { useAccount } from "wagmi";
import { notifyToastify } from "helpers/notifyToastify";
import useClaimReward from "helpers/contracts/useClaimReward";
import BigNumber from "bignumber.js";
import Button from "components/core/Button";
import { CONTRACT_NFT } from "environments";
import useStaking from "helpers/contracts/useStaking";
import { BLAST_CHAIN, chains } from "constants/chains";
import { formatListStaking } from "helpers/formatList";

interface ISM {
    onShowBoard: () => void,
    listStaking: bigint[]
}

type ListNon = number[]
type DataStake = {
    earnPerDay: number | null,
    tokenStealed: number | null,
    humanStealed: number | null,
}

const StakeMain = ({ onShowBoard, listStaking }: ISM) => {
    const { t } = useTranslation();
    const { address, isConnected } = useAccount()
    const [tab, setTab] = useState<"nonStaking" | "staking">("staking");

    const { earnedHuman, earnedMonster, onClaimReward, isLoadingClaimReward } = useClaimReward();
    const [listNonStake, setListNonStake] = useState<ListNon>([])

    const [data, setData] = useState<DataStake>({
        earnPerDay: null,
        tokenStealed: null,
        humanStealed: null,
    })

    const getNonStake = async () => {
        try {
            const dataFetch = await fetch(`https://api.routescan.io/v2/network/${BLAST_CHAIN}/evm/${chains[0].id}/address/${address}/erc721-holdings`);
            const newList = await dataFetch.json();
            const newListBlast = newList.items.filter((item: any) => {
                return item.tokenAddress === CONTRACT_NFT
            })
            setListNonStake(newListBlast.map((item: any) => Number(item.tokenId)))
        } catch (error) {
            notifyToastify("error", "Get data NFT error.")
        }
    }

    useEffect(() => {
        if (address && isConnected) {
            getNonStake()
        }
    }, [address, isConnected, tab])

    return (
        <Wrap className="">
            <div className="stake-left">
                <div className="sl-wrap">
                    <Title classText="text-4 uppercase" text={t("stakingStats")} borderLeft borderRight />
                    <div className="sl-table scrollbar overflow-auto">
                        <div className="slt-row">
                            <div className="slt-col-1">
                                <span className="text-2 color-green">$WARS {t("earnPerDay")}</span>
                            </div>
                            <div className="slt-col-2">
                                <span className="uppercase text-22 color-green">{data.earnPerDay === null ? "--" : numeral(data.earnPerDay).format("0,0.[00]")}  <span className="uppercase text-2 color-green">$WARS</span></span>
                            </div>
                        </div>
                        <div className="slt-row">
                            <div className="slt-col-1">
                                <span className="text-2 color-green">{t("yourWarEarned")}</span>
                            </div>
                            <div className="slt-col-2">
                                <span className="uppercase text-22 color-green">{numeral(BigNumber((earnedHuman + earnedMonster).toString()).dividedBy(1e18).toString(10)).format("0,0.[00]")}  <span className="uppercase text-2 color-green">$WARS</span></span>
                            </div>
                        </div>
                        <div className="slt-row">
                            <div className="slt-col-1">
                                <span className="text-2 color-green">$WARS {t("stealed")}</span>
                            </div>
                            <div className="slt-col-2">
                                <span className="uppercase text-22 color-green">{data.tokenStealed === null ? "--" : numeral(data.tokenStealed).format("0,0.[00]")}  <span className="uppercase text-2 color-green">$WARS</span></span>
                            </div>
                        </div>
                        <div className="slt-row">
                            <div className="slt-col-1">
                                <span className="text-2 color-green">{t("humanStealed")}</span>
                            </div>
                            <div className="slt-col-2">
                                <span className="uppercase text-22 color-green">{data.humanStealed === null ? "--" : numeral(data.humanStealed).format("0,0.[00]")}  <span className="uppercase text-2 color-green">$WARS</span></span>
                            </div>
                        </div>
                        <div className="slt-row">
                            <div className="slt-col-1">
                                <span className="text-2 color-green">{t("nftStaked")}</span>
                            </div>
                            <div className="slt-col-2">
                                <span className="uppercase text-22 color-green">{numeral(listStaking.length).format("0,0.[00]")}</span>
                            </div>
                        </div>
                        <div className="slt-row">
                            <div className="slt-col-1">
                                <span className="text-2 color-green">{t("nonStake")}</span>
                            </div>
                            <div className="slt-col-2">
                                <span className="uppercase text-22 color-green">{numeral(listNonStake.length).format("0,0.[00]")}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    typeBt="yellow"
                    text="Claim Reward"
                    onClick={onClaimReward}
                    isLoading={isLoadingClaimReward}
                    disabled={(earnedHuman + earnedMonster) === 0n}
                    className="max-w-[220px] mx-auto"
                />
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
                    {/* <span className="text-3 color-yellow uppercase" onClick={onShowBoard}>{t("leaderboard")}</span> */}
                </div>
                <div className={`sr-list`}>
                    {tab === "staking" ? <ListStaking data={formatListStaking(listStaking)} /> : <ListNonStaking data={listNonStake} reload={getNonStake} />}
                </div>
                <div className={`sr-list-2`}>
                    <ListStaking data={formatListStaking(listStaking)} />
                    <ListNonStaking data={listNonStake} reload={getNonStake} />
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
            max-height: calc(100% - 50px);
            height: fit-content;
            width: 30%;
            min-width: 400px;
            overflow: hidden;
            flex-direction: column;
            margin-bottom: 40px;
            ${breakpointsMedias.max1199} {
                margin-bottom: 20px;
            }
            .sl-wrap {
                display: flex;
                height: fit-content;
                width: 100%;
                overflow: hidden;
                flex-direction: column;
                background: rgba(0, 255, 163, 0.2);
                margin-bottom: 20px;
            }
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
                padding-bottom: 70px;
                ${breakpointsMedias.max1199} {
                    padding-bottom: 40px;
                }
                ${breakpointsMedias.max991} {
                    padding-bottom: 0px;
                }
            }
            .sr-list-2 {
                display: none;
            }
        }
    ${breakpointsMedias.max1599} {
        .stake-left {
            min-width: 360px;
        }
    }
    ${breakpointsMedias.max991} {
        gap: 30px;
        flex-direction: column-reverse;
        /* max-width: 600px; */
        padding-bottom: 20px;
        .stake-left {
            width: 100%;
            min-width: unset;
            max-width: 600px;
            margin-bottom: 10px;
            .sl-table {
                height: fit-content;
                overflow: hidden;
            }
        }
        .stake-right {
            flex: unset;
            display: flex;
            height: 600px;
            width: 100%;
            max-width: 600px;
            flex-direction: column;
            margin-top: 130px;
        }
    }
    ${breakpointsMedias.max490} {
        .stake-right {
            height: fit-content;
            .sr-tabs {
                display: none;
            }
            .sr-list {
                display: none;
            }
            .sr-list-2 {
                display: flex;
                flex-direction: column;
                gap: 60px;
            }
        }
    }
`