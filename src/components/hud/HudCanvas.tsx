import {useRef} from 'react';
export interface HudControl {id:string;label:string;x:number;y:number;size:number;opacity:number;visible:boolean}
export default function HudCanvas({controls,selected,onSelect,onMove}:{controls:HudControl[];selected:string;onSelect:(id:string)=>void;onMove:(id:string,x:number,y:number)=>void}){
 const ref=useRef<HTMLDivElement>(null);const dragging=useRef<string|null>(null);
 function move(e:React.PointerEvent){const rect=ref.current?.getBoundingClientRect();if(!rect||!dragging.current)return;const x=Math.max(0,Math.min(100,((e.clientX-rect.left)/rect.width)*100));const y=Math.max(0,Math.min(100,((e.clientY-rect.top)/rect.height)*100));onMove(dragging.current,Math.round(x*10)/10,Math.round(y*10)/10)}
 return <div ref={ref} className="hud-canvas" onPointerMove={move} onPointerUp={()=>dragging.current=null} onPointerCancel={()=>dragging.current=null} aria-label="Área de edição do HUD">{controls.filter(c=>c.visible).map(c=><button type="button" key={c.id} className={'hud-control '+(c.id===selected?'selected':'')} style={{left:c.x+'%',top:c.y+'%',width:Math.max(8,c.size)+'%',opacity:c.opacity/100}} onPointerDown={e=>{dragging.current=c.id;onSelect(c.id);e.currentTarget.setPointerCapture(e.pointerId)}} onClick={()=>onSelect(c.id)}>{c.label}</button>)}</div>;
}
