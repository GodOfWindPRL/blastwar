import { ABI_CONVERT, CONTRACT_CONVERT } from 'environments'
import { notifyToastify } from 'helpers/notifyToastify'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { parseEther } from 'viem'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

interface IConvert {
    amount: string
}

const convertFee = "0.0008"

const useConvert = ({ amount }: IConvert) => {
    const { t } = useTranslation()
    const { write, isLoading, isSuccess, isError, data } = useContractWrite({
        address: CONTRACT_CONVERT,
        abi: ABI_CONVERT,
        functionName: 'convert',
        args: [amount],
        value: parseEther(convertFee)
    })

    const { status } = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash
    })

    const onConvert = () => {
        try {
            if (!write) {
                return;
            }
            write()
        } catch (error) {
            console.log("error convert", error)
        }
    }

    useEffect(() => {
        if (status === "error") {
            notifyToastify("error", t("convertError"))
        }
        if (status === "success") {
            notifyToastify("success", t("convertSuccess"))
        }
    }, [status])

    return { onConvert, isLoadingConvert: isLoading || (isSuccess && status === "loading"), isSuccess: status === "success", isError }
}

export default useConvert