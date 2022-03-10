import { Player, Controls } from './lottie-react.js';
import './App.css';

function PlayerControls() {
    return (
        <div className="App">
            <div id='container-one'>
                <Player
                    id="player-one"
                    loop
                    src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
                    style={{ height: '300px', width: '300px' }}>
                    <Controls visible={true} buttons={['play', 'stop', 'repeat', 'frame']} />
                </Player>

            </div>
            <div id='container-two'>
                <Player
                    autoplay
                    id="player-two"
                    loop
                    src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
                    style={{ height: '300px', width: '300px' }}>
                    <Controls visible={true} buttons={['play', 'stop', 'repeat', 'frame']} />
                </Player>
            </div>

            <div id='container-three'>
                <Player
                    autoplay
                    id="player-three"
                    loop
                    src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
                    style={{ height: '300px', width: '300px' }}>
                    <Controls visible={true} buttons={['play', 'stop', 'repeat', 'frame']} />
                </Player>
            </div>

            <div id='container-four'>
                <Player
                    autoplay
                    id="player-four"
                    src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
                    style={{ height: '300px', width: '300px' }}>
                    <Controls visible={true} buttons={['play', 'stop', 'repeat', 'frame']} />
                </Player>
            </div>

            {/* <div id='container-five'>
                <Player
                    autoplay
                    id="player-five"
                    loop
                    src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
                    style={{ height: '300px', width: '300px' }}>
                    <Controls visible={true} buttons={['play', 'stop', 'repeat', 'frame']} />
                </Player>
            </div> */}
        </div>
    );
}

export default PlayerControls;
