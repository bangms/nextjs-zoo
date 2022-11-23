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
          current.style.opacity = 1;

          /*
            모바일에서 transition 성능 저하 문제 (애니메이션 버벅거림)
            스타일 적용 순서 (브라우저마다 다를 수 있음)
            Styles -> Layout(객체 모양, 위치) -> Paint(color나 line 적용) -> Composite(transform, opacity)

            위 순서에 따르면 ‘Layout’ 속성을 바꾸면 ‘Paint’, ‘Composite’ 순서를 거치기 때문에 성능 저하가 일어나게 됨
            ======> 이를 Reflow 라고 함

            따라서 성능을 최대로 발휘하려면 Composite 속성만 바꾸는 것이 최고의 방법임
            근데 그거만 바꾸고 있는데 외,,?

            1. 클래스 변화에 따른 스타일 변화를 원할 경우, 최대한 DOM 구조 상 끝단에 위치한 노드에 추가
            2. 애니메이션이 들어간 엘리먼트는 가급적 position: fixed 또는 position: absolute로 지정
            3. JS를 통해 스타일변화를 주어야 할 경우, 가급적 한번에 처리 (클래스를 통한 스타일 변화가 렌더링 속도가 더 빠름)
            4. GPU가속 이용하기
            will-change 속성 사용하기 (브라우저 호환성과 주의점 확인 꼭!)
             - 엘리먼트에 어떠한 변경을 할 것인지를 미리 브라우저에 알려주는 것이 will-change 속성의 역할
             그 변경이 시작되기 전에 적절히 최적화할 수 있음(페이지 출력에 악영향을 줄 수 있는 처리 비용을 줄일 수 있음)
             효율적으로 엘리먼트의 변경 또는 렌더링을 처리할 수 있고 페이지는 순식간에 갱신돼 부드러운 화면 처리 가능
             하지만 will-change는 무분별하게 사용하면 성능저하가 발생하고 결과적으로 페이지의 작동이 중단될 것
             will-change는 성능저하뿐 아니라 바로 감지하기 어려운 사이드 이펙트를 발생시키기 때문에 사용하기 까다로운 속성
             (원래 will-change는 보이지 않는 곳에서 브라우저에 명령하는 방법이므로 감지하지 못하는 건 당연)

             너무 많은 속성이나 엘리먼트에 will-change를 사용하지 않는다
             ex )
              *,
              *::before,
              *::after {
                will-change: all;
              }

              will-change 속성은 애니메이션이 종료되었을 때 속성 제거를 해주는 것을 권장

          */

          current.style.WebkitTransitionProperty = 'all';
          current.style.MozTransitionProperty = 'all';
          current.style.msTransitionProperty = 'all';
          current.style.OTransitionProperty = 'all';
          current.style.transitionProperty = 'all';

          current.style.WebkitTransitionDuration = `${duration}s`;
          current.style.MozTransitionDuration = `${duration}s`;
          current.style.msTransitionDuration = `${duration}s`;
          current.style.OTransitionDuration = `${duration}s`;
          current.style.transitionDuration = `${duration}s`;

          current.style.WebkitTransitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
          current.style.MozTransitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
          current.style.msTransitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
          current.style.OTransitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
          current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';

          current.style.WebkitTransitionDelay = `${delay}s`;
          current.style.MozTransitionDelay = `${delay}s`;
          current.style.msTransitionDelay = `${delay}s`;
          current.style.OTransitionDelay = `${delay}s`;
          current.style.transitionDelay = `${delay}s`;

          current.style.WebkitTransform = 'translate3d(0, 0, 0)'
          current.style.MozTransform = 'translate3d(0, 0, 0)';
          current.style.msTransform = 'translate3d(0, 0, 0)';
          current.style.OTransform = 'translate3d(0, 0, 0)';
          current.style.transform = 'translate3d(0, 0, 0)';

          // current.style.willChange = 'auto';
          // 쓰니까 오히려 더 느림 1.5s 안쓰면 1.25s
        }
      },
      [delay, duration],
    );
  
    useEffect(() => {
      let observer;
  
      if (element.current) {
        observer = new IntersectionObserver(onScroll, { threshold: 0.3 });
        observer.observe(element.current);
      }
  
      return () => observer && observer.disconnect();
    }, [onScroll]);
  
    return {
      ref: element,
      style: { 
        opacity: 0,
        WebkitTransform: handleDirection(direction),
        MozTransform: handleDirection(direction),
        msTransform: handleDirection(direction),
        OTransform: handleDirection(direction),
        transform: handleDirection(direction), 
        // willChange: `transform, opacity`
      },
    };
  };