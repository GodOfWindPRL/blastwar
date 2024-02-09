import { ABI_VOTE, CONTRACT_VOTE } from 'environments'
import { notifyToastify } from 'helpers/notifyToastify'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

const useClaim = (day: number) => {
    const { t } = useTranslation()
    const { write, isLoading, isSuccess, isError, data } = useContractWrite({
        address: CONTRACT_VOTE,
        abi: ABI_VOTE,
        functionName: 'claim',
        args: [day]
    })

    const { status } = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash
    })

    const onClaim = () => {
        try {
            if (!write) {
                return;
            }
            write()
        } catch (error) {
            console.log("error join", error)
        }
    }

    useEffect(() => {
        if (status === "error") {
            notifyToastify("error", t("claimError"))
        }
        if (status === "success") {
            notifyToastify("success", t("claimSuccess"))
        }
    }, [status])

    return { onClaim, isLoadingClaim: isLoading || (isSuccess && status === "loading"), isSuccess: status === "success", isError }
}

export default useClaim