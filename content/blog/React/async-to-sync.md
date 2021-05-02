---
title: 비동기를 동기로
date: 2021-05-01 16:05:51
category: React
thumbnail: { thumbnailSrc }
draft: false
---

React Hook을 사용하면서 꽤나 비동기를 고려하면서 코드를 짜야하는 순간들이 많아졌다. 따라서 이 기회에 javascript에서의 동기와 비동기 처리를 공부하고 싶어 포스팅을 진행하게되었다.

## Promise - 비동기를 동기로

Promise는 Javascript 안에 내장되어있는 함수이며 비동기 처리를 위해 사용되는 객체이다. 하지만 나는 객체는 비동기를 동기로 처리하기 위해 사용했다. 보통 많은 사람들도 서버에서 데이터를 요청하고 받아온 다음에 코드를 수행해야할 때 사용한다고 한다. 요청을 보내고 데이터를 받기도 전에 다른 코드가 비동기 적으로 실행되면 받아온 데이터는 무용지물이 될테니 말이다. 그렇다면 Promise의 어떠한 성질 때문에 이런 일이 가능한건지 알아보자.
<br/>
<br/>

> callback (참고사항)

callback이란 다른 함수가 실행을 끝낸 뒤 실행되는 코드를 말한다. 콜백함수는 비동기이다.아래 코드처럼 원래는 코드가 순차적으로 실행되면 hi가 출력되고 hello가 출력되어야하는데 비동기적으로 실행되서 hi는 setTimeout에 의해 기다려지고 hello가 먼저 실행된다. 왜 이 객체에 대해서 언급했냐면 callback으로도 동기적 즉 코드를 순차적으로 짤 수가 있다.

```javascript
setTimeout(function (){
    console.log("hi");
},1000);
console.log('hello');
})
```

다음과 같이 짰을 떄는 hi -> and -> hello가 출력된다. 하지만 이런식으로 짰을때는 setTimeout함수를 사용함과 동시에 충접시켜서 코드를 짜야하기 때문에 매우 복잡해질 수가 있다.

```javascript
setTimeout(function (){
    console.log("hi");
    setTimeout(function(){
        console.log("and");
    },1000)
},1000);
console.log('hello');
})
```

<br/>
<br/>

### Promise 구조

기본적인 Promise 구조는 아래와 같다. 왜 비동기를 동기로 처리할 수 있는지 이해가 갈 것이다. 아래처럼 api요청 함수를 보내고 then 쪽에 다음 처리하고 싶은 함수를 쓰면 순차적 실행이 되기 때문이다.

```javascript
new Promise((resolve, reject) => {
  //api 요청함수
})
  .then(() => {
    //요청을 보낸 후 코드
  })
  .catch(() => {
    // 에러시 호출됨
  })
```

<br/>

### Resolve 와 Reject

newPromise() 메서드를 호출할 때 사용하는 콜백함수가 있다. 이것이 바로 resolve, reject이다. 즉 resolve는 Fulfilled(이행) 됬다는 뜻이며 then()함수로 넘겨 결과를 성공했다는 의미로 전달된다.
reject 는 Rejected(실패)의 상태로 인식시켜 catch()함수로 넘겨 처리시킨다.

```javascript
const Test(name){
    new Promise((resolve, reject)=>{
    //api 요청함수
    if(name == 'soso'){
        resolve('success')
    }else{
        reject('fail')
    }
    })
}

Test('soso')
.then(console.log)  //promise의 resolve가 실행된 다음 success가 출력됨
.catch(console.log)  //promise의 reject가 실행된 다음 fail이 출력됨

```

<br/><br>

## async 와 await

위에 언급한 Promise로 비동기 -> 동기 처리해보았다. 하지만 계속 Promise then()을 활용하여 여러 함수들을 체이닝으로 엮어버리면 코드가 복잡해지는 수가 있다. 이러한 불편한 점을 해결하기 위에 나온것이 바로 sync와 awiat 이다.

<br/>

### async

