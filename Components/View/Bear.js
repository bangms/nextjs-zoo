import React, { useState, useEffect } from 'react';
import { useScrollFadeIn } from '../../hooks/useScrollFadeIn';
import { AnimalList } from '../Data/AnimalList';
import YoutubeVideo from '../YoutubeVideo/YoutubeVideo';
import styles from './Bear.module.scss';

const Bear = ({animal}) => {
    const animatedItem = {
        0: useScrollFadeIn('up', 1, 0),
        1: useScrollFadeIn('down', 1, 0.3),
        2: useScrollFadeIn('down', 1, 0.5)
    }
    return (
        <>
        <div className={styles.container}>
            <YoutubeVideo url={animal.video} />
            <h1>곰은?</h1>
            <div>
                <h2>뭘 먹나요?</h2>
                <div>{animal.desc.먹이}</div>    
            </div>
            <div className={styles.img_box}>{animal.image && animal.image}</div>
            <div style={{textAlign: "center", width:"100%"}}>
                <div {...animatedItem[0]} className={styles.animal_item}>0</div>
                <div {...animatedItem[1]} className={styles.animal_item}>1</div>
                <div {...animatedItem[2]} className={styles.animal_item}>2</div>
            </div>
        </div>
        </>
    )
}

export default Bear;