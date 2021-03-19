---
title: Mobx와 Context API를 이용한 Store

date: 2021-03-19 15:10:00

category: React

thumbnail: { thumbnailSrc }

draft: false
---

![](./images/react.jpg)

Redux와 또 다른 State관리 라이브러리이다. state를 전역적으로 쉽게 관리할 수 있게 해준다. 기본적으로 객체지향 느낌이 강하며 Component와 State를 연결하는 Redux와 달리 번잡한 코드를 깔끔하게 만들어준다.

사실 React를 처음 접하면 props와 state를 변경하는 것 만으로도 얼마든지 어플리케이션을 만들수 있다. 하지만 어플리케이션의 규모가 커짐에 따라 관리해야할 컴포넌트가 늘어나고 그들만의 의존성이 생겨버린다. 따라서 이것을 위해 존재하는게 Redux와 우리가 오늘 접하게될 Mobx라는 것이다. Mobx는 Redux보다 훨씬 복잡성이 덜해서 사람들에게 각광받고 있다.

<br/>
<br/>

### mbox 주요 요소

<hr/>

#### Observable

Observable은 Mobx에서 가장 중요한 개념이다. Mobx에서 Rendering대상이 되는 state를 관찰대상으로 칭하며 @observable데코레이터로 지정한 관찰대상은 그 값이 변경될때마다 리랜더링 된다. 다.

#### action

action은 state에 변화를 일으키는 Observable 상태를 변화 시키는 코드를 호출하는 액션이다. 이 액션들은 모두 동기적으로 처리된다.

#### Reaction

값이 바뀔때에 따라 해야할 일을 정의하는 것이다. 예를 들어 Observable state가 바뀌었을 때 이 리액션을 이용해 원하는 로직을 실행시킬 수 있다.

#### Computed Value

주로 성능 최적화를 위해서 많이 사용한다. 연산에 기반 되는 값이 변화할 때만 새로 연산하고 바뀌지 않는다면 그냥 기존 값을 사용할 수 있도록 해준다. 따라서 상태의 변화로부터 일어나는 일들을 확인하기 위해 사용할 수 있다고 할 수 있다.

<br/>
<br/>
<br/>
<br/>

![](./images/mobx_flow.png)
<span style="color:grey">참조 : mobx 공식 홈페이지</span>
<br/>
<br/>
<br/>
위의 그림은 Mobx가 동작하는 그림이다. 결국 위와 같은 mobx의 상태관리로 우리는 다음과 같은 사항을 우리 어플리 케이션에 적용할 수 있다. 다음은 '기억보다 기록을' 블로그에서 이해한대로 정리한 특징들이다.

- React에 종속적인 라이브러리가 아님.
- Redux와 다르게 store에 제한이 없고 복잡한 설정이 없음
- Observable을 기본적으로 사용하고 있음
- Mobx는 절대적으로 필요한 경우한 state를 변경함
- Typescript 기반으로 만들어짐.

<br/>
<br/>
<br/>
<br/>

아래와 같이 number는 관찰할 상태이고 action은 상태의 변화를 일으킬때 사용하는 데코레이터다. 이렇게하면 observable값이 변할때 자동으로 변화를 감지함으로써 화면에 반영되는 것이다.

```javascript
import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

// 마지막에 있던 observer를 이렇게 앞에다가 써준다.
@observer
class Counter extends Component {
  @observable number = 0

  @action
  increase = () => {
    this.number++
  }

  @action
  decrease = () => {
    this.number--
  }

  render() {
    return (
      <div>
        <h1>{this.number}</h1>
        <button onClick={this.increase}>+1</button>
        <button onClick={this.decrease}>-1</button>
      </div>
    )
  }
}

export default Counter
```

<br/>
<br/>
<br/>
<br/>

## Mobx로 Store 만들기 with React Native

어플리케이션에서 외부 데이터 베이스 말고 사용자의 입장에서 저장할 수 있는 방법은 두가지가 있다.

1. 휴대폰 디바이스 자체 즉 로컬 저장소에 저장하기 [ AsyncStorage ]
   - 다음의 방법은 사용자 휴대폰 자체에 저장되기 때문에 앱을 껴도 데이터가 남는다.
2. 앱 어플리케이션안의 데이터 저장하기
   - 다음의 방법은 앱을 켜진 상태만 데이터가 저장되어있으며 앱을 끄면 저장된 데이터는 모두 사라진다.

1번과 같은 방법을 사용했을시 많은 양의 데이터를 로컬 저장소나 외부저장소로부터 접근해서 가져오면 효율이 떨어질 수 있다. 따라서 계속 남아있지 않아도 되는 데이터들을 골라 앱이 켜지는 순간 한번에 앱 스토리지에 한번에 받아오고 그 안에서만 사용하도록하면 효율을 높일 수 있다.

<br/>
<br/>
<br/>
<br/>

