import { Address } from 'wagmi'
import ABI_REGISTER from 'environments/abi/abi-register.json'
import ABI_MEMBER from 'environments/abi/abi-member.json'
import ABI_TOKEN from 'environments/abi/abi-token.json'
import ABI_VOTE from 'environments/abi/abi-vote.json'
import ABI_DATA from 'environments/abi/abi-data.json'
import ABI_MTC from 'environments/abi/abi-mtc.json'
import ABI_PANCAKE from 'environments/abi/abi-pancake.json'
import ABI_CONVERT from 'environments/abi/abi-convert.json'
import ABI_LIQUID_MINING from 'environments/abi/abi-liquid-mining.json'
import ABI_MULTI from 'environments/abi/abi-multi.json'
import ABI_KEY from 'environments/abi/abi-key.json'

const CONTRACT_TOKEN = process.env.REACT_APP_CONTRACT_TOKEN_USD as Address
const CONTRACT_MEMBER = process.env.REACT_APP_CONTRACT_MEMBER as Address
const CONTRACT_REGISTER = process.env.REACT_APP_CONTRACT_REGISTER as Address
const CONTRACT_VOTE = process.env.REACT_APP_CONTRACT_VOTE as Address
const CONTRACT_DATA = process.env.REACT_APP_CONTRACT_DATA as Address
const CONTRACT_MTC = process.env.REACT_APP_CONTRACT_MTC as Address
const CONTRACT_MTC_OLD = process.env.REACT_APP_CONTRACT_MTC_OLD as Address
const CONTRACT_PANCAKE = process.env.REACT_APP_CONTRACT_PANCAKE as Address
const CONTRACT_USDT = process.env.REACT_APP_CONTRACT_USDT as Address
const CONTRACT_CONVERT = process.env.REACT_APP_CONTRACT_CONVERT as Address
const FEE_ADRESS = process.env.REACT_APP_FEE_ADDRESS as Address
const GLOBAL_FUND_ADDRESS = process.env.REACT_APP_GLOBAL_FUND_ADDRESS as Address
const FEE_MATCH_ADDRESS = process.env.REACT_APP_FEE_MATCH_ADDRESS as Address
const CONTRACT_POOL = process.env.REACT_APP_CONTRACT_POOL as Address
const CONTRACT_LIQUID_MINING = process.env.REACT_APP_CONTRACT_LIQUID_MINING as Address
const CONTRACT_MULTI = process.env.REACT_APP_CONTRACT_MULTI as Address
const CONTRACT_KEY = process.env.REACT_APP_CONTRACT_KEY as Address

export {
    CONTRACT_TOKEN,
    CONTRACT_MEMBER,
    CONTRACT_REGISTER,
    CONTRACT_VOTE,
    CONTRACT_DATA,
    CONTRACT_MTC,
    CONTRACT_PANCAKE,
    CONTRACT_USDT,
    CONTRACT_LIQUID_MINING,
    CONTRACT_POOL,
    CONTRACT_MTC_OLD,
    CONTRACT_CONVERT,
    FEE_ADRESS,
    GLOBAL_FUND_ADDRESS,
    FEE_MATCH_ADDRESS,
    CONTRACT_MULTI,
    CONTRACT_KEY,
    ABI_REGISTER,
    ABI_MEMBER,
    ABI_TOKEN,
    ABI_VOTE,
    ABI_DATA,
    ABI_MTC,
    ABI_PANCAKE,
    ABI_CONVERT,
    ABI_LIQUID_MINING,
    ABI_MULTI,
    ABI_KEY
}

