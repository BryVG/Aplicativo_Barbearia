import React, {useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import { Pressable, StyleSheet, View } from "react-native";


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Appointments from '../screens/Appointments';
import Favorites from '../screens/Favorites';
import Profile from '../screens/Profile';

import HomeIcon from '../assets/home.svg';
import SearchIcon from "../assets/search.svg";
import TodayIcon from '../assets/today.svg';
import FavoriteIcon from '../assets/favorite.svg';
import AccountIcon from '../assets/account.svg';


const Tab = createBottomTabNavigator();


  




const AvatarIcon = () =>(
     
  <Image style={{width:24, height:24, borderRadius:12}} />

      
);



const CustomTabBarButton = ({children, onPress}) =>(
        <Pressable
        style={{
            marginTop: -30,
            justifyContent: 'center',
            alignItems: 'center'
        }} 
        onPress={onPress}>
            <View style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              backgroundColor: '#FFF',
              borderColor:'#4EADBE',
              borderWidth: 3,
              borderStyle: 'solid',
            }}>
              {children}
            </View>
        </Pressable>
)

export function MainTab(){
 
  const{ state: user} = useContext(UserContext);

  return(
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false, tabBarStyle:{height:60,
      backgroundColor:'#4EADBE',
      flexDirection: 'row'}}}>
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon: ({color, size, focused}) => {
        if(focused){
          return <HomeIcon width="24" height="24" fill="#FFFFFF"/>
        }else{
          return <HomeIcon width="24" height="24" fill="#FFFFFF" opacity="0.5"/>
        }
      }}} />
      <Tab.Screen name="Search" component={Search} options={{tabBarIcon: ({color, size, focused}) => {
        if(focused){
          return <SearchIcon width="24" height="24" fill="#FFFFFF"/>
        }else{
          return <SearchIcon width="24" height="24" fill="#FFFFFF" opacity="0.5"/>
        }
      }}} />
      <Tab.Screen name="Appointments" component={Appointments} 
      
      options={{tabBarIcon: ({focused}) => (
      
          

            <TodayIcon width="32" height="32" fill="#4EADBE" /> 
        

           
  ),tabBarButton: (props) => (
    <CustomTabBarButton {...props} />
  )}} />
      <Tab.Screen name="Favorites" component={Favorites} options={{tabBarIcon: ({color, size, focused}) => {
       
       
       if(focused){
          return <FavoriteIcon width="24" height="24" fill="#FFFFFF"/>
        }else{
          return <FavoriteIcon width="24" height="24" fill="#FFFFFF" opacity="0.5"/>
        }
      }}} />   
         <Tab.Screen name="Profile" component={Profile} options={{tabBarIcon: ({color, size, focused}) => {
       
     
          if(focused){  
        return <AccountIcon width="24" height="24" fill="#FFFFFF" />
      }else{
        return <AccountIcon width="24" height="24" fill="#FFFFFF" opacity="0.5"/>
      }

        }
      }}
       
      />
    </Tab.Navigator>
  )
};

const styles = StyleSheet.create({
  TabItemCenter:{
      
      width: 70,
      height: 70,
      backgroundColor: '#FFF',
      borderRadius: 35,
      borderColor:'#4EADBE',
      borderWidth: 3,
      borderStyle: 'solid',
      marginTop: -20
}


})