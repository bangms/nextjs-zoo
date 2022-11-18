import { useCallback, useRef } from 'react';

const useScrollFadeIn = () => {
  const dom = useRef();
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
  
  const handleScroll = useCallback(([entry]) => {
    const { current } = dom;
    if(entry.isIntersecting){
        // 원하는 이벤트
    }
  })

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
  }, [handleScroll]);

  return {
    ref: dom,
    // ref(dom)을 바로 return하지 않고 Object로 한번 감싼 이유는 component에 적용할 때
    // Spread와 추후 style 등의 속성이 추가될 것이기 때문
  };

    
};

export default useScrollFadeIn;