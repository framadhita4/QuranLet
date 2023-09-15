export type Setting = {
  wordByWord: {
    translation: boolean;
    transliteration: boolean;
    display: {
      inline: boolean;
      tooltip: boolean;
    };
  };
  translation: {
    id: boolean;
    latin: boolean;
  };
};

export const settingInitValue: Setting = {
  wordByWord: {
    translation: true,
    transliteration: true,
    display: {
      inline: false,
      tooltip: true,
    },
  },
  translation: {
    id: true,
    latin: true,
  },
};
