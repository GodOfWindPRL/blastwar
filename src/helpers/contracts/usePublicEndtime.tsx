import { ABI_SALE, CONTRACT_SALE } from 'environments'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'

const usePublicEndtime = () => {
    const { data, isError, isSuccess, isLoading } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'publicEndTime',
        args: [],
        watch: false
    })
    const publicEndTime = useMemo(() => {
        console.log({ data, now: Date.now() })
        if (data) {
            return data
        }
        return 0n
    }, [data, isSuccess]);

    const ended = useMemo(() => {
        let now = Date.now();
        return BigInt(publicEndTime as any) * 1000n <= BigInt(now)
    }, [publicEndTime]);

    return { publicEndTime, isLoading, isError, isSuccess, publicEnded: ended }
}

export default usePublicEndtime