import styled from "styled-components";
import imgBox from "assets/images/mint-box.png";
import gifBox from "assets/images/mint.gif";
import iconBox from "assets/images/box.png";
import Button from "components/core/Button";
import { useTranslation } from "react-i18next";
import Title from "components/core/Title";
import configColor from "constants/configColor";
import { useEffect, useMemo, useState } from "react";
import { breakpointsMedias } from "constants/breakpoints";
import useTotalCommited from "helpers/contracts/useTotalCommited";
import useBalanceNative from "helpers/contracts/useBalanceNative";
import useWhitelistEndtime from "helpers/contracts/useWhitelistEndtime";
import useWhitelistCommit, { MINT_PRICE } from "helpers/contracts/useWhitelistCommit";
import { useAccount } from "wagmi";
import BigNumber from "bignumber.js";
import usePublicEndtime from "helpers/contracts/usePublicEndtime";
import usePublicCommit from "helpers/contracts/usePublicCommit";
import useClaim from "helpers/contracts/useClaim";
import { getAirdropPath } from "helpers/utils/get-airdrop-info";
import useCommited from "helpers/contracts/useCommited";
import useClaimed from "helpers/contracts/useClaimed";
import { loadWhitelist } from "helpers/loadWhitelist";
import { whitelist } from "whitelist";

const MAX_SUPPLY = 5000

