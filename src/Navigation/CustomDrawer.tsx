import React from "react";
import {Image, StyleSheet, View, Text, Dimensions} from 'react-native';
import CustomDrawerProps from "../Types/Interface";
import {DrawerContentScrollView, DrawerItemList} from "@react-navigation/drawer";

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const {width} = Dimensions.get('window');
const titleSize = width * 0.04;


const CustomDrawer: React.FC<CustomDrawerProps> = (props) => {
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor: '#242527'}}>
                {/*<ImageBackground source={require('../assets/pictures/StarShopping.jpg')} style={styles.backgroundImage}>*/}
                {/*    <Image source={require('../assets/pictures/Reflux-icon.jpg')} style={styles.userImage}/>*/}
                {/*    <Text style={styles.userName}>RefluxSupportZone</Text>*/}
                {/*</ImageBackground>*/}
                <View style={styles.topContainer}>
                    {/*<Image source={require('../assets/pictures/Reflux-icon.png')} style={styles.userImage}/>*/}
                    {/*<Text style={styles.topText}>RefluxSupportZone</Text>*/}
                </View>
                <View style={styles.drawerItemList}>
                    <DrawerItemList  {...props} />
                </View>
            </DrawerContentScrollView>
        </View>
    )
}

export default CustomDrawer;

const styles = StyleSheet.create({
    userImage: {
        height: 80,
        width: 80,
        borderRadius: 10,
        marginBottom: 10
    },
    backgroundImage: {
        padding: 20,
    },
    userName: {
        color: 'white',
        fontSize: 18,
    },
    drawerItemList: {
        flex: 1,
        backgroundColor: '#242527',
        paddingTop: 10
    },
    topContainer:{
        // flexDirection: 'row',
        // marginLeft: "1.5%"
    },
    topText:{
        // fontSize: titleSize,
        // marginLeft: "2%",
        // marginTop: '8%',
        // color: 'white'
    }
})
