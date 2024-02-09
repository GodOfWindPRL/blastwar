import { ABI_CONVERT, CONTRACT_CONVERT } from 'environments'
import { useMemo } from 'react'
import { useAccount, useContractRead } from 'wagmi'

const useConvertable = () => {
    const { address } = useAccount()
    const { data, isError, isSuccess, isLoading } = useContractRead({
        address: CONTRACT_CONVERT,
        abi: ABI_CONVERT,
        functionName: 'conversableAmount',
        args: [address],
        watch: true
    })
    const convertable = useMemo(() => {
        // console.log(data)
        if (data) {
            return data
        }
        return 0
    }, [data, isSuccess]);

    // console.log(isJoin)

    return { convertable, isLoading, isError, isSuccess }
}

export default useConvertable