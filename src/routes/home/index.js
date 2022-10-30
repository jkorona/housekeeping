import { h } from 'preact';
import { addDoc, collection } from "firebase/firestore/lite";
import style from './style.css';
import { db } from 'utils/firebase';

const Home = () => {
  const handleClick = () => {
    addDoc(collection(db, "cities"), {
      name: "Tokyo",
      country: "Japan"
    });
  };

  return (
    <div class={style.home}>
      <h1>Home</h1>
      <p>This is the Home component.</p>
      <button onClick={handleClick}>Save</button>
    </div>
  )
};

export default Home;
