import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BadgerChatMessage from "./BadgerChatMessage";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import * as SecureStore from 'expo-secure-store';

function BadgerChatroomScreen(props) {
    const [messages, setMessages] = useState([])
    const [popoutShown, setPopoutShown] = useState(false);
    const [postTitle, setPostTitle] = useState("")
    const [postContent, setPostContent] = useState("")
    const [postAlert, setPostAlert] = useState("")

    useEffect(() => {
        getPosts()
    }, [])

    function getPosts() {
        fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
            headers: {
                "X-CS571-ID": "bid_8690f7961123fd48958f",
            },

        }).then(res => {
            if (res.status === 404) {
                throw new Error();
            } else {
                return res.json()
            }
        }).then(messages => {
            setMessages(messages.messages)
        })
            .catch((e) => console.log(e))
    }

    function handlePost() {
        SecureStore.getItemAsync("token").then(token => {
            fetch(`https://cs571.org/s23/hw10/api/chatroom/${props.name}/messages`, {
                method: "POST",
                headers: {
                    "X-CS571-ID": "bid_8690f7961123fd48958f",
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: postTitle, content: postContent })
            }).then(res => {
                if (res.status === 400) {
                    setPostAlert("Please specify both a title and content!")
                } else if (res.status === 401) {
                    setPostAlert("You must be logged in to post!")
                } else if (res.status === 413) {
                    setPostAlert("Post title must be at <128 characters & content must be <1024 characters!")
                } else {
                    setPopoutShown(false)
                    getPosts()
                }
            })
        })
    }

    function setModal() {
        setPopoutShown(true)
        setPostContent("")
        setPostTitle("")
    }

    function removeModal() {
        setPopoutShown(false);
        setPostAlert("")
        setPostContent("")
        setPostTitle("")
    }

    return <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
            {
                messages ? messages.map((message) => {
                    return <BadgerChatMessage key={message.id} {...message}></BadgerChatMessage>
                }) : <Text>Loading messages</Text>
            }
        </ScrollView>
        <View style={styles.bottomContainer}>
            {
                props.isGuest ? <></> : <TouchableOpacity style={styles.bottomBtns} onPress={() => { setModal() }}>
                    <Text style={styles.text}>CREATE POST</Text>
                </TouchableOpacity>
            }
            <TouchableOpacity style={styles.bottomBtns} onPress={() => { getPosts() }}>
                <Text style={styles.text}>REFRESH</Text>
            </TouchableOpacity>
        </View>
        <Modal animationType="slide"
            transparent={true}
            visible={popoutShown}
            onRequestClose={() => { removeModal() }}
        >
            <View style={styles.newPostModal}>
                <View style={styles.postModalTop} >
                    <Text style={[styles.text, {fontSize: 20}]}>CREATE POST</Text>
                </View>
                <TextInput label="Title"
                    right={<TextInput.Icon icon="format-title" iconColor="#dc143c" />}
                    value={postTitle}
                    mode="outlined"
                    style={{ margin: 10, width: 250, alignSelf: "center" }}
                    onChangeText={(val) => setPostTitle(val)}
                />
                <TextInput label="Content"
                    right={<TextInput.Icon icon="comment-text" iconColor="#dc143c" />}
                    value={postContent}
                    mode="outlined"
                    multiline={true}
                    style={{ margin: 10, width: 250, height: 200, alignSelf: "center" }}
                    onChangeText={(val) => setPostContent(val)}
                />
                <View style={{ flexDirection: "row", alignSelf:"center"}}>
                    <TouchableOpacity onPress={() => { handlePost() }}
                        style={styles.postBtn}>
                        <Text style={styles.text}>POST</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { removeModal() }}
                        style={styles.closeBtn}>
                        <Text style={styles.text}>CLOSE</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ fontFamily: "Futura" }}>{postAlert}</Text>
            </View>
        </Modal>
    </View>

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "darkgrey",
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottomContainer: {
        flexDirection: "row", 
        backgroundColor: "grey", 
        height: 100, width: 430, 
        borderRadius: 35,
        justifyContent: "center"
    },

    bottomBtns: {
        width: 150,
        margin: 15,
        borderRadius: 20,
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "crimson",
        padding: 10
    },

    text: {
        fontSize: 16,
        fontFamily: "Futura",
        color: "white",
        textAlign: "center",
    },

    newPostModal: {
        alignSelf: "center",
        alignContent: "center",
        height: 550,
        width: 330,
        top: 130,
        bottom: 200,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 100,
        elevation: 5,
    },

    postModalTop: {
        alignSelf: "center",
        justifyContent: "center",
        alignItems:"center",
        top: -35,
        height: 70,
        width: 330,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "crimson",
    },

    postBtn: {
        width: 100,
        backgroundColor: "crimson",
        padding: 10,
        borderRadius: 20,
        margin: 10,
    },

    closeBtn: {
        width: 100,
        backgroundColor: "grey",
        padding: 10,
        borderRadius: 20,
        margin: 10
    },
});

export default BadgerChatroomScreen;