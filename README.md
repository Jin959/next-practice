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


