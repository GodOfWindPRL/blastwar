import { ABI_LIQUID_MINING, CONTRACT_LIQUID_MINING } from 'environments'
import { useEffect, useMemo, useState } from 'react'
import { parseEther } from 'viem'
import { useContractRead } from 'wagmi'

interface ICheckPrice {
    amount: string
}

const useGetAmountOut = ({ amount }: ICheckPrice) => {
    const [amountIn, setAmountIn] = useState(amount)
    const { data, isError, isSuccess, isLoading } = useContractRead({
        address: CONTRACT_LIQUID_MINING,
        abi: ABI_LIQUID_MINING,
        functionName: 'getAmountOut',
        args: [parseEther(amountIn)],
        watch: true
    })
    const amountOut = useMemo(() => {
        // console.log(data)
        if (data) {
            return Number(data)
        }
        return 0
    }, [data, isSuccess]);

    useEffect(() => {
        let debounce: any;
        debounce = setTimeout(() => {
            setAmountIn(amount)
        }, 500);
        return () => {
            debounce && clearTimeout(debounce);
        };
    }, [amount])

    // console.log(isJoin)

    return { amountOut, isLoading, isError, isSuccess }
}

export default useGetAmountOut