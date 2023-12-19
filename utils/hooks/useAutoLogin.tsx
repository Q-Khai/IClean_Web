// import {getLinkAutoLogin} from "@app/api/ApiCommon";
import store from "@app/redux/store";
import {useEffect, useState} from "react";

function useAutoLogin(id?: number): {isLoading: boolean} {
  const {user} = store.getState();
  const [isLoading, setIsLoaing] = useState(false);
  console.log(user);
  useEffect(() => {
    if (!id) return;

    setIsLoaing(true);
    // const param = {
    //   pass_jwt: user.pass_jwt || "",
    //   user_id: id || -1,
    // };
    // getLinkAutoLogin(param)
    //   .then((res) => {
    //     window.open(res.response?.auto_login);
    //   })
    //   .finally(() => {
    //     setIsLoaing(false);
    //   });
  }, [id]);

  return {
    isLoading: isLoading,
  };
}

export default useAutoLogin;
