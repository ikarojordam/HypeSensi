import {useContext,createContext} from 'react';
export const themeValues={purple:['Hype Roxo','#ad68d8','#e2baff','#0d0713','#1b1125','#251630','#4b315d'],obsidian:['Obsidian','#a5a5b5','#e4e4e9','#0b0b0e','#1a1a21','#252530','#474750'],frost:['Frost','#5c9ce7','#c2e1ff','#091521','#14263b','#1b354f','#315676'],crimson:['Crimson','#d15379','#ffc6d6','#190b13','#2a1723','#371d2a','#734357'],emerald:['Emerald','#42b98d','#b7f3dc','#081913','#152b23','#1d3b30','#33634e'],gold:['Gold','#c39b56','#ffe0a0','#171209','#2c2417','#393022','#705c39']} as const;
export type ThemeId=keyof typeof themeValues;
export interface ThemeContextValue{theme:ThemeId;setTheme:(next:ThemeId)=>void};
export const ThemeContext=createContext<ThemeContextValue>({theme:'purple',setTheme:()=>{}});
export const useTheme=()=>useContext(ThemeContext);
