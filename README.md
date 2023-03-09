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
const res = await RNFR.isDir(path);
const res = await RNFR.isFile(path);
const res = await RNFR.getStat(path);
const res = await RNFR.getFile(path); // base64
const res = await RNFR.getDir(path);
const res = await RNFR.saveFile(data, path); // base64
const res = await RNFR.moveFile(src, dst);
const res = await RNFR.copyFile(src, dst);
const res = await RNFR.removeFile(path);
const res = await RNFR.saveDir(path);
const res = await RNFR.moveDir(src, dst);
const res = await RNFR.copyDir(src, dst);
const res = await RNFR.removeDir(path);
const res = await RNFR.unzip(base64);
```

## Acknowledgements
- [react-native-document-ficker](https://www.npmjs.com/package/react-native-document-picker)
- [react-native-fs](https://www.npmjs.com/package/react-native-fs)
- [jszip](https://www.npmjs.com/package/jszip)