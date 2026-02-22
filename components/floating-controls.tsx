import { Language, Theme } from "@/lib/site-preferences";

type ControlsLabels = {
  language: string;
  theme: string;
  dark: string;
  light: string;
};

type FloatingControlsProps = {
  labels: ControlsLabels;
  language: Language;
  setLanguage: (language: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export function FloatingControls({
  labels,
  language,
  setLanguage,
  theme,
  setTheme
}: FloatingControlsProps) {
  return (
    <div className="floating-controls" aria-label="Parametres d'affichage">
      <div className="controls">
        <div className="switch-group">
          <span>{labels.language}</span>
          <div className="segmented">
            {(["fr", "en"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                className={`switch-btn ${language === lang ? "active" : ""}`}
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="switch-group">
          <span>{labels.theme}</span>
          <div className="segmented">
            {(["dark", "light"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                className={`switch-btn ${theme === mode ? "active" : ""}`}
                onClick={() => setTheme(mode)}
                aria-pressed={theme === mode}
              >
                {mode === "dark" ? labels.dark : labels.light}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

