import { useEffect } from "react";
interface ClickOutSideProps {
    children: any;
    className?: string;
    handleClickOutSide: () => void;
    styles?: any
}
const ClickOutSideComp = ({ children, handleClickOutSide, className, styles }: ClickOutSideProps) => {
    let wrapperRef = {} as any;
    const setWrapperRef = (node: any) => {
        wrapperRef = node;
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClick)
        document.addEventListener('touchstart', handleClick)
        return () => {
            document.removeEventListener('mousedown', handleClick)
            document.removeEventListener('touchstart', handleClick)
        }
    }, [wrapperRef]);

    const handleClick = (event: any) => {
        if (wrapperRef && !wrapperRef.contains(event.target)) {
            handleClickOutSide()
        }
    }
    return <div ref={setWrapperRef} className={className} style={styles}>{children}</div>
}

export default ClickOutSideComp
