import React, {
    Component,
} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Loading from './components/Loading';
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
} from 'react-native-router-flux';

import TabIcon from './components/TabIcon';
import Places from './pages/Places';
import Game from './pages/Game';
import Information from './pages/Information';
import InfoPlace from './pages/InfoPlace';
import Icon from 'react-native-vector-icons/EvilIcons';
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: '#dd1834',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#ddd',
    },
    indicator: {
        backgroundColor: 'white',
    },
    leftIcon: {
        fontSize: 38,
        color: '#ffffff',
        padding: 10,
        alignSelf: 'flex-start'
    },
});

const reducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        console.log('ACTION:', action);
        return defaultReducer(state, action);
    };
};
const getSceneStyle = () => ({
    backgroundColor: 'white',
    shadowOpacity: 1,
    shadowRadius: 3,
});


const App = () => {

    this.state = {};
    updateState = function (state) {
        this.state = state;
    };
    leftButton = function () {
        return (
            <Icon style={styles.leftIcon} name={'chevron-left'}
                  onPress={ () => Actions.pop}
            />);
    }
    return (
        <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
            <Scene key="root"                    navigationBarStyle={{backgroundColor: '#dd1834'}}
                   tabBarStyle={styles.tabBarStyle}>

                <Scene key="Loading" updateState={updateState.bind(this)} back component={Loading}
                       title="Loading" hideNavBar initial/>
                <Scene
                    tabBarPosition={'bottom'}
                    key="Home"
                    gestureEnabled={false}
                    tabs
                    lazy
                    hideNavBar
                    activeBackgroundColor='#ddd'
                    indicatorStyle={ styles.indicator }
                >
                    <Scene
                        key="Game"
                        title="City"
                        tabBarLabel="City"
                        icon={TabIcon}
                        lazy
                        component={Game}
                        updateState={updateState.bind(this)}
                        titleStyle={{color: 'white'}}
                    >

                    </Scene>
                    <Scene key="Points" titleStyle={{color: 'white'}}
                           title="Points" icon={TabIcon}>
                        <Scene
                            key="pointsPage"
                            component={Places}
                            title="Points"
                            lazy
                            type={ActionConst.REFRESH}
                            state={this.state}
                            on={() => {
                                Actions.refresh({state: this.state})
                            }}

                        />
                        <Scene
                            key="infoPlace"
                            component={InfoPlace}

                            renderLeftButton={() => {
                                leftButton()
                                //yarn add https://github.com/aksonov/react-native-router-flux.git#d4fff5036653e723a697f8ab28d0ce9ee387ffb8

                            }}

                            leftButtonStyle={{color:"#fff"}}
                            title="Point"
                        />
                    </Scene>
                    <Scene
                        key="Info"
                        titleStyle={{color: 'white'}}
                        component={Information}
                        title="Info"
                        icon={TabIcon}/>
                </Scene>
            </Scene>
        </Router>
    );
}

export default App;
