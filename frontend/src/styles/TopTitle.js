import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    wrapper : {
        width : '100%',
        height :60,
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        position : 'relative'
    },
    mainText: {
        color : '#222',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    backArrowIcon : {
        position : 'absolute',
        left : '10%'
    },
})

export default styles;