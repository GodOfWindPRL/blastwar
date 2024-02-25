import { ABI_HUMAN_STAKING, ABI_MONSTER_STAKING, CONTRACT_HUMAN_STAKING, CONTRACT_MONSTER_STAKING } from 'environments'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'

const useTotalStake = (type: "human" | "monster") => {
    const { data, isSuccess } = useContractRead({
        address: type === "human" ? CONTRACT_HUMAN_STAKING : CONTRACT_MONSTER_STAKING,
        abi: type === "human" ? ABI_HUMAN_STAKING : ABI_MONSTER_STAKING,
        functionName: 'totalSupply',
        args: [],
        watch: true
    })
    const totalStake = useMemo(() => {
        if (data) {
            return data
        }
        return 0n
    }, [data, isSuccess]);

    // console.log(votePeriod)

    return { totalStake }
}

export default useTotalStake