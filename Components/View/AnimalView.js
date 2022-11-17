import { useState, useEffect } from 'react';
import { AnimalList } from '../Data/AnimalList';

const AnimalView = ({id}) => {
    const animal = AnimalList.filter(i => i.id === id)[0];
    console.log(animal);
    // console.log(Object.keys(AnimalList))
    // console.log(Object.keys(AnimalList).filter((animal) => {
    //     console.log('animal', animal);
    //     console.log('id', id);
    //     animal === id
    // }))
  //AnimalList.find(animal => animal.id === animalId).json();
    return <>
        <h1>{animal.name}</h1>
        <div>
            {animal.image}
        </div>
        <div>
            {}
        </div>
    </>
}

export default AnimalView;