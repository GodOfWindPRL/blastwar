import { createGlobalStyle } from "styled-components";
import { breakpointsMedia, breakpointsMedias } from "./breakpoints";
import configColor from "./configColor";
import bg from "assets/images/bg.png";
import bgMobile from "assets/images/bg-mobile.png";

export const GlobalStyle = createGlobalStyle`
  #root {
    position: relative;
    height: 100%;
    ${breakpointsMedias.max991} {
      height: fit-content;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(${bg});
      background-size: cover;
      background-position: center;
      opacity: 0.6;
      filter: blur(5px);
      z-index: 0;
      ${breakpointsMedias.max991} {
        background-image: url(${bgMobile});
        background-size: 100% 100%;
        filter: unset;
        opacity: 1;
      }
    }
  }
//toast
  .Toastify__toast-container {
    -webkit-transform: translate3d(0,0,1px);
      transform: translate3d(0,0,1px);
  }
  //container
  .Toastify__toast {
    border-radius: 10px;
    border: 1px solid ${configColor.black};
    padding:12px 12px 12px 12px;
    &.small-toast{
      width: 200px;
    }
    ${breakpointsMedia.largeDesktop}{
      padding:20px 20px 20px 20px;

    }
  }
  .Toastify__toast-theme--light {

}
  //progress
  .Toastify__progress-bar {
    /* display: none; */
    bottom: 20px;
    opacity: 1;
    left: 20px;
    width: calc(100% - 40px);
    height: 4px;
    /* :before{
      content:'';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100vw;
      height: 4px;
      z-index: var(--toastify-z-index);
      opacity: 0.7;
      transform-origin: left;
      background-color: #ccc;
      z-index: -1;
    } */
    ${breakpointsMedia.largeDesktop}{
      width: calc(100% - 24px);

    }
  }
  //button
  .Toastify__close-button {
    opacity: 1;
    position: absolute;
    right: 15px;
    top:15px;
  }
  .Toastify__close-button--default {
  }
  .Toastify__close-button > svg {
    color: gray;
    width: 18px;
    height: 18px;
  }
  .Toastify__close-button:hover,
  .Toastify__close-button:focus {
  }
  //icon
  /** Used to position the icon **/
.Toastify__toast-icon {
  display: none;
}
//end-toast
  :root{
     
    --toastify-color-light: gray;
    --toastify-color-dark: #121212;
    --toastify-color-info: #3498db;
    --toastify-color-success: ${configColor.green};
    --toastify-color-warning: #f1c40f;
    --toastify-color-error: #e74c3c;
    --toastify-color-transparent: rgba(255, 255, 255, 0.7);

    --toastify-icon-color-info: var(--toastify-color-info);
    --toastify-icon-color-success: var(--toastify-color-success);
    --toastify-icon-color-warning: var(--toastify-color-warning);
    --toastify-icon-color-error: var(--toastify-color-error);

    --toastify-toast-width: 330px;
    --toastify-toast-background: ${configColor.white};
    --toastify-toast-min-height: 64px;
    --toastify-toast-max-height: 800px;
    --toastify-font-family: sans-serif;
    --toastify-z-index: 9999;

    --toastify-text-color-light: ${configColor.white};
    --toastify-text-color-dark: #fff;

    //Used only for colored theme
    --toastify-text-color-info: #fff;
    --toastify-text-color-success: #fff;
    --toastify-text-color-warning: #fff;
    --toastify-text-color-error: #fff;

    --toastify-spinner-color: ${configColor.white};
    --toastify-spinner-color-empty-area: #e0e0e0;

    // Used when no type is provided
    // toast("**hello**")
    --toastify-color-progress-light: linear-gradient(
      to right,
      #4cd964,
      #5ac8fa,
      #007aff,
      #34aadc,
      #5856d6,
      #ff2d55
    );
    // Used when no type is provided
    --toastify-color-progress-dark: #bb86fc;
    --toastify-color-progress-info: var(--toastify-color-info);
    --toastify-color-progress-success: var(--toastify-color-success);
    --toastify-color-progress-warning: var(--toastify-color-warning);
    --toastify-color-progress-error: var(--toastify-color-error);
  
  }
  :root{
    font-size:13px;
  }
  body {
    font-size:13px;
    line-height:1.17;
    font-family: 'Poppins-400';
  }
  .scrollbar {
    scrollbar-width: thin;
    scrollbar-color: ${configColor.green} #727070a8;
    &::-webkit-scrollbar {
            width: 4px !important;
            height: 4px !important;
            margin-top:10px;
        }
        &::-webkit-scrollbar-track {
            background: gray !important;
            border-radius: 6px !important;
        }
        &::-webkit-scrollbar-thumb {
            background: ${configColor.green} !important;
            border-radius: 6px !important;
        }
  }
  .container {
    width: 100%;
    padding: 0 40px;
    max-width: 1220px;
    ${breakpointsMedias.max1199}{
      padding: 0 24px;
    }
    ${breakpointsMedias.max767}{
      padding: 0 16px;
    }
  }
  .border {
    border-radius: 10px;
    border: 2px solid #FCDD5D;
    background: #101010;
  }
  /*  */
  .page-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-top: 12px;
    z-index: 0;
    .pc-item {
      min-width: 32px;
      height: 20px;
      margin: 0 6px;
      display: flex;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 90%;
        height: 100%;
        left: 5%;
        top: 0;
        transform: skewX(-20deg);
        background: gray;
        border-radius: 4px;
      }
      > a {
        z-index: 1;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 6px;
      }
      &:hover {
        color: ${configColor.yellow};
      }
    }
    .pc-item-active {
      > a {
        color: black;
      }
      &::before {
        background: ${configColor.yellow};
      }
      &:hover {
        color: ${configColor.white};
      }
    }
    .pc-prev {
      margin-left: auto;
      padding: 4px 10px;
      &:hover {
        svg {
          fill: white;
        }
      }
    }
    .pc-next {
      margin-right: auto;
      padding: 4px 10px;
      &:hover {
        svg {
          fill: white;
        }
      }
    }
    ${breakpointsMedias.min1200} {
      padding: 0;
      margin-top: 20px;
      width: fit-content;
      margin-left: auto;
      .pc-item {
        min-width: 48px;
        height: 24px;
        margin: 0 4px;
        > a {
          padding: 0 10px;
        }
      }
    }
  }
/*  */



    .color-primary {
      color: ${configColor.yellow};
    }
  ${breakpointsMedia.landscape}{
        :root{
          font-size:16px;
        }
        body {
          font-size:16px;
        }
    }
  ${breakpointsMedia.largeDesktop}{
      :root{
          font-size:16px;
          --toastify-toast-width: 455px;
        --toastify-toast-background: ${configColor.white};
        --toastify-toast-min-height: 64px;
        --toastify-toast-max-height: 800px;
        --toastify-font-family: sans-serif;
        }
        body {
          font-size:16px;
        }
    }
`;
