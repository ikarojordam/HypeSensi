import type {Player} from '../../types/famous';
import {getHud,getSensitivity,getSource} from '../../data/famous';
import FamousSensi from './FamousSensi';
import FamousHud from './FamousHud';
export default function PlayerProfile({player}:{player:Player}) {
 const sensi=getSensitivity(player.id),hud=getHud(player.id);
 return <><header className="profile-head"><div className="profile-avatar">{player.name.slice(0,1)}</div><div><span className="eyebrow">PERFIL DE REFERÊNCIA</span><h1>{player.name}</h1><p className="muted">{player.region} · {player.role} · {player.platform}</p></div></header><div className="two-column"><FamousSensi data={sensi} source={sensi?getSource(sensi.sourceId):undefined}/><FamousHud hud={hud} source={hud?getSource(hud.sourceId):undefined}/></div></>;
}
