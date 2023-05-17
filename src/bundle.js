"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/colyseus.js/dist/colyseus.js
  var require_colyseus = __commonJS({
    "node_modules/colyseus.js/dist/colyseus.js"(exports, module) {
      (function(global2, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define("colyseus.js", ["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.Colyseus = {}));
      })(exports, function(exports2) {
        "use strict";
        function _mergeNamespaces(n, m) {
          m.forEach(function(e) {
            e && typeof e !== "string" && !Array.isArray(e) && Object.keys(e).forEach(function(k) {
              if (k !== "default" && !(k in n)) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                  enumerable: true,
                  get: function() {
                    return e[k];
                  }
                });
              }
            });
          });
          return Object.freeze(n);
        }
        if (!ArrayBuffer.isView) {
          ArrayBuffer.isView = function(a) {
            return a !== null && typeof a === "object" && a.buffer instanceof ArrayBuffer;
          };
        }
        if (typeof globalThis === "undefined" && typeof window !== "undefined") {
          window["globalThis"] = window;
        }
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p))
                d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        function __extends(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        }
        function __awaiter(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        }
        function __generator(thisArg, body) {
          var _ = { label: 0, sent: function() {
            if (t[0] & 1)
              throw t[1];
            return t[1];
          }, trys: [], ops: [] }, f, y, t, g;
          return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f)
              throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _)
              try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                  return t;
                if (y = 0, t)
                  op = [op[0] & 2, t.value];
                switch (op[0]) {
                  case 0:
                  case 1:
                    t = op;
                    break;
                  case 4:
                    _.label++;
                    return { value: op[1], done: false };
                  case 5:
                    _.label++;
                    y = op[1];
                    op = [0];
                    continue;
                  case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                  default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                      _ = 0;
                      continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                      _.label = op[1];
                      break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                      _.label = t[1];
                      t = op;
                      break;
                    }
                    if (t && _.label < t[2]) {
                      _.label = t[2];
                      _.ops.push(op);
                      break;
                    }
                    if (t[2])
                      _.ops.pop();
                    _.trys.pop();
                    continue;
                }
                op = body.call(thisArg, _);
              } catch (e) {
                op = [6, e];
                y = 0;
              } finally {
                f = t = 0;
              }
            if (op[0] & 5)
              throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        }
        function apply(src, tar) {
          tar.headers = src.headers || {};
          tar.statusMessage = src.statusText;
          tar.statusCode = src.status;
          tar.data = src.response;
        }
        function send(method, uri, opts) {
          return new Promise(function(res, rej) {
            opts = opts || {};
            var req = new XMLHttpRequest();
            var k, tmp, arr, str = opts.body;
            var headers = opts.headers || {};
            if (opts.timeout)
              req.timeout = opts.timeout;
            req.ontimeout = req.onerror = function(err) {
              err.timeout = err.type == "timeout";
              rej(err);
            };
            req.open(method, uri.href || uri);
            req.onload = function() {
              arr = req.getAllResponseHeaders().trim().split(/[\r\n]+/);
              apply(req, req);
              while (tmp = arr.shift()) {
                tmp = tmp.split(": ");
                req.headers[tmp.shift().toLowerCase()] = tmp.join(": ");
              }
              tmp = req.headers["content-type"];
              if (tmp && !!~tmp.indexOf("application/json")) {
                try {
                  req.data = JSON.parse(req.data, opts.reviver);
                } catch (err) {
                  apply(req, err);
                  return rej(err);
                }
              }
              (req.status >= 400 ? rej : res)(req);
            };
            if (typeof FormData < "u" && str instanceof FormData)
              ;
            else if (str && typeof str == "object") {
              headers["content-type"] = "application/json";
              str = JSON.stringify(str);
            }
            req.withCredentials = !!opts.withCredentials;
            for (k in headers) {
              req.setRequestHeader(k, headers[k]);
            }
            req.send(str);
          });
        }
        var get = /* @__PURE__ */ send.bind(send, "GET");
        var post = /* @__PURE__ */ send.bind(send, "POST");
        var patch = /* @__PURE__ */ send.bind(send, "PATCH");
        var del = /* @__PURE__ */ send.bind(send, "DELETE");
        var put = /* @__PURE__ */ send.bind(send, "PUT");
        var del_1 = del;
        var get_1 = get;
        var patch_1 = patch;
        var post_1 = post;
        var put_1 = put;
        var send_1 = send;
        var xhr = {
          del: del_1,
          get: get_1,
          patch: patch_1,
          post: post_1,
          put: put_1,
          send: send_1
        };
        var http = /* @__PURE__ */ _mergeNamespaces({
          __proto__: null,
          "default": xhr,
          del: del_1,
          get: get_1,
          patch: patch_1,
          post: post_1,
          put: put_1,
          send: send_1
        }, [xhr]);
        var CloseCode;
        (function(CloseCode2) {
          CloseCode2[CloseCode2["CONSENTED"] = 4e3] = "CONSENTED";
          CloseCode2[CloseCode2["DEVMODE_RESTART"] = 4010] = "DEVMODE_RESTART";
        })(CloseCode || (CloseCode = {}));
        var ServerError = (
          /** @class */
          function(_super) {
            __extends(ServerError2, _super);
            function ServerError2(code, message) {
              var _this = _super.call(this, message) || this;
              _this.name = "ServerError";
              _this.code = code;
              return _this;
            }
            return ServerError2;
          }(Error)
        );
        function Decoder(buffer, offset) {
          this._offset = offset;
          if (buffer instanceof ArrayBuffer) {
            this._buffer = buffer;
            this._view = new DataView(this._buffer);
          } else if (ArrayBuffer.isView(buffer)) {
            this._buffer = buffer.buffer;
            this._view = new DataView(this._buffer, buffer.byteOffset, buffer.byteLength);
          } else {
            throw new Error("Invalid argument");
          }
        }
        function utf8Read$1(view, offset, length) {
          var string = "", chr = 0;
          for (var i = offset, end = offset + length; i < end; i++) {
            var byte = view.getUint8(i);
            if ((byte & 128) === 0) {
              string += String.fromCharCode(byte);
              continue;
            }
            if ((byte & 224) === 192) {
              string += String.fromCharCode((byte & 31) << 6 | view.getUint8(++i) & 63);
              continue;
            }
            if ((byte & 240) === 224) {
              string += String.fromCharCode((byte & 15) << 12 | (view.getUint8(++i) & 63) << 6 | (view.getUint8(++i) & 63) << 0);
              continue;
            }
            if ((byte & 248) === 240) {
              chr = (byte & 7) << 18 | (view.getUint8(++i) & 63) << 12 | (view.getUint8(++i) & 63) << 6 | (view.getUint8(++i) & 63) << 0;
              if (chr >= 65536) {
                chr -= 65536;
                string += String.fromCharCode((chr >>> 10) + 55296, (chr & 1023) + 56320);
              } else {
                string += String.fromCharCode(chr);
              }
              continue;
            }
            throw new Error("Invalid byte " + byte.toString(16));
          }
          return string;
        }
        Decoder.prototype._array = function(length) {
          var value = new Array(length);
          for (var i = 0; i < length; i++) {
            value[i] = this._parse();
          }
          return value;
        };
        Decoder.prototype._map = function(length) {
          var key = "", value = {};
          for (var i = 0; i < length; i++) {
            key = this._parse();
            value[key] = this._parse();
          }
          return value;
        };
        Decoder.prototype._str = function(length) {
          var value = utf8Read$1(this._view, this._offset, length);
          this._offset += length;
          return value;
        };
        Decoder.prototype._bin = function(length) {
          var value = this._buffer.slice(this._offset, this._offset + length);
          this._offset += length;
          return value;
        };
        Decoder.prototype._parse = function() {
          var prefix = this._view.getUint8(this._offset++);
          var value, length = 0, type = 0, hi = 0, lo = 0;
          if (prefix < 192) {
            if (prefix < 128) {
              return prefix;
            }
            if (prefix < 144) {
              return this._map(prefix & 15);
            }
            if (prefix < 160) {
              return this._array(prefix & 15);
            }
            return this._str(prefix & 31);
          }
          if (prefix > 223) {
            return (255 - prefix + 1) * -1;
          }
          switch (prefix) {
            case 192:
              return null;
            case 194:
              return false;
            case 195:
              return true;
            case 196:
              length = this._view.getUint8(this._offset);
              this._offset += 1;
              return this._bin(length);
            case 197:
              length = this._view.getUint16(this._offset);
              this._offset += 2;
              return this._bin(length);
            case 198:
              length = this._view.getUint32(this._offset);
              this._offset += 4;
              return this._bin(length);
            case 199:
              length = this._view.getUint8(this._offset);
              type = this._view.getInt8(this._offset + 1);
              this._offset += 2;
              if (type === -1) {
                var ns = this._view.getUint32(this._offset);
                hi = this._view.getInt32(this._offset + 4);
                lo = this._view.getUint32(this._offset + 8);
                this._offset += 12;
                return new Date((hi * 4294967296 + lo) * 1e3 + ns / 1e6);
              }
              return [type, this._bin(length)];
            case 200:
              length = this._view.getUint16(this._offset);
              type = this._view.getInt8(this._offset + 2);
              this._offset += 3;
              return [type, this._bin(length)];
            case 201:
              length = this._view.getUint32(this._offset);
              type = this._view.getInt8(this._offset + 4);
              this._offset += 5;
              return [type, this._bin(length)];
            case 202:
              value = this._view.getFloat32(this._offset);
              this._offset += 4;
              return value;
            case 203:
              value = this._view.getFloat64(this._offset);
              this._offset += 8;
              return value;
            case 204:
              value = this._view.getUint8(this._offset);
              this._offset += 1;
              return value;
            case 205:
              value = this._view.getUint16(this._offset);
              this._offset += 2;
              return value;
            case 206:
              value = this._view.getUint32(this._offset);
              this._offset += 4;
              return value;
            case 207:
              hi = this._view.getUint32(this._offset) * Math.pow(2, 32);
              lo = this._view.getUint32(this._offset + 4);
              this._offset += 8;
              return hi + lo;
            case 208:
              value = this._view.getInt8(this._offset);
              this._offset += 1;
              return value;
            case 209:
              value = this._view.getInt16(this._offset);
              this._offset += 2;
              return value;
            case 210:
              value = this._view.getInt32(this._offset);
              this._offset += 4;
              return value;
            case 211:
              hi = this._view.getInt32(this._offset) * Math.pow(2, 32);
              lo = this._view.getUint32(this._offset + 4);
              this._offset += 8;
              return hi + lo;
            case 212:
              type = this._view.getInt8(this._offset);
              this._offset += 1;
              if (type === 0) {
                this._offset += 1;
                return void 0;
              }
              return [type, this._bin(1)];
            case 213:
              type = this._view.getInt8(this._offset);
              this._offset += 1;
              return [type, this._bin(2)];
            case 214:
              type = this._view.getInt8(this._offset);
              this._offset += 1;
              if (type === -1) {
                value = this._view.getUint32(this._offset);
                this._offset += 4;
                return new Date(value * 1e3);
              }
              return [type, this._bin(4)];
            case 215:
              type = this._view.getInt8(this._offset);
              this._offset += 1;
              if (type === 0) {
                hi = this._view.getInt32(this._offset) * Math.pow(2, 32);
                lo = this._view.getUint32(this._offset + 4);
                this._offset += 8;
                return new Date(hi + lo);
              }
              if (type === -1) {
                hi = this._view.getUint32(this._offset);
                lo = this._view.getUint32(this._offset + 4);
                this._offset += 8;
                var s = (hi & 3) * 4294967296 + lo;
                return new Date(s * 1e3 + (hi >>> 2) / 1e6);
              }
              return [type, this._bin(8)];
            case 216:
              type = this._view.getInt8(this._offset);
              this._offset += 1;
              return [type, this._bin(16)];
            case 217:
              length = this._view.getUint8(this._offset);
              this._offset += 1;
              return this._str(length);
            case 218:
              length = this._view.getUint16(this._offset);
              this._offset += 2;
              return this._str(length);
            case 219:
              length = this._view.getUint32(this._offset);
              this._offset += 4;
              return this._str(length);
            case 220:
              length = this._view.getUint16(this._offset);
              this._offset += 2;
              return this._array(length);
            case 221:
              length = this._view.getUint32(this._offset);
              this._offset += 4;
              return this._array(length);
            case 222:
              length = this._view.getUint16(this._offset);
              this._offset += 2;
              return this._map(length);
            case 223:
              length = this._view.getUint32(this._offset);
              this._offset += 4;
              return this._map(length);
          }
          throw new Error("Could not parse");
        };
        function decode(buffer, offset) {
          if (offset === void 0) {
            offset = 0;
          }
          var decoder = new Decoder(buffer, offset);
          var value = decoder._parse();
          if (decoder._offset !== buffer.byteLength) {
            throw new Error(buffer.byteLength - decoder._offset + " trailing bytes");
          }
          return value;
        }
        var TIMESTAMP32_MAX_SEC = 4294967296 - 1;
        var TIMESTAMP64_MAX_SEC = 17179869184 - 1;
        function utf8Write(view, offset, str) {
          var c = 0;
          for (var i = 0, l = str.length; i < l; i++) {
            c = str.charCodeAt(i);
            if (c < 128) {
              view.setUint8(offset++, c);
            } else if (c < 2048) {
              view.setUint8(offset++, 192 | c >> 6);
              view.setUint8(offset++, 128 | c & 63);
            } else if (c < 55296 || c >= 57344) {
              view.setUint8(offset++, 224 | c >> 12);
              view.setUint8(offset++, 128 | c >> 6 & 63);
              view.setUint8(offset++, 128 | c & 63);
            } else {
              i++;
              c = 65536 + ((c & 1023) << 10 | str.charCodeAt(i) & 1023);
              view.setUint8(offset++, 240 | c >> 18);
              view.setUint8(offset++, 128 | c >> 12 & 63);
              view.setUint8(offset++, 128 | c >> 6 & 63);
              view.setUint8(offset++, 128 | c & 63);
            }
          }
        }
        function utf8Length$1(str) {
          var c = 0, length = 0;
          for (var i = 0, l = str.length; i < l; i++) {
            c = str.charCodeAt(i);
            if (c < 128) {
              length += 1;
            } else if (c < 2048) {
              length += 2;
            } else if (c < 55296 || c >= 57344) {
              length += 3;
            } else {
              i++;
              length += 4;
            }
          }
          return length;
        }
        function _encode(bytes, defers, value) {
          var type = typeof value, i = 0, l = 0, hi = 0, lo = 0, length = 0, size = 0;
          if (type === "string") {
            length = utf8Length$1(value);
            if (length < 32) {
              bytes.push(length | 160);
              size = 1;
            } else if (length < 256) {
              bytes.push(217, length);
              size = 2;
            } else if (length < 65536) {
              bytes.push(218, length >> 8, length);
              size = 3;
            } else if (length < 4294967296) {
              bytes.push(219, length >> 24, length >> 16, length >> 8, length);
              size = 5;
            } else {
              throw new Error("String too long");
            }
            defers.push({ _str: value, _length: length, _offset: bytes.length });
            return size + length;
          }
          if (type === "number") {
            if (Math.floor(value) !== value || !isFinite(value)) {
              bytes.push(203);
              defers.push({ _float: value, _length: 8, _offset: bytes.length });
              return 9;
            }
            if (value >= 0) {
              if (value < 128) {
                bytes.push(value);
                return 1;
              }
              if (value < 256) {
                bytes.push(204, value);
                return 2;
              }
              if (value < 65536) {
                bytes.push(205, value >> 8, value);
                return 3;
              }
              if (value < 4294967296) {
                bytes.push(206, value >> 24, value >> 16, value >> 8, value);
                return 5;
              }
              hi = value / Math.pow(2, 32) >> 0;
              lo = value >>> 0;
              bytes.push(207, hi >> 24, hi >> 16, hi >> 8, hi, lo >> 24, lo >> 16, lo >> 8, lo);
              return 9;
            } else {
              if (value >= -32) {
                bytes.push(value);
                return 1;
              }
              if (value >= -128) {
                bytes.push(208, value);
                return 2;
              }
              if (value >= -32768) {
                bytes.push(209, value >> 8, value);
                return 3;
              }
              if (value >= -2147483648) {
                bytes.push(210, value >> 24, value >> 16, value >> 8, value);
                return 5;
              }
              hi = Math.floor(value / Math.pow(2, 32));
              lo = value >>> 0;
              bytes.push(211, hi >> 24, hi >> 16, hi >> 8, hi, lo >> 24, lo >> 16, lo >> 8, lo);
              return 9;
            }
          }
          if (type === "object") {
            if (value === null) {
              bytes.push(192);
              return 1;
            }
            if (Array.isArray(value)) {
              length = value.length;
              if (length < 16) {
                bytes.push(length | 144);
                size = 1;
              } else if (length < 65536) {
                bytes.push(220, length >> 8, length);
                size = 3;
              } else if (length < 4294967296) {
                bytes.push(221, length >> 24, length >> 16, length >> 8, length);
                size = 5;
              } else {
                throw new Error("Array too large");
              }
              for (i = 0; i < length; i++) {
                size += _encode(bytes, defers, value[i]);
              }
              return size;
            }
            if (value instanceof Date) {
              var ms = value.getTime();
              var s = Math.floor(ms / 1e3);
              var ns = (ms - s * 1e3) * 1e6;
              if (s >= 0 && ns >= 0 && s <= TIMESTAMP64_MAX_SEC) {
                if (ns === 0 && s <= TIMESTAMP32_MAX_SEC) {
                  bytes.push(214, 255, s >> 24, s >> 16, s >> 8, s);
                  return 6;
                } else {
                  hi = s / 4294967296;
                  lo = s & 4294967295;
                  bytes.push(215, 255, ns >> 22, ns >> 14, ns >> 6, hi, lo >> 24, lo >> 16, lo >> 8, lo);
                  return 10;
                }
              } else {
                hi = Math.floor(s / 4294967296);
                lo = s >>> 0;
                bytes.push(199, 12, 255, ns >> 24, ns >> 16, ns >> 8, ns, hi >> 24, hi >> 16, hi >> 8, hi, lo >> 24, lo >> 16, lo >> 8, lo);
                return 15;
              }
            }
            if (value instanceof ArrayBuffer) {
              length = value.byteLength;
              if (length < 256) {
                bytes.push(196, length);
                size = 2;
              } else if (length < 65536) {
                bytes.push(197, length >> 8, length);
                size = 3;
              } else if (length < 4294967296) {
                bytes.push(198, length >> 24, length >> 16, length >> 8, length);
                size = 5;
              } else {
                throw new Error("Buffer too large");
              }
              defers.push({ _bin: value, _length: length, _offset: bytes.length });
              return size + length;
            }
            if (typeof value.toJSON === "function") {
              return _encode(bytes, defers, value.toJSON());
            }
            var keys2 = [], key = "";
            var allKeys = Object.keys(value);
            for (i = 0, l = allKeys.length; i < l; i++) {
              key = allKeys[i];
              if (value[key] !== void 0 && typeof value[key] !== "function") {
                keys2.push(key);
              }
            }
            length = keys2.length;
            if (length < 16) {
              bytes.push(length | 128);
              size = 1;
            } else if (length < 65536) {
              bytes.push(222, length >> 8, length);
              size = 3;
            } else if (length < 4294967296) {
              bytes.push(223, length >> 24, length >> 16, length >> 8, length);
              size = 5;
            } else {
              throw new Error("Object too large");
            }
            for (i = 0; i < length; i++) {
              key = keys2[i];
              size += _encode(bytes, defers, key);
              size += _encode(bytes, defers, value[key]);
            }
            return size;
          }
          if (type === "boolean") {
            bytes.push(value ? 195 : 194);
            return 1;
          }
          if (type === "undefined") {
            bytes.push(192);
            return 1;
          }
          if (typeof value.toJSON === "function") {
            return _encode(bytes, defers, value.toJSON());
          }
          throw new Error("Could not encode");
        }
        function encode(value) {
          var bytes = [];
          var defers = [];
          var size = _encode(bytes, defers, value);
          var buf = new ArrayBuffer(size);
          var view = new DataView(buf);
          var deferIndex = 0;
          var deferWritten = 0;
          var nextOffset = -1;
          if (defers.length > 0) {
            nextOffset = defers[0]._offset;
          }
          var defer, deferLength = 0, offset = 0;
          for (var i = 0, l = bytes.length; i < l; i++) {
            view.setUint8(deferWritten + i, bytes[i]);
            if (i + 1 !== nextOffset) {
              continue;
            }
            defer = defers[deferIndex];
            deferLength = defer._length;
            offset = deferWritten + nextOffset;
            if (defer._bin) {
              var bin = new Uint8Array(defer._bin);
              for (var j = 0; j < deferLength; j++) {
                view.setUint8(offset + j, bin[j]);
              }
            } else if (defer._str) {
              utf8Write(view, offset, defer._str);
            } else if (defer._float !== void 0) {
              view.setFloat64(offset, defer._float);
            }
            deferIndex++;
            deferWritten += deferLength;
            if (defers[deferIndex]) {
              nextOffset = defers[deferIndex]._offset;
            }
          }
          return buf;
        }
        var browser = function() {
          throw new Error(
            "ws does not work in the browser. Browser clients must use the native WebSocket object"
          );
        };
        var WebSocket = globalThis.WebSocket || browser;
        var WebSocketTransport = (
          /** @class */
          function() {
            function WebSocketTransport2(events) {
              this.events = events;
            }
            WebSocketTransport2.prototype.send = function(data) {
              if (data instanceof ArrayBuffer) {
                this.ws.send(data);
              } else if (Array.isArray(data)) {
                this.ws.send(new Uint8Array(data).buffer);
              }
            };
            WebSocketTransport2.prototype.connect = function(url) {
              this.ws = new WebSocket(url, this.protocols);
              this.ws.binaryType = "arraybuffer";
              this.ws.onopen = this.events.onopen;
              this.ws.onmessage = this.events.onmessage;
              this.ws.onclose = this.events.onclose;
              this.ws.onerror = this.events.onerror;
            };
            WebSocketTransport2.prototype.close = function(code, reason) {
              this.ws.close(code, reason);
            };
            Object.defineProperty(WebSocketTransport2.prototype, "isOpen", {
              get: function() {
                return this.ws.readyState === WebSocket.OPEN;
              },
              enumerable: false,
              configurable: true
            });
            return WebSocketTransport2;
          }()
        );
        var Connection = (
          /** @class */
          function() {
            function Connection2() {
              this.events = {};
              this.transport = new WebSocketTransport(this.events);
            }
            Connection2.prototype.send = function(data) {
              this.transport.send(data);
            };
            Connection2.prototype.connect = function(url) {
              this.transport.connect(url);
            };
            Connection2.prototype.close = function(code, reason) {
              this.transport.close(code, reason);
            };
            Object.defineProperty(Connection2.prototype, "isOpen", {
              get: function() {
                return this.transport.isOpen;
              },
              enumerable: false,
              configurable: true
            });
            return Connection2;
          }()
        );
        exports2.Protocol = void 0;
        (function(Protocol) {
          Protocol[Protocol["HANDSHAKE"] = 9] = "HANDSHAKE";
          Protocol[Protocol["JOIN_ROOM"] = 10] = "JOIN_ROOM";
          Protocol[Protocol["ERROR"] = 11] = "ERROR";
          Protocol[Protocol["LEAVE_ROOM"] = 12] = "LEAVE_ROOM";
          Protocol[Protocol["ROOM_DATA"] = 13] = "ROOM_DATA";
          Protocol[Protocol["ROOM_STATE"] = 14] = "ROOM_STATE";
          Protocol[Protocol["ROOM_STATE_PATCH"] = 15] = "ROOM_STATE_PATCH";
          Protocol[Protocol["ROOM_DATA_SCHEMA"] = 16] = "ROOM_DATA_SCHEMA";
          Protocol[Protocol["ROOM_DATA_BYTES"] = 17] = "ROOM_DATA_BYTES";
        })(exports2.Protocol || (exports2.Protocol = {}));
        exports2.ErrorCode = void 0;
        (function(ErrorCode) {
          ErrorCode[ErrorCode["MATCHMAKE_NO_HANDLER"] = 4210] = "MATCHMAKE_NO_HANDLER";
          ErrorCode[ErrorCode["MATCHMAKE_INVALID_CRITERIA"] = 4211] = "MATCHMAKE_INVALID_CRITERIA";
          ErrorCode[ErrorCode["MATCHMAKE_INVALID_ROOM_ID"] = 4212] = "MATCHMAKE_INVALID_ROOM_ID";
          ErrorCode[ErrorCode["MATCHMAKE_UNHANDLED"] = 4213] = "MATCHMAKE_UNHANDLED";
          ErrorCode[ErrorCode["MATCHMAKE_EXPIRED"] = 4214] = "MATCHMAKE_EXPIRED";
          ErrorCode[ErrorCode["AUTH_FAILED"] = 4215] = "AUTH_FAILED";
          ErrorCode[ErrorCode["APPLICATION_ERROR"] = 4216] = "APPLICATION_ERROR";
        })(exports2.ErrorCode || (exports2.ErrorCode = {}));
        function utf8Read(view, offset) {
          var length = view[offset++];
          var string = "", chr = 0;
          for (var i = offset, end = offset + length; i < end; i++) {
            var byte = view[i];
            if ((byte & 128) === 0) {
              string += String.fromCharCode(byte);
              continue;
            }
            if ((byte & 224) === 192) {
              string += String.fromCharCode((byte & 31) << 6 | view[++i] & 63);
              continue;
            }
            if ((byte & 240) === 224) {
              string += String.fromCharCode((byte & 15) << 12 | (view[++i] & 63) << 6 | (view[++i] & 63) << 0);
              continue;
            }
            if ((byte & 248) === 240) {
              chr = (byte & 7) << 18 | (view[++i] & 63) << 12 | (view[++i] & 63) << 6 | (view[++i] & 63) << 0;
              if (chr >= 65536) {
                chr -= 65536;
                string += String.fromCharCode((chr >>> 10) + 55296, (chr & 1023) + 56320);
              } else {
                string += String.fromCharCode(chr);
              }
              continue;
            }
            throw new Error("Invalid byte " + byte.toString(16));
          }
          return string;
        }
        function utf8Length(str) {
          if (str === void 0) {
            str = "";
          }
          var c = 0;
          var length = 0;
          for (var i = 0, l = str.length; i < l; i++) {
            c = str.charCodeAt(i);
            if (c < 128) {
              length += 1;
            } else if (c < 2048) {
              length += 2;
            } else if (c < 55296 || c >= 57344) {
              length += 3;
            } else {
              i++;
              length += 4;
            }
          }
          return length + 1;
        }
        var serializers = {};
        function registerSerializer(id, serializer) {
          serializers[id] = serializer;
        }
        function getSerializer(id) {
          var serializer = serializers[id];
          if (!serializer) {
            throw new Error("missing serializer: " + id);
          }
          return serializer;
        }
        let createNanoEvents = () => ({
          events: {},
          emit(event, ...args) {
            (this.events[event] || []).forEach((i) => i(...args));
          },
          on(event, cb) {
            (this.events[event] = this.events[event] || []).push(cb);
            return () => this.events[event] = (this.events[event] || []).filter((i) => i !== cb);
          }
        });
        var EventEmitter = (
          /** @class */
          function() {
            function EventEmitter2() {
              this.handlers = [];
            }
            EventEmitter2.prototype.register = function(cb, once) {
              this.handlers.push(cb);
              return this;
            };
            EventEmitter2.prototype.invoke = function() {
              var _this = this;
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              this.handlers.forEach(function(handler) {
                return handler.apply(_this, args);
              });
            };
            EventEmitter2.prototype.invokeAsync = function() {
              var _this = this;
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              return Promise.all(this.handlers.map(function(handler) {
                return handler.apply(_this, args);
              }));
            };
            EventEmitter2.prototype.remove = function(cb) {
              var index = this.handlers.indexOf(cb);
              this.handlers[index] = this.handlers[this.handlers.length - 1];
              this.handlers.pop();
            };
            EventEmitter2.prototype.clear = function() {
              this.handlers = [];
            };
            return EventEmitter2;
          }()
        );
        function createSignal() {
          var emitter = new EventEmitter();
          function register(cb) {
            return emitter.register(cb, this === null);
          }
          register.once = function(cb) {
            var callback = function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              cb.apply(this, args);
              emitter.remove(callback);
            };
            emitter.register(callback);
          };
          register.remove = function(cb) {
            return emitter.remove(cb);
          };
          register.invoke = function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            return emitter.invoke.apply(emitter, args);
          };
          register.invokeAsync = function() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
            }
            return emitter.invokeAsync.apply(emitter, args);
          };
          register.clear = function() {
            return emitter.clear();
          };
          return register;
        }
        var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
        function createCommonjsModule(fn) {
          var module2 = { exports: {} };
          return fn(module2, module2.exports), module2.exports;
        }
        var umd = createCommonjsModule(function(module2, exports3) {
          (function(global2, factory) {
            factory(exports3);
          })(commonjsGlobal, function(exports4) {
            var extendStatics2 = function(d, b) {
              extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
                d2.__proto__ = b2;
              } || function(d2, b2) {
                for (var p in b2)
                  if (Object.prototype.hasOwnProperty.call(b2, p))
                    d2[p] = b2[p];
              };
              return extendStatics2(d, b);
            };
            function __extends2(d, b) {
              if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
              extendStatics2(d, b);
              function __() {
                this.constructor = d;
              }
              d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            }
            function __decorate(decorators, target, key, desc) {
              var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
              if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
                r = Reflect.decorate(decorators, target, key, desc);
              else
                for (var i = decorators.length - 1; i >= 0; i--)
                  if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
              return c > 3 && r && Object.defineProperty(target, key, r), r;
            }
            function __spreadArray(to, from, pack) {
              if (pack || arguments.length === 2)
                for (var i = 0, l = from.length, ar; i < l; i++) {
                  if (ar || !(i in from)) {
                    if (!ar)
                      ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                  }
                }
              return to.concat(ar || Array.prototype.slice.call(from));
            }
            var SWITCH_TO_STRUCTURE = 255;
            var TYPE_ID = 213;
            exports4.OPERATION = void 0;
            (function(OPERATION) {
              OPERATION[OPERATION["ADD"] = 128] = "ADD";
              OPERATION[OPERATION["REPLACE"] = 0] = "REPLACE";
              OPERATION[OPERATION["DELETE"] = 64] = "DELETE";
              OPERATION[OPERATION["DELETE_AND_ADD"] = 192] = "DELETE_AND_ADD";
              OPERATION[OPERATION["TOUCH"] = 1] = "TOUCH";
              OPERATION[OPERATION["CLEAR"] = 10] = "CLEAR";
            })(exports4.OPERATION || (exports4.OPERATION = {}));
            var ChangeTree = (
              /** @class */
              function() {
                function ChangeTree2(ref, parent, root) {
                  this.changed = false;
                  this.changes = /* @__PURE__ */ new Map();
                  this.allChanges = /* @__PURE__ */ new Set();
                  this.caches = {};
                  this.currentCustomOperation = 0;
                  this.ref = ref;
                  this.setParent(parent, root);
                }
                ChangeTree2.prototype.setParent = function(parent, root, parentIndex) {
                  var _this = this;
                  if (!this.indexes) {
                    this.indexes = this.ref instanceof Schema ? this.ref["_definition"].indexes : {};
                  }
                  this.parent = parent;
                  this.parentIndex = parentIndex;
                  if (!root) {
                    return;
                  }
                  this.root = root;
                  if (this.ref instanceof Schema) {
                    var definition = this.ref["_definition"];
                    for (var field in definition.schema) {
                      var value = this.ref[field];
                      if (value && value["$changes"]) {
                        var parentIndex_1 = definition.indexes[field];
                        value["$changes"].setParent(this.ref, root, parentIndex_1);
                      }
                    }
                  } else if (typeof this.ref === "object") {
                    this.ref.forEach(function(value2, key) {
                      if (value2 instanceof Schema) {
                        var changeTreee = value2["$changes"];
                        var parentIndex_2 = _this.ref["$changes"].indexes[key];
                        changeTreee.setParent(_this.ref, _this.root, parentIndex_2);
                      }
                    });
                  }
                };
                ChangeTree2.prototype.operation = function(op) {
                  this.changes.set(--this.currentCustomOperation, op);
                };
                ChangeTree2.prototype.change = function(fieldName, operation) {
                  if (operation === void 0) {
                    operation = exports4.OPERATION.ADD;
                  }
                  var index = typeof fieldName === "number" ? fieldName : this.indexes[fieldName];
                  this.assertValidIndex(index, fieldName);
                  var previousChange = this.changes.get(index);
                  if (!previousChange || previousChange.op === exports4.OPERATION.DELETE || previousChange.op === exports4.OPERATION.TOUCH) {
                    this.changes.set(index, {
                      op: !previousChange ? operation : previousChange.op === exports4.OPERATION.DELETE ? exports4.OPERATION.DELETE_AND_ADD : operation,
                      // : OPERATION.REPLACE,
                      index
                    });
                  }
                  this.allChanges.add(index);
                  this.changed = true;
                  this.touchParents();
                };
                ChangeTree2.prototype.touch = function(fieldName) {
                  var index = typeof fieldName === "number" ? fieldName : this.indexes[fieldName];
                  this.assertValidIndex(index, fieldName);
                  if (!this.changes.has(index)) {
                    this.changes.set(index, { op: exports4.OPERATION.TOUCH, index });
                  }
                  this.allChanges.add(index);
                  this.touchParents();
                };
                ChangeTree2.prototype.touchParents = function() {
                  if (this.parent) {
                    this.parent["$changes"].touch(this.parentIndex);
                  }
                };
                ChangeTree2.prototype.getType = function(index) {
                  if (this.ref["_definition"]) {
                    var definition = this.ref["_definition"];
                    return definition.schema[definition.fieldsByIndex[index]];
                  } else {
                    var definition = this.parent["_definition"];
                    var parentType = definition.schema[definition.fieldsByIndex[this.parentIndex]];
                    return Object.values(parentType)[0];
                  }
                };
                ChangeTree2.prototype.getChildrenFilter = function() {
                  var childFilters = this.parent["_definition"].childFilters;
                  return childFilters && childFilters[this.parentIndex];
                };
                ChangeTree2.prototype.getValue = function(index) {
                  return this.ref["getByIndex"](index);
                };
                ChangeTree2.prototype.delete = function(fieldName) {
                  var index = typeof fieldName === "number" ? fieldName : this.indexes[fieldName];
                  if (index === void 0) {
                    console.warn("@colyseus/schema ".concat(this.ref.constructor.name, ": trying to delete non-existing index: ").concat(fieldName, " (").concat(index, ")"));
                    return;
                  }
                  var previousValue = this.getValue(index);
                  this.changes.set(index, { op: exports4.OPERATION.DELETE, index });
                  this.allChanges.delete(index);
                  delete this.caches[index];
                  if (previousValue && previousValue["$changes"]) {
                    previousValue["$changes"].parent = void 0;
                  }
                  this.changed = true;
                  this.touchParents();
                };
                ChangeTree2.prototype.discard = function(changed, discardAll) {
                  var _this = this;
                  if (changed === void 0) {
                    changed = false;
                  }
                  if (discardAll === void 0) {
                    discardAll = false;
                  }
                  if (!(this.ref instanceof Schema)) {
                    this.changes.forEach(function(change) {
                      if (change.op === exports4.OPERATION.DELETE) {
                        var index = _this.ref["getIndex"](change.index);
                        delete _this.indexes[index];
                      }
                    });
                  }
                  this.changes.clear();
                  this.changed = changed;
                  if (discardAll) {
                    this.allChanges.clear();
                  }
                  this.currentCustomOperation = 0;
                };
                ChangeTree2.prototype.discardAll = function() {
                  var _this = this;
                  this.changes.forEach(function(change) {
                    var value = _this.getValue(change.index);
                    if (value && value["$changes"]) {
                      value["$changes"].discardAll();
                    }
                  });
                  this.discard();
                };
                ChangeTree2.prototype.cache = function(field, cachedBytes) {
                  this.caches[field] = cachedBytes;
                };
                ChangeTree2.prototype.clone = function() {
                  return new ChangeTree2(this.ref, this.parent, this.root);
                };
                ChangeTree2.prototype.ensureRefId = function() {
                  if (this.refId !== void 0) {
                    return;
                  }
                  this.refId = this.root.getNextUniqueId();
                };
                ChangeTree2.prototype.assertValidIndex = function(index, fieldName) {
                  if (index === void 0) {
                    throw new Error('ChangeTree: missing index for field "'.concat(fieldName, '"'));
                  }
                };
                return ChangeTree2;
              }()
            );
            function addCallback($callbacks, op, callback, existing) {
              if (!$callbacks[op]) {
                $callbacks[op] = [];
              }
              $callbacks[op].push(callback);
              existing === null || existing === void 0 ? void 0 : existing.forEach(function(item, key) {
                return callback(item, key);
              });
              return function() {
                return spliceOne($callbacks[op], $callbacks[op].indexOf(callback));
              };
            }
            function removeChildRefs(changes) {
              var _this = this;
              var needRemoveRef = typeof this.$changes.getType() !== "string";
              this.$items.forEach(function(item, key) {
                changes.push({
                  refId: _this.$changes.refId,
                  op: exports4.OPERATION.DELETE,
                  field: key,
                  value: void 0,
                  previousValue: item
                });
                if (needRemoveRef) {
                  _this.$changes.root.removeRef(item["$changes"].refId);
                }
              });
            }
            function spliceOne(arr, index) {
              if (index === -1 || index >= arr.length) {
                return false;
              }
              var len = arr.length - 1;
              for (var i = index; i < len; i++) {
                arr[i] = arr[i + 1];
              }
              arr.length = len;
              return true;
            }
            var DEFAULT_SORT = function(a, b) {
              var A = a.toString();
              var B = b.toString();
              if (A < B)
                return -1;
              else if (A > B)
                return 1;
              else
                return 0;
            };
            function getArrayProxy(value) {
              value["$proxy"] = true;
              value = new Proxy(value, {
                get: function(obj, prop) {
                  if (typeof prop !== "symbol" && !isNaN(prop)) {
                    return obj.at(prop);
                  } else {
                    return obj[prop];
                  }
                },
                set: function(obj, prop, setValue) {
                  if (typeof prop !== "symbol" && !isNaN(prop)) {
                    var indexes = Array.from(obj["$items"].keys());
                    var key = parseInt(indexes[prop] || prop);
                    if (setValue === void 0 || setValue === null) {
                      obj.deleteAt(key);
                    } else {
                      obj.setAt(key, setValue);
                    }
                  } else {
                    obj[prop] = setValue;
                  }
                  return true;
                },
                deleteProperty: function(obj, prop) {
                  if (typeof prop === "number") {
                    obj.deleteAt(prop);
                  } else {
                    delete obj[prop];
                  }
                  return true;
                }
              });
              return value;
            }
            var ArraySchema = (
              /** @class */
              function() {
                function ArraySchema2() {
                  var items = [];
                  for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i] = arguments[_i];
                  }
                  this.$changes = new ChangeTree(this);
                  this.$items = /* @__PURE__ */ new Map();
                  this.$indexes = /* @__PURE__ */ new Map();
                  this.$refId = 0;
                  this.push.apply(this, items);
                }
                ArraySchema2.prototype.onAdd = function(callback, triggerAll) {
                  if (triggerAll === void 0) {
                    triggerAll = true;
                  }
                  return addCallback(this.$callbacks || (this.$callbacks = []), exports4.OPERATION.ADD, callback, triggerAll ? this.$items : void 0);
                };
                ArraySchema2.prototype.onRemove = function(callback) {
                  return addCallback(this.$callbacks || (this.$callbacks = []), exports4.OPERATION.DELETE, callback);
                };
                ArraySchema2.prototype.onChange = function(callback) {
                  return addCallback(this.$callbacks || (this.$callbacks = []), exports4.OPERATION.REPLACE, callback);
                };
                ArraySchema2.is = function(type2) {
                  return (
                    // type format: ["string"]
                    Array.isArray(type2) || // type format: { array: "string" }
                    type2["array"] !== void 0
                  );
                };
                Object.defineProperty(ArraySchema2.prototype, "length", {
                  get: function() {
                    return this.$items.size;
                  },
                  set: function(value) {
                    if (value === 0) {
                      this.clear();
                    } else {
                      this.splice(value, this.length - value);
                    }
                  },
                  enumerable: false,
                  configurable: true
                });
                ArraySchema2.prototype.push = function() {
                  var _this = this;
                  var values = [];
                  for (var _i = 0; _i < arguments.length; _i++) {
                    values[_i] = arguments[_i];
                  }
                  var lastIndex;
                  values.forEach(function(value) {
                    lastIndex = _this.$refId++;
                    _this.setAt(lastIndex, value);
                  });
                  return lastIndex;
                };
                ArraySchema2.prototype.pop = function() {
                  var key = Array.from(this.$indexes.values()).pop();
                  if (key === void 0) {
                    return void 0;
                  }
                  this.$changes.delete(key);
                  this.$indexes.delete(key);
                  var value = this.$items.get(key);
                  this.$items.delete(key);
                  return value;
                };
                ArraySchema2.prototype.at = function(index) {
                  var key = Array.from(this.$items.keys())[index];
                  return this.$items.get(key);
                };
                ArraySchema2.prototype.setAt = function(index, value) {
                  var _a2, _b;
                  if (value["$changes"] !== void 0) {
                    value["$changes"].setParent(this, this.$changes.root, index);
                  }
                  var operation = (_b = (_a2 = this.$changes.indexes[index]) === null || _a2 === void 0 ? void 0 : _a2.op) !== null && _b !== void 0 ? _b : exports4.OPERATION.ADD;
                  this.$changes.indexes[index] = index;
                  this.$indexes.set(index, index);
                  this.$items.set(index, value);
                  this.$changes.change(index, operation);
                };
                ArraySchema2.prototype.deleteAt = function(index) {
                  var key = Array.from(this.$items.keys())[index];
                  if (key === void 0) {
                    return false;
                  }
                  return this.$deleteAt(key);
                };
                ArraySchema2.prototype.$deleteAt = function(index) {
                  this.$changes.delete(index);
                  this.$indexes.delete(index);
                  return this.$items.delete(index);
                };
                ArraySchema2.prototype.clear = function(changes) {
                  this.$changes.discard(true, true);
                  this.$changes.indexes = {};
                  this.$indexes.clear();
                  if (changes) {
                    removeChildRefs.call(this, changes);
                  }
                  this.$items.clear();
                  this.$changes.operation({ index: 0, op: exports4.OPERATION.CLEAR });
                  this.$changes.touchParents();
                };
                ArraySchema2.prototype.concat = function() {
                  var _a2;
                  var items = [];
                  for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i] = arguments[_i];
                  }
                  return new (ArraySchema2.bind.apply(ArraySchema2, __spreadArray([void 0], (_a2 = Array.from(this.$items.values())).concat.apply(_a2, items), false)))();
                };
                ArraySchema2.prototype.join = function(separator) {
                  return Array.from(this.$items.values()).join(separator);
                };
                ArraySchema2.prototype.reverse = function() {
                  var _this = this;
                  var indexes = Array.from(this.$items.keys());
                  var reversedItems = Array.from(this.$items.values()).reverse();
                  reversedItems.forEach(function(item, i) {
                    _this.setAt(indexes[i], item);
                  });
                  return this;
                };
                ArraySchema2.prototype.shift = function() {
                  var indexes = Array.from(this.$items.keys());
                  var shiftAt = indexes.shift();
                  if (shiftAt === void 0) {
                    return void 0;
                  }
                  var value = this.$items.get(shiftAt);
                  this.$deleteAt(shiftAt);
                  return value;
                };
                ArraySchema2.prototype.slice = function(start2, end) {
                  return new (ArraySchema2.bind.apply(ArraySchema2, __spreadArray([void 0], Array.from(this.$items.values()).slice(start2, end), false)))();
                };
                ArraySchema2.prototype.sort = function(compareFn) {
                  var _this = this;
                  if (compareFn === void 0) {
                    compareFn = DEFAULT_SORT;
                  }
                  var indexes = Array.from(this.$items.keys());
                  var sortedItems = Array.from(this.$items.values()).sort(compareFn);
                  sortedItems.forEach(function(item, i) {
                    _this.setAt(indexes[i], item);
                  });
                  return this;
                };
                ArraySchema2.prototype.splice = function(start2, deleteCount) {
                  if (deleteCount === void 0) {
                    deleteCount = this.length - start2;
                  }
                  var indexes = Array.from(this.$items.keys());
                  var removedItems = [];
                  for (var i = start2; i < start2 + deleteCount; i++) {
                    removedItems.push(this.$items.get(indexes[i]));
                    this.$deleteAt(indexes[i]);
                  }
                  return removedItems;
                };
                ArraySchema2.prototype.unshift = function() {
                  var _this = this;
                  var items = [];
                  for (var _i = 0; _i < arguments.length; _i++) {
                    items[_i] = arguments[_i];
                  }
                  var length = this.length;
                  var addedLength = items.length;
                  var previousValues = Array.from(this.$items.values());
                  items.forEach(function(item, i) {
                    _this.setAt(i, item);
                  });
                  previousValues.forEach(function(previousValue, i) {
                    _this.setAt(addedLength + i, previousValue);
                  });
                  return length + addedLength;
                };
                ArraySchema2.prototype.indexOf = function(searchElement, fromIndex) {
                  return Array.from(this.$items.values()).indexOf(searchElement, fromIndex);
                };
                ArraySchema2.prototype.lastIndexOf = function(searchElement, fromIndex) {
                  if (fromIndex === void 0) {
                    fromIndex = this.length - 1;
                  }
                  return Array.from(this.$items.values()).lastIndexOf(searchElement, fromIndex);
                };
                ArraySchema2.prototype.every = function(callbackfn, thisArg) {
                  return Array.from(this.$items.values()).every(callbackfn, thisArg);
                };
                ArraySchema2.prototype.some = function(callbackfn, thisArg) {
                  return Array.from(this.$items.values()).some(callbackfn, thisArg);
                };
                ArraySchema2.prototype.forEach = function(callbackfn, thisArg) {
                  Array.from(this.$items.values()).forEach(callbackfn, thisArg);
                };
                ArraySchema2.prototype.map = function(callbackfn, thisArg) {
                  return Array.from(this.$items.values()).map(callbackfn, thisArg);
                };
                ArraySchema2.prototype.filter = function(callbackfn, thisArg) {
                  return Array.from(this.$items.values()).filter(callbackfn, thisArg);
                };
                ArraySchema2.prototype.reduce = function(callbackfn, initialValue) {
                  return Array.prototype.reduce.apply(Array.from(this.$items.values()), arguments);
                };
                ArraySchema2.prototype.reduceRight = function(callbackfn, initialValue) {
                  return Array.prototype.reduceRight.apply(Array.from(this.$items.values()), arguments);
                };
                ArraySchema2.prototype.find = function(predicate, thisArg) {
                  return Array.from(this.$items.values()).find(predicate, thisArg);
                };
                ArraySchema2.prototype.findIndex = function(predicate, thisArg) {
                  return Array.from(this.$items.values()).findIndex(predicate, thisArg);
                };
                ArraySchema2.prototype.fill = function(value, start2, end) {
                  throw new Error("ArraySchema#fill() not implemented");
                };
                ArraySchema2.prototype.copyWithin = function(target, start2, end) {
                  throw new Error("ArraySchema#copyWithin() not implemented");
                };
                ArraySchema2.prototype.toString = function() {
                  return this.$items.toString();
                };
                ArraySchema2.prototype.toLocaleString = function() {
                  return this.$items.toLocaleString();
                };
                ArraySchema2.prototype[Symbol.iterator] = function() {
                  return Array.from(this.$items.values())[Symbol.iterator]();
                };
                ArraySchema2.prototype.entries = function() {
                  return this.$items.entries();
                };
                ArraySchema2.prototype.keys = function() {
                  return this.$items.keys();
                };
                ArraySchema2.prototype.values = function() {
                  return this.$items.values();
                };
                ArraySchema2.prototype.includes = function(searchElement, fromIndex) {
                  return Array.from(this.$items.values()).includes(searchElement, fromIndex);
                };
                ArraySchema2.prototype.flatMap = function(callback, thisArg) {
                  throw new Error("ArraySchema#flatMap() is not supported.");
                };
                ArraySchema2.prototype.flat = function(depth) {
                  throw new Error("ArraySchema#flat() is not supported.");
                };
                ArraySchema2.prototype.setIndex = function(index, key) {
                  this.$indexes.set(index, key);
                };
                ArraySchema2.prototype.getIndex = function(index) {
                  return this.$indexes.get(index);
                };
                ArraySchema2.prototype.getByIndex = function(index) {
                  return this.$items.get(this.$indexes.get(index));
                };
                ArraySchema2.prototype.deleteByIndex = function(index) {
                  var key = this.$indexes.get(index);
                  this.$items.delete(key);
                  this.$indexes.delete(index);
                };
                ArraySchema2.prototype.toArray = function() {
                  return Array.from(this.$items.values());
                };
                ArraySchema2.prototype.toJSON = function() {
                  return this.toArray().map(function(value) {
                    return typeof value["toJSON"] === "function" ? value["toJSON"]() : value;
                  });
                };
                ArraySchema2.prototype.clone = function(isDecoding) {
                  var cloned;
                  if (isDecoding) {
                    cloned = new (ArraySchema2.bind.apply(ArraySchema2, __spreadArray([void 0], Array.from(this.$items.values()), false)))();
                  } else {
                    cloned = new (ArraySchema2.bind.apply(ArraySchema2, __spreadArray([void 0], this.map(function(item) {
                      return item["$changes"] ? item.clone() : item;
                    }), false)))();
                  }
                  return cloned;
                };
                return ArraySchema2;
              }()
            );
            function getMapProxy(value) {
              value["$proxy"] = true;
              value = new Proxy(value, {
                get: function(obj, prop) {
                  if (typeof prop !== "symbol" && // accessing properties
                  typeof obj[prop] === "undefined") {
                    return obj.get(prop);
                  } else {
                    return obj[prop];
                  }
                },
                set: function(obj, prop, setValue) {
                  if (typeof prop !== "symbol" && (prop.indexOf("$") === -1 && prop !== "onAdd" && prop !== "onRemove" && prop !== "onChange")) {
                    obj.set(prop, setValue);
                  } else {
                    obj[prop] = setValue;
                  }
                  return true;
                },
                deleteProperty: function(obj, prop) {
                  obj.delete(prop);
                  return true;
                }
              });
              return value;
            }
            var MapSchema = (
              /** @class */
              function() {
                function MapSchema2(initialValues) {
                  var _this = this;
                  this.$changes = new ChangeTree(this);
                  this.$items = /* @__PURE__ */ new Map();
                  this.$indexes = /* @__PURE__ */ new Map();
                  this.$refId = 0;
                  if (initialValues) {
                    if (initialValues instanceof Map || initialValues instanceof MapSchema2) {
                      initialValues.forEach(function(v, k2) {
                        return _this.set(k2, v);
                      });
                    } else {
                      for (var k in initialValues) {
                        this.set(k, initialValues[k]);
                      }
                    }
                  }
                }
                MapSchema2.prototype.onAdd = function(callback, triggerAll) {
                  if (triggerAll === void 0) {
                    triggerAll = true;
                  }
                  return addCallback(this.$callbacks || (this.$callbacks = []), exports4.OPERATION.ADD, callback, triggerAll ? this.$items : void 0);
                };
                MapSchema2.prototype.onRemove = function(callback) {
                  return addCallback(this.$callbacks || (this.$callbacks = []), exports4.OPERATION.DELETE, callback);
                };
                MapSchema2.prototype.onChange = function(callback) {
                  return addCallback(this.$callbacks || (this.$callbacks = []), exports4.OPERATION.REPLACE, callback);
                };
                MapSchema2.is = function(type2) {
                  return type2["map"] !== void 0;
                };
                MapSchema2.prototype[Symbol.iterator] = function() {
                  return this.$items[Symbol.iterator]();
                };
                Object.defineProperty(MapSchema2.prototype, Symbol.toStringTag, {
                  get: function() {
                    return this.$items[Symbol.toStringTag];
                  },
                  enumerable: false,
                  configurable: true
                });
                MapSchema2.prototype.set = function(key, value) {
                  if (value === void 0 || value === null) {
                    throw new Error("MapSchema#set('".concat(key, "', ").concat(value, "): trying to set ").concat(value, " value on '").concat(key, "'."));
                  }
                  var hasIndex = typeof this.$changes.indexes[key] !== "undefined";
                  var index = hasIndex ? this.$changes.indexes[key] : this.$refId++;
                  var operation = hasIndex ? exports4.OPERATION.REPLACE : exports4.OPERATION.ADD;
                  var isRef = value["$changes"] !== void 0;
                  if (isRef) {
                    value["$changes"].setParent(this, this.$changes.root, index);
                  }
                  if (!hasIndex) {
                    this.$changes.indexes[key] = index;
                    this.$indexes.set(index, key);
                  } else if (isRef && // if is schema, force ADD operation if value differ from previous one.
                  this.$items.get(key) !== value) {
                    operation = exports4.OPERATION.ADD;
                  }
                  this.$items.set(key, value);
                  this.$changes.change(key, operation);
                  return this;
                };
                MapSchema2.prototype.get = function(key) {
                  return this.$items.get(key);
                };
                MapSchema2.prototype.delete = function(key) {
                  this.$changes.delete(key);
                  return this.$items.delete(key);
                };
                MapSchema2.prototype.clear = function(changes) {
                  this.$changes.discard(true, true);
                  this.$changes.indexes = {};
                  this.$indexes.clear();
                  if (changes) {
                    removeChildRefs.call(this, changes);
                  }
                  this.$items.clear();
                  this.$changes.operation({ index: 0, op: exports4.OPERATION.CLEAR });
                  this.$changes.touchParents();
                };
                MapSchema2.prototype.has = function(key) {
                  return this.$items.has(key);
                };
                MapSchema2.prototype.forEach = function(callbackfn) {
                  this.$items.forEach(callbackfn);
                };
                MapSchema2.prototype.entries = function() {
                  return this.$items.entries();
                };
                MapSchema2.prototype.keys = function() {
                  return this.$items.keys();
                };
                MapSchema2.prototype.values = function() {
                  return this.$items.values();
                };
                Object.defineProperty(MapSchema2.prototype, "size", {
                  get: function() {
                    return this.$items.size;
                  },
                  enumerable: false,
                  configurable: true
                });
                MapSchema2.prototype.setIndex = function(index, key) {
                  this.$indexes.set(index, key);
                };
                MapSchema2.prototype.getIndex = function(index) {
                  return this.$indexes.get(index);
                };
                MapSchema2.prototype.getByIndex = function(index) {
                  return this.$items.get(this.$indexes.get(index));
                };
                MapSchema2.prototype.deleteByIndex = function(index) {
                  var key = this.$indexes.get(index);
                  this.$items.delete(key);
                  this.$indexes.delete(index);
                };
                MapSchema2.prototype.toJSON = function() {
                  var map = {};
                  this.forEach(function(value, key) {
                    map[key] = typeof value["toJSON"] === "function" ? value["toJSON"]() : value;
                  });
                  return map;
                };
                MapSchema2.prototype.clone = function(isDecoding) {
                  var cloned;
                  if (isDecoding) {
                    cloned = Object.assign(new MapSchema2(), this);
                  } else {
                    cloned = new MapSchema2();
                    this.forEach(function(value, key) {
                      if (value["$changes"]) {
                        cloned.set(key, value["clone"]());
                      } else {
                        cloned.set(key, value);
                      }
                    });
                  }
                  return cloned;
                };
                return MapSchema2;
              }()
            );
            var registeredTypes = {};
            function registerType(identifier, definition) {
              registeredTypes[identifier] = definition;
            }
            function getType(identifier) {
              return registeredTypes[identifier];
            }
            var SchemaDefinition = (
              /** @class */
              function() {
                function SchemaDefinition2() {
                  this.indexes = {};
                  this.fieldsByIndex = {};
                  this.deprecated = {};
                  this.descriptors = {};
                }
                SchemaDefinition2.create = function(parent) {
                  var definition = new SchemaDefinition2();
                  definition.schema = Object.assign({}, parent && parent.schema || {});
                  definition.indexes = Object.assign({}, parent && parent.indexes || {});
                  definition.fieldsByIndex = Object.assign({}, parent && parent.fieldsByIndex || {});
                  definition.descriptors = Object.assign({}, parent && parent.descriptors || {});
                  definition.deprecated = Object.assign({}, parent && parent.deprecated || {});
                  return definition;
                };
                SchemaDefinition2.prototype.addField = function(field, type2) {
                  var index = this.getNextFieldIndex();
                  this.fieldsByIndex[index] = field;
                  this.indexes[field] = index;
                  this.schema[field] = Array.isArray(type2) ? { array: type2[0] } : type2;
                };
                SchemaDefinition2.prototype.hasField = function(field) {
                  return this.indexes[field] !== void 0;
                };
                SchemaDefinition2.prototype.addFilter = function(field, cb) {
                  if (!this.filters) {
                    this.filters = {};
                    this.indexesWithFilters = [];
                  }
                  this.filters[this.indexes[field]] = cb;
                  this.indexesWithFilters.push(this.indexes[field]);
                  return true;
                };
                SchemaDefinition2.prototype.addChildrenFilter = function(field, cb) {
                  var index = this.indexes[field];
                  var type2 = this.schema[field];
                  if (getType(Object.keys(type2)[0])) {
                    if (!this.childFilters) {
                      this.childFilters = {};
                    }
                    this.childFilters[index] = cb;
                    return true;
                  } else {
                    console.warn("@filterChildren: field '".concat(field, "' can't have children. Ignoring filter."));
                  }
                };
                SchemaDefinition2.prototype.getChildrenFilter = function(field) {
                  return this.childFilters && this.childFilters[this.indexes[field]];
                };
                SchemaDefinition2.prototype.getNextFieldIndex = function() {
                  return Object.keys(this.schema || {}).length;
                };
                return SchemaDefinition2;
              }()
            );
            function hasFilter(klass) {
              return klass._context && klass._context.useFilters;
            }
            var Context = (
              /** @class */
              function() {
                function Context2() {
                  this.types = {};
                  this.schemas = /* @__PURE__ */ new Map();
                  this.useFilters = false;
                }
                Context2.prototype.has = function(schema) {
                  return this.schemas.has(schema);
                };
                Context2.prototype.get = function(typeid) {
                  return this.types[typeid];
                };
                Context2.prototype.add = function(schema, typeid) {
                  if (typeid === void 0) {
                    typeid = this.schemas.size;
                  }
                  schema._definition = SchemaDefinition.create(schema._definition);
                  schema._typeid = typeid;
                  this.types[typeid] = schema;
                  this.schemas.set(schema, typeid);
                };
                Context2.create = function(options) {
                  if (options === void 0) {
                    options = {};
                  }
                  return function(definition) {
                    if (!options.context) {
                      options.context = new Context2();
                    }
                    return type(definition, options);
                  };
                };
                return Context2;
              }()
            );
            var globalContext = new Context();
            function type(type2, options) {
              if (options === void 0) {
                options = {};
              }
              return function(target, field) {
                var context = options.context || globalContext;
                var constructor = target.constructor;
                constructor._context = context;
                if (!type2) {
                  throw new Error("".concat(constructor.name, ': @type() reference provided for "').concat(field, `" is undefined. Make sure you don't have any circular dependencies.`));
                }
                if (!context.has(constructor)) {
                  context.add(constructor);
                }
                var definition = constructor._definition;
                definition.addField(field, type2);
                if (definition.descriptors[field]) {
                  if (definition.deprecated[field]) {
                    return;
                  } else {
                    try {
                      throw new Error("@colyseus/schema: Duplicate '".concat(field, "' definition on '").concat(constructor.name, "'.\nCheck @type() annotation"));
                    } catch (e) {
                      var definitionAtLine = e.stack.split("\n")[4].trim();
                      throw new Error("".concat(e.message, " ").concat(definitionAtLine));
                    }
                  }
                }
                var isArray = ArraySchema.is(type2);
                var isMap = !isArray && MapSchema.is(type2);
                if (typeof type2 !== "string" && !Schema.is(type2)) {
                  var childType = Object.values(type2)[0];
                  if (typeof childType !== "string" && !context.has(childType)) {
                    context.add(childType);
                  }
                }
                if (options.manual) {
                  definition.descriptors[field] = {
                    enumerable: true,
                    configurable: true,
                    writable: true
                  };
                  return;
                }
                var fieldCached = "_".concat(field);
                definition.descriptors[fieldCached] = {
                  enumerable: false,
                  configurable: false,
                  writable: true
                };
                definition.descriptors[field] = {
                  get: function() {
                    return this[fieldCached];
                  },
                  set: function(value) {
                    if (value === this[fieldCached]) {
                      return;
                    }
                    if (value !== void 0 && value !== null) {
                      if (isArray && !(value instanceof ArraySchema)) {
                        value = new (ArraySchema.bind.apply(ArraySchema, __spreadArray([void 0], value, false)))();
                      }
                      if (isMap && !(value instanceof MapSchema)) {
                        value = new MapSchema(value);
                      }
                      if (value["$proxy"] === void 0) {
                        if (isMap) {
                          value = getMapProxy(value);
                        } else if (isArray) {
                          value = getArrayProxy(value);
                        }
                      }
                      this.$changes.change(field);
                      if (value["$changes"]) {
                        value["$changes"].setParent(this, this.$changes.root, this._definition.indexes[field]);
                      }
                    } else if (this[fieldCached]) {
                      this.$changes.delete(field);
                    }
                    this[fieldCached] = value;
                  },
                  enumerable: true,
                  configurable: true
                };
              };
            }
            function filter(cb) {
              return function(target, field) {
                var constructor = target.constructor;
                var definition = constructor._definition;
                if (definition.addFilter(field, cb)) {
                  constructor._context.useFilters = true;
                }
              };
            }
            function filterChildren(cb) {
              return function(target, field) {
                var constructor = target.constructor;
                var definition = constructor._definition;
                if (definition.addChildrenFilter(field, cb)) {
                  constructor._context.useFilters = true;
                }
              };
            }
            function deprecated(throws) {
              if (throws === void 0) {
                throws = true;
              }
              return function(target, field) {
                var constructor = target.constructor;
                var definition = constructor._definition;
                definition.deprecated[field] = true;
                if (throws) {
                  definition.descriptors[field] = {
                    get: function() {
                      throw new Error("".concat(field, " is deprecated."));
                    },
                    set: function(value) {
                    },
                    enumerable: false,
                    configurable: true
                  };
                }
              };
            }
            function defineTypes(target, fields, options) {
              if (options === void 0) {
                options = {};
              }
              if (!options.context) {
                options.context = target._context || options.context || globalContext;
              }
              for (var field in fields) {
                type(fields[field], options)(target.prototype, field);
              }
              return target;
            }
            function utf8Length2(str) {
              var c = 0, length = 0;
              for (var i = 0, l = str.length; i < l; i++) {
                c = str.charCodeAt(i);
                if (c < 128) {
                  length += 1;
                } else if (c < 2048) {
                  length += 2;
                } else if (c < 55296 || c >= 57344) {
                  length += 3;
                } else {
                  i++;
                  length += 4;
                }
              }
              return length;
            }
            function utf8Write2(view, offset, str) {
              var c = 0;
              for (var i = 0, l = str.length; i < l; i++) {
                c = str.charCodeAt(i);
                if (c < 128) {
                  view[offset++] = c;
                } else if (c < 2048) {
                  view[offset++] = 192 | c >> 6;
                  view[offset++] = 128 | c & 63;
                } else if (c < 55296 || c >= 57344) {
                  view[offset++] = 224 | c >> 12;
                  view[offset++] = 128 | c >> 6 & 63;
                  view[offset++] = 128 | c & 63;
                } else {
                  i++;
                  c = 65536 + ((c & 1023) << 10 | str.charCodeAt(i) & 1023);
                  view[offset++] = 240 | c >> 18;
                  view[offset++] = 128 | c >> 12 & 63;
                  view[offset++] = 128 | c >> 6 & 63;
                  view[offset++] = 128 | c & 63;
                }
              }
            }
            function int8$1(bytes, value) {
              bytes.push(value & 255);
            }
            function uint8$1(bytes, value) {
              bytes.push(value & 255);
            }
            function int16$1(bytes, value) {
              bytes.push(value & 255);
              bytes.push(value >> 8 & 255);
            }
            function uint16$1(bytes, value) {
              bytes.push(value & 255);
              bytes.push(value >> 8 & 255);
            }
            function int32$1(bytes, value) {
              bytes.push(value & 255);
              bytes.push(value >> 8 & 255);
              bytes.push(value >> 16 & 255);
              bytes.push(value >> 24 & 255);
            }
            function uint32$1(bytes, value) {
              var b4 = value >> 24;
              var b3 = value >> 16;
              var b2 = value >> 8;
              var b1 = value;
              bytes.push(b1 & 255);
              bytes.push(b2 & 255);
              bytes.push(b3 & 255);
              bytes.push(b4 & 255);
            }
            function int64$1(bytes, value) {
              var high = Math.floor(value / Math.pow(2, 32));
              var low = value >>> 0;
              uint32$1(bytes, low);
              uint32$1(bytes, high);
            }
            function uint64$1(bytes, value) {
              var high = value / Math.pow(2, 32) >> 0;
              var low = value >>> 0;
              uint32$1(bytes, low);
              uint32$1(bytes, high);
            }
            function float32$1(bytes, value) {
              writeFloat32(bytes, value);
            }
            function float64$1(bytes, value) {
              writeFloat64(bytes, value);
            }
            var _int32$1 = new Int32Array(2);
            var _float32$1 = new Float32Array(_int32$1.buffer);
            var _float64$1 = new Float64Array(_int32$1.buffer);
            function writeFloat32(bytes, value) {
              _float32$1[0] = value;
              int32$1(bytes, _int32$1[0]);
            }
            function writeFloat64(bytes, value) {
              _float64$1[0] = value;
              int32$1(bytes, _int32$1[0]);
              int32$1(bytes, _int32$1[1]);
            }
            function boolean$1(bytes, value) {
              return uint8$1(bytes, value ? 1 : 0);
            }
            function string$1(bytes, value) {
              if (!value) {
                value = "";
              }
              var length = utf8Length2(value);
              var size = 0;
              if (length < 32) {
                bytes.push(length | 160);
                size = 1;
              } else if (length < 256) {
                bytes.push(217);
                uint8$1(bytes, length);
                size = 2;
              } else if (length < 65536) {
                bytes.push(218);
                uint16$1(bytes, length);
                size = 3;
              } else if (length < 4294967296) {
                bytes.push(219);
                uint32$1(bytes, length);
                size = 5;
              } else {
                throw new Error("String too long");
              }
              utf8Write2(bytes, bytes.length, value);
              return size + length;
            }
            function number$1(bytes, value) {
              if (isNaN(value)) {
                return number$1(bytes, 0);
              } else if (!isFinite(value)) {
                return number$1(bytes, value > 0 ? Number.MAX_SAFE_INTEGER : -Number.MAX_SAFE_INTEGER);
              } else if (value !== (value | 0)) {
                bytes.push(203);
                writeFloat64(bytes, value);
                return 9;
              }
              if (value >= 0) {
                if (value < 128) {
                  uint8$1(bytes, value);
                  return 1;
                }
                if (value < 256) {
                  bytes.push(204);
                  uint8$1(bytes, value);
                  return 2;
                }
                if (value < 65536) {
                  bytes.push(205);
                  uint16$1(bytes, value);
                  return 3;
                }
                if (value < 4294967296) {
                  bytes.push(206);
                  uint32$1(bytes, value);
                  return 5;
                }
                bytes.push(207);
                uint64$1(bytes, value);
                return 9;
              } else {
                if (value >= -32) {
                  bytes.push(224 | value + 32);
                  return 1;
                }
                if (value >= -128) {
                  bytes.push(208);
                  int8$1(bytes, value);
                  return 2;
                }
                if (value >= -32768) {
                  bytes.push(209);
                  int16$1(bytes, value);
                  return 3;
                }
                if (value >= -2147483648) {
                  bytes.push(210);
                  int32$1(bytes, value);
                  return 5;
                }
                bytes.push(211);
                int64$1(bytes, value);
                return 9;
              }
            }
            var encode2 = /* @__PURE__ */ Object.freeze({
              __proto__: null,
              utf8Write: utf8Write2,
              int8: int8$1,
              uint8: uint8$1,
              int16: int16$1,
              uint16: uint16$1,
              int32: int32$1,
              uint32: uint32$1,
              int64: int64$1,
              uint64: uint64$1,
              float32: float32$1,
              float64: float64$1,
              writeFloat32,
              writeFloat64,
              boolean: boolean$1,
              string: string$1,
              number: number$1
            });
            function utf8Read2(bytes, offset, length) {
              var string2 = "", chr = 0;
              for (var i = offset, end = offset + length; i < end; i++) {
                var byte = bytes[i];
                if ((byte & 128) === 0) {
                  string2 += String.fromCharCode(byte);
                  continue;
                }
                if ((byte & 224) === 192) {
                  string2 += String.fromCharCode((byte & 31) << 6 | bytes[++i] & 63);
                  continue;
                }
                if ((byte & 240) === 224) {
                  string2 += String.fromCharCode((byte & 15) << 12 | (bytes[++i] & 63) << 6 | (bytes[++i] & 63) << 0);
                  continue;
                }
                if ((byte & 248) === 240) {
                  chr = (byte & 7) << 18 | (bytes[++i] & 63) << 12 | (bytes[++i] & 63) << 6 | (bytes[++i] & 63) << 0;
                  if (chr >= 65536) {
                    chr -= 65536;
                    string2 += String.fromCharCode((chr >>> 10) + 55296, (chr & 1023) + 56320);
                  } else {
                    string2 += String.fromCharCode(chr);
                  }
                  continue;
                }
                console.error("Invalid byte " + byte.toString(16));
              }
              return string2;
            }
            function int8(bytes, it) {
              return uint8(bytes, it) << 24 >> 24;
            }
            function uint8(bytes, it) {
              return bytes[it.offset++];
            }
            function int16(bytes, it) {
              return uint16(bytes, it) << 16 >> 16;
            }
            function uint16(bytes, it) {
              return bytes[it.offset++] | bytes[it.offset++] << 8;
            }
            function int32(bytes, it) {
              return bytes[it.offset++] | bytes[it.offset++] << 8 | bytes[it.offset++] << 16 | bytes[it.offset++] << 24;
            }
            function uint32(bytes, it) {
              return int32(bytes, it) >>> 0;
            }
            function float32(bytes, it) {
              return readFloat32(bytes, it);
            }
            function float64(bytes, it) {
              return readFloat64(bytes, it);
            }
            function int64(bytes, it) {
              var low = uint32(bytes, it);
              var high = int32(bytes, it) * Math.pow(2, 32);
              return high + low;
            }
            function uint64(bytes, it) {
              var low = uint32(bytes, it);
              var high = uint32(bytes, it) * Math.pow(2, 32);
              return high + low;
            }
            var _int32 = new Int32Array(2);
            var _float32 = new Float32Array(_int32.buffer);
            var _float64 = new Float64Array(_int32.buffer);
            function readFloat32(bytes, it) {
              _int32[0] = int32(bytes, it);
              return _float32[0];
            }
            function readFloat64(bytes, it) {
              _int32[0] = int32(bytes, it);
              _int32[1] = int32(bytes, it);
              return _float64[0];
            }
            function boolean(bytes, it) {
              return uint8(bytes, it) > 0;
            }
            function string(bytes, it) {
              var prefix = bytes[it.offset++];
              var length;
              if (prefix < 192) {
                length = prefix & 31;
              } else if (prefix === 217) {
                length = uint8(bytes, it);
              } else if (prefix === 218) {
                length = uint16(bytes, it);
              } else if (prefix === 219) {
                length = uint32(bytes, it);
              }
              var value = utf8Read2(bytes, it.offset, length);
              it.offset += length;
              return value;
            }
            function stringCheck(bytes, it) {
              var prefix = bytes[it.offset];
              return (
                // fixstr
                prefix < 192 && prefix > 160 || // str 8
                prefix === 217 || // str 16
                prefix === 218 || // str 32
                prefix === 219
              );
            }
            function number(bytes, it) {
              var prefix = bytes[it.offset++];
              if (prefix < 128) {
                return prefix;
              } else if (prefix === 202) {
                return readFloat32(bytes, it);
              } else if (prefix === 203) {
                return readFloat64(bytes, it);
              } else if (prefix === 204) {
                return uint8(bytes, it);
              } else if (prefix === 205) {
                return uint16(bytes, it);
              } else if (prefix === 206) {
                return uint32(bytes, it);
              } else if (prefix === 207) {
                return uint64(bytes, it);
              } else if (prefix === 208) {
                return int8(bytes, it);
              } else if (prefix === 209) {
                return int16(bytes, it);
              } else if (prefix === 210) {
                return int32(bytes, it);
              } else if (prefix === 211) {
                return int64(bytes, it);
              } else if (prefix > 223) {
                return (255 - prefix + 1) * -1;
              }
            }
            function numberCheck(bytes, it) {
              var prefix = bytes[it.offset];
              return prefix < 128 || prefix >= 202 && prefix <= 211;
            }
            function arrayCheck(bytes, it) {
              return bytes[it.offset] < 160;
            }
            function switchStructureCheck(bytes, it) {
              return (
                // previous byte should be `SWITCH_TO_STRUCTURE`
                bytes[it.offset - 1] === SWITCH_TO_STRUCTURE && // next byte should be a number
                (bytes[it.offset] < 128 || bytes[it.offset] >= 202 && bytes[it.offset] <= 211)
              );
            }
            var decode2 = /* @__PURE__ */ Object.freeze({
              __proto__: null,
              int8,
              uint8,
              int16,
              uint16,
              int32,
              uint32,
              float32,
              float64,
              int64,
              uint64,
              readFloat32,
              readFloat64,
              boolean,
              string,
              stringCheck,
              number,
              numberCheck,
              arrayCheck,
              switchStructureCheck
            });
            var CollectionSchema = (
              /** @class */
              function() {
                function CollectionSchema2(initialValues) {
                  var _this = this;
                  this.$changes = new ChangeTree(this);
                  this.$items = /* @__PURE__ */ new Map();
                  this.$indexes = /* @__PURE__ */ new Map();
                  this.$refId = 0;
                  if (initialValues) {
                    initialValues.forEach(function(v) {
                      return _this.add(v);
                    });
                  }
                }
                CollectionSchema2.prototype.onAdd = function(callback, triggerAll) {
                  if (triggerAll === void 0) {
                    triggerAll = true;
                  }
                  return addCallback(this.$callbacks || (this.$callbacks = []), exports4.OPERATION.ADD, callback, triggerAll ? this.$items : void 0);
                };
                CollectionSchema2.prototype.onRemove = function(callback) {
                  return addCallback(this.$callbacks || (this.$callbacks = []), exports4.OPERATION.DELETE, callback);
                };
                CollectionSchema2.prototype.onChange = function(callback) {
                  return addCallback(this.$callbacks || (this.$callbacks = []), exports4.OPERATION.REPLACE, callback);
                };
                CollectionSchema2.is = function(type2) {
                  return type2["collection"] !== void 0;
                };
                CollectionSchema2.prototype.add = function(value) {
                  var index = this.$refId++;
                  var isRef = value["$changes"] !== void 0;
                  if (isRef) {
                    value["$changes"].setParent(this, this.$changes.root, index);
                  }
                  this.$changes.indexes[index] = index;
                  this.$indexes.set(index, index);
                  this.$items.set(index, value);
                  this.$changes.change(index);
                  return index;
                };
                CollectionSchema2.prototype.at = function(index) {
                  var key = Array.from(this.$items.keys())[index];
                  return this.$items.get(key);
                };
                CollectionSchema2.prototype.entries = function() {
                  return this.$items.entries();
                };
                CollectionSchema2.prototype.delete = function(item) {
                  var entries = this.$items.entries();
                  var index;
                  var entry;
                  while (entry = entries.next()) {
                    if (entry.done) {
                      break;
                    }
                    if (item === entry.value[1]) {
                      index = entry.value[0];
                      break;
                    }
                  }
                  if (index === void 0) {
                    return false;
                  }
                  this.$changes.delete(index);
                  this.$indexes.delete(index);
                  return this.$items.delete(index);
                };
                CollectionSchema2.prototype.clear = function(changes) {
                  this.$changes.discard(true, true);
                  this.$changes.indexes = {};
                  this.$indexes.clear();
                  if (changes) {
                    removeChildRefs.call(this, changes);
                  }
                  this.$items.clear();
                  this.$changes.operation({ index: 0, op: exports4.OPERATION.CLEAR });
                  this.$changes.touchParents();
                };
                CollectionSchema2.prototype.has = function(value) {
                  return Array.from(this.$items.values()).some(function(v) {
                    return v === value;
                  });
                };
                CollectionSchema2.prototype.forEach = function(callbackfn) {
                  var _this = this;
                  this.$items.forEach(function(value, key, _) {
                    return callbackfn(value, key, _this);
                  });
                };
                CollectionSchema2.prototype.values = function() {
                  return this.$items.values();
                };
                Object.defineProperty(CollectionSchema2.prototype, "size", {
                  get: function() {
                    return this.$items.size;
                  },
                  enumerable: false,
                  configurable: true
                });
                CollectionSchema2.prototype.setIndex = function(index, key) {
                  this.$indexes.set(index, key);
                };
                CollectionSchema2.prototype.getIndex = function(index) {
                  return this.$indexes.get(index);
                };
                CollectionSchema2.prototype.getByIndex = function(index) {
                  return this.$items.get(this.$indexes.get(index));
                };
                CollectionSchema2.prototype.deleteByIndex = function(index) {
                  var key = this.$indexes.get(index);
                  this.$items.delete(key);
                  this.$indexes.delete(index);
                };
                CollectionSchema2.prototype.toArray = function() {
                  return Array.from(this.$items.values());
                };
                CollectionSchema2.prototype.toJSON = function() {
                  var values = [];
                  this.forEach(function(value, key) {
                    values.push(typeof value["toJSON"] === "function" ? value["toJSON"]() : value);
                  });
                  return values;
                };
                CollectionSchema2.prototype.clone = function(isDecoding) {
                  var cloned;
                  if (isDecoding) {
                    cloned = Object.assign(new CollectionSchema2(), this);
                  } else {
                    cloned = new CollectionSchema2();
                    this.forEach(function(value) {
                      if (value["$changes"]) {
                        cloned.add(value["clone"]());
                      } else {
                        cloned.add(value);
                      }
                    });
                  }
                  return cloned;
                };
                return CollectionSchema2;
              }()
            );
            var SetSchema = (
              /** @class */
              function() {
                function SetSchema2(initialValues) {
                  var _this = this;
                  this.$changes = new ChangeTree(this);
                  this.$items = /* @__PURE__ */ new Map();
                  this.$indexes = /* @__PURE__ */ new Map();
                  this.$refId = 0;
                  if (initialValues) {
                    initialValues.forEach(function(v) {
                      return _this.add(v);
                    });
                  }
                }
                SetSchema2.prototype.onAdd = function(callback, triggerAll) {
                  if (triggerAll === void 0) {
                    triggerAll = true;
                  }
                  return addCallback(this.$callbacks || (this.$callbacks = []), exports4.OPERATION.ADD, callback, triggerAll ? this.$items : void 0);
                };
                SetSchema2.prototype.onRemove = function(callback) {
                  return addCallback(this.$callbacks || (this.$callbacks = []), exports4.OPERATION.DELETE, callback);
                };
                SetSchema2.prototype.onChange = function(callback) {
                  return addCallback(this.$callbacks || (this.$callbacks = []), exports4.OPERATION.REPLACE, callback);
                };
                SetSchema2.is = function(type2) {
                  return type2["set"] !== void 0;
                };
                SetSchema2.prototype.add = function(value) {
                  var _a2, _b;
                  if (this.has(value)) {
                    return false;
                  }
                  var index = this.$refId++;
                  if (value["$changes"] !== void 0) {
                    value["$changes"].setParent(this, this.$changes.root, index);
                  }
                  var operation = (_b = (_a2 = this.$changes.indexes[index]) === null || _a2 === void 0 ? void 0 : _a2.op) !== null && _b !== void 0 ? _b : exports4.OPERATION.ADD;
                  this.$changes.indexes[index] = index;
                  this.$indexes.set(index, index);
                  this.$items.set(index, value);
                  this.$changes.change(index, operation);
                  return index;
                };
                SetSchema2.prototype.entries = function() {
                  return this.$items.entries();
                };
                SetSchema2.prototype.delete = function(item) {
                  var entries = this.$items.entries();
                  var index;
                  var entry;
                  while (entry = entries.next()) {
                    if (entry.done) {
                      break;
                    }
                    if (item === entry.value[1]) {
                      index = entry.value[0];
                      break;
                    }
                  }
                  if (index === void 0) {
                    return false;
                  }
                  this.$changes.delete(index);
                  this.$indexes.delete(index);
                  return this.$items.delete(index);
                };
                SetSchema2.prototype.clear = function(changes) {
                  this.$changes.discard(true, true);
                  this.$changes.indexes = {};
                  this.$indexes.clear();
                  if (changes) {
                    removeChildRefs.call(this, changes);
                  }
                  this.$items.clear();
                  this.$changes.operation({ index: 0, op: exports4.OPERATION.CLEAR });
                  this.$changes.touchParents();
                };
                SetSchema2.prototype.has = function(value) {
                  var values = this.$items.values();
                  var has = false;
                  var entry;
                  while (entry = values.next()) {
                    if (entry.done) {
                      break;
                    }
                    if (value === entry.value) {
                      has = true;
                      break;
                    }
                  }
                  return has;
                };
                SetSchema2.prototype.forEach = function(callbackfn) {
                  var _this = this;
                  this.$items.forEach(function(value, key, _) {
                    return callbackfn(value, key, _this);
                  });
                };
                SetSchema2.prototype.values = function() {
                  return this.$items.values();
                };
                Object.defineProperty(SetSchema2.prototype, "size", {
                  get: function() {
                    return this.$items.size;
                  },
                  enumerable: false,
                  configurable: true
                });
                SetSchema2.prototype.setIndex = function(index, key) {
                  this.$indexes.set(index, key);
                };
                SetSchema2.prototype.getIndex = function(index) {
                  return this.$indexes.get(index);
                };
                SetSchema2.prototype.getByIndex = function(index) {
                  return this.$items.get(this.$indexes.get(index));
                };
                SetSchema2.prototype.deleteByIndex = function(index) {
                  var key = this.$indexes.get(index);
                  this.$items.delete(key);
                  this.$indexes.delete(index);
                };
                SetSchema2.prototype.toArray = function() {
                  return Array.from(this.$items.values());
                };
                SetSchema2.prototype.toJSON = function() {
                  var values = [];
                  this.forEach(function(value, key) {
                    values.push(typeof value["toJSON"] === "function" ? value["toJSON"]() : value);
                  });
                  return values;
                };
                SetSchema2.prototype.clone = function(isDecoding) {
                  var cloned;
                  if (isDecoding) {
                    cloned = Object.assign(new SetSchema2(), this);
                  } else {
                    cloned = new SetSchema2();
                    this.forEach(function(value) {
                      if (value["$changes"]) {
                        cloned.add(value["clone"]());
                      } else {
                        cloned.add(value);
                      }
                    });
                  }
                  return cloned;
                };
                return SetSchema2;
              }()
            );
            var ClientState = (
              /** @class */
              function() {
                function ClientState2() {
                  this.refIds = /* @__PURE__ */ new WeakSet();
                  this.containerIndexes = /* @__PURE__ */ new WeakMap();
                }
                ClientState2.prototype.addRefId = function(changeTree) {
                  if (!this.refIds.has(changeTree)) {
                    this.refIds.add(changeTree);
                    this.containerIndexes.set(changeTree, /* @__PURE__ */ new Set());
                  }
                };
                ClientState2.get = function(client2) {
                  if (client2.$filterState === void 0) {
                    client2.$filterState = new ClientState2();
                  }
                  return client2.$filterState;
                };
                return ClientState2;
              }()
            );
            var ReferenceTracker = (
              /** @class */
              function() {
                function ReferenceTracker2() {
                  this.refs = /* @__PURE__ */ new Map();
                  this.refCounts = {};
                  this.deletedRefs = /* @__PURE__ */ new Set();
                  this.nextUniqueId = 0;
                }
                ReferenceTracker2.prototype.getNextUniqueId = function() {
                  return this.nextUniqueId++;
                };
                ReferenceTracker2.prototype.addRef = function(refId, ref, incrementCount) {
                  if (incrementCount === void 0) {
                    incrementCount = true;
                  }
                  this.refs.set(refId, ref);
                  if (incrementCount) {
                    this.refCounts[refId] = (this.refCounts[refId] || 0) + 1;
                  }
                };
                ReferenceTracker2.prototype.removeRef = function(refId) {
                  this.refCounts[refId] = this.refCounts[refId] - 1;
                  this.deletedRefs.add(refId);
                };
                ReferenceTracker2.prototype.clearRefs = function() {
                  this.refs.clear();
                  this.deletedRefs.clear();
                  this.refCounts = {};
                };
                ReferenceTracker2.prototype.garbageCollectDeletedRefs = function() {
                  var _this = this;
                  this.deletedRefs.forEach(function(refId) {
                    if (_this.refCounts[refId] > 0) {
                      return;
                    }
                    var ref = _this.refs.get(refId);
                    if (ref instanceof Schema) {
                      for (var fieldName in ref["_definition"].schema) {
                        if (typeof ref["_definition"].schema[fieldName] !== "string" && ref[fieldName] && ref[fieldName]["$changes"]) {
                          _this.removeRef(ref[fieldName]["$changes"].refId);
                        }
                      }
                    } else {
                      var definition = ref["$changes"].parent._definition;
                      var type2 = definition.schema[definition.fieldsByIndex[ref["$changes"].parentIndex]];
                      if (typeof Object.values(type2)[0] === "function") {
                        Array.from(ref.values()).forEach(function(child) {
                          return _this.removeRef(child["$changes"].refId);
                        });
                      }
                    }
                    _this.refs.delete(refId);
                    delete _this.refCounts[refId];
                  });
                  this.deletedRefs.clear();
                };
                return ReferenceTracker2;
              }()
            );
            var EncodeSchemaError = (
              /** @class */
              function(_super) {
                __extends2(EncodeSchemaError2, _super);
                function EncodeSchemaError2() {
                  return _super !== null && _super.apply(this, arguments) || this;
                }
                return EncodeSchemaError2;
              }(Error)
            );
            function assertType(value, type2, klass, field) {
              var typeofTarget;
              var allowNull = false;
              switch (type2) {
                case "number":
                case "int8":
                case "uint8":
                case "int16":
                case "uint16":
                case "int32":
                case "uint32":
                case "int64":
                case "uint64":
                case "float32":
                case "float64":
                  typeofTarget = "number";
                  if (isNaN(value)) {
                    console.log('trying to encode "NaN" in '.concat(klass.constructor.name, "#").concat(field));
                  }
                  break;
                case "string":
                  typeofTarget = "string";
                  allowNull = true;
                  break;
                case "boolean":
                  return;
              }
              if (typeof value !== typeofTarget && (!allowNull || allowNull && value !== null)) {
                var foundValue = "'".concat(JSON.stringify(value), "'").concat(value && value.constructor && " (".concat(value.constructor.name, ")") || "");
                throw new EncodeSchemaError("a '".concat(typeofTarget, "' was expected, but ").concat(foundValue, " was provided in ").concat(klass.constructor.name, "#").concat(field));
              }
            }
            function assertInstanceType(value, type2, klass, field) {
              if (!(value instanceof type2)) {
                throw new EncodeSchemaError("a '".concat(type2.name, "' was expected, but '").concat(value.constructor.name, "' was provided in ").concat(klass.constructor.name, "#").concat(field));
              }
            }
            function encodePrimitiveType(type2, bytes, value, klass, field) {
              assertType(value, type2, klass, field);
              var encodeFunc = encode2[type2];
              if (encodeFunc) {
                encodeFunc(bytes, value);
              } else {
                throw new EncodeSchemaError("a '".concat(type2, "' was expected, but ").concat(value, " was provided in ").concat(klass.constructor.name, "#").concat(field));
              }
            }
            function decodePrimitiveType(type2, bytes, it) {
              return decode2[type2](bytes, it);
            }
            var Schema = (
              /** @class */
              function() {
                function Schema2() {
                  var args = [];
                  for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                  }
                  Object.defineProperties(this, {
                    $changes: {
                      value: new ChangeTree(this, void 0, new ReferenceTracker()),
                      enumerable: false,
                      writable: true
                    },
                    // $listeners: {
                    //     value: undefined,
                    //     enumerable: false,
                    //     writable: true
                    // },
                    $callbacks: {
                      value: void 0,
                      enumerable: false,
                      writable: true
                    }
                  });
                  var descriptors = this._definition.descriptors;
                  if (descriptors) {
                    Object.defineProperties(this, descriptors);
                  }
                  if (args[0]) {
                    this.assign(args[0]);
                  }
                }
                Schema2.onError = function(e) {
                  console.error(e);
                };
                Schema2.is = function(type2) {
                  return type2["_definition"] && type2["_definition"].schema !== void 0;
                };
                Schema2.prototype.onChange = function(callback) {
                  return addCallback(this.$callbacks || (this.$callbacks = []), exports4.OPERATION.REPLACE, callback);
                };
                Schema2.prototype.onRemove = function(callback) {
                  return addCallback(this.$callbacks || (this.$callbacks = []), exports4.OPERATION.DELETE, callback);
                };
                Schema2.prototype.assign = function(props) {
                  Object.assign(this, props);
                  return this;
                };
                Object.defineProperty(Schema2.prototype, "_definition", {
                  get: function() {
                    return this.constructor._definition;
                  },
                  enumerable: false,
                  configurable: true
                });
                Schema2.prototype.setDirty = function(property, operation) {
                  this.$changes.change(property, operation);
                };
                Schema2.prototype.listen = function(attr, callback) {
                  var _this = this;
                  if (!this.$callbacks) {
                    this.$callbacks = {};
                  }
                  if (!this.$callbacks[attr]) {
                    this.$callbacks[attr] = [];
                  }
                  this.$callbacks[attr].push(callback);
                  return function() {
                    return spliceOne(_this.$callbacks[attr], _this.$callbacks[attr].indexOf(callback));
                  };
                };
                Schema2.prototype.decode = function(bytes, it, ref) {
                  if (it === void 0) {
                    it = { offset: 0 };
                  }
                  if (ref === void 0) {
                    ref = this;
                  }
                  var allChanges = [];
                  var $root = this.$changes.root;
                  var totalBytes = bytes.length;
                  var refId = 0;
                  $root.refs.set(refId, this);
                  while (it.offset < totalBytes) {
                    var byte = bytes[it.offset++];
                    if (byte == SWITCH_TO_STRUCTURE) {
                      refId = number(bytes, it);
                      var nextRef = $root.refs.get(refId);
                      if (!nextRef) {
                        throw new Error('"refId" not found: '.concat(refId));
                      }
                      ref = nextRef;
                      continue;
                    }
                    var changeTree = ref["$changes"];
                    var isSchema = ref["_definition"] !== void 0;
                    var operation = isSchema ? byte >> 6 << 6 : byte;
                    if (operation === exports4.OPERATION.CLEAR) {
                      ref.clear(allChanges);
                      continue;
                    }
                    var fieldIndex = isSchema ? byte % (operation || 255) : number(bytes, it);
                    var fieldName = isSchema ? ref["_definition"].fieldsByIndex[fieldIndex] : "";
                    var type2 = changeTree.getType(fieldIndex);
                    var value = void 0;
                    var previousValue = void 0;
                    var dynamicIndex = void 0;
                    if (!isSchema) {
                      previousValue = ref["getByIndex"](fieldIndex);
                      if ((operation & exports4.OPERATION.ADD) === exports4.OPERATION.ADD) {
                        dynamicIndex = ref instanceof MapSchema ? string(bytes, it) : fieldIndex;
                        ref["setIndex"](fieldIndex, dynamicIndex);
                      } else {
                        dynamicIndex = ref["getIndex"](fieldIndex);
                      }
                    } else {
                      previousValue = ref["_".concat(fieldName)];
                    }
                    if ((operation & exports4.OPERATION.DELETE) === exports4.OPERATION.DELETE) {
                      if (operation !== exports4.OPERATION.DELETE_AND_ADD) {
                        ref["deleteByIndex"](fieldIndex);
                      }
                      if (previousValue && previousValue["$changes"]) {
                        $root.removeRef(previousValue["$changes"].refId);
                      }
                      value = null;
                    }
                    if (fieldName === void 0) {
                      console.warn("@colyseus/schema: definition mismatch");
                      var nextIterator = { offset: it.offset };
                      while (it.offset < totalBytes) {
                        if (switchStructureCheck(bytes, it)) {
                          nextIterator.offset = it.offset + 1;
                          if ($root.refs.has(number(bytes, nextIterator))) {
                            break;
                          }
                        }
                        it.offset++;
                      }
                      continue;
                    } else if (operation === exports4.OPERATION.DELETE)
                      ;
                    else if (Schema2.is(type2)) {
                      var refId_1 = number(bytes, it);
                      value = $root.refs.get(refId_1);
                      if (operation !== exports4.OPERATION.REPLACE) {
                        var childType = this.getSchemaType(bytes, it, type2);
                        if (!value) {
                          value = this.createTypeInstance(childType);
                          value.$changes.refId = refId_1;
                          if (previousValue) {
                            value.$callbacks = previousValue.$callbacks;
                            if (previousValue["$changes"].refId && refId_1 !== previousValue["$changes"].refId) {
                              $root.removeRef(previousValue["$changes"].refId);
                            }
                          }
                        }
                        $root.addRef(refId_1, value, value !== previousValue);
                      }
                    } else if (typeof type2 === "string") {
                      value = decodePrimitiveType(type2, bytes, it);
                    } else {
                      var typeDef = getType(Object.keys(type2)[0]);
                      var refId_2 = number(bytes, it);
                      var valueRef = $root.refs.has(refId_2) ? previousValue || $root.refs.get(refId_2) : new typeDef.constructor();
                      value = valueRef.clone(true);
                      value.$changes.refId = refId_2;
                      if (previousValue) {
                        value["$callbacks"] = previousValue["$callbacks"];
                        if (previousValue["$changes"].refId && refId_2 !== previousValue["$changes"].refId) {
                          $root.removeRef(previousValue["$changes"].refId);
                          var entries = previousValue.entries();
                          var iter = void 0;
                          while ((iter = entries.next()) && !iter.done) {
                            var _a2 = iter.value, key = _a2[0], value_1 = _a2[1];
                            allChanges.push({
                              refId: refId_2,
                              op: exports4.OPERATION.DELETE,
                              field: key,
                              value: void 0,
                              previousValue: value_1
                            });
                          }
                        }
                      }
                      $root.addRef(refId_2, value, valueRef !== previousValue);
                    }
                    if (value !== null && value !== void 0) {
                      if (value["$changes"]) {
                        value["$changes"].setParent(changeTree.ref, changeTree.root, fieldIndex);
                      }
                      if (ref instanceof Schema2) {
                        ref[fieldName] = value;
                      } else if (ref instanceof MapSchema) {
                        var key = dynamicIndex;
                        ref["$items"].set(key, value);
                        ref["$changes"].allChanges.add(fieldIndex);
                      } else if (ref instanceof ArraySchema) {
                        ref.setAt(fieldIndex, value);
                      } else if (ref instanceof CollectionSchema) {
                        var index = ref.add(value);
                        ref["setIndex"](fieldIndex, index);
                      } else if (ref instanceof SetSchema) {
                        var index = ref.add(value);
                        if (index !== false) {
                          ref["setIndex"](fieldIndex, index);
                        }
                      }
                    }
                    if (previousValue !== value) {
                      allChanges.push({
                        refId,
                        op: operation,
                        field: fieldName,
                        dynamicIndex,
                        value,
                        previousValue
                      });
                    }
                  }
                  this._triggerChanges(allChanges);
                  $root.garbageCollectDeletedRefs();
                  return allChanges;
                };
                Schema2.prototype.encode = function(encodeAll, bytes, useFilters) {
                  if (encodeAll === void 0) {
                    encodeAll = false;
                  }
                  if (bytes === void 0) {
                    bytes = [];
                  }
                  if (useFilters === void 0) {
                    useFilters = false;
                  }
                  var rootChangeTree = this.$changes;
                  var refIdsVisited = /* @__PURE__ */ new WeakSet();
                  var changeTrees = [rootChangeTree];
                  var numChangeTrees = 1;
                  for (var i = 0; i < numChangeTrees; i++) {
                    var changeTree = changeTrees[i];
                    var ref = changeTree.ref;
                    var isSchema = ref instanceof Schema2;
                    changeTree.ensureRefId();
                    refIdsVisited.add(changeTree);
                    if (changeTree !== rootChangeTree && (changeTree.changed || encodeAll)) {
                      uint8$1(bytes, SWITCH_TO_STRUCTURE);
                      number$1(bytes, changeTree.refId);
                    }
                    var changes = encodeAll ? Array.from(changeTree.allChanges) : Array.from(changeTree.changes.values());
                    for (var j = 0, cl = changes.length; j < cl; j++) {
                      var operation = encodeAll ? { op: exports4.OPERATION.ADD, index: changes[j] } : changes[j];
                      var fieldIndex = operation.index;
                      var field = isSchema ? ref["_definition"].fieldsByIndex && ref["_definition"].fieldsByIndex[fieldIndex] : fieldIndex;
                      var beginIndex = bytes.length;
                      if (operation.op !== exports4.OPERATION.TOUCH) {
                        if (isSchema) {
                          uint8$1(bytes, fieldIndex | operation.op);
                        } else {
                          uint8$1(bytes, operation.op);
                          if (operation.op === exports4.OPERATION.CLEAR) {
                            continue;
                          }
                          number$1(bytes, fieldIndex);
                        }
                      }
                      if (!isSchema && (operation.op & exports4.OPERATION.ADD) == exports4.OPERATION.ADD) {
                        if (ref instanceof MapSchema) {
                          var dynamicIndex = changeTree.ref["$indexes"].get(fieldIndex);
                          string$1(bytes, dynamicIndex);
                        }
                      }
                      if (operation.op === exports4.OPERATION.DELETE) {
                        continue;
                      }
                      var type2 = changeTree.getType(fieldIndex);
                      var value = changeTree.getValue(fieldIndex);
                      if (value && value["$changes"] && !refIdsVisited.has(value["$changes"])) {
                        changeTrees.push(value["$changes"]);
                        value["$changes"].ensureRefId();
                        numChangeTrees++;
                      }
                      if (operation.op === exports4.OPERATION.TOUCH) {
                        continue;
                      }
                      if (Schema2.is(type2)) {
                        assertInstanceType(value, type2, ref, field);
                        number$1(bytes, value.$changes.refId);
                        if ((operation.op & exports4.OPERATION.ADD) === exports4.OPERATION.ADD) {
                          this.tryEncodeTypeId(bytes, type2, value.constructor);
                        }
                      } else if (typeof type2 === "string") {
                        encodePrimitiveType(type2, bytes, value, ref, field);
                      } else {
                        var definition = getType(Object.keys(type2)[0]);
                        assertInstanceType(ref["_".concat(field)], definition.constructor, ref, field);
                        number$1(bytes, value.$changes.refId);
                      }
                      if (useFilters) {
                        changeTree.cache(fieldIndex, bytes.slice(beginIndex));
                      }
                    }
                    if (!encodeAll && !useFilters) {
                      changeTree.discard();
                    }
                  }
                  return bytes;
                };
                Schema2.prototype.encodeAll = function(useFilters) {
                  return this.encode(true, [], useFilters);
                };
                Schema2.prototype.applyFilters = function(client2, encodeAll) {
                  var _a2, _b;
                  if (encodeAll === void 0) {
                    encodeAll = false;
                  }
                  var root = this;
                  var refIdsDissallowed = /* @__PURE__ */ new Set();
                  var $filterState = ClientState.get(client2);
                  var changeTrees = [this.$changes];
                  var numChangeTrees = 1;
                  var filteredBytes = [];
                  var _loop_1 = function(i2) {
                    var changeTree = changeTrees[i2];
                    if (refIdsDissallowed.has(changeTree.refId)) {
                      return "continue";
                    }
                    var ref = changeTree.ref;
                    var isSchema = ref instanceof Schema2;
                    uint8$1(filteredBytes, SWITCH_TO_STRUCTURE);
                    number$1(filteredBytes, changeTree.refId);
                    var clientHasRefId = $filterState.refIds.has(changeTree);
                    var isEncodeAll = encodeAll || !clientHasRefId;
                    $filterState.addRefId(changeTree);
                    var containerIndexes = $filterState.containerIndexes.get(changeTree);
                    var changes = isEncodeAll ? Array.from(changeTree.allChanges) : Array.from(changeTree.changes.values());
                    if (!encodeAll && isSchema && ref._definition.indexesWithFilters) {
                      var indexesWithFilters = ref._definition.indexesWithFilters;
                      indexesWithFilters.forEach(function(indexWithFilter) {
                        if (!containerIndexes.has(indexWithFilter) && changeTree.allChanges.has(indexWithFilter)) {
                          if (isEncodeAll) {
                            changes.push(indexWithFilter);
                          } else {
                            changes.push({ op: exports4.OPERATION.ADD, index: indexWithFilter });
                          }
                        }
                      });
                    }
                    for (var j = 0, cl = changes.length; j < cl; j++) {
                      var change = isEncodeAll ? { op: exports4.OPERATION.ADD, index: changes[j] } : changes[j];
                      if (change.op === exports4.OPERATION.CLEAR) {
                        uint8$1(filteredBytes, change.op);
                        continue;
                      }
                      var fieldIndex = change.index;
                      if (change.op === exports4.OPERATION.DELETE) {
                        if (isSchema) {
                          uint8$1(filteredBytes, change.op | fieldIndex);
                        } else {
                          uint8$1(filteredBytes, change.op);
                          number$1(filteredBytes, fieldIndex);
                        }
                        continue;
                      }
                      var value = changeTree.getValue(fieldIndex);
                      var type2 = changeTree.getType(fieldIndex);
                      if (isSchema) {
                        var filter2 = ref._definition.filters && ref._definition.filters[fieldIndex];
                        if (filter2 && !filter2.call(ref, client2, value, root)) {
                          if (value && value["$changes"]) {
                            refIdsDissallowed.add(value["$changes"].refId);
                          }
                          continue;
                        }
                      } else {
                        var parent = changeTree.parent;
                        var filter2 = changeTree.getChildrenFilter();
                        if (filter2 && !filter2.call(parent, client2, ref["$indexes"].get(fieldIndex), value, root)) {
                          if (value && value["$changes"]) {
                            refIdsDissallowed.add(value["$changes"].refId);
                          }
                          continue;
                        }
                      }
                      if (value["$changes"]) {
                        changeTrees.push(value["$changes"]);
                        numChangeTrees++;
                      }
                      if (change.op !== exports4.OPERATION.TOUCH) {
                        if (change.op === exports4.OPERATION.ADD || isSchema) {
                          filteredBytes.push.apply(filteredBytes, (_a2 = changeTree.caches[fieldIndex]) !== null && _a2 !== void 0 ? _a2 : []);
                          containerIndexes.add(fieldIndex);
                        } else {
                          if (containerIndexes.has(fieldIndex)) {
                            filteredBytes.push.apply(filteredBytes, (_b = changeTree.caches[fieldIndex]) !== null && _b !== void 0 ? _b : []);
                          } else {
                            containerIndexes.add(fieldIndex);
                            uint8$1(filteredBytes, exports4.OPERATION.ADD);
                            number$1(filteredBytes, fieldIndex);
                            if (ref instanceof MapSchema) {
                              var dynamicIndex = changeTree.ref["$indexes"].get(fieldIndex);
                              string$1(filteredBytes, dynamicIndex);
                            }
                            if (value["$changes"]) {
                              number$1(filteredBytes, value["$changes"].refId);
                            } else {
                              encode2[type2](filteredBytes, value);
                            }
                          }
                        }
                      } else if (value["$changes"] && !isSchema) {
                        uint8$1(filteredBytes, exports4.OPERATION.ADD);
                        number$1(filteredBytes, fieldIndex);
                        if (ref instanceof MapSchema) {
                          var dynamicIndex = changeTree.ref["$indexes"].get(fieldIndex);
                          string$1(filteredBytes, dynamicIndex);
                        }
                        number$1(filteredBytes, value["$changes"].refId);
                      }
                    }
                  };
                  for (var i = 0; i < numChangeTrees; i++) {
                    _loop_1(i);
                  }
                  return filteredBytes;
                };
                Schema2.prototype.clone = function() {
                  var _a2;
                  var cloned = new this.constructor();
                  var schema = this._definition.schema;
                  for (var field in schema) {
                    if (typeof this[field] === "object" && typeof ((_a2 = this[field]) === null || _a2 === void 0 ? void 0 : _a2.clone) === "function") {
                      cloned[field] = this[field].clone();
                    } else {
                      cloned[field] = this[field];
                    }
                  }
                  return cloned;
                };
                Schema2.prototype.toJSON = function() {
                  var schema = this._definition.schema;
                  var deprecated2 = this._definition.deprecated;
                  var obj = {};
                  for (var field in schema) {
                    if (!deprecated2[field] && this[field] !== null && typeof this[field] !== "undefined") {
                      obj[field] = typeof this[field]["toJSON"] === "function" ? this[field]["toJSON"]() : this["_".concat(field)];
                    }
                  }
                  return obj;
                };
                Schema2.prototype.discardAllChanges = function() {
                  this.$changes.discardAll();
                };
                Schema2.prototype.getByIndex = function(index) {
                  return this[this._definition.fieldsByIndex[index]];
                };
                Schema2.prototype.deleteByIndex = function(index) {
                  this[this._definition.fieldsByIndex[index]] = void 0;
                };
                Schema2.prototype.tryEncodeTypeId = function(bytes, type2, targetType) {
                  if (type2._typeid !== targetType._typeid) {
                    uint8$1(bytes, TYPE_ID);
                    number$1(bytes, targetType._typeid);
                  }
                };
                Schema2.prototype.getSchemaType = function(bytes, it, defaultType) {
                  var type2;
                  if (bytes[it.offset] === TYPE_ID) {
                    it.offset++;
                    type2 = this.constructor._context.get(number(bytes, it));
                  }
                  return type2 || defaultType;
                };
                Schema2.prototype.createTypeInstance = function(type2) {
                  var instance = new type2();
                  instance.$changes.root = this.$changes.root;
                  return instance;
                };
                Schema2.prototype._triggerChanges = function(changes) {
                  var _a2, _b, _c, _d, _e, _f, _g, _h, _j;
                  var uniqueRefIds = /* @__PURE__ */ new Set();
                  var $refs = this.$changes.root.refs;
                  var _loop_2 = function(i2) {
                    var change = changes[i2];
                    var refId = change.refId;
                    var ref = $refs.get(refId);
                    var $callbacks = ref["$callbacks"];
                    if ((change.op & exports4.OPERATION.DELETE) === exports4.OPERATION.DELETE && change.previousValue instanceof Schema2) {
                      (_b = (_a2 = change.previousValue["$callbacks"]) === null || _a2 === void 0 ? void 0 : _a2[exports4.OPERATION.DELETE]) === null || _b === void 0 ? void 0 : _b.forEach(function(callback) {
                        return callback();
                      });
                    }
                    if (!$callbacks) {
                      return "continue";
                    }
                    if (ref instanceof Schema2) {
                      if (!uniqueRefIds.has(refId)) {
                        try {
                          (_c = $callbacks === null || $callbacks === void 0 ? void 0 : $callbacks[exports4.OPERATION.REPLACE]) === null || _c === void 0 ? void 0 : _c.forEach(function(callback) {
                            return callback(changes);
                          });
                        } catch (e) {
                          Schema2.onError(e);
                        }
                      }
                      try {
                        if ($callbacks.hasOwnProperty(change.field)) {
                          (_d = $callbacks[change.field]) === null || _d === void 0 ? void 0 : _d.forEach(function(callback) {
                            return callback(change.value, change.previousValue);
                          });
                        }
                      } catch (e) {
                        Schema2.onError(e);
                      }
                    } else {
                      if (change.op === exports4.OPERATION.ADD && change.previousValue === void 0) {
                        (_e = $callbacks[exports4.OPERATION.ADD]) === null || _e === void 0 ? void 0 : _e.forEach(function(callback) {
                          var _a3;
                          return callback(change.value, (_a3 = change.dynamicIndex) !== null && _a3 !== void 0 ? _a3 : change.field);
                        });
                      } else if (change.op === exports4.OPERATION.DELETE) {
                        if (change.previousValue !== void 0) {
                          (_f = $callbacks[exports4.OPERATION.DELETE]) === null || _f === void 0 ? void 0 : _f.forEach(function(callback) {
                            var _a3;
                            return callback(change.previousValue, (_a3 = change.dynamicIndex) !== null && _a3 !== void 0 ? _a3 : change.field);
                          });
                        }
                      } else if (change.op === exports4.OPERATION.DELETE_AND_ADD) {
                        if (change.previousValue !== void 0) {
                          (_g = $callbacks[exports4.OPERATION.DELETE]) === null || _g === void 0 ? void 0 : _g.forEach(function(callback) {
                            var _a3;
                            return callback(change.previousValue, (_a3 = change.dynamicIndex) !== null && _a3 !== void 0 ? _a3 : change.field);
                          });
                        }
                        (_h = $callbacks[exports4.OPERATION.ADD]) === null || _h === void 0 ? void 0 : _h.forEach(function(callback) {
                          var _a3;
                          return callback(change.value, (_a3 = change.dynamicIndex) !== null && _a3 !== void 0 ? _a3 : change.field);
                        });
                      }
                      if (change.value !== change.previousValue) {
                        (_j = $callbacks[exports4.OPERATION.REPLACE]) === null || _j === void 0 ? void 0 : _j.forEach(function(callback) {
                          var _a3;
                          return callback(change.value, (_a3 = change.dynamicIndex) !== null && _a3 !== void 0 ? _a3 : change.field);
                        });
                      }
                    }
                    uniqueRefIds.add(refId);
                  };
                  for (var i = 0; i < changes.length; i++) {
                    _loop_2(i);
                  }
                };
                Schema2._definition = SchemaDefinition.create();
                return Schema2;
              }()
            );
            function dumpChanges(schema) {
              var changeTrees = [schema["$changes"]];
              var numChangeTrees = 1;
              var dump = {};
              var currentStructure = dump;
              var _loop_1 = function(i2) {
                var changeTree = changeTrees[i2];
                changeTree.changes.forEach(function(change) {
                  var ref = changeTree.ref;
                  var fieldIndex = change.index;
                  var field = ref["_definition"] ? ref["_definition"].fieldsByIndex[fieldIndex] : ref["$indexes"].get(fieldIndex);
                  currentStructure[field] = changeTree.getValue(fieldIndex);
                });
              };
              for (var i = 0; i < numChangeTrees; i++) {
                _loop_1(i);
              }
              return dump;
            }
            var reflectionContext = { context: new Context() };
            var ReflectionField = (
              /** @class */
              function(_super) {
                __extends2(ReflectionField2, _super);
                function ReflectionField2() {
                  return _super !== null && _super.apply(this, arguments) || this;
                }
                __decorate([
                  type("string", reflectionContext)
                ], ReflectionField2.prototype, "name", void 0);
                __decorate([
                  type("string", reflectionContext)
                ], ReflectionField2.prototype, "type", void 0);
                __decorate([
                  type("number", reflectionContext)
                ], ReflectionField2.prototype, "referencedType", void 0);
                return ReflectionField2;
              }(Schema)
            );
            var ReflectionType = (
              /** @class */
              function(_super) {
                __extends2(ReflectionType2, _super);
                function ReflectionType2() {
                  var _this = _super !== null && _super.apply(this, arguments) || this;
                  _this.fields = new ArraySchema();
                  return _this;
                }
                __decorate([
                  type("number", reflectionContext)
                ], ReflectionType2.prototype, "id", void 0);
                __decorate([
                  type([ReflectionField], reflectionContext)
                ], ReflectionType2.prototype, "fields", void 0);
                return ReflectionType2;
              }(Schema)
            );
            var Reflection = (
              /** @class */
              function(_super) {
                __extends2(Reflection2, _super);
                function Reflection2() {
                  var _this = _super !== null && _super.apply(this, arguments) || this;
                  _this.types = new ArraySchema();
                  return _this;
                }
                Reflection2.encode = function(instance) {
                  var rootSchemaType = instance.constructor;
                  var reflection = new Reflection2();
                  reflection.rootType = rootSchemaType._typeid;
                  var buildType = function(currentType, schema) {
                    for (var fieldName in schema) {
                      var field = new ReflectionField();
                      field.name = fieldName;
                      var fieldType = void 0;
                      if (typeof schema[fieldName] === "string") {
                        fieldType = schema[fieldName];
                      } else {
                        var type_1 = schema[fieldName];
                        var childTypeSchema = void 0;
                        if (Schema.is(type_1)) {
                          fieldType = "ref";
                          childTypeSchema = schema[fieldName];
                        } else {
                          fieldType = Object.keys(type_1)[0];
                          if (typeof type_1[fieldType] === "string") {
                            fieldType += ":" + type_1[fieldType];
                          } else {
                            childTypeSchema = type_1[fieldType];
                          }
                        }
                        field.referencedType = childTypeSchema ? childTypeSchema._typeid : -1;
                      }
                      field.type = fieldType;
                      currentType.fields.push(field);
                    }
                    reflection.types.push(currentType);
                  };
                  var types = rootSchemaType._context.types;
                  for (var typeid in types) {
                    var type_2 = new ReflectionType();
                    type_2.id = Number(typeid);
                    buildType(type_2, types[typeid]._definition.schema);
                  }
                  return reflection.encodeAll();
                };
                Reflection2.decode = function(bytes, it) {
                  var context = new Context();
                  var reflection = new Reflection2();
                  reflection.decode(bytes, it);
                  var schemaTypes = reflection.types.reduce(function(types, reflectionType) {
                    var schema = (
                      /** @class */
                      function(_super2) {
                        __extends2(_, _super2);
                        function _() {
                          return _super2 !== null && _super2.apply(this, arguments) || this;
                        }
                        return _;
                      }(Schema)
                    );
                    var typeid = reflectionType.id;
                    types[typeid] = schema;
                    context.add(schema, typeid);
                    return types;
                  }, {});
                  reflection.types.forEach(function(reflectionType) {
                    var schemaType = schemaTypes[reflectionType.id];
                    reflectionType.fields.forEach(function(field) {
                      var _a2;
                      if (field.referencedType !== void 0) {
                        var fieldType2 = field.type;
                        var refType = schemaTypes[field.referencedType];
                        if (!refType) {
                          var typeInfo = field.type.split(":");
                          fieldType2 = typeInfo[0];
                          refType = typeInfo[1];
                        }
                        if (fieldType2 === "ref") {
                          type(refType, { context })(schemaType.prototype, field.name);
                        } else {
                          type((_a2 = {}, _a2[fieldType2] = refType, _a2), { context })(schemaType.prototype, field.name);
                        }
                      } else {
                        type(field.type, { context })(schemaType.prototype, field.name);
                      }
                    });
                  });
                  var rootType = schemaTypes[reflection.rootType];
                  var rootInstance = new rootType();
                  for (var fieldName in rootType._definition.schema) {
                    var fieldType = rootType._definition.schema[fieldName];
                    if (typeof fieldType !== "string") {
                      rootInstance[fieldName] = typeof fieldType === "function" ? new fieldType() : new (getType(Object.keys(fieldType)[0])).constructor();
                    }
                  }
                  return rootInstance;
                };
                __decorate([
                  type([ReflectionType], reflectionContext)
                ], Reflection2.prototype, "types", void 0);
                __decorate([
                  type("number", reflectionContext)
                ], Reflection2.prototype, "rootType", void 0);
                return Reflection2;
              }(Schema)
            );
            registerType("map", { constructor: MapSchema });
            registerType("array", { constructor: ArraySchema });
            registerType("set", { constructor: SetSchema });
            registerType("collection", { constructor: CollectionSchema });
            exports4.ArraySchema = ArraySchema;
            exports4.CollectionSchema = CollectionSchema;
            exports4.Context = Context;
            exports4.MapSchema = MapSchema;
            exports4.Reflection = Reflection;
            exports4.ReflectionField = ReflectionField;
            exports4.ReflectionType = ReflectionType;
            exports4.Schema = Schema;
            exports4.SchemaDefinition = SchemaDefinition;
            exports4.SetSchema = SetSchema;
            exports4.decode = decode2;
            exports4.defineTypes = defineTypes;
            exports4.deprecated = deprecated;
            exports4.dumpChanges = dumpChanges;
            exports4.encode = encode2;
            exports4.filter = filter;
            exports4.filterChildren = filterChildren;
            exports4.hasFilter = hasFilter;
            exports4.registerType = registerType;
            exports4.type = type;
            Object.defineProperty(exports4, "__esModule", { value: true });
          });
        });
        var Room2 = (
          /** @class */
          function() {
            function Room3(name, rootSchema) {
              var _this = this;
              this.onStateChange = createSignal();
              this.onError = createSignal();
              this.onLeave = createSignal();
              this.onJoin = createSignal();
              this.hasJoined = false;
              this.onMessageHandlers = createNanoEvents();
              this.roomId = null;
              this.name = name;
              if (rootSchema) {
                this.serializer = new (getSerializer("schema"))();
                this.rootSchema = rootSchema;
                this.serializer.state = new rootSchema();
              }
              this.onError(function(code, message) {
                return console.warn("colyseus.js - onError => (".concat(code, ") ").concat(message));
              });
              this.onLeave(function() {
                return _this.removeAllListeners();
              });
            }
            Object.defineProperty(Room3.prototype, "id", {
              // TODO: deprecate me on version 1.0
              get: function() {
                return this.roomId;
              },
              enumerable: false,
              configurable: true
            });
            Room3.prototype.connect = function(endpoint, devModeCloseCallback, room2) {
              if (room2 === void 0) {
                room2 = this;
              }
              var connection = new Connection();
              room2.connection = connection;
              connection.events.onmessage = Room3.prototype.onMessageCallback.bind(room2);
              connection.events.onclose = function(e) {
                if (!room2.hasJoined) {
                  console.warn("Room connection was closed unexpectedly (".concat(e.code, "): ").concat(e.reason));
                  room2.onError.invoke(e.code, e.reason);
                  return;
                }
                if (e.code === CloseCode.DEVMODE_RESTART && devModeCloseCallback) {
                  devModeCloseCallback();
                } else {
                  room2.onLeave.invoke(e.code);
                  room2.destroy();
                }
              };
              connection.events.onerror = function(e) {
                console.warn("Room, onError (".concat(e.code, "): ").concat(e.reason));
                room2.onError.invoke(e.code, e.reason);
              };
              connection.connect(endpoint);
            };
            Room3.prototype.leave = function(consented) {
              var _this = this;
              if (consented === void 0) {
                consented = true;
              }
              return new Promise(function(resolve) {
                _this.onLeave(function(code) {
                  return resolve(code);
                });
                if (_this.connection) {
                  if (consented) {
                    _this.connection.send([exports2.Protocol.LEAVE_ROOM]);
                  } else {
                    _this.connection.close();
                  }
                } else {
                  _this.onLeave.invoke(CloseCode.CONSENTED);
                }
              });
            };
            Room3.prototype.onMessage = function(type, callback) {
              return this.onMessageHandlers.on(this.getMessageHandlerKey(type), callback);
            };
            Room3.prototype.send = function(type, message) {
              var initialBytes = [exports2.Protocol.ROOM_DATA];
              if (typeof type === "string") {
                umd.encode.string(initialBytes, type);
              } else {
                umd.encode.number(initialBytes, type);
              }
              var arr;
              if (message !== void 0) {
                var encoded = encode(message);
                arr = new Uint8Array(initialBytes.length + encoded.byteLength);
                arr.set(new Uint8Array(initialBytes), 0);
                arr.set(new Uint8Array(encoded), initialBytes.length);
              } else {
                arr = new Uint8Array(initialBytes);
              }
              this.connection.send(arr.buffer);
            };
            Room3.prototype.sendBytes = function(type, bytes) {
              var initialBytes = [exports2.Protocol.ROOM_DATA_BYTES];
              if (typeof type === "string") {
                umd.encode.string(initialBytes, type);
              } else {
                umd.encode.number(initialBytes, type);
              }
              var arr;
              arr = new Uint8Array(initialBytes.length + (bytes.byteLength || bytes.length));
              arr.set(new Uint8Array(initialBytes), 0);
              arr.set(new Uint8Array(bytes), initialBytes.length);
              this.connection.send(arr.buffer);
            };
            Object.defineProperty(Room3.prototype, "state", {
              get: function() {
                return this.serializer.getState();
              },
              enumerable: false,
              configurable: true
            });
            Room3.prototype.removeAllListeners = function() {
              this.onJoin.clear();
              this.onStateChange.clear();
              this.onError.clear();
              this.onLeave.clear();
              this.onMessageHandlers.events = {};
            };
            Room3.prototype.onMessageCallback = function(event) {
              var bytes = Array.from(new Uint8Array(event.data));
              var code = bytes[0];
              if (code === exports2.Protocol.JOIN_ROOM) {
                var offset = 1;
                var reconnectionToken = utf8Read(bytes, offset);
                offset += utf8Length(reconnectionToken);
                this.serializerId = utf8Read(bytes, offset);
                offset += utf8Length(this.serializerId);
                if (!this.serializer) {
                  var serializer = getSerializer(this.serializerId);
                  this.serializer = new serializer();
                }
                if (bytes.length > offset && this.serializer.handshake) {
                  this.serializer.handshake(bytes, { offset });
                }
                this.reconnectionToken = "".concat(this.roomId, ":").concat(reconnectionToken);
                this.hasJoined = true;
                this.onJoin.invoke();
                this.connection.send([exports2.Protocol.JOIN_ROOM]);
              } else if (code === exports2.Protocol.ERROR) {
                var it_1 = { offset: 1 };
                var code_1 = umd.decode.number(bytes, it_1);
                var message = umd.decode.string(bytes, it_1);
                this.onError.invoke(code_1, message);
              } else if (code === exports2.Protocol.LEAVE_ROOM) {
                this.leave();
              } else if (code === exports2.Protocol.ROOM_DATA_SCHEMA) {
                var it_2 = { offset: 1 };
                var context_1 = this.serializer.getState().constructor._context;
                var type = context_1.get(umd.decode.number(bytes, it_2));
                var message = new type();
                message.decode(bytes, it_2);
                this.dispatchMessage(type, message);
              } else if (code === exports2.Protocol.ROOM_STATE) {
                bytes.shift();
                this.setState(bytes);
              } else if (code === exports2.Protocol.ROOM_STATE_PATCH) {
                bytes.shift();
                this.patch(bytes);
              } else if (code === exports2.Protocol.ROOM_DATA) {
                var it_3 = { offset: 1 };
                var type = umd.decode.stringCheck(bytes, it_3) ? umd.decode.string(bytes, it_3) : umd.decode.number(bytes, it_3);
                var message = bytes.length > it_3.offset ? decode(event.data, it_3.offset) : void 0;
                this.dispatchMessage(type, message);
              } else if (code === exports2.Protocol.ROOM_DATA_BYTES) {
                var it_4 = { offset: 1 };
                var type = umd.decode.stringCheck(bytes, it_4) ? umd.decode.string(bytes, it_4) : umd.decode.number(bytes, it_4);
                this.dispatchMessage(type, new Uint8Array(bytes.slice(it_4.offset)));
              }
            };
            Room3.prototype.setState = function(encodedState) {
              this.serializer.setState(encodedState);
              this.onStateChange.invoke(this.serializer.getState());
            };
            Room3.prototype.patch = function(binaryPatch) {
              this.serializer.patch(binaryPatch);
              this.onStateChange.invoke(this.serializer.getState());
            };
            Room3.prototype.dispatchMessage = function(type, message) {
              var messageType = this.getMessageHandlerKey(type);
              if (this.onMessageHandlers.events[messageType]) {
                this.onMessageHandlers.emit(messageType, message);
              } else if (this.onMessageHandlers.events["*"]) {
                this.onMessageHandlers.emit("*", type, message);
              } else {
                console.warn("colyseus.js: onMessage() not registered for type '".concat(type, "'."));
              }
            };
            Room3.prototype.destroy = function() {
              if (this.serializer) {
                this.serializer.teardown();
              }
            };
            Room3.prototype.getMessageHandlerKey = function(type) {
              switch (typeof type) {
                case "function":
                  return "$".concat(type._typeid);
                case "string":
                  return type;
                case "number":
                  return "i".concat(type);
                default:
                  throw new Error("invalid message type.");
              }
            };
            return Room3;
          }()
        );
        var _a;
        var MatchMakeError = (
          /** @class */
          function(_super) {
            __extends(MatchMakeError2, _super);
            function MatchMakeError2(message, code) {
              var _this = _super.call(this, message) || this;
              _this.code = code;
              Object.setPrototypeOf(_this, MatchMakeError2.prototype);
              return _this;
            }
            return MatchMakeError2;
          }(Error)
        );
        var DEFAULT_ENDPOINT = typeof window !== "undefined" && typeof ((_a = window === null || window === void 0 ? void 0 : window.location) === null || _a === void 0 ? void 0 : _a.hostname) !== "undefined" ? "".concat(window.location.protocol.replace("http", "ws"), "//").concat(window.location.hostname).concat(window.location.port && ":".concat(window.location.port)) : "ws://127.0.0.1:2567";
        var Client2 = (
          /** @class */
          function() {
            function Client3(settings) {
              if (settings === void 0) {
                settings = DEFAULT_ENDPOINT;
              }
              if (typeof settings === "string") {
                var url = new URL(settings);
                var secure = url.protocol === "https:" || url.protocol === "wss:";
                var port = Number(url.port || (secure ? 443 : 80));
                this.settings = {
                  hostname: url.hostname,
                  port,
                  secure
                };
              } else {
                if (settings.port === void 0) {
                  settings.port = settings.secure ? 443 : 80;
                }
                this.settings = settings;
              }
            }
            Client3.prototype.joinOrCreate = function(roomName, options, rootSchema) {
              if (options === void 0) {
                options = {};
              }
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      return [4, this.createMatchMakeRequest("joinOrCreate", roomName, options, rootSchema)];
                    case 1:
                      return [2, _a2.sent()];
                  }
                });
              });
            };
            Client3.prototype.create = function(roomName, options, rootSchema) {
              if (options === void 0) {
                options = {};
              }
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      return [4, this.createMatchMakeRequest("create", roomName, options, rootSchema)];
                    case 1:
                      return [2, _a2.sent()];
                  }
                });
              });
            };
            Client3.prototype.join = function(roomName, options, rootSchema) {
              if (options === void 0) {
                options = {};
              }
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      return [4, this.createMatchMakeRequest("join", roomName, options, rootSchema)];
                    case 1:
                      return [2, _a2.sent()];
                  }
                });
              });
            };
            Client3.prototype.joinById = function(roomId, options, rootSchema) {
              if (options === void 0) {
                options = {};
              }
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      return [4, this.createMatchMakeRequest("joinById", roomId, options, rootSchema)];
                    case 1:
                      return [2, _a2.sent()];
                  }
                });
              });
            };
            Client3.prototype.reconnect = function(reconnectionToken, rootSchema) {
              return __awaiter(this, void 0, void 0, function() {
                var _a2, roomId, token;
                return __generator(this, function(_b) {
                  switch (_b.label) {
                    case 0:
                      if (typeof reconnectionToken === "string" && typeof rootSchema === "string") {
                        throw new Error("DEPRECATED: .reconnect() now only accepts 'reconnectionToken' as argument.\nYou can get this token from previously connected `room.reconnectionToken`");
                      }
                      _a2 = reconnectionToken.split(":"), roomId = _a2[0], token = _a2[1];
                      return [4, this.createMatchMakeRequest("reconnect", roomId, { reconnectionToken: token }, rootSchema)];
                    case 1:
                      return [2, _b.sent()];
                  }
                });
              });
            };
            Client3.prototype.getAvailableRooms = function(roomName) {
              if (roomName === void 0) {
                roomName = "";
              }
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      return [4, get_1(this.getHttpEndpoint("".concat(roomName)), {
                        headers: {
                          "Accept": "application/json"
                        }
                      })];
                    case 1:
                      return [2, _a2.sent().data];
                  }
                });
              });
            };
            Client3.prototype.consumeSeatReservation = function(response, rootSchema, previousRoom) {
              return __awaiter(this, void 0, void 0, function() {
                var room2, options, targetRoom;
                var _this = this;
                return __generator(this, function(_a2) {
                  room2 = this.createRoom(response.room.name, rootSchema);
                  room2.roomId = response.room.roomId;
                  room2.sessionId = response.sessionId;
                  options = { sessionId: room2.sessionId };
                  if (response.reconnectionToken) {
                    options.reconnectionToken = response.reconnectionToken;
                  }
                  targetRoom = previousRoom || room2;
                  room2.connect(this.buildEndpoint(response.room, options), response.devMode && function() {
                    return __awaiter(_this, void 0, void 0, function() {
                      var retryCount, retryMaxRetries, retryReconnection;
                      var _this2 = this;
                      return __generator(this, function(_a3) {
                        console.info("[Colyseus devMode]: ".concat(String.fromCodePoint(128260), " Re-establishing connection with room id '").concat(room2.roomId, "'..."));
                        retryCount = 0;
                        retryMaxRetries = 8;
                        retryReconnection = function() {
                          return __awaiter(_this2, void 0, void 0, function() {
                            return __generator(this, function(_a4) {
                              switch (_a4.label) {
                                case 0:
                                  retryCount++;
                                  _a4.label = 1;
                                case 1:
                                  _a4.trys.push([1, 3, , 4]);
                                  return [4, this.consumeSeatReservation(response, rootSchema, targetRoom)];
                                case 2:
                                  _a4.sent();
                                  console.info("[Colyseus devMode]: ".concat(String.fromCodePoint(9989), " Successfully re-established connection with room '").concat(room2.roomId, "'"));
                                  return [3, 4];
                                case 3:
                                  _a4.sent();
                                  if (retryCount < retryMaxRetries) {
                                    console.info("[Colyseus devMode]: ".concat(String.fromCodePoint(128260), " retrying... (").concat(retryCount, " out of ").concat(retryMaxRetries, ")"));
                                    setTimeout(retryReconnection, 2e3);
                                  } else {
                                    console.info("[Colyseus devMode]: ".concat(String.fromCodePoint(10060), " Failed to reconnect. Is your server running? Please check server logs."));
                                  }
                                  return [3, 4];
                                case 4:
                                  return [
                                    2
                                    /*return*/
                                  ];
                              }
                            });
                          });
                        };
                        setTimeout(retryReconnection, 2e3);
                        return [
                          2
                          /*return*/
                        ];
                      });
                    });
                  }, targetRoom);
                  return [2, new Promise(function(resolve, reject) {
                    var onError = function(code, message) {
                      return reject(new ServerError(code, message));
                    };
                    targetRoom.onError.once(onError);
                    targetRoom["onJoin"].once(function() {
                      targetRoom.onError.remove(onError);
                      resolve(targetRoom);
                    });
                  })];
                });
              });
            };
            Client3.prototype.createMatchMakeRequest = function(method, roomName, options, rootSchema) {
              if (options === void 0) {
                options = {};
              }
              return __awaiter(this, void 0, void 0, function() {
                var response;
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      return [4, post_1(this.getHttpEndpoint("".concat(method, "/").concat(roomName)), {
                        headers: {
                          "Accept": "application/json",
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify(options)
                      })];
                    case 1:
                      response = _a2.sent().data;
                      if (response.error) {
                        throw new MatchMakeError(response.error, response.code);
                      }
                      if (method === "reconnect") {
                        response.reconnectionToken = options.reconnectionToken;
                      }
                      return [4, this.consumeSeatReservation(response, rootSchema)];
                    case 2:
                      return [2, _a2.sent()];
                  }
                });
              });
            };
            Client3.prototype.createRoom = function(roomName, rootSchema) {
              return new Room2(roomName, rootSchema);
            };
            Client3.prototype.buildEndpoint = function(room2, options) {
              if (options === void 0) {
                options = {};
              }
              var params = [];
              for (var name_1 in options) {
                if (!options.hasOwnProperty(name_1)) {
                  continue;
                }
                params.push("".concat(name_1, "=").concat(options[name_1]));
              }
              var endpoint = this.settings.secure ? "wss://" : "ws://";
              if (room2.publicAddress) {
                endpoint += "".concat(room2.publicAddress);
              } else {
                endpoint += "".concat(this.settings.hostname).concat(this.getEndpointPort());
              }
              return "".concat(endpoint, "/").concat(room2.processId, "/").concat(room2.roomId, "?").concat(params.join("&"));
            };
            Client3.prototype.getHttpEndpoint = function(segments) {
              return "".concat(this.settings.secure ? "https" : "http", "://").concat(this.settings.hostname).concat(this.getEndpointPort(), "/matchmake/").concat(segments);
            };
            Client3.prototype.getEndpointPort = function() {
              return this.settings.port !== 80 && this.settings.port !== 443 ? ":".concat(this.settings.port) : "";
            };
            return Client3;
          }()
        );
        var storage;
        function getStorage() {
          if (!storage) {
            storage = typeof cc !== "undefined" && cc.sys && cc.sys.localStorage ? cc.sys.localStorage : typeof window !== "undefined" && window.localStorage ? window.localStorage : {
              cache: {},
              setItem: function(key, value) {
                this.cache[key] = value;
              },
              getItem: function(key) {
                this.cache[key];
              },
              removeItem: function(key) {
                delete this.cache[key];
              }
            };
          }
          return storage;
        }
        function setItem(key, value) {
          getStorage().setItem(key, value);
        }
        function removeItem(key) {
          getStorage().removeItem(key);
        }
        function getItem(key, callback) {
          var value = getStorage().getItem(key);
          if (typeof Promise === "undefined" || // old browsers
          !(value instanceof Promise)) {
            callback(value);
          } else {
            value.then(function(id) {
              return callback(id);
            });
          }
        }
        var TOKEN_STORAGE = "colyseus-auth-token";
        exports2.Platform = void 0;
        (function(Platform) {
          Platform["ios"] = "ios";
          Platform["android"] = "android";
        })(exports2.Platform || (exports2.Platform = {}));
        var Auth = (
          /** @class */
          function() {
            function Auth2(endpoint) {
              var _this = this;
              this._id = void 0;
              this.username = void 0;
              this.displayName = void 0;
              this.avatarUrl = void 0;
              this.isAnonymous = void 0;
              this.email = void 0;
              this.lang = void 0;
              this.location = void 0;
              this.timezone = void 0;
              this.metadata = void 0;
              this.devices = void 0;
              this.facebookId = void 0;
              this.twitterId = void 0;
              this.googleId = void 0;
              this.gameCenterId = void 0;
              this.steamId = void 0;
              this.friendIds = void 0;
              this.blockedUserIds = void 0;
              this.createdAt = void 0;
              this.updatedAt = void 0;
              this.token = void 0;
              this.endpoint = endpoint.replace("ws", "http");
              getItem(TOKEN_STORAGE, function(token) {
                return _this.token = token;
              });
            }
            Object.defineProperty(Auth2.prototype, "hasToken", {
              get: function() {
                return !!this.token;
              },
              enumerable: false,
              configurable: true
            });
            Auth2.prototype.login = function(options) {
              if (options === void 0) {
                options = {};
              }
              return __awaiter(this, void 0, void 0, function() {
                var queryParams, data, attr;
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      queryParams = Object.assign({}, options);
                      if (this.hasToken) {
                        queryParams.token = this.token;
                      }
                      return [4, this.request("post", "/auth", queryParams)];
                    case 1:
                      data = _a2.sent();
                      this.token = data.token;
                      setItem(TOKEN_STORAGE, this.token);
                      for (attr in data) {
                        if (this.hasOwnProperty(attr)) {
                          this[attr] = data[attr];
                        }
                      }
                      this.registerPingService();
                      return [2, this];
                  }
                });
              });
            };
            Auth2.prototype.save = function() {
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      return [4, this.request("put", "/auth", {}, {
                        username: this.username,
                        displayName: this.displayName,
                        avatarUrl: this.avatarUrl,
                        lang: this.lang,
                        location: this.location,
                        timezone: this.timezone
                      })];
                    case 1:
                      _a2.sent();
                      return [2, this];
                  }
                });
              });
            };
            Auth2.prototype.getFriends = function() {
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      return [4, this.request("get", "/friends/all")];
                    case 1:
                      return [2, _a2.sent()];
                  }
                });
              });
            };
            Auth2.prototype.getOnlineFriends = function() {
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      return [4, this.request("get", "/friends/online")];
                    case 1:
                      return [2, _a2.sent()];
                  }
                });
              });
            };
            Auth2.prototype.getFriendRequests = function() {
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      return [4, this.request("get", "/friends/requests")];
                    case 1:
                      return [2, _a2.sent()];
                  }
                });
              });
            };
            Auth2.prototype.sendFriendRequest = function(friendId) {
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      return [4, this.request("post", "/friends/requests", { userId: friendId })];
                    case 1:
                      return [2, _a2.sent()];
                  }
                });
              });
            };
            Auth2.prototype.acceptFriendRequest = function(friendId) {
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      return [4, this.request("put", "/friends/requests", { userId: friendId })];
                    case 1:
                      return [2, _a2.sent()];
                  }
                });
              });
            };
            Auth2.prototype.declineFriendRequest = function(friendId) {
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      return [4, this.request("del", "/friends/requests", { userId: friendId })];
                    case 1:
                      return [2, _a2.sent()];
                  }
                });
              });
            };
            Auth2.prototype.blockUser = function(friendId) {
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      return [4, this.request("post", "/friends/block", { userId: friendId })];
                    case 1:
                      return [2, _a2.sent()];
                  }
                });
              });
            };
            Auth2.prototype.unblockUser = function(friendId) {
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      return [4, this.request("put", "/friends/block", { userId: friendId })];
                    case 1:
                      return [2, _a2.sent()];
                  }
                });
              });
            };
            Auth2.prototype.request = function(method, segments, query, body, headers) {
              if (query === void 0) {
                query = {};
              }
              if (headers === void 0) {
                headers = {};
              }
              return __awaiter(this, void 0, void 0, function() {
                var queryParams, name_1, queryString, opts;
                return __generator(this, function(_a2) {
                  switch (_a2.label) {
                    case 0:
                      headers["Accept"] = "application/json";
                      if (this.hasToken) {
                        headers["Authorization"] = "Bearer " + this.token;
                      }
                      queryParams = [];
                      for (name_1 in query) {
                        queryParams.push("".concat(name_1, "=").concat(query[name_1]));
                      }
                      queryString = queryParams.length > 0 ? "?".concat(queryParams.join("&")) : "";
                      opts = { headers };
                      if (body) {
                        opts.body = body;
                      }
                      return [4, http[method]("".concat(this.endpoint).concat(segments).concat(queryString), opts)];
                    case 1:
                      return [2, _a2.sent().data];
                  }
                });
              });
            };
            Auth2.prototype.logout = function() {
              this.token = void 0;
              removeItem(TOKEN_STORAGE);
              this.unregisterPingService();
            };
            Auth2.prototype.registerPingService = function(timeout) {
              var _this = this;
              if (timeout === void 0) {
                timeout = 15e3;
              }
              this.unregisterPingService();
              this.keepOnlineInterval = setInterval(function() {
                return _this.request("get", "/auth");
              }, timeout);
            };
            Auth2.prototype.unregisterPingService = function() {
              clearInterval(this.keepOnlineInterval);
            };
            return Auth2;
          }()
        );
        var SchemaSerializer = (
          /** @class */
          function() {
            function SchemaSerializer2() {
            }
            SchemaSerializer2.prototype.setState = function(rawState) {
              return this.state.decode(rawState);
            };
            SchemaSerializer2.prototype.getState = function() {
              return this.state;
            };
            SchemaSerializer2.prototype.patch = function(patches) {
              return this.state.decode(patches);
            };
            SchemaSerializer2.prototype.teardown = function() {
              var _a2, _b;
              (_b = (_a2 = this.state) === null || _a2 === void 0 ? void 0 : _a2["$changes"]) === null || _b === void 0 ? void 0 : _b.root.clearRefs();
            };
            SchemaSerializer2.prototype.handshake = function(bytes, it) {
              if (this.state) {
                var reflection = new umd.Reflection();
                reflection.decode(bytes, it);
              } else {
                this.state = umd.Reflection.decode(bytes, it);
              }
            };
            return SchemaSerializer2;
          }()
        );
        var NoneSerializer = (
          /** @class */
          function() {
            function NoneSerializer2() {
            }
            NoneSerializer2.prototype.setState = function(rawState) {
            };
            NoneSerializer2.prototype.getState = function() {
              return null;
            };
            NoneSerializer2.prototype.patch = function(patches) {
            };
            NoneSerializer2.prototype.teardown = function() {
            };
            NoneSerializer2.prototype.handshake = function(bytes) {
            };
            return NoneSerializer2;
          }()
        );
        registerSerializer("schema", SchemaSerializer);
        registerSerializer("none", NoneSerializer);
        exports2.Auth = Auth;
        exports2.Client = Client2;
        exports2.Room = Room2;
        exports2.SchemaSerializer = SchemaSerializer;
        exports2.registerSerializer = registerSerializer;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    }
  });

  // src/gameWorld.ts
  var import_colyseus = __toESM(require_colyseus());

  // src/circle.ts
  var Circle = class {
    constructor(radius = 1, x = 0, y = 0) {
      this.center = { x: 0, y: 0 };
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.center = { x, y };
    }
  };
  var RenderCircle = class {
    constructor(ctx2, radius = 30, x = 0, y = 0, currentColor = "black", strokeColor = "rgba(0,0,0,0)") {
      this.fillColor = "black";
      this.strokeColor = this.fillColor;
      this.ctx = ctx2;
      this.fillColor = currentColor;
      this.strokeColor = strokeColor;
      this.circle = new Circle(radius, x, y);
      this.update();
    }
    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.circle.x, this.circle.y, this.circle.radius, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.fill();
    }
    update() {
      this.ctx.fillStyle = this.fillColor;
      this.ctx.strokeStyle = this.strokeColor;
      this.draw();
    }
    updatePosition(x, y) {
      this.circle.x = x;
      this.circle.y = y;
      this.circle.center = { x, y };
    }
    move(keys2) {
      if (keys2.w.pressed) {
        this.updatePosition(this.circle.x, this.circle.y -= 1);
      }
      if (keys2.s.pressed) {
        this.updatePosition(this.circle.x, this.circle.y += 1);
      }
      if (keys2.a.pressed) {
        this.updatePosition(this.circle.x -= 1, this.circle.y);
      }
      if (keys2.d.pressed) {
        this.updatePosition(this.circle.x += 1, this.circle.y);
      }
    }
    checkInside(ray) {
      if ((ray.p1.x - this.circle.x) ** 2 + (ray.p1.y - this.circle.y) ** 2 <= this.circle.radius ** 2) {
        return true;
      } else {
        return false;
      }
    }
  };

  // src/linear_operations.ts
  var lerp = (p1, p2, t) => {
    let xComp = p1.x + t * (p2.x - p1.x);
    let yComp = p1.y + t * (p2.y - p1.y);
    return { x: xComp, y: yComp };
  };

  // src/gameWorld.ts
  var client = new import_colyseus.Client("ws://localhost/80");
  var canvas = document.getElementById(
    "container"
  );
  var ctx = canvas.getContext("2d");
  var serverPositions = {};
  var players = /* @__PURE__ */ new Map();
  var room;
  var create = async () => {
    await join();
    room.state.players.onAdd((player, sessionId) => {
      players.set(
        sessionId,
        new RenderCircle(ctx, 15, player.x, player.y, "cyan")
      );
      if (sessionId !== room.sessionId) {
        player.onChange(() => {
          serverPositions[sessionId] = { x: player.x, y: player.y };
        });
      }
    });
  };
  var join = async () => {
    room = await client.joinOrCreate("hub");
    console.log("joined successfully", room.id);
  };
  try {
    create();
  } catch (e) {
    console.error("create error", e);
  }
  var keys = {
    w: {
      pressed: false
    },
    s: {
      pressed: false
    },
    a: {
      pressed: false
    },
    d: {
      pressed: false
    }
  };
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var draw = () => {
    if (players.size != 0) {
      for (let player of players.values()) {
        player.update();
      }
    }
  };
  var frameTime = 0;
  var lastLoop = performance.now();
  var displayFPS = () => {
    let thisLoop = performance.now();
    let thisFrameTime = thisLoop - lastLoop;
    frameTime += (thisFrameTime - frameTime) / 100;
    lastLoop = thisLoop;
    let frames = (1e3 / frameTime).toFixed(0) + " FPS";
    ctx.fillStyle = "cyan";
    ctx.font = "normal 28px Arial";
    ctx.fillText(frames, canvas.width - 140, 40);
  };
  var start;
  var update = (timestamp) => {
    if (!start)
      start = timestamp;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (room) {
      let clientPlayer = players.get(room.sessionId);
      room.send("move", keys);
      const velocity = 1;
      if (clientPlayer) {
        if (keys.w.pressed)
          clientPlayer.updatePosition(
            clientPlayer.circle.x,
            clientPlayer.circle.y -= velocity
          );
        if (keys.s.pressed)
          clientPlayer.updatePosition(
            clientPlayer.circle.x,
            clientPlayer.circle.y += velocity
          );
        if (keys.a.pressed)
          clientPlayer.updatePosition(
            clientPlayer.circle.x -= velocity,
            clientPlayer.circle.y
          );
        if (keys.d.pressed)
          clientPlayer.updatePosition(
            clientPlayer.circle.x += velocity,
            clientPlayer.circle.y
          );
      }
      for (let sessionId of players.keys()) {
        if (sessionId === room.sessionId) {
          continue;
        }
        const player = players.get(sessionId);
        const serverPlayer = room.state.players.get(sessionId);
        const lerpPos = lerp(player.circle.center, serverPositions[sessionId], 0.2);
        if (serverPlayer) {
          player.updatePosition(lerpPos.x, lerpPos.y);
        }
      }
    }
    displayFPS();
    draw();
    requestAnimationFrame(update);
  };
  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "w":
        keys.w.pressed = true;
        break;
      case "s":
        keys.s.pressed = true;
        break;
      case "a":
        keys.a.pressed = true;
        break;
      case "d":
        keys.d.pressed = true;
        break;
    }
  });
  window.addEventListener("keyup", (event) => {
    switch (event.key) {
      case "w":
        keys.w.pressed = false;
        break;
      case "s":
        keys.s.pressed = false;
        break;
      case "a":
        keys.a.pressed = false;
        break;
      case "d":
        keys.d.pressed = false;
        break;
    }
  });
  requestAnimationFrame(update);
})();
