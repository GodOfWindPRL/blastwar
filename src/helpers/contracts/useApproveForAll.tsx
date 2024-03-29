import { ABI_NFT, CONTRACT_HUMAN_STAKING, CONTRACT_MONSTER_STAKING, CONTRACT_NFT } from 'environments'
import { notifyToastify } from 'helpers/notifyToastify'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

const useApproveForAll = (type: "human" | "monster") => {
    const { t } = useTranslation()
    const { write, isLoading, isSuccess, isError, data, error } = useContractWrite({
        address: CONTRACT_NFT,
        abi: ABI_NFT,
        functionName: 'setApprovalForAll',
        args: [type === "human" ? CONTRACT_HUMAN_STAKING : CONTRACT_MONSTER_STAKING, true],
    })
    const { status } = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash
    })

    const onApproveForAll = () => {
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
            notifyToastify("error", t("approveError"))
        }
        if (status === "success") {
            notifyToastify("success", t("approveSuccess"))
        }
    }, [status])

    return { onApproveForAll, isLoadingApprove: isLoading || (isSuccess && status === "loading"), isSuccess: status === "success", isError }
}

export default useApproveForAll