import { ReactNode, createContext, useEffect, useState } from "react";

interface IProps {
    children: ReactNode;
}

const NetworkContext = createContext({
    isBlast: true,
    changeNetwork: (e: boolean) => { }
})

const NetworkContextWrap = ({ children }: IProps) => {
    const [isBlast, setIsBlast] = useState(true);

    const changeNetwork = (e: boolean) => {
        setIsBlast(e)
    }

    return (<NetworkContext.Provider
        value={{
            changeNetwork,
            isBlast
        }}>
        {children}
    </NetworkContext.Provider>)
}

export default NetworkContextWrap;

export { NetworkContext };