
// Keep this here!
import 'react-native-gesture-handler';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import BadgerLoginScreen from './components/BadgerLoginScreen';

import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import BadgerLandingScreen from './components/BadgerLandingScreen';
import BadgerChatroomScreen from './components/BadgerChatroomScreen';
import BadgerRegisterScreen from './components/BadgerRegisterScreen';
import BadgerLogoutScreen from './components/BadgerLogoutScreen';
import BadgerConversionScreen from './components/BadgerConversionScreen';


const ChatDrawer = createDrawerNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [loginMsg, setLoginMsg] = useState("")
  const [registerMsg, setRegisterMsg] = useState("")
  const [isGuest, setIsGuest] = useState(false)

  useEffect(() => {
    //getting all chatrooms
    fetch("https://cs571.org/s23/hw10/api/chatroom", {
      headers: {
        "X-CS571-ID": "bid_8690f7961123fd48958f",
      },
    })
      .then(res => {
        return res.json()
      })
      .then((data) => {
        setChatrooms(data)
      })
  }, []);

  function handleLogin(username, password) {
    fetch("https://cs571.org/s23/hw10/api/login", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_8690f7961123fd48958f",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: `${username}`, password: `${password}` })
    }).then(res => {
      return res.json()
    })
      .then((data) => {
        setLoginMsg(data.msg)
        if (data.msg === "Successfully authenticated.") {
          SecureStore.setItemAsync("token", data.token);
          setIsLoggedIn(true)
          setLoginMsg("")
        }
      })
  }

  function handleSignup(username, password) {
    fetch("https://cs571.org/s23/hw10/api/register", {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_8690f7961123fd48958f",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: `${username}`, password: `${password}` })
    }).then(res => {
      return res.json()
    })
      .then((data) => {
        setRegisterMsg(data.msg)
        if (data.msg === "Successfully authenticated.") {
          SecureStore.setItemAsync("token", data.token);
          setRegisterMsg("")
          setIsLoggedIn(true)
        }
      })
  }

  if (isLoggedIn || isGuest) {
    return (
      <NavigationContainer>
        <ChatDrawer.Navigator>
          <ChatDrawer.Screen name="Landing" component={BadgerLandingScreen} />
          {
            chatrooms.map(chatroom => {
              return <ChatDrawer.Screen key={chatroom} name={chatroom}>
                {(props) => <BadgerChatroomScreen name={chatroom} isGuest={isGuest}/>}
              </ChatDrawer.Screen>
            })
          }
          {
            isLoggedIn ? <ChatDrawer.Screen name="Logout" >
            {(props) => <BadgerLogoutScreen setIsLoggedIn={setIsLoggedIn} />}
          </ChatDrawer.Screen> : <ChatDrawer.Screen name="Register">
            {(props) => <BadgerConversionScreen setIsGuest={setIsGuest} setIsRegistering={setIsRegistering} />}
          </ChatDrawer.Screen>
          }
        </ChatDrawer.Navigator>
      </NavigationContainer>
    );
  } else if (isRegistering) {
    return <BadgerRegisterScreen msg={registerMsg} setRegisterMsg={setRegisterMsg} handleSignup={handleSignup} setIsRegistering={setIsRegistering} />
  } else {
    return <BadgerLoginScreen msg={loginMsg} setMsg={setLoginMsg} handleLogin={handleLogin} setIsRegistering={setIsRegistering} setIsGuest={setIsGuest} />
  }
}


