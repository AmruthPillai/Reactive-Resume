import { POWERED_BY_ICONS_DATA } from "../constants/powered-by-icons";

const PoweredByIcons = () => {
  return (
    <div className="flex items-center space-x-1">
      {POWERED_BY_ICONS_DATA.map(({ src, alt, id }) => (
        <img key={id} src={src} alt={alt} width={14} height={14} />
      ))}
    </div>
  );
};

export default PoweredByIcons;
