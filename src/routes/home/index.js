import { useEffect, useState } from "preact/hooks"
import { getDutiesForDay } from "../../clients/agenda";
import useDuties from "../../hooks/useDuties";
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
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    getDutiesForDay(1).then(setAgenda);
  }, []);

  return (
    <div class={style.home}>
      <h2>Poniedziałek</h2>
      <ul>
        {agenda.map(({ assigned, duty }) => (
          <li key={assigned + duty}>
            <h3 className={style.personName}>{assigned}</h3>
            <p>{duty}</p>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Home;
