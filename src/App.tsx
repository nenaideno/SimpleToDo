import React, { lazy, Suspense } from 'react';
import './App.scss';


// components
import Preloader from './Components/Preloader/Preloader';

// lazy
const ListContainer = lazy(() => import('./Components/List/ListContainer'))

const App = () => {
  return (
    <div className="app">
      <Suspense fallback={<Preloader/>} >
        <ListContainer />
      </Suspense>
    </div>
  );
}

export default App;
