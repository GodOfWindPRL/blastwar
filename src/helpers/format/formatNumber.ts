import BigNumber from "bignumber.js";
import numeral from "numeral";

// ----------------------------------------------------------------------

export function fNumber(number: any) {
  return numeral(number).format();
}

export function formatCustom(number: any, type: string = "0,0.[00]") {
  return numeral(number).format(type, Math.floor);
}

export function formatNumber(number: BigNumber.Value, decimal: number = 1e18) {
  const format = number
    ? new BigNumber(number).div(decimal).toNumber() < 1e-6
      ? 0
      : new BigNumber(number).div(decimal).toNumber()
    : 0;
  return format;
}

export function formatDataNormal(e: bigint, format?: string) {
  return BigNumber(e.toString()).dividedBy(1e18).toString(10);
}

