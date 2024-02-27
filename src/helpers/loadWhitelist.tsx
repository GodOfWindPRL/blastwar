export const loadWhitelist = (e: string) => {
    let lines = e.split(/\r?\n/);
    let linesNoSpecial = lines.map((item) => {
        return item.replace(/[^a-zA-Z0-9 ]/g, "")
    })
    let linesNoSpace = linesNoSpecial.map((item) => {
        return item.replace(/\s/g, "")
    })
    let linesNoBlank = linesNoSpace.filter((item) => item !== "");
    return linesNoBlank as string[]
}