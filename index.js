import React from 'react';
import {
    Platform,
    PermissionsAndroid
} from 'react-native';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import JSZip from 'jszip';

const DEFAULT_PATH = getPath();
const DEFAULT_ENCODING = "base64";
const DEFAULT_TYPES = [DocumentPicker.types.allFiles];
/*
    DocumentPicker.types.allFiles: All document types
    DocumentPicker.types.images: All image types
    DocumentPicker.types.plainText: Plain text files
    DocumentPicker.types.audio: All audio types
    DocumentPicker.types.pdf: PDF documents
    DocumentPicker.types.zip: Zip files
    DocumentPicker.types.csv: Csv files
    DocumentPicker.types.doc: doc files
    DocumentPicker.types.docx: docx files
    DocumentPicker.types.ppt: ppt files
    DocumentPicker.types.pptx: pptx files
    DocumentPicker.types.xls: xls files
    DocumentPicker.types.xlsx: xlsx files
*/
const DOCUMENT_PICKER_TYPES = {
    all: DocumentPicker.types.allFiles,
    images: DocumentPicker.types.images,
    plainText: DocumentPicker.types.plainText,
    audio: DocumentPicker.types.audio,
    pdf: DocumentPicker.types.pdf,
    zip: DocumentPicker.types.zip,
    csv: DocumentPicker.types.csv,
    doc: DocumentPicker.types.doc,
    docx: DocumentPicker.types.docx,
    ppt: DocumentPicker.types.ppt,
    pptx: DocumentPicker.types.pptx,
    xls: DocumentPicker.types.xls,
    xlsx: DocumentPicker.types.xlsx,
}

