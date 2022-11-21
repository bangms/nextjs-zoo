import { useState, useEffect, useRef, useCallback } from 'react';
  // Hook의 규칙 
  //   eslint-plugin-react-hooks (ESLint 플러그인) 을 사용한다면 아래 두 규칙을 강제(CRA에 포함)

  //   1. 최상위에서만 Hook을 호출
  //   - React 함수(컴포넌트)의 최상위에서만 Hook을 호출 할 것.
  //   - 반복문, 조건문, 중첩된 함수등에서 호출 X
  //   2. React 함수에서만 Hook을 호출
  //   - Custom Hook에서는 호출 가능
  //   - 일반적인 Javascript 함수에서는 호출 X
  //   3. Hook을 만들때 앞에 use 붙히기
  //   - 그래야만 한눈에 보아도 Hook 규칙이 적용되는지를 파악할 수 있기 때문 (공홈)
  //   4. React는 Hook 호출되는 순서에 의존
  //   - 한 컴포넌트에서 여러개의 hook이 사용되는 경우
  //   - hook은 위에서부터 아래로 순서에 맞게 동작한다.

  //   Hook의 최적화
  //   1. 컴포넌트가 반드시 필요한 리랜더링만을 진행하는가?
  //   2. 랜더링이 발생한다면, property 및 method가 반드시 필요한 것만 재할당 할 수 있게 하는가?
  //   3. 위 2가지를 무시할만큼, 랜더링이 자주되는가? ) 따라서 메모리를 할당하면서 위의 2가지를 지키지 않아도 되는가?

  //   Hook을 사용하면 어떤점이 좋은가
  //   기본적으로 클래스형 컴포넌트보다 쉽고 직관적으로 같은 기능을 만들 수 있다.
    
  //   1.함수형 컴포넌트로 코드 통일 가능
  //   - 이전에는 state유무로 있으면 클래스형 / 없으면 함수형으로 분리해서 작업했다고 함
  //   2. useEffect로 클래스형 Lifecycle에 흩어져 있는 로직 묶음
  //     - hook은 Lifecycle과 달리 여러번 선언가능 해 코드가 무엇을 하는지에 따라 hook별로 분기가 가능하다.
  //   3. Custom Hook을 이용해 손쉽게 로직 재사용 가능함
  //     - 클래스형 컴포넌트에서 로직을 재사용하기 위해 썼던 HOC나 render-props 같은 패턴이 가져오는 컴포넌트 트리의 불필요한 중첩을 없애줌

const useScrollFadeIn = () => {
  const element = useRef();

/* 안티 패턴 ----------------------------------------------
    직접 실시간으로 window의 세로 scroll position 값과, 
    animation을 동작 하게 할 dom element의 position을 비교해서 동작하는 방법

    window.addEventListener 를 통해 직접 스크롤 이벤트를 핸들링 할 경우 
    1. scroll 이 될 때 마다 이벤트 발생 (단시간에 많은 호출, 디바운싱 등의 핸들링 필요)
    2. getBoundingClientRect() 호출 시에 리플로우(레이아웃 전체 리렌더링) 현상 발생 (성능 저하)
    문제가 발생할 수 있음

    //   const handleScroll = useCallback(() => {
    //     const { current } = dom;
    //     const currentScrollPosition = window.pageYOffset;
    //     const currentDomScrollPosition = currentScrollPosition + current.getBoundingClientRect().top - 800; // 800은 이벤트 반응 시점을 조절하기 위해 넣은 임의의 Y position 값
    //   }, []); 

    //   useEffect(() => {
    //     if (element.current) {
    //       window.addEventListener('scroll', handleScroll);
    //     };

    //     return () => {
    //       window.removeEventListener('scroll', handleScroll);
    //     };
    //   }, [handleScroll]);
------------------------------------------------------ */

  const onScroll = useCallback(([entry]) => {
    const { current } = element;
    if(entry.isIntersecting){
        // 원하는 이벤트
    }
  });

  useEffect(() => {
    let observer;
    const { current } = dom;

    if (current) {
      // IntersectionObserver에 동작 하게 할 함수와 Observer 세팅 값들을 넘겨줌
      // threshold는 number나 Array<number>로 정의할 수 있으며, Default 값은 0
      // number는 TargetElement의 노출 비율을 말하고, 0.7은 70% 정도 노출 되었을 때 해당 이벤트가 실행
      // Array는 각각의 비율로 노출 될 때마다 함수가 실행
      observer = new IntersectionObserver(handleScroll, { threshold: 0.7 });
      observer.observe(current);
      
      return () => observer && observer.disconnect();
    };
  }, [onScroll]);

  return {
    ref: element,
    // ref(dom)을 바로 return하지 않고 Object로 한번 감싼 이유는 component에 적용할 때
    // Spread와 추후 style 등의 속성이 추가될 것이기 때문
  };

    
};

export default useScrollFadeIn;