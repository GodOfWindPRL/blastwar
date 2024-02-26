import { ABI_SALE, CONTRACT_SALE } from 'environments'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'

const useWhitelistEndtime = () => {
    const { data, isError, isSuccess, isLoading } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'whitelistEndTime',
        args: [],
        watch: false
    })
    const whitelistEndtime = useMemo(() => {
        // console.log(data)
        if (data) {
            return data
        }
        return 0n
    }, [data, isSuccess]);

    const started = useMemo(() => {
        return BigInt(whitelistEndtime as any) > 0n
    }, [whitelistEndtime]);

    const ended = useMemo(() => {
        let now = Date.now();
        return BigInt(whitelistEndtime as any) * 1000n <= BigInt(now)
    }, [whitelistEndtime]);

    // console.log(votePeriod)

    return { whitelistEndtime, isLoading, isError, isSuccess, ended, started }
}

export default useWhitelistEndtime