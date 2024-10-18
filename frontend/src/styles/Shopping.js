import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFF',
    },
    wrapper : {
        width : '80%',
        height : '10%',
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center'
    },
    wrap: {
        width: '100%',
        alignItems: 'center',
    },
    mainText: {
        color: '#484747',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginLeft : '38%'
    },
    storeName: {
        marginTop: 23,
        color: '#484747',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 17,
        width : '79%'
    },
    padding: {
        width: '100%',
        height: 10,
        backgroundColor: '#D9D9D9',
    },
    menuBox: {
        borderWidth: 1,
        borderColor: '#DFDFDF',
        borderRadius: 5,
        width: '80%',
    },
    orderMenu: {
        width: '100%',
        height: width * 0.33, // 고정 높이 설정
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    menuName: {
        color: '#484747',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: '20%',
        marginTop : '15%',
    },
    menuPrice: {
        color: '#484747',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: '20%',
        marginTop : '5%',
    },
    count: {
        marginTop : '18%',
        marginLeft : '20%',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 5,
        width: 73,
        height: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    countText: {
        color: '#484747',
        fontSize: 14,
        fontWeight: '500',
    },
    menuImg: {
        borderWidth: 1,
        width: width * 0.15,
        height: width * 0.15,
        borderColor: '#DFDFDF',
        borderRadius: 5,
        backgroundColor: '#D9D9D9',
        marginRight: '5%',
        marginTop : '5%'
    },
    withSeparator: {
        borderBottomWidth: 1,
        borderColor: '#DFDFDF',
    },
    withoutSeparator: {
        borderBottomWidth: 0, // 마지막 항목의 경우 선을 없앰
    },
});

export default styles;