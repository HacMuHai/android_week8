import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image, SafeAreaView, TextInput, FlatList, } from 'react-native';


export default function Screen3({ navigation, route }) {
    // const acc = route.params.user
    const acc = {
        "id": 2,
        "name": "account1",
        "email": "user1@example.com",
        "password": "password1"
    }

    const [arrNote, setNotes] = useState([])
    const [arrViewNote, setViewNote] = useState([])
    const [selected, setSelected] = useState(0)
    const [search, setSearch] = useState('')

    const URL_BASE = 'https://js27h4-3000.csb.app'

    function getNote() {
        fetch(`${URL_BASE}/notes?accountID=${acc.id}&_sort=priority`)
            .then(response => response.json())
            .then(data => {
                setNotes(data)
                setViewNote(data)
                console.log(data);
            })
    }

    useEffect(() => {
        getNote()
    }, [])


    function setMau(value) {
        switch (value) {
            case 1:
                return { borderBottomWidth: 5, borderBottomColor: 'red' }
            case 2:
                return { borderBottomWidth: 5, borderBottomColor: 'yellow' }
            case 3:
                return { borderBottomWidth: 5, borderBottomColor: 'green' }
        }
    }

    const arrType = ['long', 'short']
    function changeSelect(value) {
        console.log(arrType, arrType[0], arrType[1]);
        if (value == selected) {
            setViewNote(arrNote.filter((item) => {
                return item.name.toLowerCase().includes(search.toLowerCase())
            }))
            setSelected(0)
        }

        else {
            setViewNote(arrNote.filter((item) => {
                return item.type == arrType[value - 1] && item.name.toLowerCase().includes(search.toLowerCase())
            }))

            setSelected(value)
        }
    }

    function searchNote(text) {
        if(selected == 0){
            setViewNote(arrNote.filter((item) => {
                return item.name.toLowerCase().includes(text.toLowerCase())
            }))
            setSearch(text)
        }else{
            setViewNote(arrNote.filter((item) => {
                return item.name.toLowerCase().includes(text.toLowerCase()) && item.type == arrType[selected - 1]
            }))
            setSearch(text)
        }
        

    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: '#DEE1E6' }}>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <Text style={{ fontSize: 30, fontWeight: 700, color: '#00BDD6' }}>{acc.name}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    gap: 5, height: 45, width: '100%', borderWidth: 1, flexDirection: 'row', paddingHorizontal: 5,
                    backgroundColor: '#D9D9D9', borderWidth: 1, borderRadius: 10
                }}>
                    <TextInput
                        style={{ flex: 9, fontSize: 16, fontWeight: 500, paddingHorizontal: 10, marginVertical: 5 }}
                        placeholder="Search"
                        value={search}
                        onChangeText={(text) => searchNote(text)}
                    />
                    <TouchableOpacity style={{ flex: 1 }}>
                        <Image
                            style={{ flex: 1, resizeMode: 'contain', tintColor: 'black' }}
                            source={require('../assets/search.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <TouchableOpacity
                    style={[{ borderWidth: 1, backgroundColor: '#00BDD61A', borderRadius: 10, width: 100, height: 45, justifyContent: 'center', alignItems: 'center' }, selected == 1 ? { borderWidth: 3, backgroundColor: '#00BDD6' } : null]}
                    onPress={() => changeSelect(1)}
                >
                    <Text style={[{ fontSize: 16, fontWeight: 500 }, selected == 1 ? { fontWeight: 700 } : null]}> Long term</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[{ borderWidth: 1, backgroundColor: '#00BDD61A', borderRadius: 10, width: 100, height: 45, justifyContent: 'center', alignItems: 'center' }, selected == 2 ? { borderWidth: 3, backgroundColor: '#00BDD6' } : null]}
                    onPress={() => changeSelect(2)}
                >
                    <Text style={[{ fontSize: 16, fontWeight: 500 }, selected == 2 ? { fontWeight: 700 } : null]}> Short term</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 5, paddingHorizontal: 10, backgroundColor: 'white' }}>
                <FlatList
                    // data={[{},{},{}]}
                    data={arrViewNote}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                style={[{
                                    height: 45, flexDirection: 'row', justifyContent: 'space-between', padding: 10, marginBottom: 10, borderWidth: 1, borderRadius: 10,
                                    backgroundColor: '#D9D9D9'
                                }, setMau(item.priority)]}
                            >
                                <Text style={{ fontSize: 16, fontWeight: 400 }}>{item.name}</Text>
                            </TouchableOpacity>
                        )

                    }}
                />
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <TouchableOpacity style={{
                    justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30, paddingVertical: 10,
                    borderWidth: 1, borderRadius: 10, backgroundColor: '#00BDD6'
                }}>
                    <Text style={{ fontSize: 20, fontWeight: 700, color: 'white' }}>Add Note</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}