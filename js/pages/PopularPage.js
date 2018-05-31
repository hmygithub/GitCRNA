/**
 * Created by lenovo on 2018/5/29.
 */
import React from 'react';
import { AppRegistry, StyleSheet, Text, View,Image } from 'react-native';
import NavigationBar from './NavigationBar'

// ×´Ì¬À¸£¬¹ö¶¯ÊÓÍ¼
export default class PopularPage extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar />
                <view style={{backgroundColor:'red',flex:1}}></view>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
