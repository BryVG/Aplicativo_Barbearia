import * as React from 'react';


import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../contexts/UserContext';

import  BarberLogo from '../../assets/barber.svg';
import PersonIcon from '../../assets/person.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import Api from '../../Api';


export function SignUp({navigation}){
   
    const {dispatch: userDispatch} = useContext(UserContext);

   const [nameField, setNameField] = useState(''); 
   const [emailField, setEmailField] = useState('');
   const [passwordField,setPasswordField] = useState('');

   const handleSignClick = async () =>{
     if(nameField !=='' && emailField !== '' && passwordField !== ''){
        let res = await Api.signUp(nameField, emailField,passwordField);
        if(res.token){
            await AsyncStorage.setItem('token', res.token);

                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        avatar: res.data.avatar
                    }
                });
                navigation.navigate('MainTab');
        } else {
            alert('erro: ' + res.error);
        }
     }else{
        alert('preencha os campos')
     }
   }
   
   const handleMessageButtonClick = () => {
    navigation.navigate('SignIn');

}
    

    return(
      
        <View style={styles.container}>
            <BarberLogo width="100%" height="160" />
        <View style={styles.InputArea}>
        
        <View style={styles.SignInput}> 
                <PersonIcon  style={styles.EmailIcon}/><TextInput value={nameField} onChangeText={t=>setNameField(t)} placeholder={'Digite seu nome'}  style={styles.Input}/>
         </View>
            <View style={styles.SignInput}> 
                <EmailIcon  style={styles.EmailIcon}/><TextInput value={emailField} onChangeText={t=>setEmailField(t)} placeholder={'Digite seu e-mail'}  style={styles.Input}/>
         </View>
        <View style={styles.SignInput}>
             <LockIcon  style={styles.LockIcon} /><TextInput value={passwordField} onChangeText={t=>setPasswordField(t)} secureTextEntry={true} placeholder={'Digite sua senha'} style={styles.Input}/> 
        
        </View>
            
            <View >
            <Pressable  onPress={handleSignClick} style={styles.CustomButton} >
              <View><Text style={styles.CustomButtonText}>Cadastrar</Text></View>
                </Pressable>
            </View>

        </View>  
        <Pressable  onPress={handleMessageButtonClick} style={styles.SignMessageButton}>
            
             <Text style={styles.SignMessageButtonText}>Já possui uma conta?</Text>
             <Text style={styles.SignMessageButtonTextBold}>Faça Login</Text>
          
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
        padding:40,
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
        paddingLeft:15,
        alignItems:'center',
        marginBottom:15
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