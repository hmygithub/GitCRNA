/**
 * Created by lenovo on 2018/6/5.
 */
export default class ArrayUtils{
//    �Ƚ��������������Ƿ���ȫ��ͬ
    static isAbsEqual(a,b){
        return JSON.stringify(a) == JSON.stringify(b)
    }
    /**
     +     * ��¡һ������
     +     * @param a
     +     */
    static clone(a){
        return a.map((item) => {
            var obj = {};
            //for in �������������
            for(var p in item){
                obj[p] = item[p]
            }
            return obj;
        })
    }
}