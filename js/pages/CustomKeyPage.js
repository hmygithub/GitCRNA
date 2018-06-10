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
        // AsyncStorage�� һ���򵥵ġ��첽�ġ��־û���Key-Value�洢ϵͳ
        AsyncStorage.setItem('custom_key', JSON.stringify(this.state.data))
            .then(()=> {
                Alert.alert('��ʾ','����ɹ�',[{text: '��', onPress: ()=>{this.doBack()}}
                ]);
                DeviceEventEmitter.emit('HOMEPAGE_RELOAD','Homepage���¼���');
            })
    }
    getNavRightBtn = () => {
        return <View style={{flexDirection: 'row',alignItems: 'center'}}>
        </View>
    }
    // ���ر�������
    componentDidMount(){
        AsyncStorage.getItem('custom_key')
        .then(value=> {
            if(value !== null){
                this.setState({data: JSON.parse(value)})
            }
            // ��¡ԭʼ����
             this.originData = ArrayUtils.clone(this.state.data)
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>RN�������ģ��</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
}); 