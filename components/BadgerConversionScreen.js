import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function BadgerConversionScreen(props) {

    function handleConversion() {
        props.setIsGuest(false);
        props.setIsRegistering(true);
    }

    return <View style={styles.container}>
        <Text style={{fontSize: 24, marginTop: -100}}>Ready to signup?</Text>
        <Text>Join BadgerChat to be able to make posts!</Text>
        <Text/>
        <TouchableOpacity style={styles.signUpBtn} onPress={() => { handleConversion() }}>
            <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signUpBtn: {
        backgroundColor: "crimson",
        padding: 10,
        alignContent: "center",
        width: 170,
        margin: 15,
        borderRadius: 30,
    },
    btnText: {
        color: "white",
        fontSize: 16,
        textAlign: "center"
    }
});

export default BadgerConversionScreen;