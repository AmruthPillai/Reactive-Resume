import { Avatar, IconButton } from '@mui/material';
import isFunction from 'lodash/isFunction';

type Props = {
  color: string;
  size?: number;
  onClick?: (color: string) => void;
};

const ColorAvatar: React.FC<Props> = ({ color, size = 20, onClick }) => {
  const handleClick = () => isFunction(onClick) && onClick(color);

  return (
    <IconButton onClick={handleClick}>
      <Avatar sx={{ bgcolor: color, width: size, height: size }}>&nbsp;</Avatar>
    </IconButton>
  );
};

export default ColorAvatar;
