---
title: react-responsive
date: 2021-02-25 10:02:73
category: React
thumbnail: { thumbnailSrc }
draft: false
---

![](./images/react.jpg)

# React 반응형 구축하기

요즘 컴퓨터 모니터, 테블릿, 스마트폰 등 여러가지 화면 크기가 존재하는 것은 물론 각각의 기계마다 크기도 다양하니 프론트 엔드를 개발하려면 무조건 반응형에 대응하야한다. 그렇다면 React에서는 어떻게 반응형에 대응해야 할까?

## 전역 파일 만들기

기본적인 방법으로 반응형을 구현할때 사용할 모든 css에 <span style="color:blue"> media(min-width:... ) </span> 같은 미디어 쿼리를 설정해줘야한다. 하지만 이 방법은 매우 효율적이지 못한 방법인다. 따라서 전역에 만들어준다.

````javascript
const size = {
    mobile:"770px",
    tabletS:"1023px",
    tabletM:"1220px",
    tableL:"1280px",
    laptop:"1460px",
    desktop:"1700px"
};

const theme = {
    mobile:`(max-width: ${size.mobile})`,
    tabletS:`(max-width: ${size.mobile})`,
    tabletM:`(max-width: ${size.mobile})`,
    tableL:`(max-width: ${size.mobile})`,
    laptop:`(max-width: ${size.mobile})`,
    desktop:`(max-width: ${size.mobile})`,
}

export default theme;
```

````

## styled-components 사용하기

요즘에는 HTML,CSS,Javascript 파일을 별도로 두는 것이 아니라 여러 개의 컴포넌트로 분리하고 그곳에 세개를 때려박는 패턴이 많이 유행한다고 한다. 따라서 이 패키지는 CSS-in-JS 중 가장 널리 사용된다고 한다.

styled-components는 Template Literal을 사용해 스타일을 지정할 수 있고, 동적으로 props를 내려받아 사용한다. 즉 css 파일에 딸로 설정할 필요 없이 스타일 정의를 자바스크립트 컴포넌트에 바로 삽입할 수 있게 한다는 뜻이다.

더 자세한 설치 방법이나 설명을 아래 블로그를 참고하자.

- https://www.daleseo.com/react-styled-components/

1. 위에서 만든 전역파일을 모든 곳에서 사용할 수 있게 자신의 메인 파일에 감싸준다. 이때 사용하는 것은 styled-components가 제공하는 <span style="color:blue">ThemeProvider</span>이다. ThemeProvider로 감싸진 자식 컴포넌트들은 ThemeProvider로 전달받은 theme를 props로 전달받아 사용이 가능하다고 한다.

```javascript
import { ThemeProvider } from 'styled-components'
import theme from './style/theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Route path="/" component={Main} exact={true} />
      <Route path="/project" component={Project} />
    </ThemeProvider>
  )
}

export default App
```

2.  그후 반응형을 만들고 싶은 컴포넌트의 요소의 styled-component안에 지정하고 싶은 화면의 크기를 props로 받아서 사용하면 된다.

```javascript
/* 뒤로 돌아가기 버튼 css + 반응형 */
const Fixedbtn = styled.div`
        position: fixed;
        right: 5%;
        bottom: 3%;
        z-index: 1000;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        padding: 0.6rem;
        border-radius: 20px 20px 20px 20px;

        @media ${(props) => props.theme.mobile}{
            right:10%;
        }
        `;
......
const VisualizeData = () =>{

    return(
            {/* 프로젝트로 돌아가기*/}
            <Fixedbtn  onClick={handleClick}>
                내용
            </Fixedbtn>
```

## 마무리

일단 기존에 css에서 미디어 쿼리로 사용했던 방법은 모든 css파일을 건들여야되고 똑같은 코드를 삽입하는 느낌이 들어 별로 마음에 들지 않았다. 하지만 이 방법을 사용하니 일단 화면 크기의 대한 변수를 전역으로 뺄 수 있어서 좋았고 어디서든지 props로 전달 받아 사용한다는 점이 좋았다. 사실 이 방법말고 더 좋은 방법이 있을 수도 있다. 현재는 이 방법이 내가 찾은 방법 중에 가장 나았을 뿐이며 계속해서 반응형은 고려해야하는 부분같다.

## References

- https://kim-mj.tistory.com/282
- https://velog.io/@rjsdnql123/%EB%B3%B8%EA%B2%A9styled-components%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0

![]()
