/**
 * Created by lenovo on 2018/6/8.
 */
import React from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import NavigationBar from '../component/NavigationBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import GitHubTrending from 'GitHubTrending'

import TrendingProjectRow from '../component/TrendingProjectRow';
import ProjectDetails from './ProjectDetails';

var popular_def_lans = require('../../res/data/popular_def_lans.json');

export default class PopularPage extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            languages: []
        }
        popular_def_lans.forEach(item => {
            if(item.checked)
            this.state.languages.push(item)
        });
    }
    // 加载设置的语言分类依据
    loadLanguages = () => {
        AsyncStorage.getItem('custom_key')
            .then((value) => {
                if(value != null){
                    this.setState({ languages: JSON.parse(value)});
                }
            })
    }

    render(){
        componentDidMount(){
            this.loadData()
        }
        return(
            <View style={styles.container}>
                <NavigationBar title="趋势" />
                <ScrollableTabView
                    tabBarBackgroundColor="#63B8FF"
                    tabBarActiveTextColor="#FFF"
                    tabBarInactiveTextColor="#F5FFFA"
                    tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}>
                    {
                        this.state.languages.map((item, i) => {
                            return (item.checked ?
                                <TrendingTab {...this.props} key={`tab${i}`} tabLabel={item.name} /> : null)
                        })
                    }
                </ScrollableTabView>
            </View>
        )
    }
    componentDidMount() {
        this.loadLanguages();
    }
}

class TrendingTab extends React.Component {
    static defaultProps = {
        tabLabel: 'Javascript'
    }
    constructor(props){
        super(props);
        this.state = {
            dataSource: [],
            isLoading: true
        }
    }
    _keyExtractor = (item, index) => ('' + item.id + index);
    // 加载数据
    loadData = () => {
        this.setState({ isLoading: true });
        // 请求网络
        new GitHubTrending().fetchTrending(`https://github.com/trending/${this.props.tabLabel}?since=daily`)
            .then(json => {
                this.setState({
                    dataSource: json,
                    isLoading: false
                })
            }).catch(error => {
                console.log(error)
            }).done()
    }
    componentDidMount(){
        this.loadData()
    }
    handleRefresh = () => {
        this.loadData()
    }
    // 项目被选中，跳转到详情页
    handleProjectSelect = (obj) => {
        // console,log(obj);
        this.props.navigator.push({
            component: ProjectDetails,
            params: {title: obj.fullName, url: `https://github.com${obj.url}`}
        })
    }
    renderRow = ({item}) => <TrendingProjectRow
        item={item} onSelect={()=>this.handleProjectSelect(item)} />

    render(){
        return(
            <FlatList
                data={this.state.dataSource}
                keyExtractor={this._keyExtractor}
                renderItem={this.renderRow}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={this.handleRefresh}
                        tintColor="#63b8ff"
                        title="正在加载..."
                        titleColor='#63b8ff'
                        colors={['red','blue','yellow']}
                        //progressBackgroundColor=""
                    />
                }
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})