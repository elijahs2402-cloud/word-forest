import {words} from './engine';
import {checkpointStorage as sessionStorage} from './checkpoint-storage';
export type QuestionCheckpoint={signature:string;index:number;retry:number[];right:number;combo:number;feedback:{ok:boolean;text:string}|null};
const key='word-forest-question-v1';
export function readQuestion(signature:string,poolSize:number):QuestionCheckpoint|null{try{const v=JSON.parse(sessionStorage.getItem(key)??'null');if(!v||v.signature!==signature||!Number.isInteger(v.index)||v.index<0||!Array.isArray(v.retry)||!v.retry.every((id:number)=>words.some(w=>w.no===id))||v.index>=poolSize+v.retry.length||!Number.isInteger(v.right)||v.right<0||v.right>poolSize||!Number.isInteger(v.combo)||v.combo<0||v.feedback!==null&&(!v.feedback||typeof v.feedback.ok!=='boolean'||typeof v.feedback.text!=='string'))return null;return v;}catch{return null;}}
export function saveQuestion(value:QuestionCheckpoint){try{sessionStorage.setItem(key,JSON.stringify(value));}catch{}}
export function clearQuestion(){try{sessionStorage.removeItem(key);}catch{}}
