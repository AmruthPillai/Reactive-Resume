const HeroPattern = () => (
  <svg
    aria-hidden="true"
    className="absolute inset-0 -z-10 h-full w-full stroke-zinc-950/10 opacity-60 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-zinc-50/10 dark:opacity-40"
  >
    <defs>
      <pattern
        id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
        width={200}
        height={200}
        x="50%"
        y={-1}
        patternUnits="userSpaceOnUse"
      >
        <path d="M.5 200V.5H200" fill="none" />
      </pattern>
    </defs>
    <svg x="50%" y={-1} className="overflow-visible fill-zinc-100/20 dark:fill-zinc-900/20">
      <path
        d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
        strokeWidth={0}
      />
    </svg>
    <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
  </svg>
);

export default HeroPattern;
