import React from 'react';
import {createTable} from './database/db'
import Navigator from './Navigator';

function App() {
  createTable();

  return (
    <Navigator/>
  );
}

export default App;
