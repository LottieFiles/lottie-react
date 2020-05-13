## LottiePlayer React Component

This is a React component for the Lottie Web Player

[![npm](https://img.shields.io/npm/v/@lottiefiles/lottie-react.svg)](https://www.npmjs.com/package/@lottiefiles/lottie-react)

## Demo

![screencast](https://i.imgur.com/miLzIkJ.gif)

## Documentation

- [View documentation](https://lottiefiles.github.io/lottie-react/)

#### In Javascript or TypeScript:

1. Install package using npm or yarn.

```shell
npm install --save @lottiefiles/lottie-react
```

2. Import package in your code.

```javascript
import { Player } from '@lottiefiles/lottie-react';
```

## Usage

### Player component

Add the element `Player` and set the `src` property to a URL pointing to a valid Lottie JSON.

```javascript
<Player
  autoplay={true}
  controls={true}
  loop={true}
  src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
  style={{ height: '300px', width: '300px' }}
></Player>
```

## Properties

| Property           | Attribute    | Description                         | Type               | Default     |
| ------------------ | ------------ | ----------------------------------- | ------------------ | ----------- |
| `autoplay`         | `autoplay`   | Autoplay animation on load.         | `boolean`          | `false`     |
| `background`       | `background` | Background color.                   | `string`           | `undefined` |
| `controls`         | `controls`   | Show controls.                      | `boolean`          | `false`     |
| `direction`        | `direction`  | Direction of animation.             | `number`           | `1`         |
| `hover`            | `hover`      | Whether to play on mouse hover.     | `boolean`          | `false`     |
| `loop`             | `loop`       | Whether to loop animation.          | `boolean`          | `false`     |
| `renderer`         | `renderer`   | Renderer to use.                    | `"svg" | "canvas"` | `'svg'`     |
| `speed`            | `speed`      | Animation speed.                    | `number`           | `1`         |
| `style`            | `style`      | The style for the container.        | `object`           | `undefined` |
| `src` _(required)_ | `src`        | Bodymovin JSON data or URL to JSON. | `string`           | `undefined` |

## Get Player instance

To call methods on the instance of the Player component. you may get a reference to the component and call the methods
on ref.current. This is esentially reacts way of doing a document.getElementById();

```javascript
// use effect allows us to check if the reference is null on re render. see react docs.
useEffect(() => {
  ref.current.play(); // an example of calling a method by using the reference to the component
}, [ref.current]); // condition to null check the reference to the component

<Player
  ref={ref}
  autoplay={true}
  controls={true}
  loop={true}
  src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
  style={{ height: '300px', width: '300px' }}
></Player>;
```

## Get Lottie instance

The lottieRef prop returns the Lottie instance which you can use to set data and call methods as described in the
bodymovin documentation.

```javascript
const [lottie, setLottie] = useState(null); // set a variable to your components state.

<LottiePlayer
  lottieRef={instance => {
    setLottie(instance); // use a callback function and utilize the lottieRef prop to grab the instance to the lottie object
  }}
  autoplay={true}
  controls={true}
  loop={true}
  src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
  style={{ height: '300px', width: '300px' }}
></LottiePlayer>;
```

## Methods

### `pause() => void`

Pause animation play.

#### Returns

Type: `void`

### `play() => void`

Start playing animation.

#### Returns

Type: `void`

### `setPlayerDirection(value: number) => void`

Animation play direction.

#### Parameters

| Name    | Type     | Description       |
| ------- | -------- | ----------------- |
| `value` | `number` | Direction values. |

#### Returns

Type: `void`

### `setPlayerSpeed(value?: number) => void`

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

### `setSeeker(value: number | string) => void`

Seek to a given frame. Frame value can be a number or a percent string (e.g. 50%).

#### Returns

Type: `void`

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

## License

MIT License © LottieFiles.com
