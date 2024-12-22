// artboard/src/templates/portfolio/minimal/components/hero.tsx
import { cn } from "@reactive-resume/utils";
import { Picture } from "../../../../components/picture";

interface HeroProps {
  name: string;
  tagline: string;
  picture: {
    url: string;
    size: number;
    aspectRatio: number;
    borderRadius: number;
    effects: {
      hidden: boolean;
      border: boolean;
      grayscale: boolean;
    };
  };
  banner: {
    url: string;
    effects: {
      hidden: boolean;
      grayscale: boolean;
      parallax: boolean;
    };
  };
}

export const Hero: React.FC<HeroProps> = ({
  name,
  tagline,
  picture,
  banner,
}) => {
  return (
    <section className="relative min-h-screen">
      {/* Banner */}
      {!banner.effects.hidden && banner.url && (
        <div
          className={cn(
            "absolute inset-0 z-0",
            banner.effects.grayscale && "grayscale",
            banner.effects.parallax && "parallax"
          )}
          style={{
            backgroundImage: `url(${banner.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="text-center">
          {/* Profile Picture */}
          {!picture.effects.hidden && picture.url && (
            <Picture
              url={picture.url}
              size={picture.size}
              aspectRatio={picture.aspectRatio}
              borderRadius={picture.borderRadius}
              effects={picture.effects}
              className="mx-auto mb-8 size-32 rounded-full"
            />
          )}

          {/* Name & Tagline */}
          <h1 className="mb-4 text-4xl font-bold">{name}</h1>
          <p className="text-xl opacity-75">{tagline}</p>
        </div>
      </div>
    </section>
  );
};
