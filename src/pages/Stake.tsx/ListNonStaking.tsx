import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Button from "components/core/Button";
import { useAccount } from "wagmi";
import imgHero from "assets/images/img-hero-2.png"
import imgMonster from "assets/images/img-monster-2.png"
import gifBox from "assets/images/mint.gif";
import configColor from "constants/configColor";
import frameStakeRed from "assets/images/stake-frame-red.png";
import { breakpointsMedias } from "constants/breakpoints";
import Title from "components/core/Title";
import { useTranslation } from "react-i18next";
import bgList from "assets/images/bg-list-2.png"
import { FaCheck } from "react-icons/fa";
import useStake from "helpers/contracts/useStake";
import useApproveForAll from "helpers/contracts/useApproveForAll";
import useIsApproved from "helpers/contracts/useIsApproved";

interface IList {
    data: number[],
    reload: () => void
}

const ListNonStaking = ({ data, reload }: IList) => {
    const { t } = useTranslation();
    const [listPicked, setListPicked] = useState<number[]>([]);

    const typePicked = useMemo(() => {
        return !listPicked[0] ? null : listPicked[0] >= 1500 ? "human" : "monster"
    }, [listPicked]);

    const { isApproved } = useIsApproved(typePicked || "human")
    const { isLoadingApprove, onApproveForAll, isSuccess: isApproveSuccess, isError: isApproveError } = useApproveForAll(typePicked || "human")
    const { onStake, isSuccess, isLoadingStake, isError } = useStake(listPicked.filter((item) => data.includes(item)), typePicked || "human");
    const [loading, setLoading] = useState(false)

    const onPick = async (e: number) => {
        if (typePicked === null || (typePicked === "human" && e >= 1500) || (typePicked === "monster" && e < 1500)) {
            if (listPicked.includes(e)) {
                let idx = listPicked.findIndex((item) => e = e);
                if (idx !== -1) {
                    let newList = [...listPicked];
                    newList.splice(idx, 1);
                    // console.log(newList)
                    setListPicked(newList)
                }
            } else {
                setListPicked([...listPicked, e])
            }
        }
    }

    const onStakeAll = () => {
        setLoading(true);
        if (!isApproved) {
            onApproveForAll()
        } else {
            onStake()
        }
    }

    useEffect(() => {
        if (isApproveSuccess) {
            onStake()
        }
    }, [isApproveSuccess])

    useEffect(() => {
        if (isApproveError) {
            setLoading(false)
        }
    }, [isApproveError])

    useEffect(() => {
        if (isSuccess) {
            setLoading(false)
            // Reload
            reload()
        }

    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            setLoading(false)
        }
    }, [isError])

    return (
        <Wrap className="">
            <Title
                isActive={false}
                classText="text-4 uppercase"
                text={t("nonStaking")}
                borderLeft
                borderRight
                variant="red"
                onClick={() => { }}
                className="sl-tt"
            />
            <div className="stake-list scrollbar">
                {data.map((item, index) => <div
                    key={index}
                    className={`sl-item ${((typePicked === "human" && item < 1500) || (typePicked === "monster" && item >= 1500)) && "sl-item-disable"}`}
                    onClick={() => { onPick(item) }}
                >
                    <div className="sli-wrap">
                        <img src={gifBox} alt="" className="sli-gif" />
                        <div className="sli-light"></div>
                        <img src={item >= 1500 ? imgHero : imgMonster} alt="" className="sli-img" />
                        <div className={`sli-check ${((typePicked === "monster" && item < 1500) || (typePicked === "human" && item >= 1500)) && "sli-check-active"}`}>
                            {listPicked.includes(item) && <FaCheck color={configColor.red} />}
                        </div>
                    </div>
                </div>)}
            </div>
            <div className="stake-bt">
                <Button
                    typeBt="red"
                    text="stakeAll"
                    onClick={onStakeAll}
                    isLoading={isLoadingStake || loading || isLoadingApprove}
                    disabled={listPicked.length === 0}
                />
            </div>
        </Wrap>
    )
}

export default ListNonStaking

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .sl-tt {
        display: none;
    }
    .stake-list {
        flex: 1;
        width: 100%;
        overflow: auto;
        border-top: 2px solid ${configColor.red};
        border-bottom: 2px solid ${configColor.red};
        flex-wrap: wrap;
        display: flex;
        background-image: url(${bgList});
        background-size: 100% auto;
        background-position: top;
        .sl-item {
            width: 25%;
            overflow: hidden;
            display: flex;
            height: fit-content;
            transition: 1s ease-in-out;
            position: relative;
            cursor: pointer;
            &::before {
                background-image: url(${frameStakeRed});
                opacity: 0;
                position: absolute;
                content: "";
                width: 100%;
                height: 100%;
                background-size: 100% 100%;
                background-position: center;
                transition: 1s ease-in-out;
            }
            .sli-wrap {
                width: 100%;
                padding-top: 100%;
                position: relative;
            }
            .sli-gif {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 100%;
                height: auto;
                mix-blend-mode: plus-lighter;
                transform: translate(-50%, -50%) scale(1.4) translate3d(0,0,0);
            }
            .sli-light {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 50px;
                height: 50px;
                transform: translate(-50%, -50%);
                transition: 0.5s ease-in-out;
                background: ${configColor.red};
                filter: blur(20px);
                border-radius: 50%;
            }
            .sli-img {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 60%;
                height: auto;
                transform: translate(-50%, -50%);
                transition: 0.5s ease-in-out; 
            }
            .sli-check {
                display: none;
                position: absolute;
                width: 24px;
                height: 24px;
                top: 10%;
                left: 10%;
                background: #000;
                border-radius: 5px;
                border: 1px solid ${configColor.red};
                align-items: center;
                justify-content: center;
            }
            .sli-check-active {
                display: flex;
            }
            &:hover {
                &::before {
                    opacity: 0.2;
                    background-size: 130% 130%;
                }
                .sli-light {
                    transform: translate(-50%, -50%) scale(3);
                }
                .sli-img {
                    transform: translate(-50%, -50%) scale(1.2);
                }
                .sli-check {
                    display: flex;
                }
            }
        }
        .sl-item-disable {
            opacity: 0.5;
            &:hover {
                .sli-check {
                    display: none;
                }
            }
        }
    }
    .stake-bt {
        width: 228px;
        margin-top: 30px;
        margin-left: auto;
    }
    ${breakpointsMedias.max991} {
        .stake-bt {
            margin-top: 20px;
        }
    }
    ${breakpointsMedias.max490} {
        height: fit-content;
        .sl-tt {
            display: flex;
            width: fit-content;
        }
        .stake-bt {
            margin-top: 20px;
            width: 100%;
        }
        .stake-list {
            flex: 1;
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            flex-wrap: nowrap;
            display: inline-flexbox;
            /* scroll-snap-type: x mandatory; */
            .sl-item {
                width: calc(50vw - 20px);
                height: fit-content;
                /* scroll-snap-align: start; */
            }
            .sl-item-blank {
                display: none;
            }
        }
    }
`