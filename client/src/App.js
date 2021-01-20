import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [userInputTopString, setUserInputTopString] = useState('');
  const [userInputBottomString, setUserInputBottomString] = useState('');
  const [memeData, setMemeData] = useState();
  const updateTopString = (e) => {
    let string = spongeBobIfy(e.currentTarget.value);
    setUserInputTopString(string);
  }
  const updateBottomString = (e) => {
    let string = spongeBobIfy(e.currentTarget.value);
    setUserInputBottomString(string);
  }
  const spongeBobIfy = (string) => {
    let preString = string.toLowerCase().split('');
    preString = preString.map((x, i) => {
      if(i % 2 === 0) {
        x = x.toUpperCase();
      }
      else {
        x = x.toLowerCase();
      }
      return x; 
    });
    let spCaseString = preString.join("");
    return spCaseString;
  }
  const makeMemePost = async () => {
    let topString = userInputTopString;
    let bottomString = userInputBottomString;
    setUserInputTopString('');
    setUserInputBottomString('');
    await fetch(
      `http://localhost:9000/get-spongebob-image?topString=${topString}&bottomString=${bottomString}`
    ).then(res => res.json())
     .then(res => setMemeData(res));
  }
  return (
    <div className="App">
      <label htmlFor="topString">Enter Top String: </label>
      <input type="text" id="topString" value={userInputTopString} onChange={updateTopString} />
      <br />
      <label htmlFor="bottomString">Enter Bottom String: </label>
      <input type="text" id="bottomString" value={userInputBottomString} onChange={updateBottomString} />
      <br />
      <br />
      <button onClick={makeMemePost}>Make Ur Meme, Buddy</button>
      <br />
      <br />
      {memeData && <img src={memeData.data.url} />}
    </div>
  );
}

export default App;
