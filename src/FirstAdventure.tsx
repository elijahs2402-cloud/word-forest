import {useEffect,useRef,useState} from 'react';
import {useStore} from './store';
import {words} from './engine';

/** 홈 탐험 카드 안에 들어가는 첫 체험. 몽쉘 그림은 카드에 이미 있으므로 글과 버튼만 그린다. */
export default function FirstAdventure({onDone,onDecorate}:{onDone:()=>void;onDecorate:()=>void}){
 const [step,setStep]=useState<'hello'|'word'|'gift'>('hello');
 const [retry,setRetry]=useState(false);
 const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{if(step!=='hello')heading.current?.focus()},[step]);
 const word=words.find(w=>w.present==='hit')!;
 return <section className="first-adventure" aria-labelledby="first-adventure-title">
  <p className="eyebrow first-step">몽쉘과 첫 산책 · {step==='hello'?1:step==='word'?2:3}/3</p>
  <h2 ref={heading} tabIndex={-1} id="first-adventure-title" className="first-title">{step==='hello'?'안녕! 나는 몽쉘이야.':step==='word'?'단어 하나만 같이 만나 볼까?':'첫 단어를 만났어!'}</h2>
  <div className="first-body">
   {step==='hello'?<><p>단어를 만나 도토리를 모으고, 우리 숲을 꾸며 보자.</p><button className="primary start-learning" onClick={()=>setStep('word')}>첫 단어 만나기</button></>:step==='word'?<><p><span lang="en">hit</span>는 ‘치다’라는 뜻이야.<br/>과거에도 모양이 같아. 어떤 단어일까?</p><div className="first-word-options">{['hit','hitted'].map(answer=><button className="secondary" key={answer} lang="en" onClick={()=>{if(answer!=='hit'){setRetry(true);return;}useStore.getState().answer(word.no,true,1);setStep('gift')}}>{answer}</button>)}</div><p role="status" className="first-hint">{retry?'괜찮아. 모양이 같은 hit를 골라 봐.':'현재형과 똑같은 단어를 골라 줘.'}</p></>:<><p>도토리 1개를 모았어.<br/>첫 소품인 버섯을 우리 숲에 놓아 볼까?</p><button className="primary start-learning" onClick={()=>{const s=useStore.getState();if(!s.deco.length)s.patch({deco:[0],forestLayout:{...s.forestLayout,0:{x:35,y:70}}});onDone();onDecorate()}}>버섯 놓고 내 숲 보기</button></>}
   <button className="text-btn first-skip" onClick={onDone}>{step==='gift'?'나중에 꾸미기':'건너뛰고 둘러보기'}</button>
  </div>
 </section>;
}
