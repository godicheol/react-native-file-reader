```js
import RNFR from 'react-native-file-reader';
```

```js
const res = await RNFR.pickFile({
    multiple: true,// default false
    types: ["all"] // "zip", "pdf", ...
}); // base64
```

```js
const res = await RNFR.getFile(path); // base64
```

```js
const res = await RNFR.getDir(path);
```

```js
const res = await RNFR.saveFile(data, path); // base64
```

```js
const res = await RNFR.saveDir(path);
```

```js
const res = await RNFR.removeDir(path);
```

```js
const res = await RNFR.unzip(path);
if (res[0].isDirectory()) {
    await res[0].extract();
    const {data, size} = res[0].children[0];
}
```

```js
const res = await RNFR.unzip2(path);
// {"\.": { children: [File, File, File] } };
await res["\."].extract();
const {data, size} = res["\."].children[0];
```


## Acknowledgements
- [react-native-document-ficker](https://www.npmjs.com/package/react-native-document-picker)
- [react-native-fs](https://www.npmjs.com/package/react-native-fs)
- [jszip](https://www.npmjs.com/package/jszip)