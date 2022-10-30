import { addDoc, collection } from "firebase/firestore/lite";
import { db } from 'utils/firebase';
import style from './style.css';

/*
  type Agenda = { [person: string]: Duty[] }

  type Duty = {
    description: string;
    date: Date;
    status: 'done' | 'pending' | 'partly_done';
  }
*/


const Home = () => {
  const date = new Date();
  const agenda = {
    maurycy: [
      { description: 'clean the kitchen', date: new Date(), status: 'done' },
    ],
    leon: [
      { description: 'clean the kitchen', date: new Date(), status: 'done' },
    ],
    felek: [
      { description: 'clean the kitchen', date: new Date(), status: 'done' },
    ],
    albert: [
      { description: 'clean the kitchen', date: new Date(), status: 'done' },
    ]
  }

  return (
    <div class={style.home}>
      <h2>{date.toLocaleDateString()}</h2>
      <ul>
        {Object.entries(agenda).map(([person, duties]) => (
          <li key={person}>
            <h3 className={style.personName}>{person}</h3>
            <ul>
              {duties.map((duty, index) => (
                <li key={index}>
                  <input type="checkbox" checked={duty.status === 'done'} />
                  <span>{duty.description}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Home;
