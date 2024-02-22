import { ABI_SALE, CONTRACT_SALE } from 'environments'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'

const useWhitelistEndtime = () => {
    const { data, isError, isSuccess, isLoading } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'whitelistedEndtime',
        args: [],
        watch: false
    })
    const whitelistEndtime = useMemo(() => {
        if (data) {
            return data
        }
        return 0n
    }, [data, isSuccess]);

    const ended = useMemo(() => {
        let now = Date.now();
        return BigInt(whitelistEndtime as any) <= BigInt(now)
    }, [whitelistEndtime]);

    // console.log(votePeriod)

    return { whitelistEndtime, isLoading, isError, isSuccess, ended }
}

export default useWhitelistEndtime