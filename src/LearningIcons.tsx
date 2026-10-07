import type {CSSProperties} from 'react';

type Props={weight?:string;className?:string;style?:CSSProperties};
const icon=(name:string)=>function LearningIcon({className='',style}:Props){
 return <img className={`illustration-art illustration-${name} ${className}`}
  src={`${import.meta.env.BASE_URL}art/deco-icons/${name}.webp`}
  style={style} alt="" aria-hidden="true" width="24" height="24"
  decoding="async" draggable={false}/>;
};
export const Star=icon('star');
export const Fire=icon('flame');
export const Trophy=icon('trophy');
export const Sun=icon('sun');
export const Leaf=icon('leaf');
export const Clock=icon('clock');
export const SealCheck=icon('medal');
export const SpeakerHigh=icon('sound');
export const BookOpen=icon('book');
