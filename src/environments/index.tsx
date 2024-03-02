import { Address } from 'wagmi'
import ABI_SALE from 'environments/abi/abi-sale.json'
import ABI_NFT from 'environments/abi/abi-nft.json'
import ABI_TOKEN from 'environments/abi/abi-token.json'
import ABI_MONSTER_STAKING from 'environments/abi/abi-monster-staking.json'
import ABI_HUMAN_STAKING from 'environments/abi/abi-human-staking.json'
import ABI_GAME from 'environments/abi/abi-game.json'

const CONTRACT_SALE = process.env.REACT_APP_CONTRACT_SALE as Address
const CONTRACT_NFT = process.env.REACT_APP_CONTRACT_NFT as Address
const CONTRACT_TOKEN = process.env.REACT_APP_CONTRACT_TOKEN as Address
const CONTRACT_MONSTER_STAKING = process.env.REACT_APP_CONTRACT_MONSTER_STAKING as Address
const CONTRACT_HUMAN_STAKING = process.env.REACT_APP_CONTRACT_HUMAN_STAKING as Address
const CONTRACT_GAME = process.env.REACT_APP_CONTRACT_GAME as Address
const TWITTER_USERNAME = process.env.REACT_APP_TWITTER_USERNAME as String
const RETWEET_ID = process.env.REACT_APP_TWITTER_RETWEET_ID as String
const LINK_GG_SHEET = process.env.REACT_APP_LINK_GG_SHEET as String

export {
    CONTRACT_SALE,
    CONTRACT_NFT,
    CONTRACT_TOKEN,
    CONTRACT_MONSTER_STAKING,
    CONTRACT_HUMAN_STAKING,
    CONTRACT_GAME,
    ABI_SALE,
    ABI_NFT,
    ABI_TOKEN,
    ABI_MONSTER_STAKING,
    ABI_HUMAN_STAKING,
    ABI_GAME,
    TWITTER_USERNAME,
    RETWEET_ID,
    LINK_GG_SHEET
}

