import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { IMenuItemsProps } from '../modules/Model';

const MenuItem: React.StatelessComponent<IMenuItemsProps> = ({
  iconName, title, onPress
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={styles.subMenuButton}
    >
      <Icon name={iconName} color="#97A2B1" size={30} />
      <Text style={styles.subMenuTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  subMenuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15
  },
  subMenuTitle: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15
  },
});

export default MenuItem;
