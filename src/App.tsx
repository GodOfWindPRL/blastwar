import { chains } from "constants/chains";
import { GlobalStyle } from "constants/globalStyled";
import { NetworkContext } from "contexts/NetworkContext";
import { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routers from "routers";
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";

window.Buffer = window.Buffer || require("buffer").Buffer;

const DEFAULT_CHAIN = chains[0].id;
function App() {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { changeNetwork } = useContext(NetworkContext)

  useEffect(() => {
    if (chain?.id !== DEFAULT_CHAIN) {
      changeNetwork(false);
      switchNetwork && switchNetwork(DEFAULT_CHAIN);
    } else {
      changeNetwork(true);
    }
  }, [chain])

  useEffect(() => {
    if (address === undefined) {
      disconnect();
      removeLocalStorage()
    }
  }, [address])

  const removeLocalStorage = () => {
    localStorage.removeItem('wagmi.connectedRdns');
  }

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        {/* <Header /> */}
        <Routers />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
