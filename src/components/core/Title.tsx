import styled from "styled-components";
import imgBot from "assets/images/title-bot.png";
import imgBot2 from "assets/images/title-bot-red.png";
import configColor from "constants/configColor";
import { breakpointsMedias } from "constants/breakpoints";

interface ITitle extends React.BaseHTMLAttributes<HTMLDivElement> {
    text: string,
    borderLeft?: boolean,
    borderRight?: boolean,
    classText: string,
    className?: string,
    variant?: "green" | "red",
    isActive?: boolean
}

const Title = ({ text, borderLeft, borderRight, classText, className, variant = "green", isActive, ...props }: ITitle) => {
    return (
        <Wrap className={`${borderLeft && "border-left"} ${borderRight && "border-right"} ${variant} ${isActive && "title-active"} ${className}`} {...props}>
            <img src={imgBot} alt="" />
            <span className={`${classText}`}>{text}</span>
        </Wrap>
    )
}

export default Title

const Wrap = styled.div`
    width: 100%;
    position: relative;
    background: rgba(0, 255, 163, 0.2);
    padding: 12px 20px;
    &.border-left {
        border-left: 2px solid ${configColor.green};
    }
    &.border-right {
        border-right: 2px solid ${configColor.green};
    }
    > img {
        position: absolute;
        width: 122px;
        height: 16px;
        top: 100%;
        left: -2px;
        ${breakpointsMedias.max1199} {
            width: 112px;
        }
    }
    > span {
        color: ${configColor.green};
    }
    &.title-active {
        background: ${configColor.green};
        > span {
            color: ${configColor.black} !important;
        }
    }
    &.red {
        > img {
            content: url(${imgBot2});
        }
        background:  rgba(255, 43, 83, 0.2);
        &.border-left {
            border-left: 2px solid ${configColor.red};
        }
        &.border-right {
            border-right: 2px solid ${configColor.red};
        }
        > span {
            color: ${configColor.red};
        }
        &.title-active {
            background: ${configColor.red};
        }
    }
`