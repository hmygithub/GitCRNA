/**
 * Created by lenovo on 2018/6/7.
 */
import React from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';

class ProjectRow extends React.Component {
    static defaultProps = {
        item: {}
    }
    render(){
        const item = this.props.item
        return(
            <View style={styles.container}>
                <Text>{item.full_name}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})