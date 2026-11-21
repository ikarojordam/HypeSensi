import {useEffect,useState} from 'react';
import {getStored,store} from '../lib/storage';
export function useLocalStorage<T>(key:string,initial:T){const [value,setValue]=useState<T>(()=>getStored(key,initial));useEffect(()=>store(key,value),[key,value]);return [value,setValue] as const}
