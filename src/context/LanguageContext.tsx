import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, Translations } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'sq',
  setLanguage: () => {},
  t: translations.sq,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('shbbsh_lang') as Language;
    if (saved === 'sq' || saved === 'en' || saved === 'it') return saved;
    return 'sq'; // Albanian as primary default!
  });

  useEffect(() => {
    localStorage.setItem('shbbsh_lang', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = translations[language] || translations.sq;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
