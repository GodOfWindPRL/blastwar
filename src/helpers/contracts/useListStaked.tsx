import { ABI_HUMAN_STAKING, ABI_MONSTER_STAKING, CONTRACT_HUMAN_STAKING, CONTRACT_MONSTER_STAKING } from 'environments'
import { useMemo } from 'react'
import { useAccount, useContractRead } from 'wagmi'

const useListStaked = () => {
    const { address } = useAccount();
    const { data: dataHuman, isSuccess: isSuccessHuman } = useContractRead({
        address: CONTRACT_HUMAN_STAKING,
        abi: ABI_HUMAN_STAKING,
        functionName: 'getPosition',
        args: [address || ""],
        watch: true
    })
    const { data: dataMonster, isSuccess: isSuccessMonster } = useContractRead({
        address: CONTRACT_MONSTER_STAKING,
        abi: ABI_MONSTER_STAKING,
        functionName: 'getPosition',
        args: [address || ""],
        watch: true
    })
    const listStakedHuman = useMemo(() => {
        if (dataHuman) {
            return dataHuman as number[]
        }
        return []
    }, [dataHuman, isSuccessHuman]);
    const listStakedMonster = useMemo(() => {
        if (dataMonster) {
            return dataMonster as number[]
        }
        return []
    }, [dataMonster, isSuccessMonster]);

    // console.log(votePeriod)

    return { listStakedHuman, listStakedMonster }
}

export default useListStaked