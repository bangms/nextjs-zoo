import { useEffect } from 'react';
import styles from './PathTest.module.scss';
import { bear, bird, cat, elepant, giraffe, koala, panda, pig, rabbit } from '../export/images';
import Image from 'next/image';

const PathTest = () => {
    useEffect(()=>{
        const count = document.querySelectorAll('span').length;
        for(let i = 0; i < count; i++) {
            // document.querySelectorAll('span')[i].style.WebkitTransitionDelay = 0.1*i;
            // document.querySelectorAll('span')[i].style.MozTransitionDelay = 0.1*i;
            // document.querySelectorAll('span')[i].style.msTransitionDelay = 0.1*i;
            // document.querySelectorAll('span')[i].style.OTransitionDelay = 0.1*i;
            // document.querySelectorAll('span')[i].style.transitionDelay = 0.1*i;
            // document.querySelectorAll('span')[i].style.opacity = 1;
            // console.log()
        }
    }, []);
    return (
        <>
        <div className={styles.path_container}>
            <div className={styles.img_container}>
                <Image src={bird}  alt="닭같은새" className={styles.img}/>
                <br/><br/><span>W</span><span>H</span><span>A</span><span>T</span><span>'S</span> <span>N</span><span>E</span><span>W</span><span>A</span>
            </div>
        </div>
        </>
    )
}

export default PathTest;