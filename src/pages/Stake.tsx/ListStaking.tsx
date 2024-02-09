import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "components/core/Button";
import { useAccount } from "wagmi";
import imgHero from "assets/images/img-hero.png"
import imgMonster from "assets/images/img-monster.png"
import gifBox from "assets/images/mint.gif";
import configColor from "constants/configColor";
import frameStake from "assets/images/stake-frame.png";

type StakeItem = {
    id: number,
    type: "hero" | "monster",
}

const ListStaking = () => {
    const perRow = 4;
    const { address, isConnected } = useAccount()
    const [data, setData] = useState<StakeItem[]>([]);

    useEffect(() => {
        // if (address) {
        //     getList()
        // }
        getList()
    }, [address])

    const getList = () => {
        let newData = [] as StakeItem[]
        for (let i = 0; i < 22; i++) {
            let rd = Math.random() * 2;
            newData.push({
                id: i,
                type: rd > 1 ? "hero" : "monster"
            })
        }
        setData(newData);
    }

    const onUnstakeAll = () => {

    }

    return (
        <Wrap className="">
            <div className="stake-list scrollbar">
                {data.map((item, index) => <div key={index} className="sl-item">
                    <div className="sli-wrap">
                        <img src={gifBox} alt="" className="sli-gif" />
                        <div className="sli-light"></div>
                        <img src={item.type === "hero" ? imgHero : imgMonster} alt="" className="sli-img" />
                    </div>
                </div>)}
                {Array.from({ length: data.length % perRow }, (v, i) => i).map((item, index) => <div key={index} className="sl-item">
                    <div className="sli-wrap"></div>
                </div>)}
            </div>
            <div className="stake-bt">
                <Button typeBt="yellow" text="unstakeAll" onClick={onUnstakeAll} />
            </div>
        </Wrap>
    )
}

export default ListStaking

const Wrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .stake-list {
        flex: 1;
        width: 100%;
        overflow: auto;
        border-top: 2px solid ${configColor.green};
        border-bottom: 2px solid ${configColor.green};
        flex-wrap: wrap;
        display: flex;
        .sl-item {
            width: 25%;
            background-image: url(${frameStake});
            background-size: 100% 100%;
            background-position: center;
            overflow: hidden;
            display: flex;
            height: fit-content;
            transition: 1s ease-in-out; 
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
                background: ${configColor.green};
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
            &:hover {
                background-size: 130% 130%;
                .sli-light {
                    transform: translate(-50%, -50%) scale(3);
                }
                .sli-img {
                    transform: translate(-50%, -50%) scale(1.2);
                }
            }
        }
    }
    .stake-bt {
        width: 228px;
        margin-top: 30px;
        margin-left: auto;
    }
`