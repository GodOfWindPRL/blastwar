import styled from "styled-components";
import bgHome2 from "assets/images/bg-home-mobile.png";
import { breakpointsMedias } from "constants/breakpoints";
import { useAccount } from "wagmi";
import { subStringAddress } from "helpers/format/subStringAddress";
import { useEffect, useState } from "react";
import Button from "components/core/Button";
import configColor from "constants/configColor";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useWidthScreen } from "helpers/hooks/useScreen";

const BLAST_TWITTER = "/"
const BLAST_TWEET = "123123123"

const SubmitForm = () => {
    const { address, isConnected } = useAccount();
    const { width } = useWidthScreen()
    const { open } = useWeb3Modal()
    const [data, setData] = useState({
        twitter: "",
        desc: "",
        followed: false,
        retweeted: false
    })
    const [loading, setLoading] = useState({
        follow: false as false | number,
        retweet: false as false | number
    })

    const onClickBt1 = () => {
        console.log("bt1")
        setLoading((prev) => {
            return {
                ...prev,
                follow: 10
            }
        })
    }
    const onClickBt2 = () => {
        setLoading((prev) => {
            return {
                ...prev,
                retweet: 10
            }
        })
    }

    useEffect(() => {
        if (loading.follow !== false || loading.retweet !== false) {
            let x = setTimeout(() => {
                if (loading.follow === 1 || loading.retweet === 1) {
                    setData((prev) => {
                        return {
                            ...prev,
                            followed: loading.follow === 1 ? true : prev.followed,
                            retweeted: loading.retweet === 1 ? true : prev.retweeted
                        }
                    })
                }
                setLoading({
                    follow: (loading.follow !== false && loading.follow > 1) ? (loading.follow - 1) : false,
                    retweet: (loading.retweet !== false && loading.retweet > 1) ? (loading.retweet - 1) : false,
                });

            }, 1000)
            return () => {
                clearTimeout(x)
            }
        }
    }, [loading])

    const onSubmit = (e: any) => {
        e.preventDefault();
        console.log("SSSSS")
    }

    return (
        <Wrap className="">
            <form className="wrap-home relative" onSubmit={onSubmit}>
                <div className="form-item">
                    <span className="text-3 color-green">Wallet address</span>
                    <input
                        className="form-input text-2 color-white fi-2"
                        value={width >= 568 ? (address || "") : subStringAddress(address || "", 7)}
                        readOnly
                        placeholder="...Please connect your wallet"
                    />
                </div>
                <div className="form-item">
                    <span className="text-3 color-green">Your Twitter UserID</span>
                    <input
                        className="form-input text-2 color-white"
                        value={data.twitter}
                        onChange={(e) => {
                            setData({ ...data, twitter: e.target.value })
                        }}
                        placeholder="@username"
                        required
                    />
                </div>
                <div className="form-item">
                    <span className="text-3 color-green">Tell us more about yourself</span>
                    <textarea
                        className="form-input text-2 color-white"
                        value={data.desc}
                        onChange={(e) => {
                            setData({ ...data, desc: e.target.value })
                        }}
                        placeholder="..."
                        required
                    />
                </div>
                <div className="flex items-center justify-between w-full form-bts">
                    <div className="w-full" onClick={(e) => { e.preventDefault() }}>
                        <Button typeBt={data.followed ? "green" : "yellow"} text={loading.follow !== false ? `Follow (${loading.follow})` : "Follow"} disabled={loading.follow !== false} onClick={() => {
                            window.open(`https://twitter.com/intent/user?screen_name=${BLAST_TWITTER}`);
                            if (!data.followed) {
                                onClickBt1()
                            }
                        }} />
                    </div>
                    <div className="w-full" onClick={(e) => { e.preventDefault() }}>
                        <Button typeBt={data.retweeted ? "green" : "yellow"} text={loading.retweet !== false ? `Retweet (${loading.retweet})` : "Retweet"} disabled={loading.retweet !== false} onClick={() => {
                            window.open(`https://twitter.com/intent/retweet?tweet_id=${BLAST_TWEET}`);
                            if (!data.retweeted) {
                                onClickBt2()
                            }
                        }} />
                    </div>
                </div>
                {!(address && isConnected) ? <Button
                    typeBt={"yellow"}
                    text="Connect Wallet"
                    onClick={() => { open() }}
                />
                    : <Button
                        disabled={!data.followed || !data.retweeted}
                        typeBt={(data.followed && data.retweeted) ? "green" : "yellow"}
                        text="Submit" />}

            </form>
        </Wrap>
    )
}

export default SubmitForm

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
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: fit-content;
        flex-direction: column;
        padding: 70px 80px 70px 70px;
        max-width: 600px;
        margin: 0 auto;
        min-height: 800px;
        background-image: url(${bgHome2});
        background-size: 100% 100%;
        background-position: center;
        gap: 20px;
        textarea:focus,
        textarea:active {
            border: none;
            outline: none;
        }
        .form-item {
            display: flex;
            flex-direction: column;
            width: 100%;
            gap: 10px;
            textarea {
                height: 100px;
            }
            .form-input {
                width: 100%;
                border: 1px solid ${configColor.yellow};
                border-radius: 4px;
                background: #000;
                padding: 10px 16px;
                cursor: pointer;
            }
            .fi-2 {
                cursor: default;
                border: 1px solid gray;
            }
        }
        .form-bts {
            gap: 40px;
            margin: 20px 0;
        }
    }
    ${breakpointsMedias.max1599} {
        padding: 36px 78px;
    }
    ${breakpointsMedias.max1199} {
        padding: 36px;
        .wrap-home {
            /* padding: 30px 20px; */
        }
    }
    ${breakpointsMedias.max991} {
        padding: 40px 0;
        .wrap-home {
            .form-bts {
                gap: 20px;
                margin: 20px 0;
            }
            ${breakpointsMedias.max490} {
                padding: 50px 60px 50px 50px;
                gap: 10px;
                min-height: 700px;
                .form-bts {
                    gap: 10px;
                    margin: 20px 0;
                }
            }
            
        }
    }
`