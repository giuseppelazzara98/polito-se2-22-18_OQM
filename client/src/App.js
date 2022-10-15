import React, { createContext } from 'react';
import './styles/base.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserPage from './pages/UserPage';

export const MainCtx = createContext({});

function App() {
  return (
    <Router>
      <App2 />
    </Router>
  )
}

function App2() {

  // retrived by db
  const services = [
    {
      name: "service 1",
      key: "service_1",
    },
    {
      name: "service 2",
      key: "service_2",
    },
    {
      name: "service 3",
      key: "service_3",
    },
    {
      name: "service 4",
      key: "service_4",
    },
  ];

  const receiptInfo = {
    waitListCode: "A026",
    queueCode: "K10",
    timeEstimation: "00:10",
  }

  const currentUserServed = "E10";

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* to insert an header */}
      <main>
        <MainCtx.Provider value={{
          services,
          receiptInfo,
        }}>
          <Routes>
            <Route path='/' element={<UserPage/>} />
          </Routes>
        </MainCtx.Provider>
      </main>
    </div>
  );
}

export default App;
