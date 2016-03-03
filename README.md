# ta-platform-utils

Platform utils for node.js and the browser.

## Install

```shell
npm i ta-platform-utils
```

## Usage

Here's the gist, take a look at the codebase for more.  First import it:

```js
import utils from 'ta-platform-utils'
```

### Regex

See `/regex` for more.

```js
import { regex } from 'ta-platform-utils'

const password = 'kfK52k*s0h$42xC0'
const validPassword = regex.password.test(password)
//=> true
```

### Enums

See `/enums` for more.

```js
import { enums } from 'ta-platform-utils'

const stateOptions = utils.enums.states.map(state => ({
  text: state.name,
  value: state.abbrev,
}))

//=> [{ text: 'California', value: 'CA' }, ...{}]
```

## Contribute

1. Clone this repo
1. Create a branch
1. Make changes to `/src`
1. Run a build `npm run build`, to make sure your changes check out.
1. Open a PR

### Releasing

On the latest clean `master`:

    npm run release:major
    npm run release:minor
    npm run release:patch
