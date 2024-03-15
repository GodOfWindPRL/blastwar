import { ABI_SALE, ABI_TOKEN, CONTRACT_SALE, CONTRACT_TOKEN } from 'environments'
import { useMemo } from 'react'
import { useAccount, useContractRead } from 'wagmi'

const useBalanceToken = () => {
    const { address } = useAccount();
    const { data, isSuccess } = useContractRead({
        address: CONTRACT_TOKEN,
        abi: ABI_TOKEN,
        functionName: 'balanceOf',
        args: [address || ""],
        watch: true
    })
    const balance = useMemo(() => {
        if (data) {
            return data as bigint
        }
        return 0n
    }, [data, isSuccess]);

    // console.log(votePeriod)

    return { balance }
}

export default useBalanceToken