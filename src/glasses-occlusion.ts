// Asset-local lens openings: hide folded temple arms without regenerating rims.
const round='M44 78 C44 9 150 9 150 78 C150 147 44 147 44 78Z M234 78 C234 9 340 9 340 78 C340 147 234 147 234 78Z';
const shapes:Record<string,{w:number;h:number;holes:string}>={
 glasses:{w:512,h:512,holes:'M78 232 Q113 237 135 286 Q148 310 125 312 Q103 305 88 275Z M434 232 Q399 237 377 286 Q364 310 387 312 Q409 305 424 275Z'},
 'heart-glasses':{w:384,h:142,holes:''},
 'star-glasses':{w:384,h:174,holes:'M95 47L110 76L143 81L120 104L124 136L95 121L65 136L70 104L47 81L80 76Z M289 47L304 76L337 81L314 104L318 136L289 121L259 136L264 104L241 81L274 76Z'},
 'flower-glasses':{w:384,h:152,holes:round},
 'round-glasses':{w:384,h:159,holes:round},
 'rainbow-glasses':{w:384,h:160,holes:round},
 'today-round-glasses':{w:946,h:360,holes:'M135 180 C135 15 381 15 381 180 C381 345 135 345 135 180Z M568 180 C568 15 814 15 814 180 C814 345 568 345 568 180Z'},
};
export function glassesOcclusionImage(id:string){const s=shapes[id];return s?`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s.w} ${s.h}"><path fill="white" fill-rule="evenodd" d="M0 0H${s.w}V${s.h}H0Z ${s.holes}"/></svg>`)}")`:undefined;}
export const glassesWithHiddenTemples=Object.keys(shapes);
