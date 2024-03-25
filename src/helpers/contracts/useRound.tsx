import { ABI_SALE, CONTRACT_SALE } from 'environments'
import { useMemo } from 'react'
import { useContractRead } from 'wagmi'

export const MAX_SUPPLY = Number(process.env.REACT_APP_MAX_SUPPLY || 0)

const useRound = () => {
    const { data, isSuccess } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'enable',
        args: [],
        watch: true
    })
    const { data: dataTotalCommitted, isSuccess: totalCmtSuccess } = useContractRead({
        address: CONTRACT_SALE,
        abi: ABI_SALE,
        functionName: 'totalCommitted',
        args: [],
        watch: true
    })

    const totalCommitted = useMemo(() => {
        if (dataTotalCommitted) {
            return dataTotalCommitted as bigint
        }
        return 0n
    }, [dataTotalCommitted, totalCmtSuccess]);

    const enableSale = useMemo(() => {
        // console.log(data)
        if (data) {
            return data as boolean
        }
        return false
    }, [data, isSuccess]);


    return { enableSale, totalCommitted }
}

export default useRound