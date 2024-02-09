import { ABI_LIQUID_MINING, CONTRACT_LIQUID_MINING } from 'environments'
import { notifyToastify } from 'helpers/notifyToastify'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { parseEther } from 'viem'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

interface IClaimPool {
    listPool: (number | null)[]
}

const convertFee = "0.0008";

const useClaimPool = ({ listPool }: IClaimPool) => {
    const { t } = useTranslation()
    const { write, isLoading, isSuccess, isError, data } = useContractWrite({
        address: CONTRACT_LIQUID_MINING,
        abi: ABI_LIQUID_MINING,
        functionName: 'claim',
        args: [listPool],
        value: parseEther(convertFee)
    })

    const { status } = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash
    })

    const onClaimPool = () => {
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
            notifyToastify("error", t("claimPoolError"))
        }
        if (status === "success") {
            notifyToastify("success", t("claimPoolSuccess"))
        }
    }, [status])

    useEffect(() => {
        if (isError) {
            notifyToastify("error", t("claimPoolError"))
        }
    }, [isError])

    return { onClaimPool, isLoadingClaimPool: isLoading || (isSuccess && status === "loading"), isSuccess: status === "success", isError }
}

export default useClaimPool