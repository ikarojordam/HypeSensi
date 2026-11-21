import {Link,useParams} from 'react-router-dom';
import {ArrowLeft} from 'lucide-react';
import PlayerProfile from '../components/famous/PlayerProfile';
import {getPlayer} from '../data/famous';
export default function FamousProfile(){const {id}=useParams();const player=getPlayer(id||'');return <><Link className="back-link" to="/famosos"><ArrowLeft size={17}/> Voltar à biblioteca</Link>{player?<PlayerProfile player={player}/>:<div className="panel"><h2>Jogador não encontrado</h2><p>Este perfil não está cadastrado.</p></div>}</>}
