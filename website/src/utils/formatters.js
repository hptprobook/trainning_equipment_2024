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

export const programmingLanguages = [
  { value: 'java', label: 'Java' },
  { value: 'python', label: 'Python' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'csharp', label: 'C#' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'php', label: 'PHP' },
  { value: 'cpp', label: 'C++' },
  { value: 'c', label: 'C' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'scala', label: 'Scala' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'perl', label: 'Perl' },
  { value: 'haskell', label: 'Haskell' },
  { value: 'elixir', label: 'Elixir' },
  { value: 'lua', label: 'Lua' },
  { value: 'clojure', label: 'Clojure' },
  { value: 'r', label: 'R' },
  { value: 'groovy', label: 'Groovy' },
  { value: 'nodejs', label: 'NodeJS' },
  { value: 'jshell', label: 'JShell' },
  { value: 'tcl', label: 'Tcl' },
  { value: 'ada', label: 'Ada' },
  { value: 'commonlisp', label: 'CommonLisp' },
  { value: 'd', label: 'D' },
  { value: 'erlang', label: 'Erlang' },
  { value: 'fsharp', label: 'F#' },
  { value: 'fortran', label: 'Fortran' },
  { value: 'assembly', label: 'Assembly' },
  { value: 'racket', label: 'Racket' },
  { value: 'ocaml', label: 'OCaml' },
  { value: 'vb', label: 'Visual Basic (VB.NET)' },
  { value: 'bash', label: 'Bash' },
  { value: 'cobol', label: 'Cobol' },
  { value: 'pascal', label: 'Pascal' },
  { value: 'prolog', label: 'Prolog' },
  { value: 'octave', label: 'Octave' },
  { value: 'brainfk', label: 'BrainFK' },
  { value: 'coffeescript', label: 'CoffeeScript' },
  { value: 'ejs', label: 'EJS' },
];

