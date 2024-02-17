import { useWeb3Modal } from '@web3modal/wagmi/react'
import iconNetwork from 'assets/images/icon-network.svg'
import Button from 'components/core/Button'
import { subStringAddress } from 'helpers/format/subStringAddress'
import { useTranslation } from 'react-i18next'
import { AiOutlinePoweroff } from 'react-icons/ai'
import styled from 'styled-components'
import { useAccount, useDisconnect, useSwitchNetwork } from 'wagmi'
import { useContext } from 'react'
import { NetworkContext } from 'contexts/NetworkContext'
import bgBtWallet from 'assets/images/bg-bt-wallet.png'
import { PiWallet } from "react-icons/pi";
import { breakpointsMedias } from 'constants/breakpoints'


const Wallet = () => {
    const { disconnect } = useDisconnect()
    //switch network
    const { chains } = useSwitchNetwork()
    const { t } = useTranslation()
    const { isBlast } = useContext(NetworkContext)
    const { open } = useWeb3Modal()
    const { isConnected, address } = useAccount()

    return (
        <Wrap className='cursor-pointer'>
            {
                (isConnected) ?
                    !isBlast ?
                        <div className='flex items-center w-full gap-[16px] px-[20px]' onClick={() => disconnect()}>
                            <AiOutlinePoweroff size={32} color='red' className='bt-dis'/>
                            <div className='flex flex-col gap-[4px]'>
                                <span className="text-1 color-red uppercase ">{t("wrongNetwork")}</span>
                                <span className="text-3 color-red uppercase ">{`(${chains.length && chains[0].name})`}</span>
                            </div>
                        </div>
                        :
                        <div className='flex items-center w-full gap-[16px] px-[24px]' onClick={() => open()} >
                            <div  >
                                <img alt="network" className='w-[40px] h-[40px]' src={iconNetwork} />
                            </div>
                            <span className='color-black text-3'> {subStringAddress(address)}</span>
                        </div>
                    :
                    <div onClick={() => open()} className='flex items-center w-full gap-[16px] px-[24px]'>
                        <PiWallet size={40} color='black' />
                        <div className='flex flex-col'>
                            <span className="text-1 color-black uppercase">{t("connect")}</span>
                            <span className="text-3 color-black uppercase">{t("wallet")}</span>
                        </div>
                    </div>
            }
        </Wrap>
    )
}

export default Wallet

const Wrap = styled.div`
    width: 241px;
    height: 77px;
    position: absolute;
    top: 80px;
    right: 40px;
    display: flex;
    background-image: url(${bgBtWallet});
    background-size: 100% 100%;
    background-position: center;
    ${breakpointsMedias.max991} {
        width: 241px;
        height: 77px;
        position: fixed;
        top: 70px;
        right: -165px;
        transition: 0.3s ease-in-out;
        &:hover {
            right: 0; 
        }
        .bt-dis {
            margin: 0 10px;
        }
    }
`