import { jwtDecode } from "jwt-decode";

export function decodeToken(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}

export function getRolesFromToken(token) {
  const decoded = decodeToken(token);
  return decoded?.roles || [];
}

export function isTokenExpired(token) {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return decoded.exp * 1000 < Date.now();
}