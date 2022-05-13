import { Player, Controls } from '@lottiefiles/react-lottie-player';
import './App.css';

function Load() {
    return (
        <div className="App">
            <div id="container-one">
                <Player
                    autoplay
                    id="player-one"
                    loop
                    src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                    style={{ height: '300px', width: '300px' }}>
                    <Controls visible={true} buttons={['play', 'stop', 'repeat', 'frame']} />
                </Player>
            </div>

            <div id="container-two">
                <Player
                    autoplay
                    id="player-two"
                    loop
                    src="''"
                    style={{ height: '300px', width: '300px' }}>
                </Player>
            </div>

            <div id="container-three">
                <Player
                    autoplay
                    id="player-three"
                    loop
                    src="https://abcdefmsddnsdds.com/no_json_here"
                    style={{ height: '300px', width: '300px' }}>
                </Player>
            </div>

            <div id="container-four">
                <Player
                    id="player-four"
                    src={process.env.PUBLIC_URL + '/animation.lottie.json'}
                    style={{ height: '300px', width: '300px' }}>
                </Player>
            </div>
        </div>
    );
}

export default Load;
