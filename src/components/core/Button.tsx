import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import LoadingSpinner from './LoadingSpinner'
import { breakpointsMedias } from 'constants/breakpoints'
import bgBt1 from 'assets/images/bt-left-1.png'
import bgBt2 from 'assets/images/bt-left-2.png'
import bgBt3 from 'assets/images/bt-left-3.png'
import bgBt4 from 'assets/images/bt-left-4.png'
import configColor from 'constants/configColor'

interface IB extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string,
    isLoading?: boolean,
    typeBt?: "green" | "white" | "yellow" | "red",
    className?: string,
    disabled?: boolean,
}

const Button = ({ text, isLoading = false, typeBt = "green", className, disabled = false, ...props }: IB) => {
    const { t } = useTranslation();
    return (
        <Wrap className={`${isLoading ? "bt-loading" : ""} bt-${typeBt} ${className}`} disabled={disabled || isLoading} {...props}>
            <img className='bt-left' src={bgBt1} />
            <div className='bt-mid'>
                <span className={`color-black uppercase text-3 text-center`}>
                    {!!isLoading ? <LoadingSpinner color='black' />
                        : t(text)}
                </span>
            </div>
            <img className='bt-left bt-right' src={bgBt1} />
        </Wrap>
    )
}
export default Button

const Wrap = styled.button`
    /* max-width: 100%; */
    width: 100%;
    height: 72px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: 100% 100%;
    background-position: center;
    .bt-left {
        height: 100%;
        width: auto;
        transition: all 0.2s ease-in-out;
    }
    .bt-right {
        transform: rotateY(180deg);
    }
    .bt-mid {
        height: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0px;
        transition: all 0.2s ease-in-out;
    }
    &.bt-green {
        .bt-mid {
            background-color: ${configColor.green};
        }
    }
    &.bt-white {
        .bt-mid {
            background-color: ${configColor.white};
        }
        .bt-left,
        .bt-right {
            content: url(${bgBt2});
        }
    }
    &.bt-red {
        .bt-mid {
            background-color: ${configColor.red};
        }
        .bt-left,
        .bt-right {
            content: url(${bgBt4});
        }
    }
    &.bt-yellow {
        .bt-mid {
            background-color: ${configColor.yellow};
        }
        .bt-left,
        .bt-right {
            content: url(${bgBt3});
        }
    }
    &:hover {
        .bt-left {
            transform: translateX(-5px);
        }
        .bt-right {
            transform: rotateY(180deg) translateX(-5px);
        }
        .bt-mid {
            border-radius: 8px;
        }
    }

    &:disabled{
        opacity: 0.4;
        cursor: not-allowed;
    }
    &.bt-loading {
        opacity: 0.4;
        cursor: not-allowed;
        :hover {

        }
    }
    @keyframes rotate-center-2 {
        0% {
            transform: rotate(0);
        }
        100% {
           transform: rotate(360deg);
        }
    }
    ${breakpointsMedias.max1199} {
       
    }
`