import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";


export const BarberItem = ({data}) => {
    return(
        <Pressable style={styles.Area}>
            <Image style={styles.Avatar} source={{uri: data.avatar}}/>
            <View style={styles.InfoArea}>
                <Text style={styles.UserName}>{data.name}</Text>

                <View style={styles.SeeProfileButton}>
                    <Text style={styles.SeeProfileButtonText}> Ver Perfil</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    Area:{
        backgroundColor: "FFFFFF",
        marginBottom: 20,
        borderRadius: 20,
        padding: 15,
        flexDirection: "row"

    },
    Avatar:{
        width: 88,
        height: 88,
        borderRadius: 20

    },
    InfoArea:{
        marginLeft: 20,
        justifyContent: "space-between",


    },UserName:{
        fontSize: 17,
        fontWeight: "bold"

    },
    SeeProfileButton:{
        width: 85,
        height: 26,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center'
    },
    SeeProfileButtonText:{
        fontSize: 13,
        color: "#268596"
    }


}

)