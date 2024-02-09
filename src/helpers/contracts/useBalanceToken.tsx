import { useMemo } from 'react'
import { Address, useAccount, useBalance } from 'wagmi'

interface IUseBalance {
    token: Address,
    target?: Address
}

const useBalanceToken = ({ token, target }: IUseBalance) => {
    const { address } = useAccount()
    const { data } = useBalance({
        address: target || address,
        token: token,
        watch: true
    })

    const balance = useMemo(() => {
        if (!!data) {
            return Number(data?.value)
        }
        return 0
    }, [data])

    const balanceBigInt = useMemo(() => {
        if (!!data) {
            return data?.value
        }
        return 0n
    }, [data])

    const balanceString = useMemo(() => {
        if (!!data) {
            return data?.formatted
        }
        return "0"
    }, [data])
    return { balance, balanceBigInt, balanceString }
}

export default useBalanceToken