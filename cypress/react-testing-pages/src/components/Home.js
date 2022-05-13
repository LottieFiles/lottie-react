import { Player, Controls } from '@lottiefiles/react-lottie-player';
import './App.css';

function Home() {
    return (
        <div className="App">
            <Player
                autoplay
                id="player-one"
                loop
                src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                style={{ height: '300px', width: '300px' }}
                >
                <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
            <Player
                autoplay
                id="player-two"
                loop
                src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                style={{ height: '300px', width: '300px' }}>
                <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
            <Player
                autoplay
                id="player-three"
                loop
                src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                style={{ height: '300px', width: '300px' }}>
                <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
            <Player
                id="player-four"
                src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                style={{ height: '300px', width: '300px' }}>
                <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
        </div>
    );
}

export default Home;
