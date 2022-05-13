import { Player, Controls } from '@lottiefiles/react-lottie-player';
import './App.css';

function Properties() {
    return (
        <div className="App">
            <Player
                id="player-one"
                loop
                autoplay
                background='#00ff6b'
                src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                style={{ height: '300px', width: '300px' }}>
                <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
            <Player
                autoplay
                id="player-two"
                speed="5"
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
                loop
                hover={true}
                src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                style={{ height: '300px', width: '300px' }}>
                <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Player>
        </div>
    );
}

export default Properties;
