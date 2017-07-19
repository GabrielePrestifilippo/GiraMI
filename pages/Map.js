import React, {Component} from "react";
import {Alert, View, Text, WebView, Button, StyleSheet, ToastAndroid, TouchableHighlight} from "react-native";
import MyButton from "../components/HomeButton";

import {points, getDistance} from "../components/Helper"
import I18n from "../components/Languages";
const Permissions = require('react-native-permissions');


export default class Map extends React.Component {


    state = {
        messagesReceivedFromWebView: null,
        message: "Null",
        myMessage: "not set yet",
        myPoint: {info: null},
        questAvailable: false,
        visible: false,
    };

    navigation = this.props.navigation;


    _requestPermission() {
        Permissions.requestPermission('location')
            .then(response => {
                if (response !== "authorized") {
                    console.log("not authorized");

                }
                this.setState({location: response})
            });
    }

    askPermission = () => {
        Alert.alert(
            'Can I access your location?',
            'I need access so you can play with the game',
            [
                {text: 'No, sorry', onPress: () => console.log('permission denied'), style: 'cancel'},
                this.state.location == 'undetermined' ?
                    {text: 'OK', onPress: this._requestPermission.bind(this)}
                    : {text: 'Open Settings', onPress: Permissions.openSettings}
            ]
        )
    };


    positionChange = (position) => {

        if (!this.state.position) {
            var initialPosition = JSON.stringify(position);
            var message = {position: initialPosition};
            this.postMessage(JSON.stringify(message));
            this.setState({position: initialPosition});
        }

        var lastPosition = position.coords;
        this.setState({position: lastPosition});
        this.postMessage(JSON.stringify({position: lastPosition}));

        var point = undefined;
        var self = this;
        points.some(function (p, index) { //check if we are close to a point and return it
            //if(self.props.history && self.props.history[index + 1] == undefined){
                var d = getDistance(p.lat, p.lon, lastPosition.latitude, lastPosition.longitude);
                if (d < 100) {//limit distance
                    point = p;
                    self.setState({myPoint: p});
                    return;
                } else {
                    self.setState({questAvailable: false});
                }
           // }
        });

        if (point) {

            if (point.noQuest) {
                this.setState({noQuest: true});
            }

            if (point.hidden) {
                this.setState({questAvailable: point});
                this.props.onQuestAvailable(point, true);
            } else {
                this.setState({questAvailable: point});
                this.props.onQuestAvailable(point, false);
            }
        }
    };

    componentDidMount() {

        if (this.state.position) {
            var initialPosition = JSON.stringify(position);
            var message = {position: initialPosition};
            this.postMessage(JSON.stringify(message));
        }

        Permissions.getPermissionStatus('location')
            .then(response => {
                if (response !== "authorized") {
                    alert("not authorized, now i request");
                    this.askPermission();
                }
                this.setState({location: response})
            });

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.positionChange(position);
            },
            (error) => console.log(JSON.stringify(error)),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        if (!this.state.position) {
            ToastAndroid.showWithGravity(I18n.t('lookingPosition'), ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
        this.watchID = navigator.geolocation.watchPosition((position) => {
                this.positionChange(position);
            }, (error) => console.log(JSON.stringify(error)),
            {enableHighAccuracy: false, distanceFilter: 1, timeout: 1000});

        setTimeout(() => this.props.onLoaded(), 3000);


    }


    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    surpriseQuest = (point) => {
        this.setState({myPoint: point});
    };

    startQuest = (point) => {
        this.props.onStartQuest(point);
    };


    onMessage = e => {
        var event = JSON.parse(e.nativeEvent.data);
        if (event.ready) {
            this.props.onLoaded();
        } else if (event.navigate) {
            this.props.onNavigate();
        }
    };

    postMessage = (m) => {
        if (this.webview && m) {
            this.webview.postMessage(m);
        }
    };

    renderQuestStart() {
        if (this.state.questAvailable) {

            if (this.state.noQuest) {
                return ( <MyButton style={styles.startButton} text={I18n.t('newInfo')} onPress={() => {
                    this.startQuest(this.state.questAvailable)
                }}/>);
            } else {
                return ( <MyButton style={styles.startButton} text={I18n.t('newQuest')} onPress={() => {
                    this.startQuest(this.state.questAvailable)
                }}/>);
            }
        } else {
            return <Text>{I18n.t('noQuest')}</Text>
        }
    };

    webview = null;

    render() {
        return (
            <View style={styles.container}>
                <WebView
                    ref={webview => {
                        this.webview = webview;
                    }}
                    style={styles.map}
                    javaScriptEnabled={true}
                    source={require('./map.html')}
                    /*source={{ uri: 'file:///android_asset/pages/map.html' }}*/
                    onMessage={this.onMessage}
                    onLoadEnd={() => {
                        var message = {points: points, history: this.props.history};
                        this.postMessage(JSON.stringify(message));
                    }
                    }
                />

                <View style={styles.bottomStyle}>
                    {this.renderQuestStart()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        marginTop: 0,
        padding: 0,
        flexDirection: 'column',
    },
    textHeader: {
        color: '#254117',
        fontSize: 20,
        fontFamily: "TanglewoodTalesNF",
        textAlign: 'center',
        alignSelf: 'center',
        marginLeft: -56,
    },
    map: {
        flex: 0.85,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        backgroundColor: 'transparent',

    },
    bottomStyle: {
        flex: 0.15,
        alignSelf: 'center'
    },
    header: {
        position: 'absolute',
        backgroundColor: 'transparent',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0
    },
    startButton: {
        alignSelf: 'center'
    }

});
