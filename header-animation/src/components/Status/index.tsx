import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import colors from '../../colors';

interface IStatusProps {
  amount: number
  action: string
}

const Status: React.StatelessComponent<IStatusProps> = ({ amount, action }) => {
  return (
    <View style={styles.statusContainer}>
      <Text style={{
        color: `${action === 'withdraw' ? colors.brand.failure : colors.brand.success}`,
        fontSize: 15,
        fontWeight: 'bold'
      }}
      >
        {amount}
      </Text>
      <Icon
        size={20}
        type="ionicon"
        name={`${action === 'withdraw' ? 'md-arrow-round-up' : 'md-arrow-round-down'}`}
        color={`${action === 'withdraw' ? colors.brand.failure : colors.brand.success}`}
        containerStyle={{ marginLeft: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
});

export default Status;
