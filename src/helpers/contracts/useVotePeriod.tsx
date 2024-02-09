import { ABI_VOTE, CONTRACT_VOTE } from 'environments'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'

const DEFAULT_VOTE_PERIOD = 60 * 60 * 24

const useVotePeriod = () => {
    const { data, isError, isSuccess, isLoading } = useContractRead({
        address: CONTRACT_VOTE,
        abi: ABI_VOTE,
        functionName: 'VOTE_PERIOD',
        args: [],
        watch: false
    })
    const votePeriod = useMemo(() => {
        if (data) {
            return Number(data)
        }
        return DEFAULT_VOTE_PERIOD
    }, [data, isSuccess]);

    // console.log(votePeriod)

    return { votePeriod, isLoading, isError, isSuccess }
}

export default useVotePeriod