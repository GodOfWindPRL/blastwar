import configColor from 'constants/configColor';
import { RxDiscordLogo } from "react-icons/rx";
import styled from 'styled-components';
import { FaCaretRight } from "react-icons/fa6";
import iconTw from "assets/images/twitter.png";
import iconTw2 from "assets/images/twitter-2.png";
import iconDis from "assets/images/discord.png";
import iconDis2 from "assets/images/discord-2.png";
import { breakpointsMedias } from 'constants/breakpoints';

const Footer = () => {

    const listSocials = [{
        icon: <img src={iconTw} />,
        link: ""
    }, {
        icon: <img src={iconDis} />,
        link: ""
    }, {
        hasArr: true,
        icon: <span className='text-3 uppercase color-black'>DOC</span>,
        link: ""
    }]

    return (
        <Wrap className='footer'>
            <a href={listSocials[0].link} target='_blank' rel='noreferrer' className="fll-item" >
                {listSocials[0].icon}
            </a>
            <a href={listSocials[1].link} target='_blank' rel='noreferrer' className="fll-item" >
                {listSocials[1].icon}
            </a>
            <a href={listSocials[2].link} target='_blank' rel='noreferrer' className="fll-item" >
                <FaCaretRight className='arr pr-[6px]' size={20} color="black" />{listSocials[2].icon}
            </a>
        </Wrap>
    )
}

export default Footer

const Wrap = styled.div`
    position: absolute;
    width: 17.5%;
    height: 64px;
    bottom: 5%;
    left: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 265px;
    a {
        flex: 1;
        height: 100%;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${configColor.yellow};
        transition: background 0.3s ease-in-out;
        > .arr {
            max-width: 0px;
            transition: 0.3s ease-in-out;
        }
        > img {
            transition: 0.3s ease-in-out;
        }
        &:hover {
            background-color: ${configColor.green};
            > .arr {
                max-width: 32px;
            }
            &:nth-child(1) {
                > img {
                    content: url(${iconTw2});
                }
            }
            &:nth-child(2) {
                > img {
                    content: url(${iconDis2});
                }
            }
        }
    }
    ${breakpointsMedias.max1199} {
        width: 20%;
    }
    ${breakpointsMedias.max991} {
        position: absolute;
        width: fit-content;
        height: 40px;
        bottom: 0%;
        left: 50%;
        transform: translateX(-50%);
        a {
            padding: 0 12px;
            > img {
                width: 20px;
            }
        }
    }
`;
