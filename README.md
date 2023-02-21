# 📋 React-markdown을 이용하여 만든 페이지입니다.
:octocat: 바로가기 : https://light9639.github.io/React-Markdown-TS/

![light9639 github io_React-Markdown-TS_](https://user-images.githubusercontent.com/95972251/216873983-82950aa3-65af-444d-8414-c0591dfd09c2.png)

:sparkles: React-markdown을 이용하여 만든 페이지입니다. :sparkles:
## :tada: React 프로젝트 생성
- React 생성
```bash
npm create-react-app my-app
# or
yarn create react-app my-app
```

- vite를 이용하여 프로젝트를 생성하려면
```bash
npm create vite@latest
# or
yarn create vite
```
- 터미널에서 실행 후 프로젝트 이름 만든 후 React 선택, Typescirpt-SWC 선택하면 생성 완료.
## 🛺 'react-markdown', 'react-syntax-highlighter', 'remark-gfm' 라이브러리 설치
- 프로젝트를 진행하려면 `react-markdown` 관련 라이브러리들을 치해서 진행해야 한다. 따라서 아래 명령어로 라이브러리를 설치한다.
```bash
$ npm install react-markdown react-syntax-highlighter remark-gfm
# or
$ yarn add react-markdown react-syntax-highlighter remark-gfm
```
## ✒️ App.tsx, App.css 수정 및 작성
### ⚡ App.tsx
- `ReactMarkdown`으로 마크다운을 감싸주면 마크다운 문법이 react에 적용된다.
- `react-syntax-highlighter`를 이용하면 코드의 스타일을 적용할 수 있다. 이 문서에서는 `prism` 속성을 이용했다.
- `ReactMarkdown`만 사용하게 되면 사용할 수 있는 마크다운 문법이 제한적이기 때문에 `link`, `table`, `checklist` 등을 표현할 수 있게 `remark-gfm` 플러그인을 같이 설치해서 사용하면 좋다.
```typescript
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
```
### ⚡ App.css
- 반응형 CSS를 작성하여 넓이가 `1024px` 이상일 때는 각각 절반씩 화면에 나타나지만 `1024px` 이하일 경우에는 세로 정렬이 되도록 한다.
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
## 📎 출처
- <a href="https://doinge-coding.tistory.com/entry/React-react-markdown-%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0-%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4-%EC%82%AC%EC%9A%A9%EB%B2%95">[React] react markdown, 마크다운 적용하기, 마크다운 사용법</a>
- <a href="https://velog.io/@again7536/Next.js-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-1">Next.js 블로그 만들기 - (1) React-Markdown</a>
- <a href="https://codesandbox.io/s/react-markdown-oecc0?file=/src/App.tsx:437-454">react-markdown codesandbox</a>
