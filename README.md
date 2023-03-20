## LottiePlayer React Component

This is a React component for the Lottie Web Player

## Demo

![screencast](https://i.imgur.com/miLzIkJ.gif)

## Documentation

- [View documentation](https://docs.lottiefiles.com/lottie-player/components/lottie-react)

#### In Javascript or TypeScript:

1. Install package using npm or yarn.

```shell
npm install --save @lottiefiles/react-lottie-player
```

2. Import package in your code.

```javascript
import { Player, Controls } from '@lottiefiles/react-lottie-player';
```

## Example/Development

1. Clone repo

2. run yarn install

3. run yarn storybook

```shell
yarn storybook
```

## Usage

### Player component

Add the element `Player` and set the `src` prop to a URL pointing to a valid Lottie JSON.

```javascript
<Player
  autoplay
  loop
  src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
  style={{ height: '300px', width: '300px' }}
>
  <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} />
</Player>
```

## Props

| Prop                 | Description                                                            | Type               | Default     |
| -------------------- | ---------------------------------------------------------------------- | ------------------ | ----------- |
| `lottieRef`          | Get lottie animation object                                            | `function`         | `undefined` |
| `onEvent`            | Listen for events                                                      | `function`         | `undefined` |
| `onStateChange`      | Play state changes                                                     | `function`         | `undefined` |
| `onBackgroundChange` | Listen for bg changes                                                  | `function`         | `undefined` |
| `autoplay`           | Autoplay animation on load.                                            | `boolean`          | `false`     |
| `background`         | Background color.                                                      | `string`           | `undefined` |
| `controls`           | Show controls.                                                         | `boolean`          | `false`     |
| `direction`          | Direction of animation.                                                | `number`           | `1`         |
| `hover`              | Whether to play on mouse hover.                                        | `boolean`          | `false`     |
| `keepLastFrame`      | Stop animation on the last frame.</br>Has no effect if `loop` is true. | `boolean`          | `false`     |
| `loop`               | Whether to loop animation.                                             | `boolean`          | `false`     |
| `renderer`           | Renderer to use.                                                       | `"svg" | "canvas"` | `'svg'`     |
| `speed`              | Animation speed.                                                       | `number`           | `1`         |
| `style`              | The style for the container.                                           | `object`           | `undefined` |
| `src` _(required)_   | Bodymovin JSON data or URL to JSON.                                    | `object` | `string`| `undefined` |

## Get Player instance

To call methods on the instance of the Player component. you may get a reference to the component and call the methods
on ref.current. This is esentially reacts way of doing a document.getElementById(); You may then use this ref ie: player
in the example below to call methods that are described in this documentation. See ref in
[react documentation](https://reactjs.org/docs/refs-and-the-dom.html)

```javascript
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef(); // initialize your ref
  }
  render() {
    return (
      <Player
        ref={this.player} // set the ref to your class instance
        autoplay={false}
        loop={true}
        controls={true}
        src="https://assets3.lottiefiles.com/packages/lf20_XZ3pkn.json"
        style={{ height: '300px', width: '300px' }}
      ></Player>
    );
  }
}

export default App;
```

## Get Lottie instance

The lottieRef prop returns the Lottie instance which you can use to set data and call methods as described in the
[bodymovin documentation](https://github.com/airbnb/lottie-web).

```javascript
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lottie: null }; // initialize your state
  }

  render() {
    return (
      <Player
        lottieRef={instance => {
          this.setState({ lottie: instance }); // the lottie instance is returned in the argument of this prop. set it to your local state
        }}
        autoplay={false}
        loop={true}
        controls={true}
        src="https://assets3.lottiefiles.com/packages/lf20_XZ3pkn.json"
        style={{ height: '300px', width: '300px' }}
      ></Player>
    );
  }
}

export default App;
```

## Listening for events

```javascript
import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }

  doSomething() {
    this.player.current.play(); // make use of the player and call methods
  }

  render() {
    return (
      <Player
        onEvent={event => {
          if (event === 'load') this.doSomething(); // check event type and do something
        }}
        ref={this.player}
        autoplay={false}
        loop={true}
        controls={true}
        src="https://assets3.lottiefiles.com/packages/lf20_XZ3pkn.json"
        style={{ height: '300px', width: '300px' }}
      ></Player>
    );
  }
}

export default App;
```

## Events

The following events are exposed and can be listened to via `addEventListener` calls.

| Name       | Description                                                               |
| ---------- | ------------------------------------------------------------------------- |
| `load`     | Animation data is loaded.                                                 |
| `error`    | An animation source cannot be parsed, fails to load or has format errors. |
| `ready`    | Animation data is loaded and player is ready.                             |
| `play`     | Animation starts playing.                                                 |
| `pause`    | Animation is paused.                                                      |
| `stop`     | Animation is stopped.                                                     |
| `freeze`   | Animation is paused due to player being invisible.                        |
| `loop`     | An animation loop is completed.                                           |
| `complete` | Animation is complete (all loops completed).                              |
| `frame`    | A new frame is entered.                                                   |

## Methods

### `pause() => void`

Pause animation play.

#### Returns

Type: `void`

### `play() => void`

Start playing animation.

#### Returns

Type: `void`

### `setPlayerDirection(direction: 1 | -1 ) => void`

Animation play direction.

#### Parameters

| Name    | Type     | Description       |
| ------- | -------- | ----------------- |
| `value` | `number` | Direction values. |

#### Returns

Type: `void`

### `setPlayerSpeed(speed?: number) => void`

Sets animation play speed.

#### Parameters

| Name    | Type     | Description     |
| ------- | -------- | --------------- |
| `value` | `number` | Playback speed. |

#### Returns

Type: `void`

### `stop() => void`

Stops animation play.

#### Returns

Type: `void`

### `setSeeker(frame: number, play: boolean) => void`

Seek to a given frame.

#### Returns

Type: `void`

## Contributing

We use changesets to maintain a changelog for this repository. When making any change to the codebase that impacts functionality or performance we require a changeset to be present.

To add a changeset run:

```
yarn run changeset
```

And select the type of version bump you'd like (major, minor, path).

You can document the change in detail and format it properly using Markdown by opening the ".md" file that the "yarn changeset" command created in the ".changeset" folder. Open the file, it should look something like this:

```
---
"@lottiefiles/pkg1": minor
"@lottiefiles/pkg2": major
---

This is where you document your **changes** using Markdown.

- You can write
- However you'd like
- In as much detail as you'd like

Aim to provide enough details so that team mates and future you can understand the changes and the context of the change.
```

You can commit your changes and the changeset to your branch and then create a pull request on the develop branch.

## License

MIT License © LottieFiles.com
