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
        if (data) {
            return Number(data)
        }
        return 0
    }, [data, isSuccess]);

    // console.log(votePeriod)

    return { publicEndTime, isLoading, isError, isSuccess }
}

export default usePublicEndtime