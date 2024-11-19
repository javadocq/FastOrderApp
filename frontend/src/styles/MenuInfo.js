import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container : {
    flexGrow : 1,
    backgroundColor : '#FFF'
  },
  wrap: {
    width : '100%',
    position :'relative',
  },
      storeBox: {
        width: '100%',
        justifyContent : 'center',
        height : 60,
        alignItems : 'center'
      },
      InfoBox : {
        width : '85%',
        flexDirection : 'row',
        justifyContent : 'space-between'
      },
      menuName : {
        color : '#222',
        fontSize : 20,
        fontStyle : 'normal',
        fontWeight : '600',
        marginTop : '1%',
      },
      price : {
        color : '#484747',
        fontSize : 20,
        fontStyle : 'normal',
        fontWeight : '600',
      },
      menuBox : {
        marginTop: "2%", 
        gap: 20, 
        marginBottom: "2%", 
        alignItems : 'center',
      },
      padding: {
        width: '100%',
        height: 10,
        backgroundColor: 'rgba(218, 218, 218, 0.25)'
      },
      paddingSecond: {
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(218, 218, 218, 0.25)'
      },
      wrapper : {
        flexDirection : 'row',
      },
      round : {
        borderRadius: 15,
        height : 20,
        width : 39,
        backgroundColor : 'rgba(236, 66, 76, 0.30)',
        alignItems :'center',
        justifyContent : 'center'
      },
      flavoursBox : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : '85%',
        marginBottom : '1%',
      },
      flavoursPrice : {
        color : '#484747',
        fontSize : 16,
        fontStyle : 'normal',
        fontWeight : '400',
        marginLeft : '5%'
      },
      detailRound : {
        borderRadius: 15,
        height : 20,
        width : 39,
        backgroundColor : 'rgba(42, 42, 44, 0.10)',
        alignItems :'center',
        justifyContent : 'center'
      },
      flavoursBox : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : '85%',
      },
      flavoursPrice : {
        color : '#484747',
        fontSize : 16,
        fontStyle : 'normal',
        fontWeight : '400',
        marginLeft : '5%'
      },
      countBox : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        width : '85%',
        marginLeft : '8%',
        marginBottom : 90,
      },
      count: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 5,
        width: 85,
        height: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        marginLeft : '9%'
      },
      countIcon : {
        width : '20%',
        alignItems : 'center',
        justifyContent : 'center'
      },
      countText: {
        color: '#484747',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '500',
      },
});

export default styles;

