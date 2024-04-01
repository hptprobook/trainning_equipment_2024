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

export const extractCodeBlocks = (markdown) => {
  const regex = /```([^`]+)```/g;
  const blocks = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(markdown)) !== null) {
    // Add text before code block
    if (match.index !== lastIndex) {
      blocks.push({
        type: 'text',
        content: markdown.substring(lastIndex, match.index),
      });
    }
    // Add code block
    blocks.push({
      type: 'code',
      content: match[0],
    });
    lastIndex = regex.lastIndex;
  }

  // Add text after last code block if any
  if (lastIndex < markdown.length) {
    blocks.push({
      type: 'text',
      content: markdown.substring(lastIndex),
    });
  }

  return blocks;
};
export const detectLanguage = (markdown) => {
  // Regex để tìm ngôn ngữ trong markdown
  const languageRegex = /^```(\w+)/;
  // Lấy các dòng từ markdown
  const lines = markdown.split('\n');

  // Kiểm tra dòng đầu tiên của code block
  const match = languageRegex.exec(lines[0]);

  // Nếu match thì trả về ngôn ngữ, nếu không trả về null
  return match ? match[1] : null;
};