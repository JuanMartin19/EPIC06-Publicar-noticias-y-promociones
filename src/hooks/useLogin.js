import { authConfig } from "../auth/authConfig";
import { generateCodeVerifier, generateCodeChallenge } from "../auth/pkce";

export function useLogin() {
  const redirectToLogin = async () => {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    const state = crypto.randomUUID();

    sessionStorage.setItem("pkce_verifier", verifier);
    sessionStorage.setItem("oauth_state", state);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: authConfig.clientId,
      redirect_uri: authConfig.redirectUri,
      scope: authConfig.scope,
      state,
      code_challenge: challenge,
      code_challenge_method: "S256",
    });

    window.location.href = `${authConfig.authServerUrl}/oauth2/authorize?${params}`;
  };

  return { redirectToLogin };
}