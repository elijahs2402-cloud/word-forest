export type MenuIconName='home'|'collection'|'decorate'|'parent'|'sound'|'muted'|'book'|'game'|'friend';

/** Higgsfield artwork matching the existing miniature props; controls provide names. */
export default function MenuIcon({name}:{name:MenuIconName}) {
 return <img className={'menu-art menu-art-'+name}
  src={`${import.meta.env.BASE_URL}art/deco-icons/${name}.webp`}
  alt="" aria-hidden="true" width="32" height="32" decoding="async" draggable={false}/>;
}
