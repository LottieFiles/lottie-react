import { Player, Controls } from './lottie-react.js';
import './App.css';

function Properties() {
    return (
        <div className="App">
            <Player
                id="player-one"
                loop
                autoplay
                background='#00ff6b'
                src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
                style={{ height: '300px', width: '300px' }}>
                <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
            <Player
                autoplay
                id="player-two"
                speed="5"
                loop
                src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
                style={{ height: '300px', width: '300px' }}>
                <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
            <Player
                autoplay
                id="player-three"
                loop
                src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
                style={{ height: '300px', width: '300px' }}>
                <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
            <Player
                id="player-four"
                loop
                hover={true}
                src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
                style={{ height: '300px', width: '300px' }}>
                <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
        </div>
    );
}

export default Properties;
