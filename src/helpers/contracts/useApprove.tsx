import { useEffect, useState } from 'react'
import { Address, useAccount, useContractWrite } from 'wagmi'
import { ABI_TOKEN, CONTRACT_MTC_OLD, CONTRACT_TOKEN } from 'environments'
import useAllowance from './useAllowance'

interface IUseApprove {
    spender: Address,
    amount?: string,
    isOldToken?: boolean
}
const AMOUNT_TOKEN = "1000000000000000000";
const useApprove = ({ spender, amount, isOldToken }: IUseApprove) => {
    const { address } = useAccount()
    const [isApprove, setIsApprove] = useState(false)
    const { allowances, isAllowanceSuccess } = useAllowance({
        spender
    })
    const { write, isLoading, isSuccess } = useContractWrite({
        address: isOldToken ? CONTRACT_MTC_OLD : CONTRACT_TOKEN,
        abi: ABI_TOKEN,
        functionName: 'approve',
        args: [spender, amount || AMOUNT_TOKEN]
    })
    const onApprove = () => {
        try {
            if (!write) {
                return;
            }
            write()
        } catch (error) {
            console.log("error approve", error)
        }
    }
    useEffect(() => {
        setIsApprove(false)
    }, [address])
    useEffect(() => {
        if (isSuccess) {
            setIsApprove(true)
            return;
        }
        if (isAllowanceSuccess && allowances > 0) {
            setIsApprove(true)
        }
    }, [allowances, isAllowanceSuccess, isSuccess]);

    return { isApprove, onApprove, isLoadingApprove: isLoading }
}

export default useApprove