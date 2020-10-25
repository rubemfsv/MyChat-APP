import React from 'react';

import NavContainer from './src/routes';
import Loader from './src/components/Loader';
import {StoreProvider} from './src/contexts/store';
import {StatusBar} from 'react-native';

export default () => {
  return (
    <StoreProvider>
      <StatusBar barStyle="light-content" backgroundColor="#000" translucent />
      <NavContainer />
      <Loader />
    </StoreProvider>
  );
};
