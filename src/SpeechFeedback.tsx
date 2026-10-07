import {useEffect} from 'react';
import {prepareAudio,stopSpeech} from './audio';
export default function SpeechFeedback(){
 useEffect(()=>{prepareAudio();const hidden=()=>{if(document.hidden)stopSpeech()};document.addEventListener('visibilitychange',hidden);window.addEventListener('pagehide',stopSpeech);return()=>{stopSpeech();document.removeEventListener('visibilitychange',hidden);window.removeEventListener('pagehide',stopSpeech)}},[]);
 return null;
}
