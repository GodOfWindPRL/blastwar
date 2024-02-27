import { ABI_NFT, CONTRACT_HUMAN_STAKING, CONTRACT_MONSTER_STAKING, CONTRACT_NFT } from 'environments'
import { useMemo } from 'react'
import { useAccount, useContractRead } from 'wagmi'

const useIsApproved = (type: "human" | "monster") => {
    const { address } = useAccount();
    const { data, isSuccess } = useContractRead({
        address: CONTRACT_NFT,
        abi: ABI_NFT,
        functionName: 'isApprovedForAll',
        args: [address || "", type === "human" ? CONTRACT_HUMAN_STAKING : CONTRACT_MONSTER_STAKING],
        watch: true
    })
    const isApproved = useMemo(() => {
        if (data) {
            return true
        }
        return false
    }, [data, isSuccess]);

    // console.log(votePeriod)

    return { isApproved }
}

export default useIsApproved