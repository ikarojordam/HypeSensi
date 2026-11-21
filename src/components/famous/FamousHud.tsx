import type {FamousHudData,Source} from '../../types/famous';
export default function FamousHud({hud,source}:{hud?:FamousHudData;source?:Source}) {
 return <section className="panel"><h3>HUD publicado</h3>{!hud?<p className="muted">Ainda não há código ou imagem com origem cadastrada.</p>:<><p className="muted warning">Código registrado a partir de conteúdo de terceiros; funcionamento atual não verificado.</p><div className="code-field"><code>{hud.code}</code><button type="button" onClick={()=>void navigator.clipboard?.writeText(hud.code)}>Copiar código</button></div>{source&&<a href={source.url} target="_blank" rel="noopener noreferrer">Ver referência original</a>}</>}</section>;
}
