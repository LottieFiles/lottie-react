import React from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import './App.css';

class Methods extends React.Component {
    constructor(props) {
        super(props);

        this.pOneRef = React.createRef(null);
        this.pTwoRef = React.createRef(null);
        this.pThreeRef = React.createRef(null);
        this.pFourRef = React.createRef(null);
        this.pFiveRef = React.createRef(null);
    }

    playFirstAnimation() {
        this.pOneRef.current.play();
        // Method doesn't exist
        // this.pTwoRef.current.loop();
    }

    speedUpAnimation() {
        this.pThreeRef.current.setPlayerSpeed(5);
    }

    pauseAnimation() {
        this.pFiveRef.current.pause();
    }

    render() {
        return (
            <div className="App">
                <div id="container-one">
                    <Player
                        ref={this.pOneRef}
                        onEvent={event => {
                            if (event === 'load') this.playFirstAnimation();
                        }}
                        id="player-one"
                        loop
                        src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                        style={{ height: '300px', width: '300px' }}>
                        <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
                    </Player>
                </div>

                <div id="container-two">
                    <Player
                        ref={this.pTwoRef}
                        autoplay
                        id="player-two"
                        loop
                        src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                        style={{ height: '300px', width: '300px' }}>
                        <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
                    </Player>
                </div>

                <div id="container-three">
                    <Player
                        ref={this.pThreeRef}
                        onEvent={event => {
                            if (event === 'load') this.speedUpAnimation();
                        }}
                        autoplay
                        id="player-three"
                        loop
                        src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                        style={{ height: '300px', width: '300px' }}>
                        <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
                    </Player>
                </div>

                <div id="container-four">
                    <Player
                        ref={this.pFourRef}
                        autoplay
                        id="player-four"
                        loop
                        src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                        style={{ height: '300px', width: '300px' }}>
                        <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
                    </Player>
                </div>

                <div id="container-five">
                    <Player
                        ref={this.pFiveRef}
                        onEvent={event => {
                            if (event === 'load') this.pauseAnimation();
                        }}
                        autoplay
                        id="player-five"
                        loop
                        src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                        style={{ height: '300px', width: '300px' }}>
                        <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
                    </Player>
                </div>
            </div>
        );
    }
}

export default Methods;
