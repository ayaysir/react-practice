import logo from './logo.svg';
import './App.css';
import bigImage from './big.png';
import smallImage from './small.jpg';
import TodoList from './TodoList';
import Todo1 from './day2/Todo1';
import Color from './day2/Color';
import { Count, Count2 } from './day2/Count';
import Modal from './day2/Modal';
import Profile from './day2/Profile';
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom';
import { useState } from 'react';
import WidthPrinter from './day2/WidthPrinter';
import Top from './day2/Context1';
import Day3 from './day3/Day3'

function Day2() {

  const [userId, setUserId] = useState('lee')

  return (
    <div>
      <Top />
      <WidthPrinter />
      <Profile userId={userId} />
      <button onClick={ () => {
        const changeId = prompt("change id")
        setUserId(changeId)
      } } >아이디 변경</button>
      <Count2 />
      <Modal title="모달창" desc="내용" />
      <Count />
      <Color />
      <Todo1 />
    </div>
  );
}

function Day1() {

  const value = '123'.padStart(5, 0)

  return (
    <header className="App-header">

        <TodoList />
        <img src={logo} className="App-logo" alt="logo" />
        <img src={bigImage} alt="big" />
        <img src={smallImage} alt="small" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>{value}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Vue.js
        </a>
      </header>
  );
}

function App() {

  console.log(`NODE_ENV = ${process.env.NODE_ENV}`)
  console.log(`REACT_APP_DATA_API = ${process.env.REACT_APP_DATA_API}`)
  console.log(`REACT_APP_LOGIN_API = ${process.env.REACT_APP_LOGIN_API}`)
  return (
    <div className="App">

      <BrowserRouter>
        <Link to="/day1">Day 1</Link>
        <Link to="/day2">Day 2</Link>
        <Link to="/day3">Day 3</Link>
        <Route path="/day1" component={Day1} />
        <Route path="/day2" component={Day2} />
        <Route path="/day3" component={Day3} />
        <Route exact path="/">
          <Redirect to="/day3" />
        </Route>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
