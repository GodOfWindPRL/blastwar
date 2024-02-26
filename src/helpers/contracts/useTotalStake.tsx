import { ABI_HUMAN_STAKING, ABI_MONSTER_STAKING, CONTRACT_HUMAN_STAKING, CONTRACT_MONSTER_STAKING } from 'environments'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'

const useTotalStake = () => {
    const { data, isSuccess } = useContractRead({
        address: CONTRACT_HUMAN_STAKING,
        abi: ABI_HUMAN_STAKING,
        functionName: 'totalSupply',
        args: [],
        watch: true
    })
    const { data: data2, isSuccess: isSuccess2 } = useContractRead({
        address: CONTRACT_MONSTER_STAKING,
        abi: ABI_MONSTER_STAKING,
        functionName: 'totalSupply',
        args: [],
        watch: true
    })
    const totalStakeHuman = useMemo(() => {
        if (data) {
            return data as bigint
        }
        return 0n
    }, [data, isSuccess]);
    const totalStakeMonster = useMemo(() => {
        if (data2) {
            return data2 as bigint
        }
        return 0n
    }, [data2, isSuccess2]);

    // console.log(votePeriod)

    return { totalStakeHuman, totalStakeMonster }
}

export default useTotalStake