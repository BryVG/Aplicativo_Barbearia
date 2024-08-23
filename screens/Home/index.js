import React, {useState, useEffect} from "react";
import { ActivityIndicator, Platform } from "react-native";
import {Pressable, Text, StyleSheet, SafeAreaView} from 'react-native';
import { ScrollView, TextInput, View } from "react-native";
import * as Location from 'expo-location';
import {BarberItem} from '../../components/BarberItem'



import Api from "../../Api";

import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';





export default ({navigation}) => {
    
   
   
    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    

    const handleLocationFinder = async () => {
        setCoords(null);
        let { status } = await Location.requestForegroundPermissionsAsync(); 

        if(status == 'granted') {
            setLoading(true);
            setLocationText('');
            setList([]);

            let location = await Location.getCurrentPositionAsync({});
                console.log(location)
               
                setCoords(location.coords);
                console.log(location.coords);
                getBarbers();
           

        }
    }


    const getBarbers = async () => {
        setLoading(true);
        setList([]);

      

        let res = await Api.getBarbers();
        console.log(res);
        if(res.error == '') {
            if(res.loc){
                setLocationText(res.loc);
            }
            console.log(res.data)
            setList(res.data);
        } else {
            alert("Erro: "+res.error);
        }

        setLoading(false);
    }

    useEffect(()=>{
        getBarbers();
    }, []);

    const onRefresh = () => {
        setRefreshing(false);
        getBarbers();
    }

    const handleLocationSearch = () => {
        setCoords({});
        getBarbers();
    }
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.Scroller}>


                <View style={styles.HeaderArea} >
                    <Text style={styles.HeaderTitle} numberOfLines={2}>Encontre seu barbeiro favorito</Text>
                    <Pressable style={styles.SearchButton} onPress={()=> navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF"></SearchIcon>
                    </Pressable>
                </View>

                <View style={styles.LocationArea}>
                    <TextInput style={styles.LocationInput} 
                    placeholder="Onde você está?" 
                    placeholderTextColor="#FFFFFF"
                    value={locationText}
                    onChangeText={t=>setLocationText(t)}
                    />
                    <Pressable style={styles.LocationFinder} onPress={handleLocationFinder} >
                        
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF"></MyLocationIcon>

                    </Pressable>
                </View>

            {loading &&
                <ActivityIndicator size="large" color="#FFFFFF" style={styles.LoadingIcon} />
            }

            <View style={styles.ListArea}>
               
                {list.map((item, k)=>{
                    <>
                    <Text>Teste</Text>
                    <BarberItem key={k} data={item}/>
                    </>
                })}
            </View>
                


            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
        container:{
            flex: 1,
            backgroundColor: '#63C2D1'
            
        },Scroller:{
            flex: 1,
            padding: 20

        },HeaderArea:{
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: 'center',

        },HeaderTitle:{
            width: 250,
            fontSize: 24,
            fontWeight:"bold",
            color: '#FFF'



        },SearchButton:{
            width: 26,
            height:26
            
        },LocationArea:{
            backgroundColor: '#4EADBE',
            height: 60,
            borderRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight:20,
            marginTop: 30


        },LocationInput:{
            flex: 1,
            fontSize: 16,
            color: '#FFFFFF'

        },LocationFinder:{
            width: 24,
            height: 24
        }, LoadingIcon:{
            marginTop:50
        },ListArea:{
            marginTop: 30,
            marginBottom:30
        }

})