function getPath() {
    switch(Platform.OS) {
        case "ios":
            return {
                root: RNFS.MainBundlePath,
                cache: RNFS.CachesDirectoryPath,
                download: RNFS.LibraryDirectoryPath,
            }
        case "android":
            return {
                root: RNFS.DocumentDirectoryPath,
                cache: RNFS.CachesDirectoryPath,
                download: RNFS.DownloadDirectoryPath,
            }
        default:
            throw new Error("operating system not found");
    }
}
function getBase64Size(base64) {
    var l = base64.length - base64.indexOf('\,') + 1;
    var p = (base64.charAt(base64.length - 2) === "\=") ? 2 : ((base64.charAt(base64.length - 1) === "\=") ? 1 : 0);
    return l * 0.75 - p;
}
function parsePath(str) {
    const types = {
        'abs': 'audio/x-mpeg',
        'ai': 'application/postscript',
        'aif': 'audio/x-aiff',
        'aifc': 'audio/x-aiff',
        'aiff': 'audio/x-aiff',
        'aim': 'application/x-aim',
        'art': 'image/x-jg',
        'asf': 'video/x-ms-asf',
        'asx': 'video/x-ms-asf',
        'au': 'audio/basic',
        'avi': 'video/x-msvideo',
        'avx': 'video/x-rad-screenplay',
        'bcpio': 'application/x-bcpio',
        'bin': 'application/octet-stream',
        'bmp': 'image/bmp',
        'body': 'text/html',
        'cdf': 'application/x-cdf',
        'cer': 'application/pkix-cert',
        'class': 'application/java',
        'cpio': 'application/x-cpio',
        'csh': 'application/x-csh',
        'css': 'text/css',
        'dib': 'image/bmp',
        'doc': 'application/msword',
        'dtd': 'application/xml-dtd',
        'dv': 'video/x-dv',
        'dvi': 'application/x-dvi',
        'eot': 'application/vnd.ms-fontobject',
        'eps': 'application/postscript',
        'etx': 'text/x-setext',
        'exe': 'application/octet-stream',
        'gif': 'image/gif',
        'gtar': 'application/x-gtar',
        'gz': 'application/x-gzip',
        'hdf': 'application/x-hdf',
        'hqx': 'application/mac-binhex40',
        'htc': 'text/x-component',
        'htm': 'text/html',
        'html': 'text/html',
        'ief': 'image/ief',
        'jad': 'text/vnd.sun.j2me.app-descriptor',
        'jar': 'application/java-archive',
        'java': 'text/x-java-source',
        'jnlp': 'application/x-java-jnlp-file',
        'jpe': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'js': 'application/javascript',
        'jsf': 'text/plain',
        'json': 'application/json',
        'jspf': 'text/plain',
        'kar': 'audio/midi',
        'latex': 'application/x-latex',
        'm3u': 'audio/x-mpegurl',
        'mac': 'image/x-macpaint',
        'man': 'text/troff',
        'mathml': 'application/mathml+xml',
        'me': 'text/troff',
        'mid': 'audio/midi',
        'midi': 'audio/midi',
        'mif': 'application/x-mif',
        'mov': 'video/quicktime',
        'movie': 'video/x-sgi-movie',
        'mp1': 'audio/mpeg',
        'mp2': 'audio/mpeg',
        'mp3': 'audio/mpeg',
        'mp4': 'video/mp4',
        'mpa': 'audio/mpeg',
        'mpe': 'video/mpeg',
        'mpeg': 'video/mpeg',
        'mpega': 'audio/x-mpeg',
        'mpg': 'video/mpeg',
        'mpv2': 'video/mpeg2',
        'ms': 'application/x-wais-source',
        'nc': 'application/x-netcdf',
        'oda': 'application/oda',
        'odb': 'application/vnd.oasis.opendocument.database',
        'odc': 'application/vnd.oasis.opendocument.chart',
        'odf': 'application/vnd.oasis.opendocument.formula',
        'odg': 'application/vnd.oasis.opendocument.graphics',
        'odi': 'application/vnd.oasis.opendocument.image',
        'odm': 'application/vnd.oasis.opendocument.text-master',
        'odp': 'application/vnd.oasis.opendocument.presentation',
        'ods': 'application/vnd.oasis.opendocument.spreadsheet',
        'odt': 'application/vnd.oasis.opendocument.text',
        'otg': 'application/vnd.oasis.opendocument.graphics-template',
        'oth': 'application/vnd.oasis.opendocument.text-web',
        'otp': 'application/vnd.oasis.opendocument.presentation-template',
        'ots': 'application/vnd.oasis.opendocument.spreadsheet-template',
        'ott': 'application/vnd.oasis.opendocument.text-template',
        'ogx': 'application/ogg',
        'ogv': 'video/ogg',
        'oga': 'audio/ogg',
        'ogg': 'audio/ogg',
        'otf': 'application/x-font-opentype',
        'spx': 'audio/ogg',
        'flac': 'audio/flac',
        'anx': 'application/annodex',
        'axa': 'audio/annodex',
        'axv': 'video/annodex',
        'xspf': 'application/xspf+xml',
        'pbm': 'image/x-portable-bitmap',
        'pct': 'image/pict',
        'pdf': 'application/pdf',
        'pgm': 'image/x-portable-graymap',
        'pic': 'image/pict',
        'pict': 'image/pict',
        'pls': 'audio/x-scpls',
        'png': 'image/png',
        'pnm': 'image/x-portable-anymap',
        'pnt': 'image/x-macpaint',
        'ppm': 'image/x-portable-pixmap',
        'ppt': 'application/vnd.ms-powerpoint',
        'pps': 'application/vnd.ms-powerpoint',
        'ps': 'application/postscript',
        'psd': 'image/vnd.adobe.photoshop',
        'qt': 'video/quicktime',
        'qti': 'image/x-quicktime',
        'qtif': 'image/x-quicktime',
        'ras': 'image/x-cmu-raster',
        'rdf': 'application/rdf+xml',
        'rgb': 'image/x-rgb',
        'rm': 'application/vnd.rn-realmedia',
        'roff': 'text/troff',
        'rtf': 'application/rtf',
        'rtx': 'text/richtext',
        'sfnt': 'application/font-sfnt',
        'sh': 'application/x-sh',
        'shar': 'application/x-shar',
        'sit': 'application/x-stuffit',
        'snd': 'audio/basic',
        'src': 'application/x-wais-source',
        'sv4cpio': 'application/x-sv4cpio',
        'sv4crc': 'application/x-sv4crc',
        'svg': 'image/svg+xml',
        'svgz': 'image/svg+xml',
        'swf': 'application/x-shockwave-flash',
        't': 'text/troff',
        'tar': 'application/x-tar',
        'tcl': 'application/x-tcl',
        'tex': 'application/x-tex',
        'texi': 'application/x-texinfo',
        'texinfo': 'application/x-texinfo',
        'tif': 'image/tiff',
        'tiff': 'image/tiff',
        'tr': 'text/troff',
        'tsv': 'text/tab-separated-values',
        'ttf': 'application/x-font-ttf',
        'txt': 'text/plain',
        'ulw': 'audio/basic',
        'ustar': 'application/x-ustar',
        'vxml': 'application/voicexml+xml',
        'xbm': 'image/x-xbitmap',
        'xht': 'application/xhtml+xml',
        'xhtml': 'application/xhtml+xml',
        'xls': 'application/vnd.ms-excel',
        'xml': 'application/xml',
        'xpm': 'image/x-xpixmap',
        'xsl': 'application/xml',
        'xslt': 'application/xslt+xml',
        'xul': 'application/vnd.mozilla.xul+xml',
        'xwd': 'image/x-xwindowdump',
        'vsd': 'application/vnd.visio',
        'wav': 'audio/x-wav',
        'wbmp': 'image/vnd.wap.wbmp',
        'wml': 'text/vnd.wap.wml',
        'wmlc': 'application/vnd.wap.wmlc',
        'wmls': 'text/vnd.wap.wmlsc',
        'wmlscriptc': 'application/vnd.wap.wmlscriptc',
        'wmv': 'video/x-ms-wmv',
        'woff': 'application/font-woff',
        'woff2': 'application/font-woff2',
        'wrl': 'model/vrml',
        'wspolicy': 'application/wspolicy+xml',
        'z': 'application/x-compress',
        'zip': 'application/zip'
    };

    var fileName, extension, mimeType, isDirectory, isFile;
    fileName = str.replace(/\/$/, "").split("\/").pop();
    if (/^[^.]{1,}\.[0-9A-Za-z.]{1,}$/.test(fileName)) {
        extension = fileName.split("\.").slice(1).join("\.");
        isFile = true;
        isDirectory = false;
        baseName = fileName.replace("\."+extension, "");
        mimeType = types[extension] ? types[extension] : null;
        extension = "\."+extension;
    } else {
        extension = null;
        isFile = false;
        isDirectory = true;
        baseName = fileName;
        mimeType = null;
    }
    return {
        fileName: fileName,
        baseName: baseName,
        extension: extension,
        mimeType: mimeType,
        isFile: isFile,
        isDirectory: isDirectory,
    }
}
function compare(a, b) {
    if (typeof(a) !== typeof(b)) {
        if (typeof(a) === "undefined") {
            return 1;
        }
        if (typeof(b) === "undefined") {
            return -1;
        }
        if (typeof(a) === "object" && a === null) {
            return 1;
        }
        if (typeof(b) === "object" && b === null) {
            return -1;
        }
        if (typeof(a) === "string") {
            return 1;
        }
        if (typeof(b) === "string") {
            return -1;
        }
        if (typeof(a) === "number") {
            return 1;
        }
        if (typeof(b) === "number") {
            return -1;
        }
        if (typeof(a) === "boolean") {
            return 1;
        }
        if (typeof(b) === "boolean") {
            return -1;
        }
        // type error
        var err = new Error('invalid argument type');
        err.name = "TypeError";
        throw err;
    }
    var isNumber = function(str) {
        return !isNaN(parseFloat(str)) && isFinite(str);
    }
    var toNumber = function(str) {
        return parseFloat(str);
    }
    var regexp = /([0-9]+)/;
    var localeCompareLanguage = "en";
    var localeCompareOptions = {};
    var type = typeof(a); // typeof(a) === typeof(b);
    var i;
    var l;
    if (type === "undefined") {
        return 0;
    } else if (type === "object") {
        // null
        return 0;
    } else if (type === "string") {
        a = a.split(regexp).filter(Boolean);
        b = b.split(regexp).filter(Boolean);
        i = 0;
        l = Math.max(a.length, b.length);
        while(i < l) {
            if (a[i] !== b[i]) {
                if (isNumber(a[i]) && isNumber(b[i])) {
                    return  toNumber(a[i]) - toNumber(b[i]);
                }
                if (isNumber(a[i])) {
                    return -1;
                }
                if (isNumber(b[i])) {
                    return 1;
                }
                return a[i].localeCompare(b[i], localeCompareLanguage, localeCompareOptions);
            }
            i++;
        }
        return 0;
    } else if (type === "number") {
        return a - b;
    } else if (type === "boolean") {
        return a ? 1 : -1;
    } else {
        return 0;
    }
} 

