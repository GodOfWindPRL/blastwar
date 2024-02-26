import { ABI_HUMAN_STAKING, ABI_MONSTER_STAKING, ABI_NFT, ABI_SALE, CONTRACT_HUMAN_STAKING, CONTRACT_MONSTER_STAKING, CONTRACT_NFT, CONTRACT_SALE } from 'environments'
import { notifyToastify } from 'helpers/notifyToastify'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

const useStake = (list: number[], type: "human" | "monster") => {
    const { t } = useTranslation()
    const { write, isLoading, isSuccess, isError, data, error } = useContractWrite({
        address: type === "human" ? CONTRACT_HUMAN_STAKING : CONTRACT_MONSTER_STAKING,
        abi: type === "human" ? ABI_HUMAN_STAKING : ABI_MONSTER_STAKING,
        functionName: 'stake',
        args: [list.map(item => item.toString())],
    })
    const { status } = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash
    })

    const onStake = () => {
        try {
            if (!write) {
                return;
            }
            write()
        } catch (error: any) {
            notifyToastify("error", error.message)
        }
    }

    useEffect(() => {
        if (status === "error") {
            notifyToastify("error", t("stakeError"))
        }
        if (status === "success") {
            notifyToastify("success", t("stakeSuccess"))
        }
    }, [status])

    return { onStake, isLoadingStake: isLoading || (isSuccess && status === "loading"), isSuccess: status === "success", isError }
}

export default useStake