import React, { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

interface AuthHookResult {
  isLogin: boolean;
  token: string | any;
}
 
const client: any = new Keycloak({
  url: process.env.REACT_APP_URL,
  realm: process.env.REACT_APP_REALM!,
  clientId: process.env.REACT_APP_CLIENT!, 
});


const useAuth = (): AuthHookResult => {
  const isRun = useRef(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLogin, setLogin] = useState<boolean>(false);
  
  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;
    client
      .init({
        onLoad: "login-required",
      })
      .then((res:boolean) => {
        setLogin(res);
        if (client.token) {
          setToken(client.token);
        }
      }).catch((error:string) => {
        console.error("Keycloak initialization error:", error);
      });;
  }, []);

  return { isLogin, token };
};

export default useAuth;
