import { Link } from '@mui/icons-material';
import get from 'lodash/get';
import {
  FaBehance,
  FaDribbble,
  FaFacebookF,
  FaGithub,
  FaGitlab,
  FaHackerrank,
  FaInstagram,
  FaLinkedinIn,
  FaMedium,
  FaSkype,
  FaSoundcloud,
  FaStackOverflow,
  FaTelegram,
  FaTwitter,
  FaXing,
  FaYoutube,
} from 'react-icons/fa';
import { SiCodechef, SiCodeforces } from 'react-icons/si';

const profileIconMap: Record<string, JSX.Element> = {
  behance: <FaBehance />,
  codechef: <SiCodechef />,
  codeforces: <SiCodeforces />,
  dribbble: <FaDribbble />,
  facebook: <FaFacebookF />,
  github: <FaGithub />,
  gitlab: <FaGitlab />,
  hackerrank: <FaHackerrank />,
  instagram: <FaInstagram />,
  linkedin: <FaLinkedinIn />,
  medium: <FaMedium />,
  skype: <FaSkype />,
  soundcloud: <FaSoundcloud />,
  stackoverflow: <FaStackOverflow />,
  telegram: <FaTelegram />,
  twitter: <FaTwitter />,
  xing: <FaXing />,
  youtube: <FaYoutube />,
};

const getProfileIcon = (network: string): JSX.Element => get(profileIconMap, network.toLowerCase(), <Link />);

export default getProfileIcon;
