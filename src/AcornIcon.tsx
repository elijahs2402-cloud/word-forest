/** Decorative currency artwork; adjacent text supplies the amount and meaning. */
export default function AcornIcon({weight:_weight}:{weight?:string}){
 return <img className="acorn-art" src={`${import.meta.env.BASE_URL}art/deco-icons/acorn.webp`}
  alt="" aria-hidden="true" width="24" height="24" decoding="async" draggable={false}/>;
}
