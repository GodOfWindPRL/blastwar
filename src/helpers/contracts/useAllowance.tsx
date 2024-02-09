import { ABI_TOKEN, CONTRACT_MTC_OLD, CONTRACT_TOKEN } from 'environments'
import { useMemo } from 'react'
import { Address, useAccount, useContractRead } from 'wagmi'
interface IUseAllowance {
    spender: Address,
    isOldToken?: boolean
}
const useAllowance = ({ spender, isOldToken }: IUseAllowance) => {
    const { address } = useAccount()
    const { data, isSuccess } = useContractRead({
        address: isOldToken ? CONTRACT_MTC_OLD : CONTRACT_TOKEN,
        abi: ABI_TOKEN,
        functionName: 'allowance',
        args: [address, spender],
        watch: true
    })
    const allowances = useMemo(() => {
        if (!isSuccess) {
            return 0
        }
        return Number(data)
    }, [data, isSuccess])
    return { allowances, isAllowanceSuccess: isSuccess }
}

export default useAllowance