import { ABI_GAME, ABI_SALE, CONTRACT_GAME, CONTRACT_SALE } from 'environments'
import { useMemo } from 'react'
import { useAccount, useContractRead } from 'wagmi'


const usePrice = () => {
    const { data, isSuccess } = useContractRead({
        address: CONTRACT_GAME,
        abi: ABI_GAME,
        functionName: 'priceCalc',
        args: [],
        watch: true
    })
    const gamePrice = useMemo(() => {
        if (data) {
            return data as bigint
        }
        return 0n
    }, [data, isSuccess]);

    // console.log(votePeriod)

    return { gamePrice }
}

export default usePrice