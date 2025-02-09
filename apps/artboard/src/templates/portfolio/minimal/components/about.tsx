import { cn } from "@reactive-resume/utils";
import { Picture } from "../../../../components/picture";

interface AboutProps {
  name: string;
  headline: string;
  picture: {
    url: string;
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

export const About: React.FC<AboutProps> = ({
  name,
  headline,
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
              effects={picture.effects}
              className="mx-auto mb-8 size-32 rounded-full"
            />
          )}

          {/* Name & Tagline */}
          <h1 className="mb-4 text-4xl font-bold">{name}</h1>
          <p className="text-xl opacity-75">{headline}</p>
        </div>
      </div>
    </section>
  );
};
