import AnimalView from '../Components/View/AnimalView'
import { useRouter } from "next/router";
import Default from '../Components/Default/Default';

export default function Home() {
  const router = useRouter();
  console.log(router.pathname);
  const path = router.pathname;
  return ( path === "animal/" ? <AnimalView /> : <Default />
    // <AnimalView />
  )
}
