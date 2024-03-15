import { ABI_TOKEN } from 'environments'
import { notifyToastify } from 'helpers/notifyToastify';
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { parseEther } from 'viem';
import { Address, useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi'

interface IUseApproveToken {
    token: Address,
    spender: Address,
    value: BigInt
}

const useApproveToken = ({ token, spender, value }: IUseApproveToken) => {
    const { address } = useAccount();
    const { t } = useTranslation()
    const { data, isSuccess } = useContractRead({
        address: token,
        abi: ABI_TOKEN,
        functionName: 'allowance',
        args: [address, spender],
        watch: true
    })

    const allowance = useMemo(() => {
        if (data) {
            return data as BigInt
        }
        return 0n
    }, [data, isSuccess]);

    const { write, isLoading, data: dataApprove, error } = useContractWrite({
        address: token,
        abi: ABI_TOKEN,
        functionName: 'approve',
        args: [spender, parseEther("1000000000")],
    })
    const { status } = useWaitForTransaction({
        confirmations: 1,
        hash: dataApprove?.hash
    })

    const onApproveToken = () => {
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

    const isApproved = useMemo(() => {
        return status === "success" || (allowance >= value)
    }, [allowance, status]);

    // console.log(votePeriod)

    return { isApproved, onApproveToken, isLoadingApprove: isLoading || (isSuccess && status === "loading") }
}

export default useApproveToken