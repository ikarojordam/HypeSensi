import {Heart, ChevronRight, UserRound} from 'lucide-react';
import {Link} from 'react-router-dom';
import type {Player} from '../../types/famous';
export default function PlayerCard({player,favorite,onToggle}: {player:Player; favorite:boolean; onToggle:(id:string)=>void}) {
 return <article className="player-card"><div className="player-avatar"><UserRound size={23}/></div><div className="player-detail"><strong>{player.name}</strong><small>{player.region} · {player.role} · {player.platform}</small><span className={'tag '+(player.hasPublishedData?'tag-primary':'')}>{player.hasPublishedData?'Referência cadastrada':'Aguardando fonte'}</span></div><button className="icon-btn" type="button" aria-label={favorite?'Remover favorito':'Adicionar favorito'} onClick={()=>onToggle(player.id)}><Heart size={19} fill={favorite?'currentColor':'none'}/></button><Link className="icon-btn" aria-label={'Abrir '+player.name} to={'/famosos/'+player.id}><ChevronRight size={20}/></Link></article>;
}
