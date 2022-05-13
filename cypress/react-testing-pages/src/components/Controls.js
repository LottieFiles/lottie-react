import { Player, Controls } from '@lottiefiles/react-lottie-player';
import './App.css';

function PlayerControls() {
    return (
        <div className="App">
            <div id='container-one'>
                <Player
                    id="player-one"
                    loop
                    src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                    style={{ height: '300px', width: '300px' }}>
                    <Controls visible={true} buttons={['play', 'stop', 'repeat', 'frame']} />
                </Player>

            </div>
            <div id='container-two'>
                <Player
                    autoplay
                    id="player-two"
                    loop
                    src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                    style={{ height: '300px', width: '300px' }}>
                    <Controls visible={true} buttons={['play', 'stop', 'repeat', 'frame']} />
                </Player>
            </div>

            <div id='container-three'>
                <Player
                    autoplay
                    id="player-three"
                    loop
                    src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                    style={{ height: '300px', width: '300px' }}>
                    <Controls visible={true} buttons={['play', 'stop', 'repeat', 'frame']} />
                </Player>
            </div>

            <div id='container-four'>
                <Player
                    autoplay
                    id="player-four"
                    src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                    style={{ height: '300px', width: '300px' }}>
                    <Controls visible={true} buttons={['play', 'stop', 'repeat', 'frame']} />
                </Player>
            </div>

            {/* <div id='container-five'>
                <Player
                    autoplay
                    id="player-five"
                    loop
                    src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                    style={{ height: '300px', width: '300px' }}>
                    <Controls visible={true} buttons={['play', 'stop', 'repeat', 'frame']} />
                </Player>
            </div> */}
        </div>
    );
}

export default PlayerControls;
