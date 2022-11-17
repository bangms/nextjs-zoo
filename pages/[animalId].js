import AnimalView from "../Components/View/AnimalView";
import { useRouter } from "next/router";
const AnimalID = ({animalId}) => {
  const router = useRouter();
  console.log('loadedAnimal', animalId);
    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    return <AnimalView id={animalId} />
}

export default AnimalID;

// export function getServerSideProps({params: {animalId}}) {
//     // console.log(ctx);
//     return {
//         props: {
//             animalId
//         },
//     }
// }

export const getStaticProps = async ({params}) => {
    const animalId = params.animalId;
    return { 
      props: {
        animalId: animalId
      }
    }
}

export const getStaticPaths = async () => {  
  return {
    paths: [
        {params: {animalId: '1'}},
        {params: {animalId: '2'}},
        {params: {animalId: '3'}},
        {params: {animalId: '4'}},
        {params: {animalId: '5'}},
        {params: {animalId: '6'}},
        {params: {animalId: '7'}},
        {params: {animalId: '8'}},
        {params: {animalId: '9'}}
    ],
    fallback: true
  }
}

// 간혹 Uncaught Error: Cannot find module for page: /[animalId] error 뜸
