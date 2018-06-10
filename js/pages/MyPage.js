/**
 * Created by lenovo on 2018/6/8.
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationBar from '../component/NavigationBar';
import CustomKeyPage from './CustomKeyPage';
import ProjectDetails from './ProjectDetails'

export default class MyPage extends React.Component {
    gotoCustomKey = () => {
        this.props.navigator.push({
            component: CustomKeyPage
        })
    }
    gotoProjectDetails = () => {
        this.props.navigator.push({
            component: ProjectDetails
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar title="�ҵ�"/>
                <View style={{flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
                    <Text onPress={this.gotoCustomKey}>ҳ����ת</Text>
                    <Text onPress={this.gotoProjectDetails}>��תWebView</Text>
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