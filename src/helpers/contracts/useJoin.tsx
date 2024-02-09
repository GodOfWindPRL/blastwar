import { ABI_REGISTER, CONTRACT_REGISTER } from 'environments'
import { useEffect, useState } from 'react'
import { useAccount,  useContractWrite } from 'wagmi'

interface IJoin {
    sponsor: string
}

const useJoin = ({ sponsor }: IJoin) => {
    const { address } = useAccount();
    const [isJoin, setIsJoin] = useState(false);

    const { write, isLoading, isSuccess } = useContractWrite({
        address: CONTRACT_REGISTER,
        abi: ABI_REGISTER,
        functionName: 'register',
        args: [sponsor]
    })
    const onJoin = () => {
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
        if (isSuccess) {
            setIsJoin(true)
            return;
        }
    }, [isSuccess])
    return { onJoin, isLoadingJoin: isLoading, isJoin }
}

export default useJoin