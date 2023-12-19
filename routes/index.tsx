import React, {useEffect} from "react";
import DashboardLayout from "../components/Layout/DashboardLayout";
import LandingLayout from "../components/Layout/LandingLayout";
import {AppProps} from "next/app";
import RouteList, {IRoute} from "./RouteList";
// import {IRootState} from "@app/redux/store";
// import {useDispatch, useSelector} from "react-redux";
// import {logoutUser} from "@app/redux/slices/UserSlice";

export default function Routes({
  Component,
  pageProps,
  router,
}: AppProps): JSX.Element | null {
  // const dispatch = useDispatch();
  // const isRemember = useSelector(
  //   (state: IRootState) => state.remember.isRemember
  // );

  if (typeof window === "undefined") {
    return null;
  }

  // const isRememberSessionStorage = sessionStorage.getItem("isRemember");

  // const goToLogin = (): null => {
  //   router.push(Config.PATHNAME.LOGIN);
  //   return null;
  // };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // if (!isRemember) {
    //   dispatch(logoutUser());
    //   goToLogin();
    // }
    // if (!ApiUser.isLogin()) {
    //   goToLogin();
    // }
  }, []);

  const isRoute = (key: keyof IRoute): boolean => {
    for (const route of RouteList) {
      if (router.pathname === route.path) {
        return !!route[key];
      }
    }
    return false;
  };

  if (isRoute("isLanding")) {
    return (
      <LandingLayout>
        <Component {...pageProps} />
      </LandingLayout>
    );
  }

  return (
    <DashboardLayout>
      <Component {...pageProps} />
    </DashboardLayout>
  );
}
