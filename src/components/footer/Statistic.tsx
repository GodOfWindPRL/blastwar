import configColor from 'constants/configColor';
import styled from 'styled-components';
import { FaCaretRight } from "react-icons/fa6";
import iconLeft from "assets/images/left-yellow.png";
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import numeral from 'numeral';
import { breakpointsMedias } from 'constants/breakpoints';
import useTotalStake from 'helpers/contracts/useTotalStake';

const MAX_SUPPLY_TOKEN = 1000000000

const Statistic = () => {
    const { t } = useTranslation();
    const { totalStakeHuman, totalStakeMonster } = useTotalStake()

    const [data, setData] = useState({
        claimed: null,
        mcap: null,
    })

    return (
        <Wrap className='statistic'>
            <div className="statis-item">
                <span className="si-title text-center text-1 uppercase color-yellow">{t("humanStaked")}</span>
                <span className="si-value text-42 color-yellow">{numeral(totalStakeHuman.toString()).format(totalStakeHuman >= BigInt(1e6) ? "0a,0.[00]" : "0,0")}</span>
            </div>
            <div className="statis-item">
                <span className="si-title text-center text-1 uppercase color-yellow">{t("monsterStaked")}</span>
                <span className="si-value text-42 color-yellow">{numeral(totalStakeMonster.toString()).format(totalStakeMonster >= BigInt(1e6) ? "0a,0.[00]" : "0,0")}</span>
            </div>
            <div className="statis-item">
                <span className="si-title text-center text-1 uppercase color-yellow">{t("warClaimed")}</span>
                <span className="si-value text-42 color-yellow">{numeral(data.claimed).format((data.claimed || 0) >= 1e6 ? "0a,0.[00]" : "0,0")}</span>
            </div>
            <div className="statis-item">
                <span className="si-title text-center text-1 uppercase color-yellow">{t("mcap")}</span>
                <span className="si-value text-42 color-yellow">{numeral(data.mcap).format((data.mcap || 0) >= 1e6 ? "0a,0.[00]" : "0,0")}</span>
            </div>
        </Wrap>
    )
}

export default Statistic

const Wrap = styled.div`
    position: absolute;
    /* width: 17.5%; */
    /* height: 64px; */
    bottom: 6.7%;
    left: 28%;
    
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 265px;
    gap: 20px;
   .statis-item {
        padding: 0 12px;
        height: 94px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        background-color:#FDEC0B4D;
        display: flex;
        flex-direction: column;
        min-width: 155px;
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
    ${breakpointsMedias.max991} {
        width: 100%;
        max-width: unset;
        flex-wrap: wrap;
        max-width: 600px;
        .statis-item {
            height: auto;
            min-height: 94px;
            padding: 6px 24px;
            &:nth-child(1),
            &:nth-child(2) {
                width: calc(50% - 10px);
            }
            &:nth-child(3),
            &:nth-child(4) {
                width: 100%;
            }
        }
    }
`;
