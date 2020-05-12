## lottie-player Web Component

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
import { LottiePlayer } from '@lottiefiles/lottie-react';
```

## Usage

### Lottie-Player

Add the element `lottie-player` and set the `src` property to a URL pointing to a valid Bodymovin JSON.

```javascript
<LottiePlayer
	autoplay={true}
	controls={true}
	loop={true}
	src="https://assets3.lottiefiles.com/packages/lf20_UJNc2t.json"
	style={{ height: '300px', width: '300px' }}
></LottiePlayer>
```

## Properties

| Property              | Attribute             | Description                         | Type                                 | Default           |
| --------------------- | --------------------- | ----------------------------------- | ------------------------------------ | ----------------- |
| `autoplay`            | `autoplay`            | Autoplay animation on load.         | `boolean`                            | `false`           |
| `background`          | `background`          | Background color.                   | `string`                             | `undefined`       |
| `controls`            | `controls`            | Show controls.                      | `boolean`                            | `false`           |
| `count`               | `count`               | Number of times to loop animation.  | `number`                             | `undefined`       |
| `direction`           | `direction`           | Direction of animation.             | `number`                             | `1`               |
| `hover`               | `hover`               | Whether to play on mouse hover.     | `boolean`                            | `false`           |
| `loop`                | `loop`                | Whether to loop animation.          | `boolean`                            | `false`           |
| `mode`                | `mode`                | Play mode.                          | `PlayMode.Bounce \| PlayMode.Normal` | `PlayMode.Normal` |
| `preserveAspectRatio` | `preserveAspectRatio` | Valid preserve aspect ratio value.  | `string`                             | `'xMidYMid meet'` |
| `renderer`            | `renderer`            | Renderer to use.                    | `"svg" | "canvas"`                   | `'svg'`           |
| `speed`               | `speed`               | Animation speed.                    | `number`                             | `1`               |
| `src` _(required)_    | `src`                 | Bodymovin JSON data or URL to JSON. | `string`                             | `undefined`       |

## Methods

### `getLottie() => Promise<any>`

Returns the instance of lottie player used in the component.

#### Returns

Type: `Promise<any>`

### `load(src: string | object) => void`

Load (and play) a given Bodymovin animation.

#### Parameters

| Name  | Type                 | Description                                                    |
| ----- | -------------------- | -------------------------------------------------------------- |
| `src` | `string` or `object` | URL, or a JSON string or object representing a Bodymovin JSON. |

#### Returns

Type: `void`

### `pause() => void`

Pause animation play.

#### Returns

Type: `void`

### `play() => void`

Start playing animation.

#### Returns

Type: `void`

### `setDirection(value: number) => void`

Animation play direction.

#### Parameters

| Name    | Type     | Description       |
| ------- | -------- | ----------------- |
| `value` | `number` | Direction values. |

#### Returns

Type: `void`

### `setLooping(value: boolean) => void`

Sets the looping of the animation.

#### Parameters

| Name    | Type      | Description                                              |
| ------- | --------- | -------------------------------------------------------- |
| `value` | `boolean` | Whether to enable looping. Boolean true enables looping. |

#### Returns

Type: `void`

### `setSpeed(value?: number) => void`

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

### `seek(value: number | string) => void`

Seek to a given frame. Frame value can be a number or a percent string (e.g. 50%).

#### Returns

Type: `void`

### `snapshot(download?: boolean) => string`

Snapshot the current frame as SVG.
If 'download' argument is boolean true, then a download is triggered in browser.

#### Returns

Type: `string`

### `toggleLooping() => void`

Toggles animation looping.

#### Returns

Type: `void`

### `togglePlay() => void`

Toggle playing state.

#### Returns

Type: `void`

### `resize() => void`

Resize animation stage and elements in response to changes in component.

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

## Styling

| Custom property                           | Description               | Default                |
| ----------------------------------------- | ------------------------- | ---------------------- |
| --lottie-player-toolbar-height            | Toolbar height            | 35px                   |
| --lottie-player-toolbar-background-color  | Toolbar background color  | transparent            |
| --lottie-player-toolbar-icon-color        | Toolbar icon color        | #999                   |
| --lottie-player-toolbar-icon-hover-color  | Toolbar icon hover color  | #222                   |
| --lottie-player-toolbar-icon-active-color | Toolbar icon active color | #555                   |
| --lottie-player-seeker-track-color        | Seeker track color        | #CCC                   |
| --lottie-player-seeker-thumb-color        | Seeker thumb color        | rgba(0, 107, 120, 0.8) |

## License

MIT License © LottieFiles.com
