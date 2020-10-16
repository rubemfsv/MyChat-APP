import 'react-native-gesture-handler';
import React from 'react';
import NavContainer from './src/routes';
import {StoreProvider} from './src/contexts/store';

const App = () => (
  <StoreProvider>
    <NavContainer />
  </StoreProvider>
);

export default App;