아래 코드처럼 함수앞에 async를 붙이면 promise 객체를 리턴하게된다. 즉 async만으로 Promise 객체를 생성할 수 있는 것이다.

```javascript
async funcion Hi(){
    return "hello"
}

const hi = Hi();
hi.then(console.log); // -> Promise 객체 리턴

```

<br>

### await 와 에러처리

아래 보이는 코드처럼 hi의 처리가 이루어진 뒤 hi2가 이루어지게 순서적으로 처리하고 싶다고 한다면 async로 감싸진 객체 또는 함수 안에 동기적으로 실행시키고 싶은 객체 앞에 await를 붙여 처리해주면 된다. 또한 이것도 Promise와 같이 오류를 처리하고 싶다면 try ~ catch 구문을 사용하면 된다.

```javascript
async funcion Hi(){
    await delay(2000);
    return 'hi'
}

async funcion Hi2(){
    await delay(3000);
    return 'hi2'
}

async funcion printHi(){
    try{
        const res = await hi;
        const res2 = await hi2;
        consol.log(res)
        consol.log(res2)
    }catch(err){
        //에러처리
        console.log(err)
    }

}

```

<br/><br>

## setState()에서 await 사용

위에 언급한 바로 따르면 비동기인 setState()를 동기로 처리하고 싶을 경우 await를 붙여서 쓰면 되겠다하는 생각은 당연할것이다.
하지만 <span style="color:red">setState()는 await를 사용할 수 없다고 한다.</span> 왜냐하면 async는 promise는 반환하는데 setState는 promise를 리턴하지 않기 때문이라고 한다.

방법은 두가지이다.

1. componentDidUpdate 나 setState() 콜백을 사용하는것

2. Promise 객체와 같이 사용하는 await

```javascript
this.setState({ name: 'hi' }, () => console.log(this.state.name)) // hi
```

```javascript
updateState = msg => {
  return new Promise((resolve, reject) => {
    this.setState(
      {
        name: msg,
      },
      () => {
        resolve('Updated')
      }
    )
  })
}

printMessage = async () => {
  let res = await this.updateState('hi')
  console.log(res)
}
```

## useState에서 동기사용

우리회사에서는 기본적으로 useState를 사용한다. 그렇다면 useState를 동기식으로 사용하는 방법이 있을까?
방법은 단하나 useEffect()를 사용하는 방법밖에 없다. useState react hook 중 하나로 hook안에서 해결을 해야하는 수밖에 없는것같다.
그것이 바로 react hook use Effect 라는 것이다.

```javascript

const makeSearchTag=async()=>{

searchTagList.forEach((item, index)=>{

    return new Promise((resolve, reject)=>{
    flaskStore.getSearchTag(item.title, item.subTitle)
    .then(res=>{
            .....
        setinsertTagList(tags=>[...tags, temp])
    })
    })
})
//useState는 비동기 처리이기 때문에 아무 값도 출력되지 않음.
console.log(insertTagList)
}

useEffect(() => {
  console.log(searchTagList)

  if (searchTagList.length == 3) {
    console.log('hi')
  }
}, [searchTagList])
```

다음 코드는[TIL](https://elastic-gates-7b6fb8.netlify.app/TIL/2021.05.01/)에서 정리한 내용인다. 일단 useEffect는 [searchTagList]라고 선언했기 때문에 searchTagList의 값이 변화할 때마다 호출된다. 따라서 searchTagList에 원하는 조건이 달성될시 다음 코드를 실행하도록 짰다.

## References

- 드림코딩 by by 엘리 - 자바스크립트 11,12,13 강의
- https://aridom.tistory.com/36
- https://joshua1988.github.io/web-development/javascript/promise-for-beginners/
- https://dodokim.medium.com/setstate-%EB%8A%94-await%EC%99%80-%EC%82%AC%EC%9A%A9%EC%9D%B4-%EA%B0%80%EB%8A%A5%ED%95%A0%EA%B9%8C-7b02581f6df4
- https://webisfree.com/2020-08-28/[react]-setstate-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%8B%9D-async-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95
