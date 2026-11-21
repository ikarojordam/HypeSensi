import type {HudProfile} from '../types/hud';
import {getStored,store} from './storage';
export const hudKey='hype-react-huds';
export function getSavedHuds():HudProfile[]{return getStored<HudProfile[]>(hudKey,[])}
export function saveHudProfiles(items:HudProfile[]){store(hudKey,items)}
