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
    case 'cpp':
      return 'cpp';
  }
};

export const defaultCode = {
  javascript: "// JavaScript Code Here\nfunction greet() {\n  console.log('Hello, world!');\n} \n\ngreet(); \n",
  php: "<?php\n\t// PHP Code Here\n\techo 'Hello, world!';\n?>\n",
  python: `# Python Code Here\ndef greet():\n\tprint('Hello, world!')\n\ngreet();\n`,
  cpp: `// C++ Code Here\n#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, world!" << std::endl;\n\treturn 0;\n}\n`,
};
