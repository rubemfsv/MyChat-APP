import React from 'react';

import NavContainer from './src/routes';
import Loader from './src/components/Loader';
import {StoreProvider} from './src/contexts/store';
import {StatusBar} from 'react-native';

import {color} from './src/utils/';

import {YellowBox} from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

export default () => {
  return (
    <StoreProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={color.APP_MAIN_COLOR}
        translucent
      />
      <NavContainer />
      <Loader />
    </StoreProvider>
  );
};
