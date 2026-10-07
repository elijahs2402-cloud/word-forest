import {Component,type ReactNode} from 'react';
export default class AppErrorBoundary extends Component<{children:ReactNode},{failed:boolean}> {
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?<main className="loading"><h1>숲을 다시 열어 볼까요?</h1><p role="alert">화면을 표시하지 못했어요. 저장된 기록은 지우지 않습니다.</p><button className="primary" onClick={()=>location.reload()}>다시 열기</button><p>계속 반복되면 이 창을 닫고 다시 접속해 주세요.</p></main>:this.props.children;}
}
