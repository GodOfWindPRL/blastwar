import { ABI_SALE, CONTRACT_SALE } from 'environments'
import { notifyToastify } from 'helpers/notifyToastify'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

const useClaim = () => {
    const { t } = useTranslation()
    const { write, isLoading, isSuccess, isError, data, error } = useContractWrite({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'claim',
        args: [],
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
        } catch (error: any) {
            notifyToastify("error", error.message)
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