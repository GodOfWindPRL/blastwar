import { ABI_HUMAN_STAKING, ABI_MONSTER_STAKING, ABI_NFT, ABI_SALE, CONTRACT_HUMAN_STAKING, CONTRACT_MONSTER_STAKING, CONTRACT_NFT, CONTRACT_SALE } from 'environments'
import { notifyToastify } from 'helpers/notifyToastify'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

const useWithdraw = (list: number[], type: "human" | "monster") => {
    const { t } = useTranslation()
    const { write, isLoading, isSuccess, isError, data, error } = useContractWrite({
        address: type === "human" ? CONTRACT_HUMAN_STAKING : CONTRACT_MONSTER_STAKING,
        abi: type === "human" ? ABI_HUMAN_STAKING : ABI_MONSTER_STAKING,
        functionName: 'withdraw',
        args: [list],
    })
    const { status } = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash
    })

    const onWithdraw = () => {
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
            notifyToastify("error", t("withdrawError"))
        }
        if (status === "success") {
            notifyToastify("success", t("withdrawSuccess"))
        }
    }, [status])

    return { onWithdraw, isLoadingWithdraw: isLoading || (isSuccess && status === "loading"), isSuccess: status === "success", isError }
}

export default useWithdraw