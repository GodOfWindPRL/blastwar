import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { subStringAddress } from "helpers/format/subStringAddress";
import numeral from "numeral";
import { useWidthScreen } from "helpers/hooks/useScreen";

type BoardItem = {
    address: string,
    earnPerDay: number,
    earned: number,
    tokenStealed: number,
    humanStealed: number,
    staked: number,
    nonStake: number
}

interface ISM {
    onShowMain: () => void
}

const Leaderboard = ({ onShowMain }: ISM) => {
    const { t } = useTranslation();
    const { height, width } = useWidthScreen();
    const PAGE_SIZE = (width >= 1200 && height < 1000) ? 6 : 8
    console.log(PAGE_SIZE, height, width)
    const [data, setData] = useState<BoardItem[]>([])

    useEffect(() => {
        getBoard()
    }, [])

    const getBoard = () => {
        let newData = [] as BoardItem[]
        for (let i = 0; i < PAGE_SIZE; i++) {
            newData.push({
                address: "$#%^43yHRTU#$%^HF352562BCFXGD5gdf4",
                earnPerDay: Math.random() * 100000,
                earned: Math.random() * 100000,
                tokenStealed: Math.random() * 100000,
                humanStealed: Math.random() * 100000,
                staked: Math.random() * 100,
                nonStake: Math.random() * 100,
            })
        }
        setData(newData);
    }


    return (
        <Wrap className="">
            <span className="text-4 color-green uppercase">{t("leaderboard")}</span>
            <div className="board-wrap">
                <table>
                    <thead>
                        <tr>
                            <th className="text-22 text-center color-green">
                                {t("address")}
                            </th>
                            <th className="text-22 text-center color-green">
                                {t("earnPerDay")}
                            </th>
                            <th className="text-22 text-center color-green">
                                {t("earned")}
                            </th>
                            <th className="text-22 text-center color-green">
                                {t("stealed")}
                            </th>
                            <th className="text-22 text-center color-green">
                                {t("humanStealed")}
                            </th>
                            <th className="text-22 text-center color-green">
                                {t("nftStaked")}
                            </th>
                            <th className="text-22 text-center color-green">
                                {t("nonStake")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => <tr key={index}>
                            <td className="text-center">
                                <span className="text-22 text-center color-white">{subStringAddress(item.address)}</span>
                            </td >
                            <td className="text-center">
                                <span className="text-22 text-center color-white">{numeral(item.earnPerDay).format("0,0.[00]")}  <span className="text-2">$WAR</span></span>
                            </td>
                            <td className="text-center">
                                <span className="text-22 text-center color-white">{numeral(item.earned).format("0,0.[00]")}  <span className="text-2">$WAR</span></span>
                            </td>
                            <td className="text-center">
                                <span className="text-22 text-center color-white">{numeral(item.tokenStealed).format("0,0.[00]")}  <span className="text-2">$WAR</span></span>
                            </td>
                            <td className="text-center">
                                <span className="text-22 text-center color-white">{numeral(item.humanStealed).format("0,0")}</span>
                            </td>
                            <td className="text-center">
                                <span className="text-22 text-center color-white">{numeral(item.staked).format("0,0")}</span>
                            </td>
                            <td className="text-center">
                                <span className="text-22 text-center color-white">{numeral(item.nonStake).format("0,0")}</span>
                            </td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </Wrap>
    )
}

export default Leaderboard
const Wrap = styled.div`
    width: 100%;
    display: flex;
    height: 100%;
    justify-content: center;
    gap: 30px;
    align-items: center;
    flex-direction: column;
    .board-wrap {
        background: rgba(0, 255, 163, 0.2);
        width: 100%;
        display: flex;
        margin-bottom: auto;
        table {
            width: 100%;
            thead {
                tr {
                    height: 53px;
                    background: rgba(0, 255, 163, 0.2);
                }
            }
            tbody {
                tr {
                    height: 53px;
                    &:nth-child(2n + 2) {
                        background: rgba(4, 43, 21, 0.829);
                    }
                   
                }
            }
        }
    }
`