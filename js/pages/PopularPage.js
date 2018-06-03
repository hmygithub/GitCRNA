/**
 * Created by lenovo on 2018/5/29.
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationBar from '../component/NavigationBar'
//import ScrollableTabView

// 状态栏，滚动视图
export default class PopularPage extends React.Component {
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar />
                <View style={{backgroundColor:'red',flex:1}}>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
