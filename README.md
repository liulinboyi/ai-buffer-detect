## Machine Learning Buffer-Detect


> A machine learning for buffer file encoding detect


```shell
npm i ai-buffer-detect
```

```js
const { detect, ENCODING } = require('ai-buffer-detect')
const fs = require('fs')
const path = require('path')

void async function () {
    let res = await detect(fs.readFileSync(path.resolve(__dirname, 'file')))
    console.log(ENCODING.UTF8)
}()

```

## TODO
Article
