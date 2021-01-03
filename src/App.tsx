import { atom } from 'jotai';
import React from 'react';
import Edit from './components/Edit';
import Items from './components/Items';

function App() {
  return (
    <div className="App">
      <Items />
      <Edit />
    </div>
  );
}

export default App;
