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

import TabView from './components/TabView';
import TabIcon from './components/TabIcon';
import Places from './pages/Places';
import Game from './pages/Game';
import Information from './pages/Information';
import InfoPlace from './pages/InfoPlace';

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
    }
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
    this.state = {init: true};

    updateState = function (state) {
        this.state = state;
    };

    return (
        <Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
            <Scene key="drawer" drawer contentComponent={TabView}>
                <Scene key="Loading" updateState={updateState.bind(this)} hideNavBar hideTabBar component={Loading}
                       title="Loading" initial/>

                <Scene
                    tabBarPosition={'bottom'}
                    key="Home"
                    gestureEnabled={false}
                    tabs
                    lazy
                    tabBarStyle={styles.tabBarStyle}
                    activeBackgroundColor='#ddd'
                    indicatorStyle={ styles.indicator }

                >
                    <Scene
                        key="City"
                        title="City"
                        tabBarLabel="City"
                        icon={TabIcon}
                        titleStyle={{color: 'white'}}
                        navigationBarStyle={{backgroundColor: '#dd1834'}}

                    >
                        <Scene
                            key="Game"
                            component={Game}
                            title="City"
                            updateState={updateState.bind(this)}
                            lazy
                            rightTitle="Close"
                        />
                    </Scene>
                    <Scene key="Points" titleStyle={{color: 'white'}} navigationBarStyle={{backgroundColor: '#dd1834'}}
                           title="Points" icon={TabIcon}>
                        <Scene
                            key="pointsPage"
                            component={Places}
                            title="Points"
                            updateState={updateState.bind(this)}
                            type={ActionConst.REFRESH}
                            state={this.state}
                            on={() => {
                                Actions.refresh({state: this.state})
                            }}
                        />
                        <Scene
                            key="infoPlace"
                            component={InfoPlace}
                            leftTitle="Cancel" onLeft={Actions.pop}
                            title="Point"
                        />
                    </Scene>
                    <Scene
                        key="Info"
                        titleStyle={{color: 'white'}}
                        navigationBarStyle={{backgroundColor: '#dd1834'}}
                        component={Information}
                        title="Info"
                        icon={TabIcon}/>

                </Scene>
            </Scene>
        </Router>
    );
}

export default App;
