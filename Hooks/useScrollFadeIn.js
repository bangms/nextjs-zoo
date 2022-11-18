import { useRef } from 'react';

const useScrollFadeIn = () => {
  const dom = useRef();
  
  return {
    ref: dom,
  };
  // ref(dom)을 바로 return하지 않고 Object로 한번 감싼 이유는 component에 적용할 때
  // Spread와 추후 style 등의 속성이 추가될 것이기 때문
};

export default useScrollFadeIn;