import { useMemo } from 'react'
import { Address, useAccount, useBalance } from 'wagmi'

const useBalanceNative = () => {
    const { address } = useAccount();
    const { data } = useBalance({
        address: address as Address,
        watch: true
    })

    const balance = useMemo(() => {
        if (!!data) {
            return data?.value
        }
        return 0n
    }, [data])

    return { balance }
}

export default useBalanceNative