const MintBid = () => {
    const { t } = useTranslation();
    const { address, isConnected } = useAccount();
    const [path, setPath] = useState<string[]>([]);
    // const [data, setData] = useState<TopItem[]>([]);

    const { totalCommitted } = useTotalCommited();
    const { ended: whitelistEnded, started } = useWhitelistEndtime();
    const { publicEnded } = usePublicEndtime();
    const { wlCommited, plCommited } = useCommited();
    const { isClaimed } = useClaimed();
    const { balance } = useBalanceNative();
    const { onCommit, isLoadingCommit, isSuccess: wlCommitSuccess } = useWhitelistCommit(path);
    const { onCommit: onPublicCommit, isLoadingCommit: isLoadingPublicCommit, isSuccess: plCommitSuccess } = usePublicCommit();
    const { onClaim, isLoadingClaim, isSuccess: isClaimSuccess } = useClaim();
    const isWhitelist = loadWhitelist(whitelist).includes(address || "")

    useEffect(() => {
        if (address && isConnected) {
            getPath();
        }
    }, [address, isConnected]);

    const getPath = async () => {
        let newPath = await getAirdropPath(address) as string[];
        setPath(newPath);
        // console.log(newPath)
    }

    const errBalance = useMemo(() => {
        return balance < BigInt(BigNumber(MINT_PRICE).multipliedBy(1e18).toString(10))
    }, [balance])

    const isCommitted = useMemo(() => {
        if (started) {
            if (!whitelistEnded) {
                return wlCommited || wlCommitSuccess
            }
            if (!publicEnded) {
                return plCommited || plCommitSuccess
            }
            return wlCommited || plCommited
        }
        return false
    }, [wlCommited, plCommited, whitelistEnded, started, publicEnded, wlCommitSuccess, plCommitSuccess])

    const onClickCommit = () => {
        if (!whitelistEnded) {
            onCommit()
        } else if (!publicEnded) {
            onPublicCommit()
        }
    }


    return (
        <Wrap className="">
            <div className="mint-left flex">
                <div className="flex-1 flex ml-img">
                    <img src={imgBox} alt="" className="mli-1" />
                    <img src={gifBox} alt="" className="mli-2" />
                    <div className="mli-light"></div>
                    <img src={iconBox} alt="" className="mli-3" />
                </div>
                <div className="ml-content flex flex-col">
                    <Title className="!w-[fit-content]" classText="text-4 uppercase" text={t("titleBox")} borderLeft />
                    <span className="mlc-text text-2 color-white flex flex-col gap-[6px]">
                        <span className="text-2 color-white">{t("textBox1")}<span className="text-2 color-green">$WAR</span></span>
                        <span className="text-2 color-white">{t("textBox2")}</span>
                        <span className="text-2 color-white">{t("textBox3")}</span>
                    </span>
                    {publicEnded ? <span className="end-sale text-3 uppercase color-yellow mt-[20px]">Genesis sale ended</span>
                        : started ? <>
                            <span className="text-4 mt-[20px]">{whitelistEnded ? "Public" : "Whitelist"} Round</span>
                            <span className="text-3 color-yellow ">Mint price: {MINT_PRICE} ETH</span>
                            <div className="flex flex-col w-full gap-[6px]">
                                <div className="flex items-center justify-between">
                                    <span className="text-2 color-green mt-[20px]">Total committed</span>
                                    <span className="text-2 color-green mt-[20px]">{Number(totalCommitted)} / {MAX_SUPPLY}</span>
                                </div>
                                <div className={`pr-bar w-full h-[10px] rounded-[8px] border-[1px]`}>
                                    <div style={{
                                        width: `${(Number(totalCommitted) / MAX_SUPPLY) * 100}%`
                                    }}></div>
                                </div>
                            </div>
                        </> : <span className="end-sale text-3 uppercase color-yellow mt-[20px]">Whitelist Round has not started yet</span>}
                    <div className="mlc-bt">
                        {!publicEnded ? <Button
                            text={t(whitelistEnded ? "commit" : "WhitelistCommit")}
                            typeBt="yellow"
                            isLoading={isLoadingCommit || isLoadingPublicCommit}
                            disabled={(!isWhitelist && !whitelistEnded) || !(address && isConnected) || errBalance || !started || isCommitted}
                            onClick={onClickCommit}
                        /> : <Button
                            text={t("claim")}
                            typeBt="yellow"
                            isLoading={isLoadingClaim}
                            disabled={!(address && isConnected) || (isClaimed || isClaimSuccess) || (!isClaimed && !isCommitted) || isLoadingClaim}
                            onClick={onClaim}
                        />}
                    </div>
                    {!isWhitelist ? <span className="text-err color-red text-2 mt-[10px] text-center w-fit">You are not whitelist</span>
                        : (errBalance && !publicEnded) ? <span className="text-err color-red text-2 mt-[10px] text-center w-fit">Balance is not enough</span>
                            : (isCommitted && !publicEnded) ? <span className="text-err color-red text-2 mt-[10px] text-center w-fit">You're already committed</span>
                                : ((isClaimed || isClaimSuccess) && publicEnded) ? <span className="text-err color-red text-2 mt-[10px] text-center w-fit">You're already claimed</span>
                                    : (!(isClaimed || isClaimSuccess) && publicEnded && !isCommitted) ? <span className="text-err color-red text-2 mt-[10px] text-center w-fit">Nothing to claim</span>
                                        : null}
                </div>
            </div>
            {/* <div className="mint-right">
                <Title classText="text-4 uppercase" text={t("topBid")} borderLeft borderRight />
                <div className="mr-row scrollbar">
                    <div className="mr-col-1">
                        <span className="uppercase text-22 color-green">{t("wallet")}</span>
                    </div>
                    <div className="mr-col-2">
                        <span className="uppercase text-22 color-green">{t("amount")}</span>
                    </div>
                </div>
                <div className="mr-table scrollbar">

                    {data.map((item, index) => <div key={index} className="mrt-row">
                        <div className="mrt-col-1">
                            <span className="mrtc-id uppercase text-22 color-green">#{index + 1}</span>
                            <span className="mrtc-address text-22 color-white">{subStringAddress(item.address, width >= 1600 ? 5 : 4)}</span>
                        </div>
                        <div className="mrt-col-2">
                            <span className="uppercase text-22 color-white">{numeral(item.amount).format("0,0.[00]")}  <span className="uppercase text-2 color-white">$WAR</span></span>
                        </div>
                    </div>)}
                </div>
            </div> */}
        </Wrap>
    )
}

export default MintBid

