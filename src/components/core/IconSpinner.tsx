import iconSpinner from 'assets/icons/icon-spinner.svg'
import styled, { keyframes } from 'styled-components'
import { breakpointsMedia } from 'constants/breakpoints'

const IconSpinner = () => {
    return (
        <Wrap>
            <img src={iconSpinner} />
        </Wrap>
    )
}

export default IconSpinner
const loadingKey = keyframes`
    0%{
        transform: rotate(0);
    }
    100%{
        transform: rotate(360deg);
    }
`
const Wrap = styled.div`
    width: 12px;
    height: 12px;
    animation: ${loadingKey} 2s linear infinite;
    img{
        width: 12px;
        height: 12px;
    }
    ${breakpointsMedia.mobile}{
        width: 16px;
        height: 16px;
        img{
            width: 16px;
            height: 16px;
        }
    }
`