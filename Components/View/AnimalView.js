import { useState, useEffect } from 'react';
import { AnimalList } from '../Data/AnimalList';
import { useScrollFadeIn } from '../../Hooks/useScrollFadeIn';

const AnimalView = ({id}) => {
    const animal = AnimalList.filter(i => i.id === id)[0];
    // console.log(animal);

    const animatedItem = useScrollFadeIn;

    /* ------------------------------------------------------
        
    위와 같은 방식으로 구현하게 되면 콘솔창에 로그가 많이 찍힘
    React 특성상 변화가 있을 때 DOM을 다시 탐색하고 Render 하여 그려주기 때문에
    성능에도 문제가 발생함
    
    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //       window.removeEventListener('scroll', handleScroll); //clean up
    //     };
    // }, []);
    
    //   const handleScroll = () => {
    //     console.log('scrolled');
    // };

    이벤트에 타이머를 두고 타이머 안에서 이벤트가 발생하고 이벤트가 발생된 후 해당 타이머를 초기화시킴
    이벤트의 중복을 통한 성능 지연 방지
    export default function App() {  
        const targetRef = useRef(null);  
        const handleScroll = () => {
            console.log("scrolling");
            
            if (window.scrollY > 0) {
            targetRef.current.style.position = "fixed";      
            }
    };

    useEffect(() => {    
        const timer = setInterval(() => {
        window.addEventListener("scroll", handleScroll);
        }, 100);
        return () => {
        clearInterval(timer);
        window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="App">
        <div ref={targetRef}>이벤트 발생위치</div>
        </div>
    );
    }

    또는 React Hooks 사용
    Hooks 사용의 가장 큰 이유는 컴포넌트로 부터 상태관련 로직을 추상화 할 수 있고,
    별도의 함수로 빼서 재사용이 가능하기 때문
    상태관리로직의 재사용의 특징을 활용해 다양한 커스텀훅을 만들어 사용 가능
    --------------------------------------------------------- */
    return <div style={{textAlign: "center"}}>
        <h1>{animal.name}</h1>
        <div>
            {animal.image}
        </div>
        <div style={{background: "red", width:"100%", height:"300px", margin: "20px auto"}} {...animatedItem} ></div>
        <div style={{background: "orange", width:"100%", height:"300px", margin: "20px auto"}} {...animatedItem} ></div>
        <div style={{background: "yellow", width:"100%", height:"300px", margin: "20px auto"}} {...animatedItem} ></div>
        <div style={{background: "green", width:"100%", height:"300px", margin: "20px auto"}} {...animatedItem} ></div>
        <div style={{background: "blue", width:"100%", height:"300px", margin: "20px auto"}} {...animatedItem} ></div>
        <div style={{background: "indigo", width:"100%", height:"300px", margin: "20px auto"}} {...animatedItem} ></div>
        <div style={{background: "purple", width:"100%", height:"300px", margin: "20px auto"}} {...animatedItem} ></div>
    </div>
}

export default AnimalView;