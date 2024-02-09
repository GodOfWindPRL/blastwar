import { ABI_PANCAKE, CONTRACT_MTC, CONTRACT_PANCAKE, CONTRACT_USDT } from 'environments'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'

const useMarketCap = () => {

    const { data, isError, isSuccess, isLoading } = useContractRead({
        address: CONTRACT_PANCAKE,
        abi: ABI_PANCAKE,
        functionName: 'getAmountsOut',
        args: ["1000000000000000000", [CONTRACT_MTC, CONTRACT_USDT]],
        watch: true
    })
    const marketCap = useMemo(() => {
        // console.log(data)
        if (data) {
            return (data as any)[1]
        }
        return 0
    }, [data, isSuccess]);

    // console.log(isJoin)

    return { marketCap, isLoading, isError, isSuccess }
}

export default useMarketCap