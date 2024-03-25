import { ABI_SALE, CONTRACT_SALE } from 'environments'
import { useMemo } from 'react'
import { useAccount, useContractRead } from 'wagmi'

const useCommited = () => {
    const { address } = useAccount();
    const { data, isSuccess } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'publicCommitted',
        args: [address || ""],
        watch: true
    })

    const userCommitted = useMemo(() => {
        if (data) {
            return data as bigint
        }
        return 0n
    }, [data, isSuccess]);

    // console.log(votePeriod)

    return { userCommitted }
}

export default useCommited