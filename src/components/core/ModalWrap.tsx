import styled from 'styled-components'
import { useEffect, useState } from 'react'
import Close from './Close';
import { breakpointsMedias } from 'constants/breakpoints';
import configColor from 'constants/configColor';

interface IModalWrap {
    onClose: () => void,
    children: React.ReactElement;
    showCloseBt?: boolean,
    clickOutsideToClose?: boolean,
    maxZ?: boolean,
    onTop?: boolean,
    offEffect?: boolean
}

const ModalWrap = ({ onClose, children, showCloseBt = true, clickOutsideToClose = true, maxZ, onTop, offEffect }: IModalWrap) => {
    const [visible, setVisible] = useState<boolean>(false);
    useEffect(() => {
        setVisible(true);
        document.documentElement.style.overflow = "hidden";
        return () => {
            document.documentElement.style.overflow = "auto"
        }
    }, []);

    return (
        <Wrap onClick={(e) => { e.stopPropagation(); clickOutsideToClose && onClose() }} className={`${maxZ ? "max-z" : ""}`}>
            <div className={`modal-wrap ${onTop ? "modal-wrap-2" : ""} ${visible && "no-fade"} ${offEffect && "off-effect"}`} onClick={(e: any) => { e.stopPropagation() }}>
                <div className='modal-wrap-content'>
                    {showCloseBt && <div className="modal-close" onClick={onClose}>
                        <Close />
                    </div>}
                    <div className="modal-container">
                        {children}
                    </div>
                </div>
            </div>
        </Wrap>
    )
}

export default ModalWrap

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    justify-content: flex-start;
    align-items: center;
    background-color: #000000a5;
    z-index: 666;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 100px 0 120px 0;
    -webkit-transform: translate3d(0,0,1px);
    transform: translate3d(0,0,1px);
    cursor: default;
    &.max-z {
        z-index: 667;
    }
    .modal-wrap {
        margin: auto;
        transition: 0.8s;
        opacity: 0;
        transform: translateY(50px);
        &.no-fade {
            opacity: 1;
            transform: unset;
        }
        &.off-effect {
            transform: unset;
            opacity: 1;
        }
        .modal-wrap-content {
            border-radius: 8px;
            display: flex;
            justify-content: center;
            position: relative;
            background-color: ${configColor.gray};
            .modal-close {
                position: absolute;
                top: 8px;
                right: 8px;
                cursor: pointer;
                width: 36px;
                height: 36px;
                padding: 6px;
                z-index: 1;
            }
            .modal-container {
            }   
        }   
    }
    span {
        white-space: normal;
    }
    .modal-wrap-2 {
        margin: 0 auto 10% auto;
    }
    ${breakpointsMedias.min1200} {
        .modal-wrap {
            .modal-wrap-content {
                .modal-close {
                    width: 40px;
                    height: 40px;
                }
            }   
        }
    }
`