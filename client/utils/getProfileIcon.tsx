import { Link } from '@mui/icons-material';
import get from 'lodash/get';
import {
  FaBehance,
  FaDribbble,
  FaFacebookF,
  FaGithub,
  FaGitlab,
  FaInstagram,
  FaLinkedinIn,
  FaSkype,
  FaSoundcloud,
  FaStackOverflow,
  FaTelegram,
  FaTwitter,
  FaXing,
  FaYoutube,
} from 'react-icons/fa';

const profileIconMap: Record<string, JSX.Element> = {
  facebook: <FaFacebookF />,
  twitter: <FaTwitter />,
  linkedin: <FaLinkedinIn />,
  dribbble: <FaDribbble />,
  soundcloud: <FaSoundcloud />,
  github: <FaGithub />,
  instagram: <FaInstagram />,
  stackoverflow: <FaStackOverflow />,
  behance: <FaBehance />,
  gitlab: <FaGitlab />,
  telegram: <FaTelegram />,
  skype: <FaSkype />,
  xing: <FaXing />,
  youtube: <FaYoutube />,
};

const getProfileIcon = (network: string): JSX.Element => get(profileIconMap, network.toLowerCase(), <Link />);

export default getProfileIcon;
