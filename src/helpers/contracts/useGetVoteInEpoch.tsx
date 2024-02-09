import { ABI_DATA, CONTRACT_DATA } from 'environments'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'

interface ICheckJoin {
    checkTarget: string,
    epoch: number,
}

const useGetVoteInEpoch = ({ checkTarget, epoch }: ICheckJoin) => {
    const { data, isSuccess } = useContractRead({
        address: CONTRACT_DATA,
        abi: ABI_DATA,
        functionName: 'epochVote',
        args: [checkTarget, epoch],
        watch: true
    })
    const voteInEpoch = useMemo(() => {
        // console.log({ data })
        if (data) {
            return Number(data)
        }
        return 0
    }, [data, isSuccess]);

    // console.log({ voteInEpoch, checkTarget, epoch })

    return { voteInEpoch }
}

export default useGetVoteInEpoch