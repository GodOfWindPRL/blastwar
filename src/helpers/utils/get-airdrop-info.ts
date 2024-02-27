import { whitelist } from "whitelist";
import { genRootHash, getMerklePath } from "./merkleTree";
import { loadWhitelist } from "helpers/loadWhitelist";

export const getAirdropPath = async (address: any) => {
  // Generate Merkle Tree
  genRootHash(loadWhitelist(whitelist));

  // Get path
  let path = getMerklePath(address);
  // console.log(`Airdrop path for address ${address}: ${path}`);
  return path;
};

// getAirdropPath("0x5B38Da6a701c568545dCfcB03FcB875f56beddC4");

// 0x43e538d0a390c77a6f119dad6491fbf7da0520ad702c2020f386e1de980386c7

// [
//   "0x999bf57501565dbd2fdcea36efa2b9aef8340a8901e3459f4a4c926275d36cdb",
//   "0x4726e4102af77216b09ccd94f40daa10531c87c4d60bba7f3b3faf5ff9f19b3c",
//   "0xc3f7f7da4008391d64220cec983630eba59dd26421bb7f972a50ba013aee7e00",
// ];
