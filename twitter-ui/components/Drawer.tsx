import React from 'react';
import { DrawerItemsProps } from 'react-navigation';
import {
  ScrollView, StyleSheet, TouchableOpacity, Image, Text,
  View, StatusBar, SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import MenuItem from './MenuItem';

class Drawer extends React.Component<DrawerItemsProps> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile')}
            >
              <Image
                source={require('../assets/me.jpg')}
                style={styles.imageStyle}
              />
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Monney Arthur</Text>
              <Text style={{ fontSize: 15, color: '#97A2B1' }}>@MonneyArthur</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.stats}>
            <View style={{ flexDirection: 'row', marginRight: 5 }}>
              <Text style={{ color: '#fff', fontWeight: '500', paddingRight: 3 }}>460</Text>
              <Text style={{ color: '#97A2B1' }}>Abonnements</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#fff', fontWeight: '500', paddingRight: 3 }}>2953</Text>
              <Text style={{ color: '#97A2B1' }}>Abonnés</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={styles.menu}>
            <MenuItem 
              iconName="ios-person" 
              onPress={() => this.props.navigation.navigate('Profile')} 
              title="Profil"
            />
            <MenuItem 
              iconName="ios-paper"
              onPress={() => this.props.navigation.navigate('Lists')}
              title="Listes" 
            />
            <MenuItem 
              iconName="ios-bookmark"
              onPress={() => this.props.navigation.navigate('Signets')}
              title="Signets" 
            />
            <MenuItem 
              iconName="ios-flash"
              onPress={() => this.props.navigation.navigate('Moments')}
              title="Moments" 
            />
          </View>
          <View style={styles.subMenu}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.props.navigation.navigate('Settings')}
              style={styles.subMenuButton}
            >
              <Text style={styles.subMenuTitle}>Réglages et confidentialités</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => this.props.navigation.navigate('Settings')}
              style={styles.subMenuButton}
            >
              <Text style={styles.subMenuTitle}>Centre d'aide</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.bottomMenu}>
          <Icon name="ios-bulb" size={25} color="#3CABF7" />
          <Icon name="ios-qr-scanner" size={25} color="#3CABF7" />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 8
  },
  headerContainer: {
    paddingBottom: 20,
    borderBottomWidth: 0,
    borderBottomColor: '#97A2B1' 
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 15
  },
  stats: {
    flexDirection: 'row',
    paddingHorizontal: 16
  },
  menu: {

  },
  subMenu: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#97A2B1'
  },
  subMenuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15
  },
  subMenuTitle: {
    color: '#fff',
    fontSize: 17
  },
  bottomMenu: {
    borderTopWidth: 0,
    borderTopColor: '#97A2B1',
    paddingHorizontal: 16,
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default Drawer;
