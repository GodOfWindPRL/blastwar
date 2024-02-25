import { ABI_SALE, CONTRACT_SALE } from 'environments'
import { useMemo } from 'react'
import { useAccount, useContractRead } from 'wagmi'

const useClaimed = () => {
    const { address } = useAccount();
    const { data, isSuccess } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'claimed',
        args: [address || ""],
        watch: true
    })
    const isClaimed = useMemo(() => {
        if (data) {
            return true
        }
        return false
    }, [data, isSuccess]);

    // console.log(votePeriod)

    return { isClaimed }
}

export default useClaimed