import { ABI_SALE, CONTRACT_SALE } from 'environments'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'

const useBidValue = (addr: string) => {
    const { data, isError, isSuccess, isLoading } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'bidValue',
        args: [addr],
        watch: true
    })
    const bidValue = useMemo(() => {
        if (data) {
            return Number(data)
        }
        return 0
    }, [data, isSuccess]);

    // console.log(votePeriod)

    return { bidValue, isLoading, isError, isSuccess }
}

export default useBidValue