## React Context API + Mobx

Mobx 공식 홈페이지를 보면 리엑트와 결합하는 방법은 총 세가지가 있다. 하지만 오늘 사용할 방법은 3번이며 공식 홈페이지에서도 추천하는 방법이다.

1. Mobx store를 컴포넌트의 props로 넘기는 방법
2. Import 해서 전역 객체로 사용한다.
3. React의 context API를 활용한다.

<br/>
<br/>

#### CreateContext란?

주로, 애플리케이션으로 전역적으로 데이터가 사용되야할 때 사용된다. 예를 들어서 사용자 로그인를 얘기해볼 수 있다. 기존에는 props로 하위 컴포넌트에게 전달하는 방식을 사용했다. 이렇게 되면 최상위부터 하위까지 트리를 만들어 깊이 쭉 내려가면서 props로 전달할 수 있겠다. 하지만 이렇게되면 다루게 되는 데이터가 많이아질수록 효율이 떨어져 유지보수성이 낮아질 가능성이 있다. 하지만 createContext를 사용하면 이런 불편함을 줄일 수 있다.

CreateContext에서 전역적으로 사용하고 싶은 데이터는 사용하고 싶은 컴포넌트에서 **UseContext**를 이용해 가져올 수 있다. 다음 예제를 보면서 store를 어떻게 사용하는지 살펴보자. 다음 예시는 [mechaniccoder](https://velog.io/@y1andyu) 블로거님의 예시를 사용했다.

<br/>
<br/>

다음은 number 데이터를 전역적으로 사용하고 싶고 increaseNumber()와 decreaseNumber()를 사용하여 해당 전역데이터(number)의 상태를 변화시키겠다는 뜻이다.

//Store/CounterStore.js

```javascript
import { observable, action, makeObservable } from 'mobx'

class SetStore {
  @observable number = 0

  constructor() {
    makeObservable(this)
  }

  @action
  increaseNumber = () => {
    this.number++
  }

  @action
  decreaseNumber = () => {
    this.number--
  }
}

export default new SetStore()
```

<br/>
<br/>

이제 위에서 선언해준 CounterStore를 활용해서 react context를 만들고 useContext에 등록해서 useCounter를 불러오는 컴포넌트는 어디든지 데이터를 사용할 수 있게 해준다.

//userCounter.js

```javascript
import React, { useContext } from 'react'
import { CounterContext } from '../store'

const useCounter = () => {
  const counterContext = useContext(CounterContext)
  return counterContext
}

export default useCounter
```

<br/>
<br/>

이제 원하는 컴포넌트에서 사용하는 모습을 보겠다. 여기서 예시를 참조한 해당 블로그는 observer를 hoc으로 감싸줘야한다고 한다. 하지만 Provider를 사용하지 않는이상 useContext를 사용하지 한다면 상관없을껄로 보인다.

```javascript
const Counter = observer(() => {
  const counterStore = useCounter() // 이렇게 커스텀 훅을 활용했습니다.

  return (
    <>
      <Text>{counterStore.number}</Text>
      <Button title="+1" onPress={() => counterStore.increaseNumber()} />
      <Button title="-1" onPress={() => counterStore.decreaseNumber()} />
    </>
  )
})

const App = () => {
  return (
    <GlobalProvider>
      {' '}
      // 커스텀 Provider
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <Counter />
      </SafeAreaView>
    </GlobalProvider>
  )
}

export default App
```

<br/>
<br/>
<br/>
<br/>

## mobx 비동기 처리

Flow 속성은 async와 await와 비슷하게 쓰이며 현재 업무에서 쓰이고 더 좋은 방법이라고 하니 이 방법에 대해서 정리하려고 한다. async와 await대신 function\*을 사용한다. 데코레이터는 사용할 수 없고 함수로만 사용해야한다. 다음 예시는 'byseop' 블로거님의 예시이다.

```javascript
mobx.configure({ enforceActions: 'observed' })

class Store {
  @observable githubProjects = []
  @observable state = 'pending' // 'pending', 'done', 'error'

  fetchProjcets = flow(function*() {
    this.githubProjects = []
    this.state = 'pending'
    try {
      // await 대신에 yield 를 사용합니다.
      const projects = yield fetchGithubProjectsSomehow()
      const filteredProjects = somePreprocessing(projects)

      // 비동기 작업이 필요한 부분을 수동으로 감싸지 않아도 됩니다.
      this.state = 'done'
      this.githubProjects = filteredProjects
    } catch (error) {
      this.state = 'error'
    }
  })
}
```

<br/>
<br/>
<br/>
<br/>

## References

https://sunnykim91.tistory.com/138

https://velog.io/@y1andyu/Mobx-리액트-Context-API-Mobx

https://kyounghwan01.github.io/blog/React/mobx/basic/#mobx-함수와-데코레이터

https://mobx.js.org/README.html
