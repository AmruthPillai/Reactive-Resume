type PoweredByIcon = {
  src: string;
  alt: string;
  id: number;
};

export const SIMPLE_ICONS_URL = "https://cdn.simpleicons.org";

export const POWERED_BY_ICONS_DATA: PoweredByIcon[] = [
  { src: `${SIMPLE_ICONS_URL}/react`, alt: "React", id: 1 },
  { src: `${SIMPLE_ICONS_URL}/vite`, alt: "Vite", id: 2 },
  { src: `${SIMPLE_ICONS_URL}/tailwindcss`, alt: "TailwindCSS", id: 3 },
  { src: `${SIMPLE_ICONS_URL}/nestjs`, alt: "NestJS", id: 4 },
  { src: `${SIMPLE_ICONS_URL}/googlechrome`, alt: "Google Chrome", id: 5 },
  { src: `${SIMPLE_ICONS_URL}/postgresql`, alt: "PostgreSQL", id: 6 },
];
