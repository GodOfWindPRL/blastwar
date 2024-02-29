import { ABI_SALE, CONTRACT_SALE } from 'environments'
import { useMemo } from 'react'
import { useAccount, useContractRead } from 'wagmi'


const usePrice = () => {
    const { data, isSuccess } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'priceCalc',
        args: [],
        watch: true
    })
    const isClaimed = useMemo(() => {
        if (data) {
            return data as bigint
        }
        return 0n
    }, [data, isSuccess]);

    // console.log(votePeriod)

    return { isClaimed }
}

export default usePrice