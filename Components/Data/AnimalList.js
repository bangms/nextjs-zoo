import { bear, bird, cat, elepant, giraffe, koala, panda, pig, rabbit } from '../export/images';
import Image from 'next/image';

export const AnimalList = [
    {
      id: '1',
      name: '곰',
      image: <Image src={bear} alt="bear image" fill sizes="(max-width: 768px) 100vw" />,
      desc: {
        '나이' : 10,
        '먹이' : '건초, 배합사료 등',
        '등록일' : '2022/10/11'
      }
    },
    {
        id: '2',
        name: '새',
        image: <Image src={bird} alt="bird image" fill />,
        desc: {
          '나이' : 3, 
          '먹는 것' : '지렁이 등',
          '등록일' : '2022/9/12'
        }
      },
      {
        id: '3',
        name: '고양이',
        image: <Image src={cat} alt="cat image" fill />,
        desc: {
          '나이' : 7,
          '먹는 것' : '쥐, 생선, 건사료 등',
          '등록일' : '2015/08/11'
        }
      },
      {
        id: '4',
        name: '코끼리',
        image: <Image src={elepant} alt="elepant image" fill />,
        desc: {
          '나이' : 100,
          '먹는 것' : '풀떼기 등',
          '등록일' : '2010/12/01'
        }
      },
      {
        id: '5',
        name: '기린',
        image: <Image src={giraffe} alt="giraffe image" fill />,
        desc: {
          '나이' : 20,
          '먹는 것' : '풀떼기, 나뭇잎 등',
          '등록일' : '2017/03/24'
        }
      },
      {
        id: '6',
        name: '코알라',
        image: <Image src={koala} alt="koala image" fill />,
        desc: {
          '나이' : 10,
          '먹는 것' : '뭘 먹는지 모름',
          '등록일' : '2013/02/02'
        }
      },
      {
        id: '7',
        name: '판다',
        image: <Image src={panda} alt="panda image" fill />,
        desc: {
          '나이' : 3,
          '먹는 것' : '잡식',
          '등록일' : '2022/02/02'
        }
      },
      {
        id: '8',
        name: '돼지',
        image: <Image src={pig} alt="pig image" fill />,
        desc: {
          '나이' : 6,
          '먹는 것' : '안 먹는게 있나',
          '등록일' : '2015/09/07'
        }
      },
      {
      id: '9',
      name: '토끼',
      image: <Image src={rabbit} alt="rabbit image" fill />,
      desc: {
        '나이' : 5,
        '먹는 것' : '건초 등',
        '등록일' : '2021/06/13'
      }
    },
  ];