import { ABI_HUMAN_STAKING, ABI_MONSTER_STAKING, ABI_SALE, CONTRACT_HUMAN_STAKING, CONTRACT_MONSTER_STAKING, CONTRACT_SALE } from 'environments'
import { notifyToastify } from 'helpers/notifyToastify'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount, useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi'

const useClaimReward = () => {
    const { t } = useTranslation();
    const { address } = useAccount();

    const { data: dataHuman, isSuccess: isSuccessHuman } = useContractRead({
        address: CONTRACT_HUMAN_STAKING,
        abi: ABI_HUMAN_STAKING,
        functionName: 'earned',
        args: [address || ""],
        watch: true
    })
    const { data: dataMonster, isSuccess: isSuccessMonster } = useContractRead({
        address: CONTRACT_MONSTER_STAKING,
        abi: ABI_MONSTER_STAKING,
        functionName: 'earned',
        args: [address || ""],
        watch: true
    })

    const { write, isLoading, isSuccess, isError, data, error } = useContractWrite({
        address: CONTRACT_HUMAN_STAKING,
        abi: ABI_HUMAN_STAKING,
        functionName: 'getReward',
        args: [],
    })
    const { write: write2, isLoading: isLoading2, isSuccess: isSuccess2, isError: isError2, data: data2, error: error2 } = useContractWrite({
        address: CONTRACT_MONSTER_STAKING,
        abi: ABI_MONSTER_STAKING,
        functionName: 'getReward',
        args: [],
    })
    const { status } = useWaitForTransaction({
        confirmations: 1,
        hash: data?.hash
    })
    const { status: status2 } = useWaitForTransaction({
        confirmations: 1,
        hash: data2?.hash
    })

    const earnedHuman = useMemo(() => {
        if (dataHuman) {
            return dataHuman as bigint
        }
        return 0n
    }, [dataHuman, isSuccessHuman]);
    const earnedMonster = useMemo(() => {
        if (dataMonster) {
            return dataMonster as bigint
        }
        return 0n
    }, [dataMonster, isSuccessMonster]);

    const onClaimReward = () => {
        try {
            if (write && BigInt(earnedHuman as any) > 0n) {
                write()
            }
        } catch (error: any) {
            notifyToastify("error", error.message)
        }
        try {
            if (write2 && BigInt(earnedMonster as any) > 0n) {
                write2()
            }
        } catch (error: any) {
            notifyToastify("error", error.message)
        }
    }

    useEffect(() => {
        if (status === "error") {
            notifyToastify("error", t("claimHumanRewardError"))
        }
        if (status === "success") {
            notifyToastify("success", t("claimHumanRewardSuccess"))
        }
    }, [status])

    useEffect(() => {
        if (status2 === "error") {
            notifyToastify("error", t("claimMonsterRewardError"))
        }
        if (status2 === "success") {
            notifyToastify("success", t("claimMonsterRewardSuccess"))
        }
    }, [status2])

    return { earnedHuman, earnedMonster, onClaimReward, isLoadingClaimReward: isLoading || (isSuccess && status === "loading"), isSuccess: status === "success", isError }
}

export default useClaimReward