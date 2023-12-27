import { useState } from "react";
import { StyleSheet, Text, View,  TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
//import { TextInput } from "react-native-textinput-with-icons";

function BadgerLoginScreen(props) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>BadgerChat Login</Text>
        <TextInput
            label="Username"
            left={<TextInput.Icon icon="account-circle" iconColor="#dc143c" />}
            mode="outlined"
            style={{ margin: 15, width: 300 }}
            onChangeText={(val) => setUsername(val)}
            autoCapitalize='none'
        />
        <TextInput
            label="Password"
            left={<TextInput.Icon icon="key" iconColor="#dc143c" />}
            mode="outlined"
            secureTextEntry={true}
            style={{ margin: 10, width: 300 }}
            onChangeText={(val) => setPassword(val)}
            autoCapitalize='none'
        />
        <TouchableOpacity style={styles.loginBtn} onPress={() => { props.handleLogin(username, password) }}>
            <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        {
            props.msg === "" ? <></> : <Text style={{ color: "crimson" }}>{props.msg}</Text>
        }
        <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.otherBtns} onPress={() => { props.setMsg(""); props.setIsRegistering(true) }}>
                <Text style={styles.btnText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.otherBtns} onPress={() => { props.setMsg(""); props.setIsGuest(true) }}>
                <Text style={styles.btnText}>Continue as Guest</Text>
            </TouchableOpacity>
        </View>

    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBtn: {
        backgroundColor: "crimson",
        padding: 10,
        alignContent: "center",
        width: 150,
        margin: 15,
        borderRadius: 30,
    },
    otherBtns: {
        backgroundColor: "grey",
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

export default BadgerLoginScreen;