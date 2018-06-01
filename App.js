import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';

import HomePage from "./js/pages/HomePage";

export default class GitCRNA extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'popular'
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <HomePage/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

AppRegistry.registerComponent('GitCRNA', () => GitCRNA);
