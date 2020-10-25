import React from 'react';
import {color} from '../../utils';

import {TextInput} from './styles';

const InputField = ({
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  onChangeText,
  value,
  onSubmitEditing,
  onBlur,
  onFocus,
  numberOfLines,
}) => (
  <TextInput
    value={value}
    numberOfLines={numberOfLines}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    placeholder={placeholder}
    placeholderTextColor={
      placeholderTextColor ? placeholderTextColor : color.WHITE
    }
    onSubmitEditing={onSubmitEditing}
    onBlur={onBlur}
    onFocus={onFocus}
  />
);

export default InputField;
