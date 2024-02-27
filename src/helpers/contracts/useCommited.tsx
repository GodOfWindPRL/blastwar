import { ABI_SALE, CONTRACT_SALE } from 'environments'
import { useMemo } from 'react'
import { useAccount, useContractRead } from 'wagmi'

const useCommited = () => {
    const { address } = useAccount();
    const { data, isSuccess } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'wlCommitted',
        args: [address || ""],
        watch: true
    })
    const { data: plData, isSuccess: plIsSuccess } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'publicCommitted',
        args: [address || ""],
        watch: true
    })
    const wlCommited = useMemo(() => {
        if (data) {
            return true
        }
        return false
    }, [data, isSuccess]);
    const plCommited = useMemo(() => {
        if (plData) {
            return true
        }
        return false
    }, [plIsSuccess, plData]);

    // console.log(votePeriod)

    return { wlCommited, plCommited }
}

export default useCommited