/**
 * Created by lenovo on 2018/6/8.
 */
import React from 'react';
import { StyleSheet, Text, View, WebView,
    TouchableOpacity, FlatList, RefreshControl } from 'react-native';

import NavigationBar from '../component/NavigationBar'

class ProjectDetails extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            canGoBack: false
        }
    }
    handleBack = () => {
        if(this.state.canGoBack){
            this.refs.webView.goBack()
        }else{
            this.props.navigator.pop()
        }
    }
    getNavLeftBtn = () => {
        return <View style={{flexDirection:'row',alignItems:'center'}}>
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.handleBack}
                >
                <Image source={require('../../res/images/ic_arrow_back_white_36pt.png')} style={{width:24,height:24}}/>
            </TouchableOpacity>
        </View>
    }
    handleNavStateChange = (s) => {
        // 当前Webview 是否能够返回
        this.setState({ canGoBack: s.canGoBack})
    }
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar
                    title={this.props.title}
                    leftButton= {this.getNavLeftBtn()}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})