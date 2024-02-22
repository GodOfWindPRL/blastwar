import { ABI_SALE, CONTRACT_SALE } from 'environments'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'

const useTotalCommited = () => {
    const { data, isError, isSuccess, isLoading } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'totalCommitted',
        args: [],
        watch: true
    })
    const totalCommitted = useMemo(() => {
        if (data) {
            return data
        }
        return 0n
    }, [data, isSuccess]);

    // console.log(votePeriod)

    return { totalCommitted, isLoading, isError, isSuccess }
}

export default useTotalCommited