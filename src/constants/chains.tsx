import { Chain } from 'viem'

export const BLAST_CHAIN = process.env.REACT_APP_CHAIN || "" as string

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

export const blastMainnet = {
    id: 81457,
    name: 'Blast Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc.blast.io'] },
        public: { http: ['https://rpc.blast.io'] },
    },
    blockExplorers: {
        default: { name: 'Blastscan', url: 'https://blastscan.io' },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            // blockCreated: 367826,
        },
    },
    network: "Blast",
    testnet: false,
} as Chain

export const chains = [BLAST_CHAIN === "testnet" ? blastTestnet : blastMainnet];