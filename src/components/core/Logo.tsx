import styled from "styled-components";
import bgLogo from "assets/images/bg-logo.png";
import logo from "assets/images/logo.png";
import { Link } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { breakpointsMedias } from "constants/breakpoints";

const Logo = () => {
    return (
        <Wrap to="/" className="">
            <div className="flex items-center justify-center relative w-full h-[100%]">
                <img src={logo} alt="" />
                <div className="d-arr">
                    <FaCaretDown color="black" />
                </div>
                <div className="d-arr">
                    <FaCaretDown color="black" />
                </div>
                <div className="d-arr">
                    <FaCaretDown color="black" />
                </div>
            </div>

        </Wrap>
    )
}

export default Logo

const Wrap = styled(Link)`
    position: absolute;
    width: 17.2%;
    height: 22.12%;
    top: 0;
    left: 0;
    background-image: url(${bgLogo});
    background-size: 100% 100%;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    > div {
        > img {
            width: 60%;
            max-width: 98px;
            height: auto;
        }
        .d-arr {
            position: absolute;
            top: 41%;
            left: 47%;
            transition: 0.3s ease-in-out;
        }
    }
    &:hover {
        > div {
            .d-arr {
                &:nth-child(2) {
                    transform: translate(-70px, 65px) rotate(60deg);
                }
                &:nth-child(3) {
                    transform: translate(0px, -60px) rotate(180deg);
                }
                &:nth-child(4) {
                    transform: translate(70px, 65px) rotate(-60deg);
                }
            }
        }
    }
    ${breakpointsMedias.max991} {
        position: fixed;
        width: 158px;
        height: 120px;
        top: 40px;
        left: -50px;
        > div {
            > img {
                width: 53px;
                height: auto;
                transform: translate(16px);
            }
            .d-arr {
                display: none;
            }
        }
    }

`