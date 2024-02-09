import { ABI_LIQUID_MINING, CONTRACT_LIQUID_MINING } from 'environments'
import { notifyToastify } from 'helpers/notifyToastify'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { parseEther } from 'viem'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

interface IConvert {
    amount: string
}

const convertFee = "0.0008";

const useAddLiquid = ({ amount }: IConvert) => {
    const { t } = useTranslation()
    const { write, isLoading, isSuccess, isError, data } = useContractWrite({
        address: CONTRACT_LIQUID_MINING,
        abi: ABI_LIQUID_MINING,
        functionName: 'join',
        args: [parseEther(amount)],
        value: parseEther(convertFee),
        gas: 500000n
    })

    const { status } = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash
    })

    const onAddLiquid = () => {
        try {
            if (!write) {
                return;
            }
            write();
        } catch (error) {
            console.log("error join", error)
        }
    }

    useEffect(() => {
        if (status === "error") {
            notifyToastify("error", t("joinFarmingError"))
        }
        if (status === "success") {
            notifyToastify("success", t("joinFarmingSuccess"))
        }
    }, [status])

    useEffect(() => {
        if (isError) {
            notifyToastify("error", t("joinFarmingError"))
        }
    }, [isError])


    return { onAddLiquid, isLoadingAddLiQuid: isLoading || (isSuccess && status === "loading"), isSuccess: status === "success", isError }
}

export default useAddLiquid