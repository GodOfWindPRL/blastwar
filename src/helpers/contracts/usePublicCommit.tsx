import { ABI_SALE, CONTRACT_SALE } from 'environments'
import { notifyToastify } from 'helpers/notifyToastify'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { parseEther } from 'viem'
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import { MINT_PRICE } from './useWhitelistCommit'

const usePublicCommit = () => {
    const { t } = useTranslation()
    const { write, isLoading, isSuccess, isError, data } = useContractWrite({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'publicCommit',
        args: [],
        value: parseEther(MINT_PRICE)
    })
    const { status } = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash
    })

    const onCommit = () => {
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
            notifyToastify("error", t("commitError"))
        }
        if (status === "success") {
            notifyToastify("success", t("commitSuccess"))
        }
    }, [status])

    return { onCommit, isLoadingCommit: isLoading || (isSuccess && status === "loading"), isSuccess: status === "success", isError }
}

export default usePublicCommit