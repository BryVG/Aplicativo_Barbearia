import React, {useEffect} from "react";
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BarberLogo from '../../assets/barber.svg'
import Api from "../../Api";


export function Preload({navigation}){
    
    const {dispatch: userDispatch} = useContext(UserContext);


    useEffect(() =>{
        const checkToken = async () =>{
            const token = await AsyncStorage.getItem('token');
            if(token){
                let res = await Api.checkToken(token);
            if(res.token){
                await AsyncStorage.setItem('token', res.token);

                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        avatar: res.data.avatar
                    }
                });
                navigation.navigate('MainTab');
            }else{
                navigation.navigate('SignIn');
            }
                
            }else{
                navigation.navigate('SignIn');
            }
        }
        checkToken();
    },[]);

    return(
        <View style={styles.container}>
               
        <BarberLogo width="100%" height="160" />
        <ActivityIndicator size="large" color="#FFFFFF" style={styles.LoadingIcon} />
  
 </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#63C2D1",
        justifyContent: 'center',
        alignItems: 'center'
    },LoadingIcon:{
        marginTop:50
    }
})