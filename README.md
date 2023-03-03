```js
import RNFR from 'react-native-file-reader';
```

```js
const res = await RNFR.getFile({
    multiple: true,// default false
    types: ["all"] // "zip", "pdf", ...
}); // base64
```

```js
const res = await RNFR.readFile(path); // base64
```

```js
const res = await RNFR.readDir(path);
```

```js
const res = await RNFR.saveFile(contents, path); // base64
```

```js
const res = await RNFR.saveDir(path);
```

```js
const res = await RNFR.removeDir(path);
```

```js
const res = await RNFR.unzip(path);
```
