import { ABI_GAME, CONTRACT_GAME } from 'environments'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'


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