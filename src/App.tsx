import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import remarkGfm from 'remark-gfm';

// 사용하지 않는 스타일들
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const startingText = `# Hello

https://example.org

\`\`\`sh
# Code block
\`\`\`

![Placeholder image](https://unsplash.it/600/400)

~~strike~~ this

## TODO

* [ ]  This
* [ ]  That
* [x]  The other

|Fahrenheit|Celsius|Kelvin|
|---:|---:|---:|
|-459.67|-273.15|0|
|-40|-40|233.15|
|32|0|273.15|
|212|100|373.15|
`;

export default function App(): JSX.Element {
  const [input, setInput] = useState<string>(startingText);

  return (
    <div className="App">
      <textarea
        autoFocus
        className='textarea'
        value={input}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setInput(e.target.value) }}
      ></textarea>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        children={input}
        className='markdown'
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={prism}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
        }}
      />
    </div>
  )
}