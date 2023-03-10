# ๐ React-markdown์ ์ด์ฉํ์ฌ ๋ง๋  ํ์ด์ง์๋๋ค.
:octocat: ๋ฐ๋ก๊ฐ๊ธฐ : https://light9639.github.io/React-Markdown-TS/

![light9639 github io_React-Markdown-TS_](https://user-images.githubusercontent.com/95972251/216873983-82950aa3-65af-444d-8414-c0591dfd09c2.png)

:sparkles: React-markdown์ ์ด์ฉํ์ฌ ๋ง๋  ํ์ด์ง์๋๋ค. :sparkles:
## :tada: React ํ๋ก์ ํธ ์์ฑ
- React ์์ฑ
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite๋ฅผ ์ด์ฉํ์ฌ ํ๋ก์ ํธ๋ฅผ ์์ฑํ๋ ค๋ฉด
```bash
npm create vite@latest
# or
yarn create vite
```
- ํฐ๋ฏธ๋์์ ์คํ ํ ํ๋ก์ ํธ ์ด๋ฆ ๋ง๋  ํ React ์ ํ, Typescirpt-SWC ์ ํํ๋ฉด ์์ฑ ์๋ฃ.
## ๐บ 'react-markdown', 'react-syntax-highlighter', 'remark-gfm' ๋ผ์ด๋ธ๋ฌ๋ฆฌ ์ค์น
- ํ๋ก์ ํธ๋ฅผ ์งํํ๋ ค๋ฉด `react-markdown` ๊ด๋ จ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ค์ ์นํด์ ์งํํด์ผ ํ๋ค. ๋ฐ๋ผ์ ์๋ ๋ช๋ น์ด๋ก ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ค์นํ๋ค.
```bash
$ npm install react-markdown react-syntax-highlighter remark-gfm
# or
$ yarn add react-markdown react-syntax-highlighter remark-gfm
```
## โ๏ธ App.tsx, App.css ์์  ๋ฐ ์์ฑ
### โก App.tsx
- `ReactMarkdown`์ผ๋ก ๋งํฌ๋ค์ด์ ๊ฐ์ธ์ฃผ๋ฉด ๋งํฌ๋ค์ด ๋ฌธ๋ฒ์ด react์ ์ ์ฉ๋๋ค.
- `react-syntax-highlighter`๋ฅผ ์ด์ฉํ๋ฉด ์ฝ๋์ ์คํ์ผ์ ์ ์ฉํ  ์ ์๋ค. ์ด ๋ฌธ์์์๋ `prism` ์์ฑ์ ์ด์ฉํ๋ค.
- `ReactMarkdown`๋ง ์ฌ์ฉํ๊ฒ ๋๋ฉด ์ฌ์ฉํ  ์ ์๋ ๋งํฌ๋ค์ด ๋ฌธ๋ฒ์ด ์ ํ์ ์ด๊ธฐ ๋๋ฌธ์ `link`, `table`, `checklist` ๋ฑ์ ํํํ  ์ ์๊ฒ `remark-gfm` ํ๋ฌ๊ทธ์ธ์ ๊ฐ์ด ์ค์นํด์ ์ฌ์ฉํ๋ฉด ์ข๋ค.
```typescript
import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import remarkGfm from 'remark-gfm';

// ์ฌ์ฉํ์ง ์๋ ์คํ์ผ๋ค
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
```
### โก App.css
- ๋ฐ์ํ CSS๋ฅผ ์์ฑํ์ฌ ๋์ด๊ฐ `1024px` ์ด์์ผ ๋๋ ๊ฐ๊ฐ ์ ๋ฐ์ฉ ํ๋ฉด์ ๋ํ๋์ง๋ง `1024px` ์ดํ์ผ ๊ฒฝ์ฐ์๋ ์ธ๋ก ์ ๋ ฌ์ด ๋๋๋ก ํ๋ค.
```css
.App {
  display: flex;
}

.textarea {
  width: 50%;
  height: 100vh;
  padding: 20px;
  font-size: 2rem;
  outline: none;
}

.markdown {
  width: 50%;
  height: 100vh;
  padding: 20px;
  outline: none;
}

@media screen and (max-width: 1024px) {
  .App {
    flex-direction: column;
  }

  .textarea {
    max-width: 95%;
    width: 100%;
    margin: 0 auto;
    height: 50vh;
  }

  .markdown {
    max-width: 95%;
    width: 100%;
    margin: 0 auto;
    height: 50vh;
  }
}
```
## ๐ ์ถ์ฒ
- <a href="https://doinge-coding.tistory.com/entry/React-react-markdown-%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4-%EC%82%AC%EC%9A%A9%EB%B2%95">[React] react markdown, ๋งํฌ๋ค์ด ์ ์ฉํ๊ธฐ, ๋งํฌ๋ค์ด ์ฌ์ฉ๋ฒ</a>
- <a href="https://velog.io/@again7536/Next.js-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-1">Next.js ๋ธ๋ก๊ทธ ๋ง๋ค๊ธฐ - (1) React-Markdown</a>
- <a href="https://codesandbox.io/s/react-markdown-oecc0?file=/src/App.tsx:437-454">react-markdown codesandbox</a>