const Wrap = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
    gap: 6%;
        .mint-right {
            display: flex;
            height: 100%;
            width: 35%;
            overflow: hidden;
            flex-direction: column;
            background: rgba(0, 255, 163, 0.2);
            .mr-row {
                display: flex;
                align-items: center;
                width: 100%;
                padding-top: 20px;
                overflow-y: scroll;
                scrollbar-color: transparent transparent;
                .mr-col-1 {
                    width: 55%;
                    padding: 0 20px;
                    height: 53px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-right: 1px solid ${configColor.green};
                    > span {
                        margin-left: 20px;
                        text-align: right;
                    }
                }
                .mr-col-2 {
                    width: 45%;
                    padding: 0 20px;
                    height: 53px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    > span {
                        margin-right: 20px;
                        text-align: left;
                    }
                }
            }
            .mr-table {
                flex: 1;
                width: 100%;
                display: flex;
                flex-direction: column;
                overflow: auto;
                .mrt-row {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    height: 53px;
                    .mrt-col-1 {
                        width: 55%;
                        border-right: 1px solid #727070a8;
                        display: flex;
                        align-items: center;
                        height: 100%;
                        .mrtc-id {
                            padding: 0 16px;
                        }
                        .mrtc-address {
                            padding: 12px;
                        }
                    }
                    .mrt-col-2 {
                        width: 45%;
                        padding: 16px;
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
        .mint-left {
            width: 80%;
            max-width: 1000px;
            /* flex: 1; */
            gap: 20px;
            display: flex;
            .ml-img {
                flex: 1;
                position: relative;
                height: fit-content;
                display: flex;
                max-width: 380px;
                .mli-1 {
                    width: 100%;
                    height: auto;
                    
                    margin-left: auto;
                }
                .mli-2 {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 120%;
                    height: auto;
                    mix-blend-mode: plus-lighter;
                    transform: translate(-36% , -38%) translate3d(0,0,0);
                    scale: 1.4;
                }
                .mli-light {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 50px;
                    height: 50px;
                    transform: translate(-50%, -50%);
                    transition: 0.5s ease-in-out;
                    background: ${configColor.green};
                    filter: blur(20px);
                    border-radius: 50%;
                }
                .mli-3 {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 50%;
                    height: auto;
                    transform: translate(-50%, -50%);
                    transition: 0.5s ease-in-out; 
                }
                &:hover {
                    .mli-light {
                        transform: translate(-50%, -50%) scale(3);
                    }
                    .mli-3 {
                        transform: translate(-50%, -50%) scale(1.2);
                    }
                }
            }
            .ml-content {
                flex: 1;
                .mlc-text {
                    margin-top: 36px;
                    padding-left: 24px;
                    margin-left: 16px;
                    border-left: 2px solid ${configColor.green};
                }
                .mlc-bt {
                    width: 267px;
                    margin-top: 20px;
                }
            }
        }
        .pr-bar {
            display: flex;
            /* border: 1px solid ${configColor.green}; */
            > div {
                height: 100%;
                transition: 0.5s ease-in-out;
                border-radius: 10px;
                background: ${configColor.green};
            }
        }
    ${breakpointsMedias.max1599} {
        gap: 4%;
        .mint-right {
            min-width: 350px;
        }
    }
    ${breakpointsMedias.max991} {
        gap: 40px;
        flex-direction: column;
        .mint-right {
            height: fit-content;
            width: 100%;
            min-width: unset;
            .mr-row {
                .mr-col-1 {
                    width: 60%;
                }
                .mr-col-2 {
                    width: 40%;
                }
            }
            .mr-table {
                overflow: hidden;
                .mrt-row {
                    .mrt-col-1 {
                        width: 60%;
                    }
                    .mrt-col-2 {
                        width: 40%;
                    }
                }
            }
        }
        .mint-left {
            width: 100%;
            ${breakpointsMedias.max767} {
                width: 100%;
                flex-direction: column;
                align-items: center;
                .ml-img {
                    flex: unset;
                    max-width: 335px;
                }
                .ml-content {
                    flex: unset;
                    width: 100%;
                    .mlc-bt {
                        width: 100%;
                        max-width: 267px;
                        margin: 0 auto;
                        margin-top: 20px;
                    }
                }
                .text-err {
                    margin: 10px auto;
                }
                .end-sale {
                    text-align: center;
                }
            }
        }
    }
`