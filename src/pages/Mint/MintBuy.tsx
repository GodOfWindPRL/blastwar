import Title from "components/core/Title";
import imgBox from "assets/images/mint-box.png";
import imgBox2 from "assets/images/mint-box-2.png";
import gifBox from "assets/images/mint.gif";
import imgHero from "assets/images/img-hero.png"
import imgMonster from "assets/images/img-monster.png"
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import configColor from "constants/configColor";
import bgBtMint from "assets/images/bg-bt-mint.png"
import Button from "components/core/Button";
import numeral from "numeral";
import { breakpointsMedias } from "constants/breakpoints";

const MintBuy = () => {
    const { t } = useTranslation();
    const currentPrice = 1000

    const listNFT = [{
        title: "nameHero",
        img: imgHero
    }, {
        title: "nameMonster",
        img: imgMonster
    }]

    return (
        <Wrap className="">
            <div className="mint-list">
                {listNFT.map((item, index) => <div key={index} className="mint-item">
                    <div className="mi-title">
                        <Title text={t(item.title)} borderLeft classText="text-32 color-green" />
                    </div>
                    <img src={imgBox} alt="" className="mi-bg" />
                    <img src={gifBox} alt="" className="mi-gif" />
                    <div className="mi-light"></div>
                    <img src={item.img} alt="" className="mi-img" />

                </div>)}
            </div>
            <div className="mint-bt">
                <div className="mbt-price">
                    <span className="text-1 color-yellow uppercase">{t("currentPrice")}</span>
                    <span className="text-42 color-yellow">{numeral(currentPrice).format("0,0.[00]")}</span>
                    <span className="text-1 color-yellow">$WAR</span>
                </div>
                <div className="mbt-bt">
                    <Button typeBt="green" text="mint" />
                </div>
            </div>
        </Wrap>
    )
}

export default MintBuy

const Wrap = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
    .mint-list {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 64px;
        .mint-item {
            flex: 1;
            max-width: 408px;
            display: flex;
            flex-direction: column;
            position: relative;
            height: auto;
            .mi-title {
                position: absolute;
                top: 0;
                left: 0;
                height: 42px;
            }
            .mi-bg {
                width: 100%;
                height: auto;
                max-width: 380px;
            }
            .mi-gif {
                position: absolute;
                top: 50%;
                left: 0%;
                width: 100%;
                height: auto;
                mix-blend-mode: plus-lighter;
                transform: translateY(-33%);
                scale: 1.5;
            }
            .mi-light {
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
            .mi-img {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 65%;
                height: auto;
                transform: translate(-50%, -50%);
                transition: 0.5s ease-in-out; 
            }
            &:hover {
                .mi-light {
                    transform: translate(-50%, -50%) scale(3.5);
                }
                .mi-img {
                    transform: translate(-50%, -50%) scale(1.1);
                }
            }
        }
    }
    .mint-bt {
        display: flex;
        align-items: center;
        gap: 20px;
        .mbt-price {
            width: 372px;
            height: 76px;
            background-image: url(${bgBtMint});
            background-size: 100% 100%;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 0 30px;
            gap: 20px;
            > span:last-child {
                margin-left: auto;
            }
        }
        .mbt-bt {
            width: 157px;
        }
    }
    ${breakpointsMedias.max1199} {
        gap: 40px;
        .mint-list {
            gap: 40px;
        }
        .mint-bt {
            .mbt-price {
                width: 372px;
                height: 76px;
                padding: 0 30px;
                gap: 20px;
            }
            .mbt-bt {
                width: 157px;
            }
        }
    }
    ${breakpointsMedias.max667} {
        height: fit-content;
        margin-bottom: auto;
        gap: 70px;
        .mint-list {
            gap: 80px;
            flex-direction: column;
            max-width: 335px;
            .mint-item {
                border-top: 2px solid ${configColor.yellow};
                border-bottom: 2px solid ${configColor.yellow};
                .mi-title {
                    position: absolute;
                    top: 100%;
                    > div {
                        padding: 8px 20px;
                    }
                }
                .mi-bg {
                    content: url(${imgBox2});
                }
                .mi-gif {
                    top: 50%;
                    left: 50%;
                    width: 80%;
                    transform: translate(-33%, -33%);
                }
                .mi-img {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 65%;
                    height: 60%;
                    object-fit: cover;
                    border-radius: 10px;
                    border: 1px solid ${configColor.green};
                }
            }
        }
        .mint-bt {
            flex-direction: column;
            max-width: 335px;
            .mbt-price {
                width: 100%;
                max-width: 372px;
                height: 76px;
                padding: 0 20px;
                gap: 10px;
            }
            .mbt-bt {
                width: 100%;
            }
        }

    }
`