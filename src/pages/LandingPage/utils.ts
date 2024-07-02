import { HERO_BUTTON_TEXT } from './constants';

export function getHeroButtonText(isGuestUser: boolean, userLoggedOn: boolean) {
  if (isGuestUser) {
    return HERO_BUTTON_TEXT.isGuestUser;
  }
  if (userLoggedOn) {
    return HERO_BUTTON_TEXT.userLoggedOn;
  }
  return HERO_BUTTON_TEXT.notLogged;
}
