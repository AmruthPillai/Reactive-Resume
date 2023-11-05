import { Picture, useStore } from "@reactive-resume/templates";

export const Header = () => {
  const basics = useStore((state) => state.basics);

  return (
    <div className="header">
      {basics.picture.url && !basics.picture.effects.hidden && (
        <Picture
          alt={basics.name}
          src={basics.picture.url}
          $picture={basics.picture}
          className="header__picture"
        />
      )}

      <div className="header__basics">
        <h1 className="header__name">{basics.name}</h1>
        <p className="header__headline">{basics.headline}</p>

        <div className="header__meta">
          {basics.location && <span className="header__meta-location">{basics.location}</span>}
          {basics.phone && (
            <span className="header__meta-phone">
              <a href={`tel:${basics.phone}`} target="_blank" rel="noopener noreferrer nofollow">
                {basics.phone}
              </a>
            </span>
          )}
          {basics.email && (
            <span className="header__meta-email">
              <a href={`mailto:${basics.email}`} target="_blank" rel="noopener noreferrer nofollow">
                {basics.email}
              </a>
            </span>
          )}
          {basics.url.href && (
            <span className="header__meta-url">
              <a href={basics.url.href} target="_blank" rel="noopener noreferrer nofollow">
                {basics.url.label || basics.url.href}
              </a>
            </span>
          )}
        </div>

        <div className="header__meta custom-fields">
          {basics.customFields.map((field) => (
            <span key={field.id} className="header__meta custom-field">
              {[field.name, field.value].filter(Boolean).join(": ")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