export const defaultCode = {
  java: `// Java Code Here\npublic class Main {\n    public static void greet() {\n        System.out.println("Hello, world!");\n    }\n\n    public static void main(String[] args) {\n        greet();\n    }\n}\n`,
  python: `# Python Code Here\ndef greet():\n\tprint('Hello, world!')\n\ngreet();\n`,
  c: `// C Code Here\n#include <stdio.h>\n\nvoid greet() {\n    printf("Hello, world!\\n");\n}\n\nint main() {\n    greet();\n    return 0;\n}\n`,
  cpp: `// C++ Code Here\n#include<iostream>\nusing namespace std;\n\nvoid greet() {\n    cout << "Hello, world!" << endl;\n}\n\nint main() {\n    greet();\n    return 0;\n}\n`,
  nodejs: `// NodeJS Code Here\nfunction greet() {\n    console.log('Hello, world!');\n}\n\ngreet();\n`,
  javascript: `// JavaScript Code Here\nfunction greet() {\n    console.log('Hello, world!');\n}\n\ngreet();\n`,
  groovy: `// Groovy Code Here\ndef greet() {\n    println 'Hello, world!'\n}\n\ngreet()\n`,
  jshell: `// JShell Java Shell Tool\nvoid greet() {\n    System.out.println("Hello, world!");\n}\n\ngreet();\n`,
  haskell: `-- Haskell Code Here\ngreet :: IO ()\ngreet = putStrLn "Hello, world!"\n\nmain = greet\n`,
  tcl: `# Tcl Code Here\nproc greet {} {\n    puts "Hello, world!"\n}\n\ngreet\n`,
  lua: `-- Lua Code Here\nfunction greet()\n    print("Hello, world!")\nend\n\ngreet()\n`,
  ada: `-- Ada Code Here\nprocedure Greet is\nbegin\n    Ada.Text_IO.Put_Line ("Hello, world!");\nend Greet;\n`,
  commonlisp: `;; Common Lisp Code Here\n(defun greet ()\n  (print "Hello, world!"))\n\ngreet\n`,
  d: `// D Code Here\nimport std.stdio;\nvoid greet() {\n    writeln("Hello, world!");\n}\n\ngreet();\n`,
  elixir: `# Elixir Code Here\ndefmodule Greeter do\n  def greet do\n    IO.puts("Hello, world!")\n  end\nend\n\nGreeter.greet()\n`,
  erlang: ` % Erlang Code Here\n-module(greeter).\n-export([greet/0]).\n\ngreet() ->\n    io:fwrite("Hello, world!\\n").\n`,
  fsharp: `// F# Code Here\nlet greet () =\n    printfn "Hello, world!"\n\ngreet()\n`,
  fortran: `! Fortran Code Here\nprogram greet\n    print *, 'Hello, world!'\nend program greet\n`,
  assembly: `; Assembly x86 Code Here\nsection .data\n    msg db "Hello, world!",0\nsection .text\n    global _start\n_start:\n    mov edx, 13\n    mov ecx, msg\n    mov ebx, 1\n    mov eax, 4\n    int 0x80\n    mov eax, 1\n    int 0x80\n`,
  scala: `// Scala Code Here\nobject Main extends App {\n  def greet(): Unit = {\n    println("Hello, world!")\n  }\n\n  greet()\n}\n`,
  php: `<?php\n\t// PHP Code Here\n\techo 'Hello, world!';\n?>\n`,
  csharp: `// C# Code Here\nusing System;\n\npublic class Program {\n    public static void Greet() {\n        Console.WriteLine("Hello, world!");\n    }\n\n    public static void Main() {\n        Greet();\n    }\n}\n`,
  perl: `# Perl Code Here\nsub greet {\n    print "Hello, world!\\n";\n}\n\ngreet();\n`,
  ruby: `# Ruby Code Here\ndef greet\n  puts 'Hello, world!'\nend\n\ngreet()\n`,
  go: `// Go Code Here\npackage main\n\nimport "fmt"\n\nfunc greet() {\n    fmt.Println("Hello, world!")\n}\n\nfunc main() {\n    greet()\n}\n`,
  r: `# R Code Here\ngreet <- function() {\n  cat('Hello, world!\\n')\n}\n\ngreet()\n`,
  racket: `#lang racket\n(define (greet)\n  (displayln "Hello, world!"))\n(greet)\n`,
  ocaml: `(* OCaml Code Here *)\nlet greet () = print_endline "Hello, world!"\n\ngreet ();\n`,
  vb: ` ' Visual Basic .NET Code Here\nPublic Sub Greet()\n    Console.WriteLine("Hello, world!")\nEnd Sub\n\nSub Main()\n    Greet()\nEnd Sub\n`,
  bash: `# Bash Code Here\necho "Hello, world!"\n`,
  clojure: `;; Clojure Code Here\n(defn greet []\n  (println "Hello, world!"))\n\n(greet)\n`,
  typescript: `// TypeScript Code Here\nfunction greet(): void {\n    console.log('Hello, world!');\n}\n\ngreet();\n`,
  cobol: `       IDENTIFICATION DIVISION.\n       PROGRAM-ID. Greet.\n       PROCEDURE DIVISION.\n           DISPLAY 'Hello, world!'.\n           STOP RUN.\n`,
  kotlin: `// Kotlin Code Here\nfun greet() {\n    println("Hello, world!")\n}\n\nfun main() {\n    greet()\n}\n`,
  pascal: `// Pascal Code Here\nprogram Greet;\nbegin\n    writeln('Hello, world!');\nend.\n`,
  prolog: ` % Prolog Code Here\n greet :- write('Hello, world!'), nl.\n\n:- initialization(greet).\n`,
  rust: `// Rust Code Here\nfn greet() {\n    println!("Hello, world!");\n}\n\nfn main() {\n    greet();\n}\n`,
  swift: `// Swift Code Here\nfunc greet() {\n    print("Hello, world!")\n}\n\ngreet()\n`,
  octave: `# Octave Code Here\necho on; disp('Hello, world!')\n`,
  text: `Hello, world!\n`,
  brainfk: `++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.`,
  coffeescript: `# CoffeeScript Code Here\ngreet = -> console.log 'Hello, world!'\ngreet()\n`,
  ejs: ` <% // EJS Code Here %>\n <%- 'Hello, world!' %>\n`,
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
