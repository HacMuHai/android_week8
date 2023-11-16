import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, } from 'react-native';
import { TextInput } from "react-native-web";

export default function App({ navigation }) {
    var listAccount = [
        { name: "user1", password: "pw1" },
        { name: "user2", password: "pw2" },
        { name: "user3", password: "pw3" }
    ]
    const [showPassWord, setShowPassWord] = useState(true)
    const [checkAccount, setCheckAcount] = useState(true)
    const tbLoi = 'Name already exists'

    const [pathEye, setPathEye] = useState(require('../assets/eye.png'))

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    const changeEye = () => {
        setPathEye(!showPassWord ? require('../assets/eye.png') : require('../assets/notEye.png'))
        setShowPassWord(!showPassWord)
    }

    const URL_BASE = 'https://js27h4-3000.csb.app'
    const pressRegister = () => {
        fetch(`${URL_BASE}/accounts?name=${name}`)
            .then(response => response.json())
            .then(
                data => {
                    if (data.length != 0) {
                        console.log('a');
                       
                    } else
                        console.log('b');
                        if (checkAccount) {
                            setCheckAcount(false)
                        }
                    // navigation.push('Screen3', { user: data[0] })
                }
            )

    }
    return (
        <View style={{ flex: 1, padding: 10, width: '100%' }}>
            <View style={{ flex: 2, justifyContent: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: 700, color: '#00BDD6' }}>REGISTER</Text>
            </View>

            <SafeAreaView style={{ flex: 4, width: '100%', justifyContent: 'space-around' }}>
                <View style={[{ height: 40, justifyContent: 'center', borderRadius: 5, paddingHorizontal: 5, borderColor: 'red' }, checkAccount ? null : { borderWidth: 1, borderLeftWidth: 5 }]}>
                    <Text style={{ fontSize: 16, fontWeight: 700, }}>{checkAccount ? '' : tbLoi}</Text>
                </View>
                <View style={{ height: 50, flexDirection: 'row', borderWidth: 1, borderRadius: 5, paddingHorizontal: 5, borderColor: '#00BDD6' }}>
                    <Image style={{ flex: 1, resizeMode: 'contain' }} source={require('../assets/user.png')} />
                    <TextInput
                        placeholder='Name'
                        style={{ flex: 9, fontSize: 18, fontWeight: 400, marginLeft: 10, }}
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={{ height: 50, flexDirection: 'row', borderWidth: 1, borderRadius: 5, paddingHorizontal: 5, borderColor: '#00BDD6' }}>
                    <Image style={{ flex: 1, resizeMode: 'contain' }} source={require('../assets/lock.png')} />
                    <TextInput
                        placeholder='Password'
                        style={{ flex: 8, fontSize: 18, fontWeight: 400, marginLeft: 10, }}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={showPassWord}
                    />
                    <TouchableOpacity style={{ flex: 1 }} onPress={changeEye}>
                        <Image style={{ flex: 1, resizeMode: 'contain' }} source={pathEye} />
                    </TouchableOpacity>
                </View>
                <View style={{ height: 50, flexDirection: 'row', borderWidth: 1, borderRadius: 5, paddingHorizontal: 5, borderColor: '#00BDD6' }}>
                    <Image style={{ flex: 1, resizeMode: 'contain' }} source={require('../assets/user.png')} />
                    <TextInput
                        placeholder='Email'
                        style={{ flex: 9, fontSize: 18, fontWeight: 400, marginLeft: 10, }}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
            </SafeAreaView>

            <View style={styles.containerBtnLogin}>
                <TouchableOpacity
                    style={{ width: '90%', height: 45, backgroundColor: "#00BDD6", justifyContent: "center", alignItems: "center", }}
                    onPress={pressRegister}
                >
                    <Text style={styles.textBtnLogin}>REGISTER</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.containerFooter}>
                <TouchableOpacity
                    style={{}}
                    onPress={() => navigation.navigate('Screen1')}
                >
                    <Text style={{ fontSize: 20, fontWeight: 700, marginTop: 50, color: '#00BDD6' }}>LOGIN ACCOUNT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    containerBtnLogin: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },

    textBtnLogin: {
        fontSize: 20,
        fontWeight: 700,
        color: "#FFF"
    },


    containerFooter: {
        flex: 3,
        justifyContent: "flex-start",
        alignItems: "center",
    },
})

