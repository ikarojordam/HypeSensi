import {useMemo,useState} from 'react';
import {players} from '../data/famous';
import PlayerCard from '../components/famous/PlayerCard';
import PlayerFilters,{type Filters} from '../components/famous/PlayerFilters';
import {getStored,store} from '../lib/storage';
export default function Famous(){
 const [filters,setFilters]=useState<Filters>({search:'',region:'all',platform:'all',favoritesOnly:false});
 const [favorites,setFavorites]=useState<string[]>(()=>getStored('hype-react-favorites',[]));
 const toggle=(id:string)=>setFavorites(old=>{const next=old.includes(id)?old.filter(x=>x!==id):[...old,id];store('hype-react-favorites',next);return next});
 const filtered=useMemo(()=>players.filter(p=>(filters.region==='all'||p.region===filters.region)&&(filters.platform==='all'||p.platform===filters.platform)&&(!filters.favoritesOnly||favorites.includes(p.id))&&p.name.toLocaleLowerCase('pt-BR').includes(filters.search.toLocaleLowerCase('pt-BR'))),[filters,favorites]);
 return <><header className="page-head"><span className="eyebrow">BIBLIOTECA DE JOGADORES</span><h1>Sensi e HUDs Famosos</h1><p>{players.length} perfis de referência. Dados pessoais são exibidos somente quando existe uma fonte cadastrada.</p></header><PlayerFilters filters={filters} onChange={setFilters}/><div className="section-label">{filtered.length} resultado(s)</div><div className="players-list">{filtered.map(player=><PlayerCard key={player.id} player={player} favorite={favorites.includes(player.id)} onToggle={toggle}/>)}{filtered.length===0&&<div className="panel">Nenhum jogador encontrado com esses filtros.</div>}</div></>;
}
