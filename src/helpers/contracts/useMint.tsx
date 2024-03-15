import { ABI_GAME, CONTRACT_GAME } from 'environments'
import { notifyToastify } from 'helpers/notifyToastify'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

const useMint = () => {
    const { t } = useTranslation()
    const { write, isLoading, isSuccess, isError, data, error } = useContractWrite({
        address: CONTRACT_GAME,
        abi: ABI_GAME,
        functionName: 'mint',
        args: [],
    })
    const { status } = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash
    })

    const onMint = () => {
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
            notifyToastify("error", t("mintError"))
        }
        if (status === "success") {
            notifyToastify("success", t("mintSuccess"))
        }
    }, [status])

    useEffect(() => {
        if (error) {
            notifyToastify("error", error.message)
        }
    }, [error])


    return { onMint, isLoadingMint: isLoading || (isSuccess && status === "loading"), isSuccess: status === "success", isError }
}

export default useMint