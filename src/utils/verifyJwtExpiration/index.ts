import jwtDecode from 'jwt-decode';
import { JWT } from '../LocalStorage/interface';

export function verifyJwtExpiration(accessToken: string, signOutCallback: () => void) {
  const jwtDecoded: JWT = jwtDecode(accessToken);

  if (jwtDecoded && Date.now() >= jwtDecoded.exp * 1000) {
    signOutCallback();
    return true;
  }
  return false;
}
