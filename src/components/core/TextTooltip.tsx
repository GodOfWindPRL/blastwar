import configColor from 'constants/configColor'
import { useTranslation } from 'react-i18next'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import styled from 'styled-components'

interface IEnsName {
    text: string,
    className?: string,
    tooltip: string,
    place?: "top" | "bottom",
    hasLink?: string,
    children?: any,
    hasIcon?: boolean
}

const TextTooltip = ({ text, className, tooltip, place = "bottom", hasLink, children, hasIcon }: IEnsName) => {
    const rdId = Math.floor(Math.random() * 10000);
    const { t } = useTranslation()

    return <Wrap className={className} >
        <a id={`name-tooltip-${rdId}`} >{children || t(text)}{hasIcon && <AiOutlineInfoCircle className='color-white size-4' />}</a>
        <Tooltip anchorSelect={`#name-tooltip-${rdId}`} place={place} className={`tool-tip`} clickable={hasLink ? true : false}>
            {!hasLink ? <span className="size-0 color-white span-tool-tip" onClick={(e) => { e.stopPropagation() }}>{t(tooltip)}</span>
                : <a className="size-0 color-white span-tool-tip" href={hasLink} onClick={(e) => { e.stopPropagation() }}>{t(tooltip)}</a>}
        </Tooltip>
    </Wrap>
}

export default TextTooltip;


const Wrap = styled.span`
    cursor: pointer;
    > a {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .tool-tip {
        background-color: ${configColor.gray};
        .span-tool-tip {
            display: flex;
            align-items: center;
            max-width: 300px;
        }
        .span-tool-tip:hover {
            color: ${configColor.yellow};
        }
    }
`