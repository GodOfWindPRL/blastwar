import { Address } from 'wagmi'
import ABI_SALE from 'environments/abi/abi-sale.json'

const CONTRACT_SALE = process.env.REACT_APP_CONTRACT_SALE as Address


export {
    CONTRACT_SALE,
    ABI_SALE
}

