import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-paper";

function BadgerRegisterScreen(props) {

    const [newUserName, setNewUserName] = useState("")
    const [newPass, setNewPass] = useState("")
    const [verifyPass, setVerifyPass] = useState("")
    const [alertMsg, setAlertMsg] = useState("")

    function handleSigningUp() {
        if (newPass !== verifyPass) {
            setNewPass("")
            setVerifyPass("")
            props.setRegisterMsg("Passwords do not match!")
        } else {
            props.setRegisterMsg("")
            props.handleSignup(newUserName, newPass)
        }
    }

    return <View style={styles.container}>
        <Text style={{ fontSize: 36 }}>Join BadgerChat!</Text>
        <TextInput
            label="Username"
            left={<TextInput.Icon icon="account-circle" iconColor="#dc143c" />}
            mode="outlined"
            style={{ margin: 15, width: 300 }}
            onChangeText={(val) => setNewUserName(val)}
            autoCapitalize='none'
        />
        <TextInput
            label="Password"
            left={<TextInput.Icon icon="key" iconColor="#dc143c" />}
            mode="outlined"
            style={{ margin: 10, width: 300 }}
            secureTextEntry={true}
            value={newPass}
            onChangeText={(val) => setNewPass(val)}
            autoCapitalize='none'
        />
        <TextInput
            label="Verify Password"
            left={<TextInput.Icon icon="shield-key" iconColor="#dc143c" />}
            mode="outlined"
            style={{ margin: 10, width: 300 }}
            secureTextEntry={true}
            value={verifyPass}
            onChangeText={(val) => setVerifyPass(val)}
            autoCapitalize='none'
        />
        <TouchableOpacity style={styles.signupBtn} onPress={() => { handleSigningUp() }}>
            <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
        {
            props.msg === "" ? <></> :  <Text style={{color: "crimson"}}>{props.msg}</Text>
        }
        <TouchableOpacity style={styles.otherBtns} onPress={() => { props.setRegisterMsg(""); props.setIsRegistering(false) }}>
            <Text style={styles.btnText}>Nevermind</Text>
        </TouchableOpacity>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupBtn: {
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
        width: 150,
        margin: 10,
        borderRadius: 30,
    },
    btnText: {
        color: "white",
        fontSize: 16,
        textAlign: "center"
    }
});

export default BadgerRegisterScreen;