type Question={id:string;title:string;options:string[];platforms?:string[]};
export default function SensiQuiz({step,questions,answers,onAnswer,onPrevious,onNext}:{step:number;questions:Question[];answers:Record<string,string>;onAnswer:(id:string,v:string)=>void;onPrevious:()=>void;onNext:()=>void}){
 const q=questions[step];if(!q)return null;
 return <section className="hype-card stack">
  <div style={{display:'flex',justifyContent:'space-between'}}><span className="eyebrow">PERGUNTA {step+1} DE {questions.length}</span><span className="text-note">{Math.round(step/questions.length*100)}%</span></div>
  <div className="progress-bar"><span style={{width:step/questions.length*100+'%'}}/></div>
  <h2>{q.title}</h2>
  <div className="quiz-grid">{q.options.map(opt=><button key={opt} className={'quiz-option '+(answers[q.id]===opt?'selected':'')} onClick={()=>onAnswer(q.id,opt)} aria-pressed={answers[q.id]===opt}>{opt}</button>)}</div>
  <div className="action-buttons"><button className="secondary-action" onClick={onPrevious} disabled={step===0}>Voltar</button><button className="primary-action" onClick={onNext} disabled={!answers[q.id]}>{step===questions.length-1?'Gerar sensibilidade':'Continuar'}</button></div>
 </section>;
}
