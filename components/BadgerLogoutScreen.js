import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as SecureStore from 'expo-secure-store';
import BadgerLoginScreen from "./BadgerLoginScreen";

function BadgerLogoutScreen(props) {

    function handleLogout() {
        SecureStore.setItemAsync("token", "")
        props.setIsLoggedIn(false)
    }

    return <View style={styles.container}>
        <Text style={{fontSize: 24, marginTop: -100}}>Are you sure you're done?</Text>
        <Text>Come back soon!</Text>
        <Text/>
        <TouchableOpacity style={styles.logOutBtn} onPress={() => { handleLogout() }}>
            <Text style={styles.btnText}>Logout</Text>
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
    input: {
        height: 40,
        width: "50%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    logOutBtn: {
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

export default BadgerLogoutScreen;