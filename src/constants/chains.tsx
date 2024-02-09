import { Chain, defineChain } from 'viem'

export const blastTestnet = {
    id: 168587773,
    name: 'Blast Sepolia',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://sepolia.blast.io'] },
        public: { http: ['https://sepolia.blast.io'] },
    },
    blockExplorers: {
        default: { name: 'Blastscan', url: 'https://testnet.blastscan.io' },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 14353601,
        },
    },
    network: "Blast",
    testnet: true,
} as Chain

export const chains = [blastTestnet];