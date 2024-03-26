import { ABI_SALE, CONTRACT_SALE } from 'environments'
import { useMemo } from 'react'
import { useAccount, useContractRead } from 'wagmi'


const useStaking = () => {
    const { address } = useAccount();
    const { data, isSuccess } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'queryStake',
        args: [address],
        watch: true
    })
    const listStaking = useMemo(() => {
        if (data) {
            return data as bigint[]
        }
        return []
    }, [data, isSuccess]);

    // console.log(votePeriod)

    return { listStaking }
}

export default useStaking