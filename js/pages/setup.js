/**
 * Created by lenovo on 2018/6/5.
 */
import { Navigator } from 'react-native-deprecated-custom-components'
import HomePage from './HomePage'

export default class Root extends React.Component {
    renderScene = (route, navigator) => {
        // ·�ɻ��ƣ�����·��ҳ��/�����ͨ����Navigator�� route.params���������ݴ���
        let Target = route.component;
        return <Target {...route.params} navigator={navigator}/>
    }
    render(){
        // Navigator�Ǹ���������ͨ��������ʵ���ڲ�ͬҳ������ת
        // Navigator�Ὠ��һ��·��ջ������ʱ��ҳ��ջ
        // initialRoute ��ʼ��·�ɣ��������������
        return(
            <Navigator
                initialRoute={{component: HomePage}}
                renderScene={(route,navigator) => this.renderScene(route,navigator)}
                />
        )
    }
}
