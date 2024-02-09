import { ABI_MEMBER, CONTRACT_MEMBER } from 'environments'
import { useMemo } from 'react'
import { useAccount, useContractRead } from 'wagmi'

interface ICheckJoin {
    checkTarget: string
}

const useCheckJoin = ({ checkTarget }: ICheckJoin) => {
    const { address } = useAccount()
    const { data, isError, isSuccess, isLoading } = useContractRead({
        address: CONTRACT_MEMBER,
        abi: ABI_MEMBER,
        functionName: 'sponsor',
        args: [checkTarget],
        watch: checkTarget === address
    })
    const isJoin = useMemo(() => {
        // console.log(data)
        if (!isSuccess) {
            return false
        }
        if (data === "0x0000000000000000000000000000000000000000") {
            return false
        }
        return true
    }, [data, isSuccess]);

    // console.log(isJoin)

    return { isJoin, isLoading, isError, isSuccess }
}

export default useCheckJoin