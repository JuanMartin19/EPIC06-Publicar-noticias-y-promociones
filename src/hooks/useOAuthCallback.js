import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authConfig } from "../auth/authConfig";

export function useOAuthCallback() {
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const exchangeCode = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const returnedState = params.get("state");
      const savedState = sessionStorage.getItem("oauth_state");
      const verifier = sessionStorage.getItem("pkce_verifier");

      if (!code || returnedState !== savedState) {
        setStatus("error");
        setErrorMessage("Estado inválido o código de autorización faltante.");
        return;
      }

      try {
        const body = new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: authConfig.redirectUri,
          client_id: authConfig.clientId,
          code_verifier: verifier,
        });

        const response = await fetch(`${authConfig.authServerUrl}/oauth2/token`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body,
        });

        const data = await response.json();

        if (!response.ok || !data.access_token) {
          throw new Error(data.error_description || "No se pudo obtener el token");
        }

        sessionStorage.setItem("access_token", data.access_token);
        if (data.refresh_token) {
          sessionStorage.setItem("refresh_token", data.refresh_token);
        }
        sessionStorage.removeItem("pkce_verifier");
        sessionStorage.removeItem("oauth_state");

        navigate("/admin/home");
      } catch (err) {
        setStatus("error");
        setErrorMessage(err.message);
      }
    };

    exchangeCode();
  }, [navigate]);

  return { status, errorMessage };
}