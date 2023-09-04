# Introduction to NextJS

- 해당 학습은 Page Router 방식으로 진행함.

리액트는 라이브러리이고 넥스트는 리액트를 이용하는 프로젝트의 Best Practice를 유도하는 프레임워크이다.

- 하나의 예시로 CRA 로 만든 React 앱은 index.js 의 root 렌더링 코드를 확인 할 수 있지만 CNA 로 만든 Next 앱은 프레임워크 내부에서 동작하며 우리의 코드를 호출한다.

```javascript
const root = ReactDOM.createRoot(document.getElementById("root"));
```

---

- [프로젝트 세팅](#프로젝트-세팅)
- [실행](#실행)
- [Page](#page)
- [SSG ; Static Site Generation](#ssg)
- [Hydration](#hydration)
- [Routing](#routing)
  - [Link](#link)
  - [useRouter](#userouter)
  - [중첩 라우팅](#중첩-라우팅)
  - [동적 라우팅](#동적-라우팅)
- [Styled JSX](#styled-jsx)
  - [Global Styles](#global-styles)
- [App Component](#app-component)
  - [컴포넌트 호출 과정](#컴포넌트-호출-과정)
  - [styles/globals.css](#globals-css)
- [Client Side API Fetching](#client-side-api-fetching)
  - [넥스트 설정 next.config.js](#넥스트-설정-next-configuration)
  - [API 은닉](#-api-은닉)
- [Server Side Rendering](#server-side-rendering)
  - [Data Fetching - GetServerSideProps](#data-fetching)

---

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

## 실행

개발 환경 실행

```
npm run dev
```

## Page

[Pages and Layouts](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts)

- Page는 Next.js 에서 React Component 이다.
- 페이지의 URI는 pages 내부의 파일명으로 지정된다. 컴포넌트 명은 경로에 영향 없음.
- index.js 와 같은 몇가지 예약 파일명이 존재.
- CRA 프로젝트처럼 React 라이브러리를 명시적으로 import 하지 않아도 JSX 문법을 사용할 수 있다.
  - 하지만, React hooks를 사용하고 싶다면 import 해주어야한다.

## SSG

Next.js의 특징 중 하나는 정적 사이트 생성 기능(SSG : Static Site Generation)이다.

- Next 앱의 페이지들이 미리 렌더링 된다.
- [JAMstack](https://jamstack.org/generators/) 사이트를 보면 여러 정적 생성 도구 들(Static Site Generators)을 비교해 놓았다.

**CRA(Create React App)로 만든 리액트 앱**은 기본적으로 CSR(Client Side Render)을 한다.  
모든 마크업 언어가 생성되어 오는 것이 아니라 index.html 만을 가져온다.  
Client 브라우저가 JS 코드를 받아온 다음에 브라우저 상에서 실행되어 렌더링된다. (Client Side의 JS 코드가 모든 뷰를 생성하는 것이다.)

- 그래서 브라우저 설정에서 JavaScript 를 차단하면 index.html의 noscript 태그내부의 다음 문구가 보인다.
  ```html
  <noscript>You need to enable JavaScript to run this app.</noscript>
  ```
- 원활하지 않은 네트워크 환경에서 CSR인 리액트앱을 요청하면, 모든 React.js 코드, 자바스크립트 코드를 가져와야 UI 가 렌더링 되기 때문에 처음에 빈 화면 (White Screen) 만 보일 수도 있다.

반면, **Next 앱**은 Client 브라우저가 JS 코드를 받아오는 것이 아니다.  
Static Pre Rendering 되어 온다. 즉, 실제 우리가 작성한 자바스크립트 코드로 Render 된 마크업 언어가 오게 된다.

따라서 자바스크립트를 지원하지 않는 브라우저에서도, 원할 하지 않는 네트워크 환경에서도 Pre Render 된 UI 가 바로 보인다.  
오는 데 느릴 수는 있게지만 차곡 차곡 온 UI 는 보이게 된다.

## Hydration

Hydration 과정

1. Next는 React 를 백엔드에서 동작 시켜 페이지를 미리 만든다.

2. Client 가 요청했을 때 이 마크업이 렌더링 시킨다. 이때 유저는 자바스크립트와 React.js 가 로딩되지 않아도 UI 를 볼 수 있다.

3. 그리고 얼마후 React.js 가 로딩 되면 이미 존재하는 것들과 연결되어 리액트앱으로서 동작한다.

- 자바스크립트를 차단하거나 지원하지 않는 브라우저에서는 당연히 React로의 전환이 이루어지지 않아서 React Hook 들과 같은 기능이 정상적으로 동작하지는 않는다.

## Routing

[Linking and Navigatinging](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating)

### Link

React Router 의 Link 와 같이 anchor 태그 `<a href ="">` 대신 사용하는 컴포넌트가 Next에도 ["next/link"의 Link](https://nextjs.org/docs/pages/api-reference/components/link) 가 제공 된다.

- `<a>` 태그의 문제점은 클릭 될때마다 웹 페이지를 서버에서 다시 요청하고 웹 페이지를 다시 렌더링한다는 데에 있다.
- next/link 의 Link 컴포넌트를 사용하면 `<a>` 태그와 달리 페이지 리로드가 필요없다.

### useRouter

[useRouter Hook](https://nextjs.org/docs/pages/api-reference/functions/use-router) 을 사용하면 asPath, back, basePath 등과 같은 Path 정보들을 활용할 수 있다.

```typescript
const router = useRouter();
```

### 중첩 라우팅

- [Nested Routes](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts#nested-routes)

`pages/restaurants`은 `pages/restaurants/index`로, `pages/restaurants/all`는 `pages/restaurants/all` 로 방문할 수 있다.

```
pages
|   about.tsx
|   index.tsx
|   _app.tsx
|
\---restaurants
        all.tsx
        index.tsx
```

### 동적 라우팅

- [Dynamic Routing](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes)

`/restaurants/12356` 의 URL 로 방문할 수 있다.

```
pages
|   about.tsx
|   index.tsx
|   _app.tsx
|
\---restaurants
        [id].tsx
```

생성한 뒤에

1. [`<Link>` 를 타면 된다.](https://github.com/Jin959/next-practice/blob/master/pages/index.tsx#L50-L60)
2. [아니면 useRouter Hook을 사용](https://github.com/Jin959/next-practice/blob/master/pages/index.tsx#L28-L38)

객체 대신 path 만으로 넘길 수도 있다.
```typescript
const onClick = (id: number) => {
 router.push(`/restaurants/${id}`);
};
```

useRouter 는 후속처리를 하기에 유용.

- URL을 자유롭게 사용하고 싶다면, [Catch-all Segments](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#catch-all-segments))

## Styled JSX

Vercel 의 CSS-in-JS 인 Styled JSX.
CNA 에서 별도의 설치 없이 사용 가능하다.

- CSS 모듈처럼 고유한 해시값으로 된 클래스네임을 적용한다.  
  설정한 스타일은 Scoped(한정되어 작용)되어 설정한 자리의 컴포넌트에만 적용된다.  
  (자식 컴포넌트 설정 -> 부모에 또 설정 : 각자 설정 가능)  
  클래스도 마찬가지이다. 설정한 컴포넌트 내부의 것만 스타일이 적용
- 확실하진 않지만, styled-JSX 에서 css 구문을 작성할때, 자식 컴포넌트를 먼저 작성해야 적용된다.
- [블로그 소개글](https://nextjs.org/blog/styling-next-with-styled-jsx)
- [깃헙 레포](https://github.com/vercel/styled-jsx)

### Global Styles

Styled-JSX 에서 다음과 같이 글로벌 설정을 할 수 있다.
page 라우팅 방식을 사용한다면, 해당 글로벌 설정은 해당 page에 한하여 적용된다.

```typescript
export default function Home() {
  return (
    <div>
      <NavBar />
      <h1>HI!</h1>
      <style jsx global>{`
         {
          /*글로벌 설정*/
        }
        a {
          background-color: white;
        }
      `}</style>
    </div>
  );
}
```

## App Component

웹 어플리케이션 전역에서 Auth 처럼 공통적인 기능이나 네비게이션 바와 같이 공통적인 View 를 만들 필요가 있을때, App Component 를 커스터마이징 하면된다.

- [CustomApp](https://nextjs.org/docs/pages/building-your-application/routing/custom-app)

Next.js 는 page 들을 초기화 할때, App Component 를 사용한다. 보통 Next.js 에서 따로 설정하지 않아도 기본 App 컴포넌트를 사용한다.

커스터마이징을 하려면 `pages/_app.tsx` 파일을 만들어 설정한다.

Next.js 는 다른 것을 렌더링 하기 전에 `_app.tsx` 를 먼저 렌더링한다.

기본 App 컴포넌트 대략 다음과 같음. 이걸 만지작 거려 바꾸면 커스텀 임.

```typescript
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

**Compopnent**: 활성 된 (사용 중) 인 페이지를 가리킨다. 페이지가 라우팅 되어 바뀔때 마다 **Compopnent** 가 참조하는 것이 바뀐다.

**pageProps**: **Compopnent** 에게 Pre-loading 시킬 Props 들이다.

### 컴포넌트 호출 과정

1. `pages/` 내의 어떤 페이지 컴포넌트를 호출함.

2. 호출한 페이지 컴포넌트를 App 컴포넌트에 **Compopnent** Prop 으로 전달함.

3. App 컴포넌트에서 **Compopnent**를 활용한 return 문으로 렌더링

### globals css

`styles/globals.css` 는 처음 CNA 프로젝트를 파면 생기는 건데,

보통 page 컴포넌트에서는 일반 css 파일을 import 할 수 없다. page는 css 모듈만 import 할 수 있다.

하지만 [App Component](#app-component-and-app-page) 에서는 할 수 있다.

## 제공되는 컴포넌트

Next.js 에서는 기본적으로 [컴포넌트 몇 가지](https://nextjs.org/docs/pages/api-reference/components)를 제공한다.

- next/head

## Client Side API Fetching

- [Client Side Fetching](https://nextjs.org/docs/pages/building-your-application/data-fetching/client-side)

### 넥스트 설정 Next Configuration

- [next.config.js Options](https://nextjs.org/docs/pages/api-reference/next-config-js)

**[Redirects](https://nextjs.org/docs/pages/api-reference/next-config-js/redirects)**

Next.js에서 리다이렉션 설정을 할 수 있다.  
`permanent` 옵션은 HTTP 상태 307/308 에 대한 옵션이다.

도메인에 대한 변경 등에 활용할 수 있을듯.

**[Rewrites](https://nextjs.org/docs/pages/api-reference/next-config-js/rewrites)**

`rewrites`는 일종의 proxy URL 로서 **[Redirects](https://nextjs.org/docs/pages/api-reference/next-config-js/redirects)**와는 다르게 변경 된 경로가 보이지 않는다.

### API 은닉

- [next.config.js](https://github.com/Jin959/next-practice/blob/897fa8fb1fc36ad350da68f5722c20efac13ec98/next.config.js)
- [pages/index.js](https://github.com/Jin959/next-practice/blob/897fa8fb1fc36ad350da68f5722c20efac13ec98/pages/index.tsx)

## Server Side Rendering

다음 명령어로 빌드한 뒤, 빌드 결과물을 보면 SSR이 어떻게 일어나는지 알 수 있다.

```
next build
```

### Data Fetching

- [pages/index.js](https://github.com/Jin959/next-practice/blob/master/pages/index.tsx)

**[GetServerSideProps](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props)**

Backend 에서만 일어나는 것을 다룬다.  
여기서 일어나는 일들은 Client 가 확인 할 수 없다.

리액트로의 전환에서 \<script id="\_\_NEXT_DATA\_\_"\> 를 통해 자료를 넘겨준다.
