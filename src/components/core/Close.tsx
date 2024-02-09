
import configColor from 'constants/configColor'
import styled from 'styled-components'

interface IClose {
    className?: string
    fixSize?: boolean
}
const Close = ({ fixSize = false }: IClose) => {

    return (
        <Wrap className={`className ${fixSize && "fix-size"}`}>
            <div>
                <div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </Wrap>
    )
}

export default Close

const Wrap = styled.div`
    max-width: 100%;
    width: 100%;
    padding-top: 100%;
    cursor: pointer;
    position: relative;
    &.fix-size {
        width: 30px;
    }
    > div {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;  
        > div {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            position: relative;
            > div {
                width: 60%;
                height: 7%;
                background-color: ${configColor.white};
                border-radius: 20px;
                position: absolute;
                top: 50%;
                left: 20%;
                /* left: 50%; */
                &:first-child {
                    transform: rotate(45deg) translate(-3.5%, -50%);
                }
                &:last-child {
                    /* margin-top: -10%; */
                    transform: rotate(-45deg) translate(3.5%, -50%);
                }
            }
        }
        
    }
    &:hover {
        > div {
            > div {
                > div {
                    background-color: ${configColor.yellow};
                }
            }
        }
    }
`