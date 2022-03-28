import { Player, Controls } from './lottie-react.js';
import './App.css';

function Home() {
    return (
        <div className="App">
            <Player
                autoplay
                id="player-one"
                loop
                src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
                style={{ height: '300px', width: '300px' }}>
                <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
            <Player
                autoplay
                id="player-two"
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
                src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
                style={{ height: '300px', width: '300px' }}>
                <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>

        </div>
    );
}

export default Home;
