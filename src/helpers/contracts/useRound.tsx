import { ABI_SALE, CONTRACT_SALE } from 'environments'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'

export const MAX_SUPPLY = Number(process.env.REACT_APP_MAX_SUPPLY || 0)
export const MAX_WHITELIST = Number(process.env.REACT_APP_MAX_SUPPLY_WHITELIST || 0)

const useRound = () => {
    const { data, isSuccess } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'startTime',
        args: [],
        watch: false
    })
    const { data: dataWl, isSuccess: wlSuccess } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'whitelistDuration',
        args: [],
        watch: false
    })
    const { data: dataOg, isSuccess: ogSuccess } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'OGDuration',
        args: [],
        watch: false
    })
    const { data: dataPl, isSuccess: plSuccess } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'publicDuration',
        args: [],
        watch: false
    })
    const { data: dataWlCommitted, isSuccess: wlCmtSuccess } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'totalWLCommitted',
        args: [],
        watch: true
    })
    const { data: dataTotalCommitted, isSuccess: totalCmtSuccess } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'totalCommitted',
        args: [],
        watch: true
    })
    const wlCommitted = useMemo(() => {
        if (dataWlCommitted) {
            return dataWlCommitted as bigint
        }
        return 0n
    }, [dataWlCommitted, wlCmtSuccess]);
    const totalCommitted = useMemo(() => {
        if (dataTotalCommitted) {
            return dataTotalCommitted as bigint
        }
        return 0n
    }, [dataTotalCommitted, totalCmtSuccess]);

    const startTime = useMemo(() => {
        if (data) {
            return data as bigint
        }
        return 0n
    }, [data, isSuccess]);
    const wlDuration = useMemo(() => {
        if (dataWl) {
            return dataWl as bigint
        }
        return 0n
    }, [dataWl, wlSuccess]);
    const ogDuration = useMemo(() => {
        if (dataOg) {
            return dataOg as bigint
        }
        return 0n
    }, [dataOg, ogSuccess]);
    const plDuration = useMemo(() => {
        // console.log(data)
        if (dataPl) {
            return dataPl as bigint
        }
        return 0n
    }, [dataPl, plSuccess]);

    const currentRound = useMemo(() => {
        // console.log({ startTime, wlDuration, ogDuration, plDuration, wlCommitted, totalCommitted })
        let now = BigInt(Math.ceil(Date.now() / 1000));
        if (!startTime) {
            return {
                round: null,
                isEnd: false
            }
        }
        if (totalCommitted >= MAX_SUPPLY) {
            return {
                round: "end",
                isEnd: true
            }
        }
        if (now > startTime + wlDuration + ogDuration + plDuration) {
            return {
                round: "end",
                isEnd: true
            }
        }
        if (now > startTime + wlDuration + ogDuration) {
            return {
                round: "Public",
                isEnd: false
            }
        }
        if (now > startTime + wlDuration) {
            return {
                round: "OG",
                isEnd: false
            }
        }
        if (now > startTime) {
            if (wlCommitted >= MAX_WHITELIST) {
                return {
                    round: "Whitelist",
                    isEnd: true
                }
            } else {
                return {
                    round: "Whitelist",
                    isEnd: false
                }
            }
        }
        return {
            round: null,
            isEnd: false
        }
    }, [startTime, wlDuration, ogDuration, plDuration, wlCommitted, totalCommitted]);

    return { startTime, currentRound, totalCommitted }
}

export default useRound