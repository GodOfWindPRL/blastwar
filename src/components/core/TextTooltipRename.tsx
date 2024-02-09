import { memo, useId } from "react";
import { useTranslation } from "react-i18next";
// import { AiOutlineInfoCircle } from "react-icons/ai";
import { PlacesType, Tooltip as ReactTooltip } from "react-tooltip";
import styled from "styled-components";
import iconTT from "assets/images/icon-tooltip.png";
import iconTT2 from "assets/images/icon-tooltip-2.png";
import { breakpointsMedias } from "constants/breakpoints";

interface TextTooltipProps {
  text: string;
  tooltipContent: string;
  colorType?: "gray" | "white" | "red";
  place?: PlacesType;
  sizeText?: 21 | 1 | 2 | 0;
  className?: string;
  link?: string;
  textLink?: string,
  disabled?: boolean;
}

const TextToolTipRename = ({
  text,
  tooltipContent,
  colorType = "white",
  place = "top",
  sizeText = 21,
  className,
  link,
  textLink,
  disabled = false,
}: TextTooltipProps) => {
  const { t } = useTranslation();
  const id = Math.random() * 1000 + "";
  const rdId = id + text[0] + text[text.length - 1]
  console.log({ tooltipContent })

  return link ? (
    <Wrap className={`${className}`}>
      <p className={`size-${sizeText} color-${colorType}`}>
        {t(text)}
        <span id={rdId} data-tooltip-place={place}>
          <img src={iconTT} alt="" />
        </span>
      </p>
      <ReactTooltip
        anchorSelect={`#${rdId}`}
        className="tt-tooltip size-0 tt-link"
        clickable
      >
        <span>{t(tooltipContent) ?? ""}</span>
        <br />
        <a href={link} target="_blank" rel="noreferrer" className="color-green">
          {t(textLink || "viewDetail")}
        </a>
      </ReactTooltip>
    </Wrap>
  ) : (
    <Wrap className={`${className}`}>
      <p className={`size-${sizeText} color-${colorType}`}>
        {t(text)}
        <span
          data-tooltip-id={id}
          data-tooltip-content={t(tooltipContent) ?? ""}
          data-tooltip-place={place}
          className="ttr-info-text"
        >
          <img className="ttr-img" src={iconTT} alt="" />
        </span>
      </p>
      {!disabled && <ReactTooltip id={id} className="tt-tooltip size-0" />}
    </Wrap>
  );
};

export default memo(TextToolTipRename);
const Wrap = styled.div`
  p {
    display: flex;
    align-items: center;
    span,
    a {
      margin-left: 8px;
      /* margin-top: 3px; */
      color: #111;
      display: flex;
      align-items: center;
      /* svg {
        cursor: help;
      } */
      img {
        width: 24px;
        height: 24px;
        cursor: help;
        &:hover {
          content: url(${iconTT2});
        }
      }
    }
    ${breakpointsMedias.max767} {
      span {
        img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
  .tt-tooltip {
    max-width: 80vw;
    white-space: pre-line;
    font-family: "Avenir-Regular";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    z-index: 1;
    background-color: #111 !important;
    opacity: 1;
  }
  .tt-link {
    transform: translateY(-5px);
  }
  ${breakpointsMedias.min640} {
    .tt-tooltip {
      max-width: 320px;
      font-family: "Avenir-Regular";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
    }
  }
`;
