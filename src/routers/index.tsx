import LoadingScreen from "components/core/LoadingScreen";
import Home from "pages/Home/Home";
import Mint from "pages/Mint/Mint";
import Stake from "pages/Stake.tsx/Stake";
import SubmitForm from "pages/Submit/SubmitForm";
import { Suspense } from "react";
import {
  useRoutes
} from "react-router-dom";

export default function Routers() {

  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/mint",
      element: <Mint />
      ,
    },
    {
      path: "/stake",
      element: <Stake />,
    },
    {
      path: "/submit",
      element: <SubmitForm />,
    },
  ]);
  // useEffect(() => {
  //   if (location.pathname === "/") {
  //     navigate(
  //       `/trade/BTC-USD${refCodeFromLink ? "?ref=" + refCodeFromLink : ""}`
  //     );
  //   }
  // }, [location]);
  return <Suspense fallback={<LoadingScreen />}>
    {routes}
  </Suspense>
  return routes;
}
