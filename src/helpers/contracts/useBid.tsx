import { ABI_SALE, CONTRACT_SALE } from 'environments'
import { notifyToastify } from 'helpers/notifyToastify'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

const useBid = (e: bigint) => {
    const { t } = useTranslation()
    const { write, isLoading, isSuccess, isError, data, error } = useContractWrite({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'bid',
        args: [],
        value: e
    })
    const { status } = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash
    })

    const onBid = () => {
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
            notifyToastify("error", t("bidError"))
        }
        if (status === "success") {
            notifyToastify("success", t("bidSuccess"))
        }
    }, [status])

    return { onBid, isLoadingBid: isLoading || (isSuccess && status === "loading"), isSuccess: status === "success", isError }
}

export default useBid