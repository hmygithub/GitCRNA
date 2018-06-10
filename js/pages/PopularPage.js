/**
 * Created by lenovo on 2018/5/29.
 */
import React from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl,
    TouchableOpacity, Image, AsyncStorage } from 'react-native';
import NavigationBar from '../component/NavigationBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ProjectRow from '../component/ProjectRow'
//import ProjectDetails from './ProjectDetails'

var popular_def_lans = require('../../res/data/popular_def_lans.json');
// 状态栏，滚动视图
export default class PopularPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            languages: []
        }
        popular_def_lans.forEach(item => {
            if(item.checked){
                this.state.languages.push(item);
            }
        })
    }
    getNavRightBtn = () => {
        return(
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    >
                    <Image source={require('../../res/images/ic_search_white_48pt.png')}
                        style={{width: 24, height: 24}}
                        />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    >
                    <Image source={require('../../res/images/ic_more_vert_white_48pt.png')}
                           style={{width: 24, height: 24}}
                        />
                </TouchableOpacity>
            </View>
        )
    }
    // 加载用户设置的语言分类数据
    loadLanguages = () => {
        AsyncStorage.getItem('custom_key')
            .then((value) => {
                alert(value)
                if(value != null){
                    this.setState({languages: JSON.parse(value)});
                }
            })
    }
    render(){
        return(
            <View style={styles.container}>
                <NavigationBar title="热门" rightButton={this.getNavRightBtn()}/>
                <ScrollableTabView
                    tabBarBackgroundColor="#63B8FF"
                    tabBarActiveTextColor="#FFF"
                    tabBarInactiveTextColor="#F5FFFA"
                    tabBarUnderlineStyle={{backgroundColor:"#E7E7E7",height:2}}>
                    {
                        this.state.languages.map((item, i) => {
                            return (item.checked ?
                                <PopularTab {...this.props} key={`tab${i}`} tabLabel={item.name} /> : null)
                        })
                    }
                </ScrollableTabView>
            </View>
        )
    }
    componentDidMount = () => {
        // 读取数据
        this.loadLanguages()
    }
}

class PopularTab extends React.Component {
    static defaultProps = {
        tabLabel: 'Javascript'
    }
    constructor(props){
        super(props);
        this.state= {
            dataSource: [],
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
    renderRow = ({item}) => <ProjectRow item={item} />

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
