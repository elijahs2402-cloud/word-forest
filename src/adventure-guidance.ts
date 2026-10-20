export function adventureGuidance(hasResume:boolean,dueCount:number,isNew:boolean){
 if(hasResume)return '지난번 산책이 기다리고 있어. 멈춘 곳부터 같이 가 볼까?';
 if(isNew)return '안녕! 단어 하나부터 천천히 만나 보자.';
 if(dueCount>0)return `다시 만날 단어가 ${dueCount}개 있어. 짧게 복습해 볼까?`;
 return '오늘은 새로운 숲에서 단어 친구를 만나 보자.';
}
