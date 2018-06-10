import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image,
    DeviceEventEmitter, AsyncStorage, Alert} from 'react-native';
import NavigationBar from '../component/NavigationBar';
import CheckBox from 'react-native-check-box';
import ArrayUtils from "../component/ArrayUtils"

const popular_def_lans = require('../../res/data/popular_def_lans.json')
export default class CustomKeyPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: popular_def_lans
        }
    }
    doBack = () => {
        this.props.navigator.pop();
    }
    doSave = () => {
        console.log(JSON.stringify(this.state.data))
        // AsyncStorage是 一个简单的、异步的、持久化的Key-Value存储系统
        AsyncStorage.setItem('custom_key', JSON.stringify(this.state.data))
            .then(()=> {
                Alert.alert('提示','保存成功',[{text: '是', onPress: ()=>{this.doBack()}}
                ]);
                DeviceEventEmitter.emit('HOMEPAGE_RELOAD','Homepage重新加载');
            })
    }
    getNavRightBtn = () => {
        return <View style={{flexDirection: 'row',alignItems: 'center'}}>
        </View>
    }
    // 加载本地数据
    componentDidMount(){
        AsyncStorage.getItem('custom_key')
        .then(value=> {
            if(value !== null){
                this.setState({data: JSON.parse(value)})
            }
            // 克隆原始数据
             this.originData = ArrayUtils.clone(this.state.data)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>RN开发组件模板</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
}); 