/* eslint-disable indent */
/* eslint-disable quotes */
export const convertLanguage = (lang) => {
  switch (lang) {
    case 'javascript':
      return 'js';
    case 'python':
      return 'py';
    case 'php':
      return 'php';
  }
};

export const defaultCode = {
  javascript: "// JavaScript Code Here\nfunction greet() {\n  console.log('Hello, world!');\n} \n\ngreet(); \n",
  php: "<?php\n\t// PHP Code Here\n\techo 'Hello, world!';\n?>\n",
  python: `# Python Code Here\ndef greet():\n\tprint('Hello, world!')\n\ngreet();\n`,
};

export const convertShortLangToMonacoLang = (shortLang) => {
  switch (shortLang) {
    case 'js':
      return 'javascript';
    case 'py':
      return 'python';
    case 'php':
      return 'php';
    default:
      return 'plaintext'; // Mặc định nếu không tìm thấy ngôn ngữ
  }
};

export const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};
