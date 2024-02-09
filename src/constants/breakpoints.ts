const breakpoint = {
    xss: 360,
    xs: 640,
    md: 768,
    lg: 992,
    // xl: 1200,
    xl: 1200,
    xxl: 1400,
    xxxl: 1600,
    xg: 1921,
    xlg: 1024
}
export const breakpointsMedia = {
    // Small devices (mobile, less than 320)
    mobileS: `@media (max-width: ${breakpoint.xss}px)`,
    // Small devices (mobile, less than 600)
    mobile: `@media (min-width: ${breakpoint.xs}px)`,
    // Small devices (landscape phones, 576px and up)
    landscape: `@media (min-width: ${breakpoint.xs}px)`,
    // Medium devices (tablets, 768px and up)
    tablet: `@media (min-width: ${breakpoint.md}px)`,
    // Large devices (desktops, 992px and up)
    desktop: `@media (min-width: ${breakpoint.lg}px)`,
    // Extra large devices (large desktops, 1200px and up)
    largeDesktop: `@media (min-width: ${breakpoint.xl}px)`,
    // Extra large devices (large desktops, 1400px and up)
    xLargeDesktop: `@media (min-width: ${breakpoint.xxl}px)`,
    // Extra large devices (large desktops, 1600px and up)
    xxLargeDesktop: `@media (min-width: ${breakpoint.xxxl}px)`,
    // Extra large devices (large desktops, 1920px and up)
    xGloDesktop: `@media (min-width: ${breakpoint.xg}px)`,
    // tablet less than 1024px
    maxTablet: `@media (max-width: ${breakpoint.xlg}px)`,
    hover: `@media (hover:hover)`
}
const breakpoints = {
    '320': 320,
    '280': 280,
    '350': 349.98,
    '375': 374.98,
    '376': 375.98,
    '490': 490,
    '480': 480.98,
    '639': 639,
    '640': 640,
    '667': 667,
    '481': 481,
    '576': 576,
    '767': 767.98,
    '768': 768,
    '810': 810,
    '876': 876,
    '940': 940,
    '991': 991.98,
    '992': 992,
    '1023': 1023.98,
    '1024': 1024,
    '1025': 1025,
    '1199': 1199.98,
    '1200': 1200,
    '1280': 1280,
    '1350': 1350,
    '1359': 1359.98,
    '1360': 1360,
    '1399': 1399.98,
    '1400': 1400,
    '1440': 1440,
    '1540': 1540,
    '1599': 1599.98,
    '1600': 1600,
    '1750': 1750,
    '1920': 1920
}
export const breakpointsMedias = {
    //Max preset
    max280: `@media(max-width: ${breakpoints[280]}px)`,
    max320: `@media(max-width: ${breakpoints[320]}px)`,
    max350: `@media(max-width: ${breakpoints[350]}px)`,
    max375: `@media(max-width: ${breakpoints[375]}px)`,
    max376: `@media(max-width: ${breakpoints[376]}px)`,
    max490: `@media(max-width: ${breakpoints[490]}px)`,
    max480: `@media(max-width: ${breakpoints[480]}px)`,
    max639: `@media(max-width: ${breakpoints[639]}px)`,
    max667: `@media(max-width: ${breakpoints[667]}px)`,
    max767: `@media(max-width: ${breakpoints[767]}px)`,
    max810: `@media(max-width: ${breakpoints[810]}px)`,
    max876: `@media(max-width: ${breakpoints[876]}px)`,
    max940: `@media(max-width: ${breakpoints[940]}px)`,
    max991: `@media(max-width: ${breakpoints[991]}px)`,
    max1023: `@media(max-width: ${breakpoints[1023]}px)`,
    max1024: `@media(max-width: ${breakpoints[1024]}px)`,
    max1199: `@media(max-width: ${breakpoints[1199]}px)`,
    max1280: `@media(max-width: ${breakpoints[1280]}px)`,
    max1350: `@media(max-width: ${breakpoints[1350]}px)`,
    max1359: `@media(max-width: ${breakpoints[1359]}px)`,
    max1399: `@media(max-width: ${breakpoints[1399]}px)`,
    max1440: `@media(max-width: ${breakpoints[1440]}px)`,
    max1540: `@media(max-width: ${breakpoints[1540]}px)`,
    max1599: `@media(max-width: ${breakpoints[1599]}px)`,

    //Min preset
    min481: `@media(min-width: ${breakpoints[481]}px)`,
    min576: `@media(min-width: ${breakpoints[576]}px)`,
    min640: `@media(min-width: ${breakpoints[640]}px)`,
    min768: `@media(min-width: ${breakpoints[768]}px)`,
    min992: `@media(min-width: ${breakpoints[992]}px)`,
    min1024: `@media(min-width: ${breakpoints[1024]}px)`,
    min1025: `@media(min-width: ${breakpoints[1025]}px)`,
    min1200: `@media(min-width: ${breakpoints[1200]}px)`,
    min1280: `@media(min-width: ${breakpoints[1280]}px)`,
    min1360: `@media(min-width: ${breakpoints[1360]}px)`,
    min1400: `@media(min-width: ${breakpoints[1400]}px)`,
    min1600: `@media(min-width: ${breakpoints[1600]}px)`,
    min1750: `@media(min-width: ${breakpoints[1750]}px)`,
    min1920: `@media(min-width: ${breakpoints[1920]}px)`,

    //Min max preset
    m481m767: `@media(min-width: ${breakpoints[481]}px) and (max-width: ${breakpoints[767]}px)`,
    m768m1199: `@media(min-width: ${breakpoints[768]}px) and (max-width: ${breakpoints[1199]}px)`,
    m992m1199: `@media(min-width: ${breakpoints[992]}px) and (max-width: ${breakpoints[1199]}px)`,
    m1024m1199: `@media(min-width: ${breakpoints[1024]}px) and (max-width: ${breakpoints[1199]}px)`,
    m1025m1199: `@media(min-width: ${breakpoints[1025]}px) and (max-width: ${breakpoints[1199]}px)`,
    m1200m1599: `@media(min-width: ${breakpoints[1200]}px) and (max-width: ${breakpoints[1599]}px)`,
}
