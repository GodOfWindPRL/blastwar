import { ABI_VOTE, CONTRACT_VOTE } from 'environments'
import { notifyToastify } from 'helpers/notifyToastify'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useContractWrite, useWaitForTransaction } from 'wagmi'

const useVote = () => {
    const { t } = useTranslation()
    const { write, isLoading, isSuccess, isError, data, error } = useContractWrite({
        address: CONTRACT_VOTE,
        abi: ABI_VOTE,
        functionName: 'vote',
        args: [],
        gas: 600000n
    })

    const { status } = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash
    })

    const onVote = () => {
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
            notifyToastify("error", t("voteError"))
        }
        if (status === "success") {
            notifyToastify("success", t("voteSuccess"))
        }
    }, [status])

    useEffect(() => {
        if (error) {

            const errorActive = "Must be active vote"
            const shortError = error.message.slice(65, 65 + errorActive.length);

            if (shortError === errorActive) {
                notifyToastify("error", t("epochNotActive"))
            } else {
                notifyToastify("error", t("voteError"))
            }

        }
    }, [error])

    return { onVote, isLoadingVote: isLoading || (isSuccess && status === "loading"), isSuccess: status === "success", isError }
}

export default useVote