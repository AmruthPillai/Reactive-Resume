import { Link } from '@mui/icons-material';
import get from 'lodash/get';
import {
  FaBehance,
  FaDiscord,
  FaDribbble,
  FaFacebookF,
  FaGithub,
  FaGitlab,
  FaHackerrank,
  FaInstagram,
  FaLinkedinIn,
  FaMastodon,
  FaMedium,
  FaSkype,
  FaSoundcloud,
  FaStackOverflow,
  FaTelegram,
  FaTwitter,
  FaXing,
  FaYoutube,
} from 'react-icons/fa';
import {
  SiCodeberg,
  SiCodechef,
  SiCodeforces,
  SiGeeksforgeeks,
  SiHackerearth,
  SiLeetcode,
  SiTopcoder,
} from 'react-icons/si';

const profileIconMap: Record<string, JSX.Element> = {
  behance: <FaBehance />,
  discord: <FaDiscord />,
  codeberg: <SiCodeberg />,
  codechef: <SiCodechef />,
  codeforces: <SiCodeforces />,
  dribbble: <FaDribbble />,
  facebook: <FaFacebookF />,
  geeksforgeeks: <SiGeeksforgeeks />,
  github: <FaGithub />,
  gitlab: <FaGitlab />,
  hackerearth: <SiHackerearth />,
  hackerrank: <FaHackerrank />,
  instagram: <FaInstagram />,
  leetcode: <SiLeetcode />,
  linkedin: <FaLinkedinIn />,
  mastodon: <FaMastodon />,
  medium: <FaMedium />,
  skype: <FaSkype />,
  soundcloud: <FaSoundcloud />,
  stackoverflow: <FaStackOverflow />,
  telegram: <FaTelegram />,
  topcoder: <SiTopcoder />,
  twitter: <FaTwitter />,
  xing: <FaXing />,
  youtube: <FaYoutube />,
};

const getProfileIcon = (network: string): JSX.Element => get(profileIconMap, network.toLowerCase(), <Link />);

export default getProfileIcon;