const ReactNativeFileReader = {
    /**
     * root, cache, download
     */
    PATH: DEFAULT_PATH,
    /**
     * 
     */
    parsePath: parsePath,
    compare: compare,
    /**
     * 
     * @param  {...any} args 
     * @returns 
     */
    join: function(...args) {
        return args.reduce(function(prev, curr) {
            return curr.replace(/\\+/g, "/")
                .replace(/\/+/g, "/")
                .split(/\//)
                .reduce(function(p, c) {
                    if (c === "\.") {
                        if (p.length > 0) {
                            return p;
                        } else {
                            p.push(c);
                        }
                    } else if (c === "\.\.") {
                        if (p.length > 0) {
                            p.pop();
                        } else {
                            p.push(c);
                        }
                    } else {
                        p.push(c);
                    }
                    return p;
                }, prev);
        }, []).join("\/") || "\.";
    },
    /**
     * 
     * @param {Array} arr 
     * @param {Function} func 
     * @returns 
     */
    sort: function(arr, func) {
        return arr.sort(compareString);
    },
    /**
     * 
     * @returns 
     */
    getPermissions: async function () {
        try {
            const res = await PermissionsAndroid.requestMultiple(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO
            );
    
            return res;
        } catch(err) {
            throw err;
        }
    },
    /**
     * 
     * @param {String} src 
     * @returns 
     */
    isExists: async function(src) {
        try {
            const res = await RNFS.exists(src);
            return res;
        } catch(err) {
            throw err;
        }
    },
    /**
     * 
     * @param {String} src 
     * @returns 
     */
    isFile: async function(src) {
        try {
            const res = await RNFS.stat(src);
            return res.isFile();
        } catch(err) {
            throw err;
        }
    },
    /**
     * 
     * @param {String} src 
     * @returns 
     */
    isDir: async function(src) {
        try {
            const res = await RNFS.stat(src);
            return res.isDirectory();
        } catch(err) {
            throw err;
        }
    },
    /**
     * 
     * @param {Object} options {types, multiple, encoding}
     * @returns 
     */
    pickFile: async function(options) {
        try {
            if (!options) {
                options = {};
            }
            if (!options.multiple) {
                options.multiple = false;
            }
            if (!options.types) {
                options.types = DEFAULT_TYPES;
            } else {
                options.types = options.types.filter(function(type) {
                    return typeof(DOCUMENT_PICKER_TYPES[type]) !== "undefined";
                }).map(function(type) {
                    return DOCUMENT_PICKER_TYPES[type];
                });
            }
            if (!options.encoding) {
                options.encoding = DEFAULT_ENCODING;
            }

            const {
                types,
                multiple,
                encoding,
            } = options;
    
            const picked = await DocumentPicker.pick({
                allowMultiSelection: multiple,
                type: types,
            });
    
            const res = await picked.reduce(async function(prev, curr) {
                const {name, size, type, uri} = curr;
                const data = await RNFS.readFile(uri, encoding);
                prev.push({
                    name: name, 
                    size: size, 
                    type: type, 
                    path: uri, 
                    encoding: encoding,
                    data: data
                });
                return prev;
            }, []);

            if (!multiple) {
                return res[0];
            } else {
                return res;
            }
        } catch(err) {
            throw err;
        }
    },
    /**
     * 
     */
    pickDir: async function() {
        try {
            const picked = await DocumentPicker.pickDirectory();
            
            const res = await RNFS.readDir(picked.uri);

            return res.sort(function(a, b) {
                const t1 = a.isFile();
                const t2 = b.isFile();
                if (t1 === t2) {
                    return compare(a.name, b.name);
                } else {
                    return t1 ? 1 : -1;
                }
            });
        } catch(err) {
            throw err;
        }
    },
    /**
     * 
     * @param {String} src 
     * @returns 
     */
    getStat: async function(src) {
        try {
            const stat = await RNFS.stat(src);
            const {fileName, mimeType} = parsePath(stat.path);
            return Object.assign(stat, {name: fileName, type: mimeType});
        } catch(err) {
            throw err;
        }
    },
    /**
     * 
     * @param {String} src 
     * @param {String} encoding 
     * @returns 
     */
    getFile: async function(src, encoding) {
        try {
            if (!encoding) {
                encoding = DEFAULT_ENCODING;
            }
            const stat = await RNFS.stat(src);
            const data = await RNFS.readFile(src, encoding);
            const {fileName, mimeType} = parsePath(stat.path);
            return Object.assign(stat, {name: fileName, type: mimeType, data: data, encoding: encoding});
        } catch(err) {
            throw err;
        }
    },
    /**
     * 
     * @param {String} src 
     * @returns 
     */
    getDir: async function(src) {
        try {
            const res = await RNFS.readDir(src);
            return res.sort(function(a, b) {
                const t1 = a.isFile();
                const t2 = b.isFile();
                if (t1 === t2) {
                    return compare(a.name, b.name);
                } else {
                    return t1 ? 1 : -1;
                }
            });
        } catch(err) {
            throw err;
        }
    },
    /**
     * 
     * @param {String} data 
     * @param {String} dst 
     * @param {String} encoding 
     * @returns 
     */
    saveFile: async function(data, dst, encoding) {
        try {
            if (!encoding) {
                encoding = DEFAULT_ENCODING;
            }
            await RNFS.writeFile(dst, data, encoding);
            const stat = await RNFS.stat(dst);
            const {fileName, mimeType} = parsePath(stat.path);
            return Object.assign(stat, {name: fileName, type: mimeType});
        } catch(err) {
            throw err;
        }
    },
    /**
     * 
     * @param {String} src 
     * @param {String} dst 
     * @returns 
     */
    moveFile: async function(src, dst) {
        try {
            await RNFS.moveFile(src, dst);
            const stat = await RNFS.stat(dst);
            const {fileName, mimeType} = parsePath(stat.path);
            return Object.assign(stat, {name: fileName, type: mimeType});
        } catch(err) {
            throw err;
        }
    },
    /**
     * 
     * @param {String} src 
     * @returns 
     */
    removeFile: async function(src) {
        try {
            const stat = await RNFS.stat(src);
            if (stat.isFile()) {
                await RNFS.unlink(src);
                return true;
            }
            throw new Error("IsNotFile");
        } catch(err) {
            throw err;
        }
    },
    /**
     * 
     * @param {String} dst 
     * @returns 
     */
    saveDir: async function(dst) {
        try {
            await RNFS.mkdir(dst);
            const stat = await RNFS.stat(dst);
            const {fileName, mimeType} = parsePath(stat.path);
            return Object.assign(stat, {name: fileName, type: mimeType});
        } catch(err) {
            throw err;
        }
    },
    /**
     * 
     * @param {String} src 
     * @returns 
     */
    removeDir: async function(src) {
        try {
            const stat = await RNFS.stat(src);
            if (stat.isDirectory()) {
                await RNFS.unlink(src);
                return true;
            }
            throw new Error("IsNotDirectory");
        } catch(err) {
            throw err;
        }
    },
    /**
     * 
     * @param {String} base64 
     * @returns 
     */
    unzip: async function(base64) {
        try {
            const zip = await JSZip.loadAsync(base64, {base64: true});
            const keys = Object.keys(zip.files);
            const len = keys.length;
            let i = 0;
            let res = [];
            while(i < len) {
                const name = keys[i];
                const file = zip.files[name];
                const isDir = /\/$/.test(name);
                const {fileName, mimeType} = parsePath(name);
                res.push({
                    name: fileName,
                    type: mimeType,
                    size: null,
                    data: null,
                    encoding: null,
                    path: "\.\/"+(isDir ? name.replace(/\/$/, "") : name),
                    isDirectory: () => isDir,
                    isFile: () => !isDir,
                    extract: async function() {
                        try {
                            this.encoding = "base64";
                            this.data = await file.async("base64");
                            this.size = Math.round(getBase64Size(this.data));
                        } catch(err) {
                            throw err;
                        }
                    },
                });
                i++
            }

            return res.sort(function(a, b) {
                var aa = a.isFile();
                var bb = b.isFile();
                if (aa !== bb) {
                    return aa ? 1 : -1;
                } else {
                    return compare(a.name, b.name);
                }
            });
        } catch(err) {
            throw err;
        }
    },
}

export default ReactNativeFileReader;