import { ABI_VOTE, CONTRACT_VOTE } from 'environments'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'

const useVoteFee = () => {
    const { data, isError, isSuccess, isLoading } = useContractRead({
        address: CONTRACT_VOTE,
        abi: ABI_VOTE,
        functionName: 'VOTE_AMOUNT',
        args: [],
        watch: false
    })
    const voteFee = useMemo(() => {
        if (data) {
            return Number(data)
        }
        return 0
    }, [data, isSuccess]);

    // console.log(isJoin)

    return { voteFee, isLoading, isError, isSuccess }
}

export default useVoteFee