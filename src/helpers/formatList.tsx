export const formatListStaking = (e: bigint[]) => {
    let newList = e.map((item) => {
        return Number(item)
    })
    return newList
}