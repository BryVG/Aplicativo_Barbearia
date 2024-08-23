import React from "react";
import {View, Text, StyleSheet, TextInput, Pressable, SafeAreaView} from 'react-native';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export function SignIn({navigation}){
    
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = async() =>{
        if(emailField !== '' && passwordField !== ''){

           let json = await Api.signIn(emailField,passwordField);

           if(json.token){
               await AsyncStorage.setItem('token', json.token);

               userDispatch({
                   type: 'setAvatar',
                   payload:{
                       avatar: json.data.avatar
                   }
               });
               navigation.navigate('MainTab');
           } else {
               alert('email e/ou senha incorretos');
           }
        }else{
           alert('preencha os campos')
        }
  }
    const handleMessageButtonClick = () => {
        navigation.navigate('SignUp');
  
}

    return(
        
            <View style={styles.container}>
                <BarberLogo width={"100%"} height={160} />
                <View style={styles.InputArea}>
                    <View style={styles.SignInput}> 
                         <EmailIcon  style={styles.EmailIcon}/><TextInput value={emailField} onChangeText={t=>setEmailField(t)}  placeholder={'Digite seu e-mail'}  style={styles.Input}/>
                    </View>
                    <View style={styles.SignInput}>
             <LockIcon  style={styles.LockIcon} /><TextInput value={passwordField} onChangeText={t=>setPasswordField(t)} secureTextEntry={true} placeholder={'Digite sua senha'} style={styles.Input}/> 
        
        </View>
            
            
            <Pressable onPress={handleSignClick}  style={styles.CustomButton} ><Text style={styles.CustomButtonText}>Login</Text></Pressable>
                </View>

                <Pressable onPress={handleMessageButtonClick} style={styles.SignMessageButton}>
            
           <Text style={styles.SignMessageButtonText}>Ainda não possui uma conta?</Text>
                <Text style={styles.SignMessageButtonTextBold}>Cadastre-se</Text> 
          
        </Pressable>

            </View>
       
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#63C2D1",
        justifyContent: 'center',
        alignItems: 'center'
    },InputArea:{
        padding: 40,
        width:'100%',

    },CustomButton: {
        height:60,
        backgroundColor: '#268596',
        borderRadius: 30,
        justifyContent:'center',
        alignItems: 'center'
    }, CustomButtonText:{
        fontSize:18,
        color:'#FFF'
    }, SignMessageButton:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:50,
        marginBottom:20
    },SignMessageButtonText:{
        fontSize:16,
        color:'#268596',
    },SignMessageButtonTextBold:{
        fontSize:16,
        color:'#268596',
        fontWeight:'bold',
        marginLeft: 5
    }, SignInput:{
        width: '100%',
        height:60,
        backgroundColor: '#83D6E3',
        flexDirection:'row',
        borderRadius:30,
        paddingLeft: 15,
        alignItems:'center',
        marginBottom: 15
    }, Input:{
        flex:1,
        fontSize:16,
        color: '#268596',
        marginLeft:10,
    }, EmailIcon:{
        width:24,
        height:24,
        fill:'#268596'
    }, LockIcon:{
        width:24,
        height:24,
        fill:'#268596'
    }
})