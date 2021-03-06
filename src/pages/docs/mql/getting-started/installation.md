---
title: 'Installation'
---

**MQL** is available as [npm package](https://www.npmjs.com/package/@microlink/react):

```bash
npm install @microlink/mql --save
```

It has been designed to be consumed in different ways, one of the most common being from **Node.js** using **CommonJS**:

```js
const mql = require('@microlink/mql')

const { data } = await mql('https://kikobeats.com', {
  data: {
    avatar: {
      selector: '#avatar',
      type: 'image',
      attr: 'src'
    }
  }
})

console.log(`The avatar URL is '${data.avatar.url}' (${data.avatar.size_pretty})`)
```

It's ready to be consumed as **ESM**:

```js
import mql from '@microlink/mql'

const { data } = await mql('https://kikobeats.com', {
  data: {
    avatar: {
      selector: '#avatar',
      type: 'image',
      attr: 'src'
    }
  }
})

console.log(`The avatar URL is '${data.avatar.url}' (${data.avatar.size_pretty})`)
```

Last but not least, it can be loaded as **UMD** in any browser:

```html
<script src="https://cdn.jsdelivr.net/npm/@microlink/mql@latest/dist/mql.min.js"></script>
<script>
  mql('https://kikobeats.com', {
    data: {
      avatar: {
        selector: '#avatar',
        type: 'image',
        attr: 'src',
      }
    }
  }).then(({data}) => {
    console.log(`The avatar URL is '${data.avatar.url}' (${data.avatar.size_pretty})`)
  })
</script>
```

I case you need to consume it using UMD, keep in mind the [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) dependency is not included with the build bundle.

Although it's [widely supported](https://caniuse.com/#feat=fetch), we recommend use [polyfill.io](https://polyfill.io/v3/) CDN for that purpose, it will only load polyfill if fetch is not globally detected.

```html
<script>
  crossorigin="anonymous"
  src="https://polyfill.io/v3/polyfill.min.js?features=fetch">
</script>
```
