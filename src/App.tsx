import React, { createRef, useEffect, useState } from 'react';
import './assets/css/styles.css';
import data from './data/data.json';
import AnimateLists from './components/AnimateLists';
import Item from './components/Item';

interface IData {
  userID: string;
  displayName: string;
  picture: string;
  score: number;
}

// main section
function App() {

  // variable and state section
  const [rank, setRank] = useState(0);
  const [userData, setUserData] = useState<IData[]>(data);

  useEffect(() => {
    // set and clear interval here
    const interval = setInterval(() => getRandomUser(), 1000);
    return () => {
      clearInterval(interval);
    };
  });

  // update table ranking here
  const getRandomUser = () => {
    const rndInt: number = Math.floor(Math.random() * 10) + 1;
    data.map(async (_, index: number) => {
      if (index + 1 === rndInt) {
        let updatedScore = data[index].score + Math.floor(Math.random() * 1000000) + 10000;
        // set updated score value here
        data[index].score = updatedScore;
        let sort = data.sort(function (a, b) { return b.score - a.score });
        setUserData(sort);
        setRank(rndInt);
        console.log("rank =>", rank);
      }
    });
  }
  // JSX section start
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody className='table-body'>
          <AnimateLists>
            {userData.map((user: IData, index: number) => (
              <Item key={user.userID} id={index + 1} user={user} ref={createRef()} />
            ))}
          </AnimateLists>
        </tbody>
      </table>
    </div>
  );
  // JSX section end
}

export default App;
