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
            return Number(data)
        }
        return 0
    }, [data, isSuccess]);

    // console.log(votePeriod)

    return { whitelistEndtime, isLoading, isError, isSuccess }
}

export default useWhitelistEndtime