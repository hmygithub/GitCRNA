/**
 * Created by lenovo on 2018/5/29.
 */
import React from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import NavigationBar from '../component/NavigationBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';

// 状态栏，滚动视图
export default class PopularPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            languages: ["IOS", "Android", "Java", "JavaScript"]
        }
    }
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar />
                <ScrollableTabView
                    tabBarBackgroundColor="#63B8FF"
                    tabBarActiveTextColor="#FFF"
                    tabBarInactiveTextColor="#F5FFFA"
                    tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}>
                    {
                        this.state.languages.map((item, i) => {
                            return (<PopularTab key={`tab${i}`} tabLabel={item} />)
                        })
                    }
                </ScrollableTabView>
            </View>
        )
    }
}

class PopularTab extends React.Component {
    static defaultProps = {
        tabLabel: 'Javascript'
    }
    constructor(props){
        super(props);
        this.state= {
            dataSource: [{key:'时间的导师'}, {key:'干净的字迹'}, {key:'小二'}],
            isLoading: true
        }
    }
    _keyExtractor = (item,index) => ('' + item.id + index);
    // 加载数据
    loadData = () => {
        this.setState({isLoading: true});
        // 请求网络
        fetch(`https://api.github.com/search/repositories?q=${this.props.tabLabel}&sort=stars`)
            .then(response => response.json())
            .then(json => {
                this.setState({ dataSource: json.items, isLoading: false})
            }).catch(error =>{
                console.log(error)
            }).done();
    }
    componentDidMount = ()=> {
        this.loadData();
    }
    handleRefresh=()=>{
        this.loadData();
    }
    render(){
        return(
            <FlatList
                data={this.state.dataSource}
                keyExtractor={this._keyExtractor}
                renderItem={({item}) => <Text>{item.full_name}</Text>}
                refreshControl={
                   <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this.handleRefresh}
                        tintColor="#63b8ff"
                        title="正在加载..."
                        titleColor="#63b8ff"
                        colors={['red', 'blue','yellow']}
                        progressBackgroundColor="green"
                    />
                }
                >
            </FlatList>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
