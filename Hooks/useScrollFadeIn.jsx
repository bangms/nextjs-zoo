import { ConsoleSqlOutlined } from '@ant-design/icons';
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

export const useScrollFadeIn = (direction, duration, delay) => {
  //(direction = 'up', duration = 1, delay = 0) 지정해 놓을 경우 항상 아래에서 위로 동작하며 duration과 delay 설정 불가능
    const element = useRef();
    
    const handleDirection = (name) => {
      switch (name) {
        case 'up':
          return 'translate3d(0, 50%, 0)';
        case 'down':
          return 'translate3d(0, -50%, 0)';
        case 'left':
          return 'translate3d(50%, 0, 0)';
        case 'right':
          return 'translate3d(-50%, 0, 0)';
        default:
          return;
      }
    };

    useEffect(() => {
      console.log('element...', element);
    }, [element])
    useEffect(()=> {
      console.log('direction...',direction);
    }, [direction])
  
    const onScroll = useCallback(
      ([entry]) => {
        const { current } = element;
        // console.log('current... ',current);
        if (entry.isIntersecting) {
          current.style.transitionProperty = 'all';
          current.style.transitionDuration = `${duration}s`;
          current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
          current.style.transitionDelay = `${delay}s`;
          current.style.opacity = 1;
          current.style.transform = 'translate3d(0, 0, 0)';
        }
      },
      [direction, delay, duration],
    );
  
    useEffect(() => {
      let observer;
  
      if (element.current) {
        observer = new IntersectionObserver(onScroll, { threshold: 0.7 });
        observer.observe(element.current);
      }
  
      return () => observer && observer.disconnect();
    }, [onScroll]);
  
    return {
      ref: element,
      style: { opacity: 0, transform: handleDirection(direction) },
    };
  };