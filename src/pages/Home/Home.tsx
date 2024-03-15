import styled from "styled-components";
import bgHome from "assets/images/bg-home.png";
import bgHome2 from "assets/images/bg-home-mobile.png";
import bgFrame from "assets/images/bg-frame.png";
import bgMask1 from "assets/images/bg-mask-1.png";
import bgMask2 from "assets/images/bg-mask-2.png";
import bgText from "assets/images/bg-text-home.png";
import Logo from "components/core/Logo";
import Wallet from "components/core/Wallet";
import Button from "components/core/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Footer from "components/footer/Footer";
import imgHome1 from "assets/images/home-gif-1.gif";
import imgHome2 from "assets/images/home-gif-2.gif";
import { useEffect } from "react";
import { breakpointsMedias } from "constants/breakpoints";
import configColor from "constants/configColor";

const Home = () => {
    const { t } = useTranslation();

    useEffect(() => {
        (document.getElementById("mask-img") as any).style.transform = "scale(1)"
    }, [])

    return (
        <Wrap className="">
            <div className="wrap-home relative">
                <div className="bg-main">
                </div>
                <div className="mask">
                    <img src={bgMask2} alt="" id="mask-img" />
                </div>
                <div className="bg-frame">
                </div>
                <div className="bg-bar-1"></div>
                <div className="bg-bar-2"></div>
                <div className="home-text ">
                    <div className="ht-content flex flex-col ">
                        <span className="text-5 color-black">{"BLAST WAR"}</span>
                        <span className="text-2 color-black ml-[30px] mr-[30px] flex flex-col">
                            <span className="">{t("homeText1")}</span>
                            <span className="">{t("homeText21")}<span className="color-green">$WARS</span><span className="">{t("homeText22")}</span></span>
                            <span className="">{t("homeText3")}</span>
                            <span className="">{t("homeText4")}</span>
                        </span>
                    </div>
                    <div className="ht-bts pl-[50px] gap-[10px] flex items-center w-full">
                        <Link to="/mint" className="max-w-[157px] flex-1">
                            <Button typeBt="green" text="mint" />
                        </Link>
                        <Link to="/stake" className="max-w-[157px] flex-1">
                            <Button typeBt="white" text="stake" className="w-[157px]" />
                        </Link>
                    </div>
                    <Link to="/whitelist" className="w-full max-w-[250px] flex-1 bt-whitelist">
                        <Button typeBt="yellow" text="Apply Whitelist" className="w-[157px]" />
                    </Link>
                </div>
                <div className="home-img ">
                    <img src={imgHome1} alt="" className="" />
                    <img src={imgHome2} alt="" className="" />
                </div>
                <Logo />
                <Wallet />
                <Footer />
            </div>
        </Wrap>
    )
}

export default Home

const Wrap = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
    align-items: center;
    min-height: 100vh;
    padding: 36px 108px;
    z-index: 1;
    position: relative;
    .wrap-home {
      
        width: 100%;
        height: 100%;
        display: flex;
        min-height: 100% !important;
        padding: 70px 20px 70px 100px;
        align-items: center;
        justify-content: center;
        position: relative;
        .mask {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            mask-image: url(${bgMask1});
            mask-size: 99.2% 100%;
            mask-repeat: no-repeat; 
            overflow: hidden;
            > img {
                width: 100%;
                height: 100%;
                transform: scale(1.2);
                transition: 5s ease-in-out;
            }
        }
        .bg-main {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-image: url(${bgHome});
            background-size: 100% 100%;
            background-position: center;
        }
        .bg-frame {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background-image: url(${bgFrame});
            background-size: 100% 100%;
            background-position: center;
        }
        .bg-bar-1 {
            position: absolute;
            width: 16%;
            height: 0.9%;
            background-color: ${configColor.yellow};
            top: 6.6%;
            left: 50%;
            transition: 5s ease-in-out;
        }
        .bg-bar-2 {
            position: absolute;
            width: 12%;
            height: 0.9%;
            background-color: ${configColor.yellow};
            transition: 5s ease-in-out;
            transform: rotate(90deg);
            top: 37%;
            right: -5.2%;
        }
        &:hover {
            .mask {
                > img {
                    transform: scale(1.2) !important;
                }
            }
            .bg-bar-1 {
                transform: translateX(120%);
            }
            .bg-bar-2 {
                transform: rotate(90deg) translateX(100%);
            }
        }
        .home-text {
            flex: 1;
            display: flex;
            flex-direction: column;
            max-width: 610px;
            z-index: 1;
            .ht-content {
                width: fit-content;
                background-image: url(${bgText});
                background-size: 100% 100%;
                background-position: center;
                padding: 40px 30px 80px 30px;
                > span:last-child {
                    border-left: 2px solid black;
                    padding-left: 20px;
                }
            }
            .bt-whitelist {
                margin-top: 20px;
                margin-right: auto;
                margin-left: 50px;
            }
        }
        .home-img {
            width: 55%;
            display: flex;
            overflow: hidden;
            height: 100%;
            border-radius: 0 40px 40px 0;
            position: relative;
            > img {
                position: absolute;
                width: 100%;
                height: auto;
                top: 50%;
                transform: translateY(-50%) translate3d(0,0,0);
                mix-blend-mode: plus-lighter;  
               
            }
        }
    }
    ${breakpointsMedias.max1599} {
        padding: 36px 78px;
        .wrap-home {
            padding: 70px 20px 70px 100px;
            .home-text {
                .ht-content {
                    padding: 40px 30px 70px 30px;
                }
            }
        }
    }
    ${breakpointsMedias.max1199} {
        padding: 36px;
        .wrap-home {
            padding: 70px 20px 70px 80px;
        }
    }
    ${breakpointsMedias.max991} {
        padding: 40px 0;
        z-index: 1;
        position: relative;
        height: fit-content;
        .wrap-home {
            height: fit-content;
            flex-direction: column-reverse;
            padding: 50px 30px 100px 30px;
            ${breakpointsMedias.max490} {
                padding: 50px 30px 80px 30px;
            }
            max-width: 600px;
            margin: 0 auto;
            min-height: calc(100vh - 80px) !important;
            .mask {
                display: none;
            }
            .bg-main {
                background-image: url(${bgHome2})
            }
            .bg-frame {
                display: none;
            }
            .bg-bar-1 {
                display: none;
            }
            .bg-bar-2 {
                display: none;
            }
            .home-text {
                z-index: 0;
                .ht-content {
                    width: fit-content;
                    background-image: url(${bgText});
                    background-size: 100% 100%;
                    background-position: center;
                    padding: 30px 20px 60px 20px;
                }
                .ht-bts {
                    justify-content: center;
                    padding-left: 0;
                }
                .bt-whitelist {
                    margin-right: auto;
                    margin-left: auto;
                }
            }
            .home-img {
                width: 80%;
                padding-top: 70%;
                margin-bottom: 10px;
            }
        }
    }
`