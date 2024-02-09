import configColor from 'constants/configColor';
import styled from 'styled-components';
import { FaCaretRight } from "react-icons/fa6";
import iconLeft from "assets/images/left-yellow.png";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import numeral from 'numeral';

const Statistic = () => {
    const { t } = useTranslation()
    const [data, setData] = useState({
        humanStaked: 1235423,
        monsterStaked: 68122,
        claimed: 3248241,
        mcap: 24545433633,
    })

    return (
        <Wrap>
            <div className="statis-item">
                <span className="si-title text-1 uppercase color-yellow">{t("humanStaked")}</span>
                <span className="si-value text-42 color-yellow">{numeral(data.humanStaked).format(data.humanStaked >= 1e6 ? "0a,0.[00]" : "0,0")}</span>
            </div>
            <div className="statis-item">
                <span className="si-title text-1 uppercase color-yellow">{t("monsterStaked")}</span>
                <span className="si-value text-42 color-yellow">{numeral(data.monsterStaked).format(data.monsterStaked >= 1e6 ? "0a,0.[00]" : "0,0")}</span>
            </div>
            <div className="statis-item">
                <span className="si-title text-1 uppercase color-yellow">{t("warClaimed")}</span>
                <span className="si-value text-42 color-yellow">{numeral(data.claimed).format(data.claimed >= 1e6 ? "0a,0.[00]" : "0,0")}</span>
            </div>
            <div className="statis-item">
                <span className="si-title text-1 uppercase color-yellow">{t("mcap")}</span>
                <span className="si-value text-42 color-yellow">{numeral(data.mcap).format(data.mcap >= 1e6 ? "0a,0.[00]" : "0,0")}</span>
            </div>
        </Wrap>
    )
}

export default Statistic

const Wrap = styled.div`
    position: absolute;
    /* width: 17.5%; */
    height: 64px;
    bottom: 6.7%;
    left: 28%;
    
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 265px;
    gap: 20px;
   .statis-item {
        padding: 0 24px;
        height: 94px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background-color:#FDEC0B4D;
        display: flex;
        flex-direction: column;
        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 6px;
            height: 100%;
            background-image: url(${iconLeft});
            background-size: 100% 100%;
            background-position: center;
        }
   }
`;
