---

title: Hooks

date: 2021-03-17 07:07:00

category: React

thumbnail: { thumbnailSrc }

draft: false

---



![](./images/react.jpg)



# Hooks





리액트하면 Hooks 공부는 필수일 것이다. 아주 기본적인것이지만 따로 정리해주면 좋을 것 같다는 개념이라 포스팅을 하게되었다. Hooks는 리액트 v16.8에 새로 도입된 기능으로 함수형 컴포넌트에서도 상태관리를 할 수 있게 만들어졌다고 한다. 



## useState



useState는 가장 기본적인 Hook이다. 리액트 컴포넌트는 동적인 부분이 하나도 없어 값이 바뀌기 힘들었다.  따라서 사용하게 되는게 바로 useState이고 상태 유지 값과 그 값을 갱신하는 함수를 반환한다. 최초로 랜더링을 하는 동안은 아래와 같은 초기값으로 설정된다. 



\````javascript```

```javascript
import React,{useState} from 'react'

const [state, setState] = useState(initialStae);
```



다음은 useState 설명에서 흔히 사용되느니 예제이다.  아래 보이는 useState가 쓰여진 이 함수에 파라미터를 넣어서  버튼이 눌릴때마다 해당 파라미터가 useState롤 전달되 갱신될 것이다. 이렇게 하면 상태 관리를 하기 위해 컴포넌트 코드를 굳이 클래스 형태로 변환할 필요가 없어서 매우 편리해진다. 



```javascript
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```



## useEffect



useEffect는 리액트 컴포넌트가 랜더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook이다.  <span style="color:blue">대신 주의해야할 점은 useEffect에 전달된 함수는 화면에 랜더링이 완료 후에 수행된다는 점이다. 이뿐만 아니라 어떤 값이 변경되었을 때 실행된다. </span> 모든 랜더링 후에 호출되는 이유는 대부분 작업이 브라우저에서 화면을 업데이트하는 것을 차단하면 안되지 때문이라고 한다.  따라서 종종 컴포넌트 화면이 종료되고 정리해야하는 부분에 사용한다고 한다.



다음 예제는 구독을 생성하는 코드이다. 이때 만약 컴포넌트가 여러번 랜더링 된다면 밑에 코드는 계속 수행된다. 따라서 아래의 예제는 매 갱신마다 새로운 구독이 생성된다고 생각하면 된다. 하지만 불필요한 수행이 발생하는 방법을 막는 것이 아래에 설명되어있다.



\````javascript```

```javascript
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Clean up the subscription
    subscription.unsubscribe();
  };
});
```



다음은 매번 갱신 될때매다 랜더링 되면 호출되는 useEffect에서 한번만 호출하는 방법에 대해서 설명한다. 아래와 같이 useEffect에 두번째 인자를 설정하면 props.source가 변경될따만 return 부분을 호출되게 될것이다.  만약 이를 비워둔 상태로 둔다면 맨 처음 화면이 랜더링 될때만 호출된다. 



```javascript
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```





## useReducer



useSate의 대체 함수이다. useReducer는 useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트해 주고 싶을 때 사용한다. 



useReduer의 첫번째 파라미터는 리듀서 함수를 넣고 두번쨰 파라미터는 해당 리듀서의 기본값을 넣어준다. 여기서 state는 현재 가리키고 있는 상태이고, dispatch는 액션을 발생시키는 함수이다. 이처럼 userReducer를 사용했을 때 가장 큰 장점은 컴포넌트를 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 점이다. 



\````javascript```

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```



다음은 매번 갱신 될때매다 랜더링 되면 호출되는 useEffect에서 한번만 호출하는 방법에 대해서 설명한다. 아래와 같이 useEffect에 두번째 인자를 설정하면 props.source가 변경될따만 return 부분을 호출되게 될것이다.  만약 이를 비워둔 상태로 둔다면 맨 처음 화면이 랜더링 될때만 호출된다. 



```javascript
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```















**## 마무리**





**## References**



\-https://ko.reactjs.org/docs/hooks-reference.html



![]()