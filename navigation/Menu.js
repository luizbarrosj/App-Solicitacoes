import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Image } from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon, Drawer as DrawerCustomItem } from '../components/';
import { Images, materialTheme } from "../constants/";


function  CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const insets = useSafeArea();
  const [user, setUser] = useState(null);
  const screens = [
    "Home",
    
  ];

  
  if(user?.perfil==="admin"){
    screens.push("Relatorios")
    screens.push("Solicitações")
  }
    // Busca os dados do usuário no AsyncStorage
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const userData = await AsyncStorage.getItem('user');
          if (userData) {
            const parsedUser = JSON.parse(userData).userData;
            setUser(parsedUser);
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        }
      };
  
      fetchUserData();
    }, []);
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.25} style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Profile")}
        >
          <Block style={styles.profile}>
            {<Image source={{ uri: profile.avatar }} style={styles.avatar} />}
            <Text h5 color={"white"}>
              {profile.name}
            </Text>
            <Text h5 color={"white"}>
              {user?.name}
            </Text>
          </Block>
        </TouchableWithoutFeedback>
        <Block row>
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 7, paddingRight: 14 }}>
        <ScrollView
          contentContainerStyle={[
            {
              paddingTop: insets.top * 0.4,
              paddingLeft: drawerPosition === "left" ? insets.left : 0,
              paddingRight: drawerPosition === "right" ? insets.right : 0
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {screens.map((item, index) => {
            return (
              <>
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />

              </> 
              
            );
          })}
        </ScrollView>
      </Block>
      <Block flex={0.3} style={{ paddingLeft: 7, paddingRight: 14 }}>
        
      </Block>
    </Block>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#33579c',
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: 'flex-end'
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: 16,
  }
});

export default CustomDrawerContent;
