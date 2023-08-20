# Introduction to NextJS

리액트는 라이브러리이고 넥스트는 리액트를 이용하는 프로젝트의 Best Practice를 유도하는 프레임워크이다.
- 하나의 예시로 CRA 로 만든 React 앱은 index.js 의 root 렌더링 코드를 확인 할 수 있지만 CNA 로 만든 Next 앱은 프레임워크 내부에서 동작하며 우리의 코드를 호출한다.

```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
```

## 프로젝트 세팅

CNA(Create-Next-App) 로 생성
```
$ npx create-next-app@latest
? What is your project named? » next-practice
√ What is your project named? ... next-practice
? Would you like to use TypeScript? » No / Yes
√ Would you like to use TypeScript? ... Yes
? Would you like to use ESLint? » No / Yes
√ Would you like to use ESLint? ...  Yes
? Would you like to use Tailwind CSS? » No / Yes
√ Would you like to use Tailwind CSS? ... No
? Would you like to use `src/` directory? » No / Yes
√ Would you like to use `src/` directory? ... No
? Would you like to use App Router? (recommended) » No / Yes
√ Would you like to use App Router? (recommended) ... No
? Would you like to customize the default import alias? » No / Yes
√ Would you like to customize the default import alias? ... No

```

## Page

- 페이지의 경로는 pages 내부의 파일명으로 지정된다. 컴포넌트 명은 경로에 영향 없음.
- index.js 와 같은 몇가지 예약 파일명이 존재.
- CRA 프로젝트처럼 React 라이브러리를 명시적으로 import 하지 않아도 JSX 문법을 사용할 수 있다.
    - 하지만, React hooks를 사용하고 싶다면 import 해주어야한다.

## SSG

Next.js의 특징 중 하나는 정적 사이트 생성 기능(SSG : Static Site Generation)이다.

- Next 앱의 페이지들이 미리 렌더링 된다.
- [JAMstack](https://jamstack.org/generators/) 사이트를 보면 여러 정적 생성 도구 들(Static Site Generators)을 비교해 놓았다.

CRA(Create React App)로 만든 리액트 앱은 기본적으로 CSR(Client Side Render)을 한다.
모든 마크업 언어가 생성되어 오는 것이 아니라 index.html 만을 가져온다. Client 브라우저가 JS 코드를 받아온 다음에 브라우저 상에서 실행되어 렌더링된다. (Client Side의 JS 코드가 모든 뷰를 생성하는 것이다.)
- 그래서 브라우저 설정에서 JavaScript 를 차단하면 index.html의 noscript 태그내부의 다음 문구가 보인다.
    ```html
    <noscript>You need to enable JavaScript to run this app.</noscript>
    ```
- 원활하지 않은 네트워크 환경에서 CSR인 리액트앱을 요청하면, 모든 React.js 코드, 자바스크립트 코드를 가져와야 UI 가 렌더링 되기 때문에 처음에 빈 화면 (White Screen) 만 보일 수도 있다.


반면, Next 앱은 Client 브라우저가 JS 코드를 받아오는 것이 아니다. Static Pre Rendering 되어 온다. 즉, 실제 우리가 작성한 자바스크립트 코드로 Render 된 마크업 언어가 오게 된다.

따라서  자바스크립트를 지원하지 않는 브라우저에서도, 원할 하지 않는 네트워크 환경에서도 Pre Render 된 UI 가 바로 보인다. 오는 데 느릴 수는 있게지만 차곡 차곡 온 UI 는 보이게 된다.


## Hydration

Hydration 과정

1. Next는 React 를 백엔드에서 동작 시켜 페이지를 미리 만든다.

2. Client 가 요청했을 때 이 마크업이 렌더링 시킨다. 이때 유저는 자바스크립트와 React.js 가 로딩되지 않아도 UI 를 볼 수 있다.

3. 그리고 얼마후 React.js 가 로딩 되면 이미 존재하는 것들과 연결되어 리액트앱으로서 동작한다.

- 자바스크립트를 차단하거나 지원하지 않는 브라우저에서는 당연히 React로의 전환이 이루어지지 않아서 React Hook 들과 같은 기능이 정상적으로 동작하지는 않는다.