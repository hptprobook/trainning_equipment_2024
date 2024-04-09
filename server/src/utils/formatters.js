export const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

const languageToFileExtension = {
  java: '.java',
  python: '.py',
  javascript: '.js',
  csharp: '.cs',
  ruby: '.rb',
  php: '.php',
  cpp: '.cpp',
  c: '.c',
  typescript: '.ts',
  swift: '.swift',
  kotlin: '.kt',
  scala: '.scala',
  go: '.go',
  rust: '.rs',
  perl: '.pl',
  haskell: '.hs',
  elixir: '.ex',
  lua: '.lua',
  clojure: '.clj',
  r: '.r',
  groovy: '.groovy',
  nodejs: '.js',
  tcl: '.tcl',
  ada: '.adb',
  commonlisp: '.lisp',
  d: '.d',
  erlang: '.erl',
  fsharp: '.fs',
  fortran: '.f95',
  assembly: '.asm',
  python2: '.py',
  racket: '.rkt',
  ocaml: '.ml',
  vb: '.vb',
  bash: '.sh',
  cobol: '.cbl',
  pascal: '.pas',
  prolog: '.pl',
  octave: '.m',
  brainfk: '.b',
  coffeescript: '.coffee',
  ejs: '.ejs',
};

export const getFileExtension = (language) => {
  const extension = languageToFileExtension[language];
  if (extension) {
    return extension;
  } else {
    return '.txt';
  }
};
