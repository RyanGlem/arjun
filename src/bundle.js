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
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // node_modules/@colyseus/schema/build/umd/index.js
  var require_umd = __commonJS({
    "node_modules/@colyseus/schema/build/umd/index.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.schema = {}));
      })(exports, function(exports2) {
        "use strict";
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p2 in b2)
              if (Object.prototype.hasOwnProperty.call(b2, p2))
                d2[p2] = b2[p2];
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
        exports2.OPERATION = void 0;
        (function(OPERATION) {
          OPERATION[OPERATION["ADD"] = 128] = "ADD";
          OPERATION[OPERATION["REPLACE"] = 0] = "REPLACE";
          OPERATION[OPERATION["DELETE"] = 64] = "DELETE";
          OPERATION[OPERATION["DELETE_AND_ADD"] = 192] = "DELETE_AND_ADD";
          OPERATION[OPERATION["TOUCH"] = 1] = "TOUCH";
          OPERATION[OPERATION["CLEAR"] = 10] = "CLEAR";
        })(exports2.OPERATION || (exports2.OPERATION = {}));
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
                this.indexes = this.ref instanceof Schema2 ? this.ref["_definition"].indexes : {};
              }
              this.parent = parent;
              this.parentIndex = parentIndex;
              if (!root) {
                return;
              }
              this.root = root;
              if (this.ref instanceof Schema2) {
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
                  if (value2 instanceof Schema2) {
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
                operation = exports2.OPERATION.ADD;
              }
              var index = typeof fieldName === "number" ? fieldName : this.indexes[fieldName];
              this.assertValidIndex(index, fieldName);
              var previousChange = this.changes.get(index);
              if (!previousChange || previousChange.op === exports2.OPERATION.DELETE || previousChange.op === exports2.OPERATION.TOUCH) {
                this.changes.set(index, {
                  op: !previousChange ? operation : previousChange.op === exports2.OPERATION.DELETE ? exports2.OPERATION.DELETE_AND_ADD : operation,
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
                this.changes.set(index, { op: exports2.OPERATION.TOUCH, index });
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
              this.changes.set(index, { op: exports2.OPERATION.DELETE, index });
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
              if (!(this.ref instanceof Schema2)) {
                this.changes.forEach(function(change) {
                  if (change.op === exports2.OPERATION.DELETE) {
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
              op: exports2.OPERATION.DELETE,
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
        var ArraySchema2 = (
          /** @class */
          function() {
            function ArraySchema3() {
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
            ArraySchema3.prototype.onAdd = function(callback, triggerAll) {
              if (triggerAll === void 0) {
                triggerAll = true;
              }
              return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.ADD, callback, triggerAll ? this.$items : void 0);
            };
            ArraySchema3.prototype.onRemove = function(callback) {
              return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.DELETE, callback);
            };
            ArraySchema3.prototype.onChange = function(callback) {
              return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.REPLACE, callback);
            };
            ArraySchema3.is = function(type3) {
              return (
                // type format: ["string"]
                Array.isArray(type3) || // type format: { array: "string" }
                type3["array"] !== void 0
              );
            };
            Object.defineProperty(ArraySchema3.prototype, "length", {
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
            ArraySchema3.prototype.push = function() {
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
            ArraySchema3.prototype.pop = function() {
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
            ArraySchema3.prototype.at = function(index) {
              var key = Array.from(this.$items.keys())[index];
              return this.$items.get(key);
            };
            ArraySchema3.prototype.setAt = function(index, value) {
              var _a, _b;
              if (value["$changes"] !== void 0) {
                value["$changes"].setParent(this, this.$changes.root, index);
              }
              var operation = (_b = (_a = this.$changes.indexes[index]) === null || _a === void 0 ? void 0 : _a.op) !== null && _b !== void 0 ? _b : exports2.OPERATION.ADD;
              this.$changes.indexes[index] = index;
              this.$indexes.set(index, index);
              this.$items.set(index, value);
              this.$changes.change(index, operation);
            };
            ArraySchema3.prototype.deleteAt = function(index) {
              var key = Array.from(this.$items.keys())[index];
              if (key === void 0) {
                return false;
              }
              return this.$deleteAt(key);
            };
            ArraySchema3.prototype.$deleteAt = function(index) {
              this.$changes.delete(index);
              this.$indexes.delete(index);
              return this.$items.delete(index);
            };
            ArraySchema3.prototype.clear = function(changes) {
              this.$changes.discard(true, true);
              this.$changes.indexes = {};
              this.$indexes.clear();
              if (changes) {
                removeChildRefs.call(this, changes);
              }
              this.$items.clear();
              this.$changes.operation({ index: 0, op: exports2.OPERATION.CLEAR });
              this.$changes.touchParents();
            };
            ArraySchema3.prototype.concat = function() {
              var _a;
              var items = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                items[_i] = arguments[_i];
              }
              return new (ArraySchema3.bind.apply(ArraySchema3, __spreadArray([void 0], (_a = Array.from(this.$items.values())).concat.apply(_a, items), false)))();
            };
            ArraySchema3.prototype.join = function(separator) {
              return Array.from(this.$items.values()).join(separator);
            };
            ArraySchema3.prototype.reverse = function() {
              var _this = this;
              var indexes = Array.from(this.$items.keys());
              var reversedItems = Array.from(this.$items.values()).reverse();
              reversedItems.forEach(function(item, i) {
                _this.setAt(indexes[i], item);
              });
              return this;
            };
            ArraySchema3.prototype.shift = function() {
              var indexes = Array.from(this.$items.keys());
              var shiftAt = indexes.shift();
              if (shiftAt === void 0) {
                return void 0;
              }
              var value = this.$items.get(shiftAt);
              this.$deleteAt(shiftAt);
              return value;
            };
            ArraySchema3.prototype.slice = function(start2, end) {
              var sliced = new ArraySchema3();
              sliced.push.apply(sliced, Array.from(this.$items.values()).slice(start2, end));
              return sliced;
            };
            ArraySchema3.prototype.sort = function(compareFn) {
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
            ArraySchema3.prototype.splice = function(start2, deleteCount) {
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
            ArraySchema3.prototype.unshift = function() {
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
            ArraySchema3.prototype.indexOf = function(searchElement, fromIndex) {
              return Array.from(this.$items.values()).indexOf(searchElement, fromIndex);
            };
            ArraySchema3.prototype.lastIndexOf = function(searchElement, fromIndex) {
              if (fromIndex === void 0) {
                fromIndex = this.length - 1;
              }
              return Array.from(this.$items.values()).lastIndexOf(searchElement, fromIndex);
            };
            ArraySchema3.prototype.every = function(callbackfn, thisArg) {
              return Array.from(this.$items.values()).every(callbackfn, thisArg);
            };
            ArraySchema3.prototype.some = function(callbackfn, thisArg) {
              return Array.from(this.$items.values()).some(callbackfn, thisArg);
            };
            ArraySchema3.prototype.forEach = function(callbackfn, thisArg) {
              Array.from(this.$items.values()).forEach(callbackfn, thisArg);
            };
            ArraySchema3.prototype.map = function(callbackfn, thisArg) {
              return Array.from(this.$items.values()).map(callbackfn, thisArg);
            };
            ArraySchema3.prototype.filter = function(callbackfn, thisArg) {
              return Array.from(this.$items.values()).filter(callbackfn, thisArg);
            };
            ArraySchema3.prototype.reduce = function(callbackfn, initialValue) {
              return Array.prototype.reduce.apply(Array.from(this.$items.values()), arguments);
            };
            ArraySchema3.prototype.reduceRight = function(callbackfn, initialValue) {
              return Array.prototype.reduceRight.apply(Array.from(this.$items.values()), arguments);
            };
            ArraySchema3.prototype.find = function(predicate, thisArg) {
              return Array.from(this.$items.values()).find(predicate, thisArg);
            };
            ArraySchema3.prototype.findIndex = function(predicate, thisArg) {
              return Array.from(this.$items.values()).findIndex(predicate, thisArg);
            };
            ArraySchema3.prototype.fill = function(value, start2, end) {
              throw new Error("ArraySchema#fill() not implemented");
            };
            ArraySchema3.prototype.copyWithin = function(target, start2, end) {
              throw new Error("ArraySchema#copyWithin() not implemented");
            };
            ArraySchema3.prototype.toString = function() {
              return this.$items.toString();
            };
            ArraySchema3.prototype.toLocaleString = function() {
              return this.$items.toLocaleString();
            };
            ArraySchema3.prototype[Symbol.iterator] = function() {
              return Array.from(this.$items.values())[Symbol.iterator]();
            };
            ArraySchema3.prototype.entries = function() {
              return this.$items.entries();
            };
            ArraySchema3.prototype.keys = function() {
              return this.$items.keys();
            };
            ArraySchema3.prototype.values = function() {
              return this.$items.values();
            };
            ArraySchema3.prototype.includes = function(searchElement, fromIndex) {
              return Array.from(this.$items.values()).includes(searchElement, fromIndex);
            };
            ArraySchema3.prototype.flatMap = function(callback, thisArg) {
              throw new Error("ArraySchema#flatMap() is not supported.");
            };
            ArraySchema3.prototype.flat = function(depth) {
              throw new Error("ArraySchema#flat() is not supported.");
            };
            ArraySchema3.prototype.findLast = function() {
              var arr = Array.from(this.$items.values());
              return arr.findLast.apply(arr, arguments);
            };
            ArraySchema3.prototype.findLastIndex = function() {
              var arr = Array.from(this.$items.values());
              return arr.findLastIndex.apply(arr, arguments);
            };
            ArraySchema3.prototype.setIndex = function(index, key) {
              this.$indexes.set(index, key);
            };
            ArraySchema3.prototype.getIndex = function(index) {
              return this.$indexes.get(index);
            };
            ArraySchema3.prototype.getByIndex = function(index) {
              return this.$items.get(this.$indexes.get(index));
            };
            ArraySchema3.prototype.deleteByIndex = function(index) {
              var key = this.$indexes.get(index);
              this.$items.delete(key);
              this.$indexes.delete(index);
            };
            ArraySchema3.prototype.toArray = function() {
              return Array.from(this.$items.values());
            };
            ArraySchema3.prototype.toJSON = function() {
              return this.toArray().map(function(value) {
                return typeof value["toJSON"] === "function" ? value["toJSON"]() : value;
              });
            };
            ArraySchema3.prototype.clone = function(isDecoding) {
              var cloned;
              if (isDecoding) {
                cloned = new (ArraySchema3.bind.apply(ArraySchema3, __spreadArray([void 0], Array.from(this.$items.values()), false)))();
              } else {
                cloned = new (ArraySchema3.bind.apply(ArraySchema3, __spreadArray([void 0], this.map(function(item) {
                  return item["$changes"] ? item.clone() : item;
                }), false)))();
              }
              return cloned;
            };
            return ArraySchema3;
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
        var MapSchema2 = (
          /** @class */
          function() {
            function MapSchema3(initialValues) {
              var _this = this;
              this.$changes = new ChangeTree(this);
              this.$items = /* @__PURE__ */ new Map();
              this.$indexes = /* @__PURE__ */ new Map();
              this.$refId = 0;
              if (initialValues) {
                if (initialValues instanceof Map || initialValues instanceof MapSchema3) {
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
            MapSchema3.prototype.onAdd = function(callback, triggerAll) {
              if (triggerAll === void 0) {
                triggerAll = true;
              }
              return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.ADD, callback, triggerAll ? this.$items : void 0);
            };
            MapSchema3.prototype.onRemove = function(callback) {
              return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.DELETE, callback);
            };
            MapSchema3.prototype.onChange = function(callback) {
              return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.REPLACE, callback);
            };
            MapSchema3.is = function(type3) {
              return type3["map"] !== void 0;
            };
            MapSchema3.prototype[Symbol.iterator] = function() {
              return this.$items[Symbol.iterator]();
            };
            Object.defineProperty(MapSchema3.prototype, Symbol.toStringTag, {
              get: function() {
                return this.$items[Symbol.toStringTag];
              },
              enumerable: false,
              configurable: true
            });
            MapSchema3.prototype.set = function(key, value) {
              if (value === void 0 || value === null) {
                throw new Error("MapSchema#set('".concat(key, "', ").concat(value, "): trying to set ").concat(value, " value on '").concat(key, "'."));
              }
              var hasIndex = typeof this.$changes.indexes[key] !== "undefined";
              var index = hasIndex ? this.$changes.indexes[key] : this.$refId++;
              var operation = hasIndex ? exports2.OPERATION.REPLACE : exports2.OPERATION.ADD;
              var isRef = value["$changes"] !== void 0;
              if (isRef) {
                value["$changes"].setParent(this, this.$changes.root, index);
              }
              if (!hasIndex) {
                this.$changes.indexes[key] = index;
                this.$indexes.set(index, key);
              } else if (isRef && // if is schema, force ADD operation if value differ from previous one.
              this.$items.get(key) !== value) {
                operation = exports2.OPERATION.ADD;
              }
              this.$items.set(key, value);
              this.$changes.change(key, operation);
              return this;
            };
            MapSchema3.prototype.get = function(key) {
              return this.$items.get(key);
            };
            MapSchema3.prototype.delete = function(key) {
              this.$changes.delete(key);
              return this.$items.delete(key);
            };
            MapSchema3.prototype.clear = function(changes) {
              this.$changes.discard(true, true);
              this.$changes.indexes = {};
              this.$indexes.clear();
              if (changes) {
                removeChildRefs.call(this, changes);
              }
              this.$items.clear();
              this.$changes.operation({ index: 0, op: exports2.OPERATION.CLEAR });
              this.$changes.touchParents();
            };
            MapSchema3.prototype.has = function(key) {
              return this.$items.has(key);
            };
            MapSchema3.prototype.forEach = function(callbackfn) {
              this.$items.forEach(callbackfn);
            };
            MapSchema3.prototype.entries = function() {
              return this.$items.entries();
            };
            MapSchema3.prototype.keys = function() {
              return this.$items.keys();
            };
            MapSchema3.prototype.values = function() {
              return this.$items.values();
            };
            Object.defineProperty(MapSchema3.prototype, "size", {
              get: function() {
                return this.$items.size;
              },
              enumerable: false,
              configurable: true
            });
            MapSchema3.prototype.setIndex = function(index, key) {
              this.$indexes.set(index, key);
            };
            MapSchema3.prototype.getIndex = function(index) {
              return this.$indexes.get(index);
            };
            MapSchema3.prototype.getByIndex = function(index) {
              return this.$items.get(this.$indexes.get(index));
            };
            MapSchema3.prototype.deleteByIndex = function(index) {
              var key = this.$indexes.get(index);
              this.$items.delete(key);
              this.$indexes.delete(index);
            };
            MapSchema3.prototype.toJSON = function() {
              var map = {};
              this.forEach(function(value, key) {
                map[key] = typeof value["toJSON"] === "function" ? value["toJSON"]() : value;
              });
              return map;
            };
            MapSchema3.prototype.clone = function(isDecoding) {
              var cloned;
              if (isDecoding) {
                cloned = Object.assign(new MapSchema3(), this);
              } else {
                cloned = new MapSchema3();
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
            return MapSchema3;
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
            SchemaDefinition2.prototype.addField = function(field, type3) {
              var index = this.getNextFieldIndex();
              this.fieldsByIndex[index] = field;
              this.indexes[field] = index;
              this.schema[field] = Array.isArray(type3) ? { array: type3[0] } : type3;
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
              var type3 = this.schema[field];
              if (getType(Object.keys(type3)[0])) {
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
                return type2(definition, options);
              };
            };
            return Context2;
          }()
        );
        var globalContext = new Context();
        function type2(type3, options) {
          if (options === void 0) {
            options = {};
          }
          return function(target, field) {
            var context = options.context || globalContext;
            var constructor = target.constructor;
            constructor._context = context;
            if (!type3) {
              throw new Error("".concat(constructor.name, ': @type() reference provided for "').concat(field, `" is undefined. Make sure you don't have any circular dependencies.`));
            }
            if (!context.has(constructor)) {
              context.add(constructor);
            }
            var definition = constructor._definition;
            definition.addField(field, type3);
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
            var isArray = ArraySchema2.is(type3);
            var isMap = !isArray && MapSchema2.is(type3);
            if (typeof type3 !== "string" && !Schema2.is(type3)) {
              var childType = Object.values(type3)[0];
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
                  if (isArray && !(value instanceof ArraySchema2)) {
                    value = new (ArraySchema2.bind.apply(ArraySchema2, __spreadArray([void 0], value, false)))();
                  }
                  if (isMap && !(value instanceof MapSchema2)) {
                    value = new MapSchema2(value);
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
            type2(fields[field], options)(target.prototype, field);
          }
          return target;
        }
        function utf8Length(str) {
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
        function utf8Write(view, offset, str) {
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
          var length = utf8Length(value);
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
          utf8Write(bytes, bytes.length, value);
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
        var encode = /* @__PURE__ */ Object.freeze({
          __proto__: null,
          utf8Write,
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
        function utf8Read(bytes, offset, length) {
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
          var value = utf8Read(bytes, it.offset, length);
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
        var decode = /* @__PURE__ */ Object.freeze({
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
              return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.ADD, callback, triggerAll ? this.$items : void 0);
            };
            CollectionSchema2.prototype.onRemove = function(callback) {
              return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.DELETE, callback);
            };
            CollectionSchema2.prototype.onChange = function(callback) {
              return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.REPLACE, callback);
            };
            CollectionSchema2.is = function(type3) {
              return type3["collection"] !== void 0;
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
              this.$changes.operation({ index: 0, op: exports2.OPERATION.CLEAR });
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
              return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.ADD, callback, triggerAll ? this.$items : void 0);
            };
            SetSchema2.prototype.onRemove = function(callback) {
              return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.DELETE, callback);
            };
            SetSchema2.prototype.onChange = function(callback) {
              return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.REPLACE, callback);
            };
            SetSchema2.is = function(type3) {
              return type3["set"] !== void 0;
            };
            SetSchema2.prototype.add = function(value) {
              var _a, _b;
              if (this.has(value)) {
                return false;
              }
              var index = this.$refId++;
              if (value["$changes"] !== void 0) {
                value["$changes"].setParent(this, this.$changes.root, index);
              }
              var operation = (_b = (_a = this.$changes.indexes[index]) === null || _a === void 0 ? void 0 : _a.op) !== null && _b !== void 0 ? _b : exports2.OPERATION.ADD;
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
              this.$changes.operation({ index: 0, op: exports2.OPERATION.CLEAR });
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
            ClientState2.get = function(client) {
              if (client.$filterState === void 0) {
                client.$filterState = new ClientState2();
              }
              return client.$filterState;
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
                if (ref instanceof Schema2) {
                  for (var fieldName in ref["_definition"].schema) {
                    if (typeof ref["_definition"].schema[fieldName] !== "string" && ref[fieldName] && ref[fieldName]["$changes"]) {
                      _this.removeRef(ref[fieldName]["$changes"].refId);
                    }
                  }
                } else {
                  var definition = ref["$changes"].parent._definition;
                  var type3 = definition.schema[definition.fieldsByIndex[ref["$changes"].parentIndex]];
                  if (typeof Object.values(type3)[0] === "function") {
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
            __extends(EncodeSchemaError2, _super);
            function EncodeSchemaError2() {
              return _super !== null && _super.apply(this, arguments) || this;
            }
            return EncodeSchemaError2;
          }(Error)
        );
        function assertType(value, type3, klass, field) {
          var typeofTarget;
          var allowNull = false;
          switch (type3) {
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
        function assertInstanceType(value, type3, klass, field) {
          if (!(value instanceof type3)) {
            throw new EncodeSchemaError("a '".concat(type3.name, "' was expected, but '").concat(value.constructor.name, "' was provided in ").concat(klass.constructor.name, "#").concat(field));
          }
        }
        function encodePrimitiveType(type3, bytes, value, klass, field) {
          assertType(value, type3, klass, field);
          var encodeFunc = encode[type3];
          if (encodeFunc) {
            encodeFunc(bytes, value);
          } else {
            throw new EncodeSchemaError("a '".concat(type3, "' was expected, but ").concat(value, " was provided in ").concat(klass.constructor.name, "#").concat(field));
          }
        }
        function decodePrimitiveType(type3, bytes, it) {
          return decode[type3](bytes, it);
        }
        var Schema2 = (
          /** @class */
          function() {
            function Schema3() {
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
            Schema3.onError = function(e) {
              console.error(e);
            };
            Schema3.is = function(type3) {
              return type3["_definition"] && type3["_definition"].schema !== void 0;
            };
            Schema3.prototype.onChange = function(callback) {
              return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.REPLACE, callback);
            };
            Schema3.prototype.onRemove = function(callback) {
              return addCallback(this.$callbacks || (this.$callbacks = []), exports2.OPERATION.DELETE, callback);
            };
            Schema3.prototype.assign = function(props) {
              Object.assign(this, props);
              return this;
            };
            Object.defineProperty(Schema3.prototype, "_definition", {
              get: function() {
                return this.constructor._definition;
              },
              enumerable: false,
              configurable: true
            });
            Schema3.prototype.setDirty = function(property, operation) {
              this.$changes.change(property, operation);
            };
            Schema3.prototype.listen = function(attr, callback) {
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
            Schema3.prototype.decode = function(bytes, it, ref) {
              var _a;
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
                if (operation === exports2.OPERATION.CLEAR) {
                  ref.clear(allChanges);
                  continue;
                }
                var fieldIndex = isSchema ? byte % (operation || 255) : number(bytes, it);
                var fieldName = isSchema ? ref["_definition"].fieldsByIndex[fieldIndex] : "";
                var type3 = changeTree.getType(fieldIndex);
                var value = void 0;
                var previousValue = void 0;
                var dynamicIndex = void 0;
                if (!isSchema) {
                  previousValue = ref["getByIndex"](fieldIndex);
                  if ((operation & exports2.OPERATION.ADD) === exports2.OPERATION.ADD) {
                    dynamicIndex = ref instanceof MapSchema2 ? string(bytes, it) : fieldIndex;
                    ref["setIndex"](fieldIndex, dynamicIndex);
                  } else {
                    dynamicIndex = ref["getIndex"](fieldIndex);
                  }
                } else {
                  previousValue = ref["_".concat(fieldName)];
                }
                if ((operation & exports2.OPERATION.DELETE) === exports2.OPERATION.DELETE) {
                  if (operation !== exports2.OPERATION.DELETE_AND_ADD) {
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
                } else if (operation === exports2.OPERATION.DELETE)
                  ;
                else if (Schema3.is(type3)) {
                  var refId_1 = number(bytes, it);
                  value = $root.refs.get(refId_1);
                  if (operation !== exports2.OPERATION.REPLACE) {
                    var childType = this.getSchemaType(bytes, it, type3);
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
                } else if (typeof type3 === "string") {
                  value = decodePrimitiveType(type3, bytes, it);
                } else {
                  var typeDef = getType(Object.keys(type3)[0]);
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
                        var key = (_a = iter.value, _a[0]), value_1 = _a[1];
                        allChanges.push({
                          refId: refId_2,
                          op: exports2.OPERATION.DELETE,
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
                  if (ref instanceof Schema3) {
                    ref[fieldName] = value;
                  } else if (ref instanceof MapSchema2) {
                    var key = dynamicIndex;
                    ref["$items"].set(key, value);
                    ref["$changes"].allChanges.add(fieldIndex);
                  } else if (ref instanceof ArraySchema2) {
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
            Schema3.prototype.encode = function(encodeAll, bytes, useFilters) {
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
                var isSchema = ref instanceof Schema3;
                changeTree.ensureRefId();
                refIdsVisited.add(changeTree);
                if (changeTree !== rootChangeTree && (changeTree.changed || encodeAll)) {
                  uint8$1(bytes, SWITCH_TO_STRUCTURE);
                  number$1(bytes, changeTree.refId);
                }
                var changes = encodeAll ? Array.from(changeTree.allChanges) : Array.from(changeTree.changes.values());
                for (var j = 0, cl = changes.length; j < cl; j++) {
                  var operation = encodeAll ? { op: exports2.OPERATION.ADD, index: changes[j] } : changes[j];
                  var fieldIndex = operation.index;
                  var field = isSchema ? ref["_definition"].fieldsByIndex && ref["_definition"].fieldsByIndex[fieldIndex] : fieldIndex;
                  var beginIndex = bytes.length;
                  if (operation.op !== exports2.OPERATION.TOUCH) {
                    if (isSchema) {
                      uint8$1(bytes, fieldIndex | operation.op);
                    } else {
                      uint8$1(bytes, operation.op);
                      if (operation.op === exports2.OPERATION.CLEAR) {
                        continue;
                      }
                      number$1(bytes, fieldIndex);
                    }
                  }
                  if (!isSchema && (operation.op & exports2.OPERATION.ADD) == exports2.OPERATION.ADD) {
                    if (ref instanceof MapSchema2) {
                      var dynamicIndex = changeTree.ref["$indexes"].get(fieldIndex);
                      string$1(bytes, dynamicIndex);
                    }
                  }
                  if (operation.op === exports2.OPERATION.DELETE) {
                    continue;
                  }
                  var type3 = changeTree.getType(fieldIndex);
                  var value = changeTree.getValue(fieldIndex);
                  if (value && value["$changes"] && !refIdsVisited.has(value["$changes"])) {
                    changeTrees.push(value["$changes"]);
                    value["$changes"].ensureRefId();
                    numChangeTrees++;
                  }
                  if (operation.op === exports2.OPERATION.TOUCH) {
                    continue;
                  }
                  if (Schema3.is(type3)) {
                    assertInstanceType(value, type3, ref, field);
                    number$1(bytes, value.$changes.refId);
                    if ((operation.op & exports2.OPERATION.ADD) === exports2.OPERATION.ADD) {
                      this.tryEncodeTypeId(bytes, type3, value.constructor);
                    }
                  } else if (typeof type3 === "string") {
                    encodePrimitiveType(type3, bytes, value, ref, field);
                  } else {
                    var definition = getType(Object.keys(type3)[0]);
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
            Schema3.prototype.encodeAll = function(useFilters) {
              return this.encode(true, [], useFilters);
            };
            Schema3.prototype.applyFilters = function(client, encodeAll) {
              var _a, _b;
              if (encodeAll === void 0) {
                encodeAll = false;
              }
              var root = this;
              var refIdsDissallowed = /* @__PURE__ */ new Set();
              var $filterState = ClientState.get(client);
              var changeTrees = [this.$changes];
              var numChangeTrees = 1;
              var filteredBytes = [];
              var _loop_1 = function(i2) {
                var changeTree = changeTrees[i2];
                if (refIdsDissallowed.has(changeTree.refId)) {
                  return "continue";
                }
                var ref = changeTree.ref;
                var isSchema = ref instanceof Schema3;
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
                        changes.push({ op: exports2.OPERATION.ADD, index: indexWithFilter });
                      }
                    }
                  });
                }
                for (var j = 0, cl = changes.length; j < cl; j++) {
                  var change = isEncodeAll ? { op: exports2.OPERATION.ADD, index: changes[j] } : changes[j];
                  if (change.op === exports2.OPERATION.CLEAR) {
                    uint8$1(filteredBytes, change.op);
                    continue;
                  }
                  var fieldIndex = change.index;
                  if (change.op === exports2.OPERATION.DELETE) {
                    if (isSchema) {
                      uint8$1(filteredBytes, change.op | fieldIndex);
                    } else {
                      uint8$1(filteredBytes, change.op);
                      number$1(filteredBytes, fieldIndex);
                    }
                    continue;
                  }
                  var value = changeTree.getValue(fieldIndex);
                  var type3 = changeTree.getType(fieldIndex);
                  if (isSchema) {
                    var filter2 = ref._definition.filters && ref._definition.filters[fieldIndex];
                    if (filter2 && !filter2.call(ref, client, value, root)) {
                      if (value && value["$changes"]) {
                        refIdsDissallowed.add(value["$changes"].refId);
                      }
                      continue;
                    }
                  } else {
                    var parent = changeTree.parent;
                    var filter2 = changeTree.getChildrenFilter();
                    if (filter2 && !filter2.call(parent, client, ref["$indexes"].get(fieldIndex), value, root)) {
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
                  if (change.op !== exports2.OPERATION.TOUCH) {
                    if (change.op === exports2.OPERATION.ADD || isSchema) {
                      filteredBytes.push.apply(filteredBytes, (_a = changeTree.caches[fieldIndex]) !== null && _a !== void 0 ? _a : []);
                      containerIndexes.add(fieldIndex);
                    } else {
                      if (containerIndexes.has(fieldIndex)) {
                        filteredBytes.push.apply(filteredBytes, (_b = changeTree.caches[fieldIndex]) !== null && _b !== void 0 ? _b : []);
                      } else {
                        containerIndexes.add(fieldIndex);
                        uint8$1(filteredBytes, exports2.OPERATION.ADD);
                        number$1(filteredBytes, fieldIndex);
                        if (ref instanceof MapSchema2) {
                          var dynamicIndex = changeTree.ref["$indexes"].get(fieldIndex);
                          string$1(filteredBytes, dynamicIndex);
                        }
                        if (value["$changes"]) {
                          number$1(filteredBytes, value["$changes"].refId);
                        } else {
                          encode[type3](filteredBytes, value);
                        }
                      }
                    }
                  } else if (value["$changes"] && !isSchema) {
                    uint8$1(filteredBytes, exports2.OPERATION.ADD);
                    number$1(filteredBytes, fieldIndex);
                    if (ref instanceof MapSchema2) {
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
            Schema3.prototype.clone = function() {
              var _a;
              var cloned = new this.constructor();
              var schema = this._definition.schema;
              for (var field in schema) {
                if (typeof this[field] === "object" && typeof ((_a = this[field]) === null || _a === void 0 ? void 0 : _a.clone) === "function") {
                  cloned[field] = this[field].clone();
                } else {
                  cloned[field] = this[field];
                }
              }
              return cloned;
            };
            Schema3.prototype.toJSON = function() {
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
            Schema3.prototype.discardAllChanges = function() {
              this.$changes.discardAll();
            };
            Schema3.prototype.getByIndex = function(index) {
              return this[this._definition.fieldsByIndex[index]];
            };
            Schema3.prototype.deleteByIndex = function(index) {
              this[this._definition.fieldsByIndex[index]] = void 0;
            };
            Schema3.prototype.tryEncodeTypeId = function(bytes, type3, targetType) {
              if (type3._typeid !== targetType._typeid) {
                uint8$1(bytes, TYPE_ID);
                number$1(bytes, targetType._typeid);
              }
            };
            Schema3.prototype.getSchemaType = function(bytes, it, defaultType) {
              var type3;
              if (bytes[it.offset] === TYPE_ID) {
                it.offset++;
                type3 = this.constructor._context.get(number(bytes, it));
              }
              return type3 || defaultType;
            };
            Schema3.prototype.createTypeInstance = function(type3) {
              var instance = new type3();
              instance.$changes.root = this.$changes.root;
              return instance;
            };
            Schema3.prototype._triggerChanges = function(changes) {
              var _a, _b, _c, _d, _e, _f, _g, _h, _j;
              var uniqueRefIds = /* @__PURE__ */ new Set();
              var $refs = this.$changes.root.refs;
              var _loop_2 = function(i2) {
                var change = changes[i2];
                var refId = change.refId;
                var ref = $refs.get(refId);
                var $callbacks = ref["$callbacks"];
                if ((change.op & exports2.OPERATION.DELETE) === exports2.OPERATION.DELETE && change.previousValue instanceof Schema3) {
                  (_b = (_a = change.previousValue["$callbacks"]) === null || _a === void 0 ? void 0 : _a[exports2.OPERATION.DELETE]) === null || _b === void 0 ? void 0 : _b.forEach(function(callback) {
                    return callback();
                  });
                }
                if (!$callbacks) {
                  return "continue";
                }
                if (ref instanceof Schema3) {
                  if (!uniqueRefIds.has(refId)) {
                    try {
                      (_c = $callbacks === null || $callbacks === void 0 ? void 0 : $callbacks[exports2.OPERATION.REPLACE]) === null || _c === void 0 ? void 0 : _c.forEach(function(callback) {
                        return callback(changes);
                      });
                    } catch (e) {
                      Schema3.onError(e);
                    }
                  }
                  try {
                    if ($callbacks.hasOwnProperty(change.field)) {
                      (_d = $callbacks[change.field]) === null || _d === void 0 ? void 0 : _d.forEach(function(callback) {
                        return callback(change.value, change.previousValue);
                      });
                    }
                  } catch (e) {
                    Schema3.onError(e);
                  }
                } else {
                  if (change.op === exports2.OPERATION.ADD && change.previousValue === void 0) {
                    (_e = $callbacks[exports2.OPERATION.ADD]) === null || _e === void 0 ? void 0 : _e.forEach(function(callback) {
                      var _a2;
                      return callback(change.value, (_a2 = change.dynamicIndex) !== null && _a2 !== void 0 ? _a2 : change.field);
                    });
                  } else if (change.op === exports2.OPERATION.DELETE) {
                    if (change.previousValue !== void 0) {
                      (_f = $callbacks[exports2.OPERATION.DELETE]) === null || _f === void 0 ? void 0 : _f.forEach(function(callback) {
                        var _a2;
                        return callback(change.previousValue, (_a2 = change.dynamicIndex) !== null && _a2 !== void 0 ? _a2 : change.field);
                      });
                    }
                  } else if (change.op === exports2.OPERATION.DELETE_AND_ADD) {
                    if (change.previousValue !== void 0) {
                      (_g = $callbacks[exports2.OPERATION.DELETE]) === null || _g === void 0 ? void 0 : _g.forEach(function(callback) {
                        var _a2;
                        return callback(change.previousValue, (_a2 = change.dynamicIndex) !== null && _a2 !== void 0 ? _a2 : change.field);
                      });
                    }
                    (_h = $callbacks[exports2.OPERATION.ADD]) === null || _h === void 0 ? void 0 : _h.forEach(function(callback) {
                      var _a2;
                      return callback(change.value, (_a2 = change.dynamicIndex) !== null && _a2 !== void 0 ? _a2 : change.field);
                    });
                  }
                  if (change.value !== change.previousValue) {
                    (_j = $callbacks[exports2.OPERATION.REPLACE]) === null || _j === void 0 ? void 0 : _j.forEach(function(callback) {
                      var _a2;
                      return callback(change.value, (_a2 = change.dynamicIndex) !== null && _a2 !== void 0 ? _a2 : change.field);
                    });
                  }
                }
                uniqueRefIds.add(refId);
              };
              for (var i = 0; i < changes.length; i++) {
                _loop_2(i);
              }
            };
            Schema3._definition = SchemaDefinition.create();
            return Schema3;
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
            __extends(ReflectionField2, _super);
            function ReflectionField2() {
              return _super !== null && _super.apply(this, arguments) || this;
            }
            __decorate([
              type2("string", reflectionContext)
            ], ReflectionField2.prototype, "name", void 0);
            __decorate([
              type2("string", reflectionContext)
            ], ReflectionField2.prototype, "type", void 0);
            __decorate([
              type2("number", reflectionContext)
            ], ReflectionField2.prototype, "referencedType", void 0);
            return ReflectionField2;
          }(Schema2)
        );
        var ReflectionType = (
          /** @class */
          function(_super) {
            __extends(ReflectionType2, _super);
            function ReflectionType2() {
              var _this = _super !== null && _super.apply(this, arguments) || this;
              _this.fields = new ArraySchema2();
              return _this;
            }
            __decorate([
              type2("number", reflectionContext)
            ], ReflectionType2.prototype, "id", void 0);
            __decorate([
              type2([ReflectionField], reflectionContext)
            ], ReflectionType2.prototype, "fields", void 0);
            return ReflectionType2;
          }(Schema2)
        );
        var Reflection = (
          /** @class */
          function(_super) {
            __extends(Reflection2, _super);
            function Reflection2() {
              var _this = _super !== null && _super.apply(this, arguments) || this;
              _this.types = new ArraySchema2();
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
                    if (Schema2.is(type_1)) {
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
                    __extends(_, _super2);
                    function _() {
                      return _super2 !== null && _super2.apply(this, arguments) || this;
                    }
                    return _;
                  }(Schema2)
                );
                var typeid = reflectionType.id;
                types[typeid] = schema;
                context.add(schema, typeid);
                return types;
              }, {});
              reflection.types.forEach(function(reflectionType) {
                var schemaType = schemaTypes[reflectionType.id];
                reflectionType.fields.forEach(function(field) {
                  var _a;
                  if (field.referencedType !== void 0) {
                    var fieldType2 = field.type;
                    var refType = schemaTypes[field.referencedType];
                    if (!refType) {
                      var typeInfo = field.type.split(":");
                      fieldType2 = typeInfo[0];
                      refType = typeInfo[1];
                    }
                    if (fieldType2 === "ref") {
                      type2(refType, { context })(schemaType.prototype, field.name);
                    } else {
                      type2((_a = {}, _a[fieldType2] = refType, _a), { context })(schemaType.prototype, field.name);
                    }
                  } else {
                    type2(field.type, { context })(schemaType.prototype, field.name);
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
              type2([ReflectionType], reflectionContext)
            ], Reflection2.prototype, "types", void 0);
            __decorate([
              type2("number", reflectionContext)
            ], Reflection2.prototype, "rootType", void 0);
            return Reflection2;
          }(Schema2)
        );
        registerType("map", { constructor: MapSchema2 });
        registerType("array", { constructor: ArraySchema2 });
        registerType("set", { constructor: SetSchema });
        registerType("collection", { constructor: CollectionSchema });
        exports2.ArraySchema = ArraySchema2;
        exports2.CollectionSchema = CollectionSchema;
        exports2.Context = Context;
        exports2.MapSchema = MapSchema2;
        exports2.Reflection = Reflection;
        exports2.ReflectionField = ReflectionField;
        exports2.ReflectionType = ReflectionType;
        exports2.Schema = Schema2;
        exports2.SchemaDefinition = SchemaDefinition;
        exports2.SetSchema = SetSchema;
        exports2.decode = decode;
        exports2.defineTypes = defineTypes;
        exports2.deprecated = deprecated;
        exports2.dumpChanges = dumpChanges;
        exports2.encode = encode;
        exports2.filter = filter;
        exports2.filterChildren = filterChildren;
        exports2.hasFilter = hasFilter;
        exports2.registerType = registerType;
        exports2.type = type2;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    }
  });

  // src/rooms/hubState.ts
  var import_schema = __toESM(require_umd());
  var getRandX = () => {
    return Math.floor(Math.random() * 1e3);
  };
  var getRandY = () => {
    return Math.floor(Math.random() * 500);
  };
  var createPoints = (sides = 3, radius = 10, position) => {
    let vertices = new import_schema.ArraySchema();
    for (let angle = 0; angle <= 360; angle += Math.floor(360 / sides)) {
      let radians = toRad(angle);
      let posX = Math.cos(radians) * radius + position.x;
      let posY = Math.sin(radians) * radius + position.y;
      vertices.push(new Vertex(posX, posY));
    }
    return vertices;
  };
  var Vertex = class extends import_schema.Schema {
    constructor(x, y) {
      super();
      this.x = x;
      this.y = y;
    }
  };
  __decorateClass([
    (0, import_schema.type)("number")
  ], Vertex.prototype, "x", 2);
  __decorateClass([
    (0, import_schema.type)("number")
  ], Vertex.prototype, "y", 2);
  var Ship = class extends import_schema.Schema {
    constructor(x, y) {
      super();
      this.angle = 0;
      this.speed = 0;
      this.maxSpeed = 20;
      this.velocity = new Vertex(0, 0);
      this.x = x;
      this.y = y;
      this.vertices = createPoints(3, 10, { x: this.x, y: this.y });
    }
  };
  __decorateClass([
    (0, import_schema.type)("number")
  ], Ship.prototype, "x", 2);
  __decorateClass([
    (0, import_schema.type)("number")
  ], Ship.prototype, "y", 2);
  __decorateClass([
    (0, import_schema.type)("number")
  ], Ship.prototype, "angle", 2);
  __decorateClass([
    (0, import_schema.type)("number")
  ], Ship.prototype, "speed", 2);
  __decorateClass([
    (0, import_schema.type)("number")
  ], Ship.prototype, "maxSpeed", 2);
  __decorateClass([
    (0, import_schema.type)([Vertex])
  ], Ship.prototype, "vertices", 2);
  __decorateClass([
    (0, import_schema.type)(Vertex)
  ], Ship.prototype, "velocity", 2);
  var Player = class extends import_schema.Schema {
    constructor() {
      super(...arguments);
      this.x = getRandX();
      this.y = getRandY();
      this.angle = 0;
      this.position = new Vertex(this.x, this.y);
      this.ship = new Ship(this.x, this.y);
      this.inputQueue = [];
    }
  };
  __decorateClass([
    (0, import_schema.type)("number")
  ], Player.prototype, "x", 2);
  __decorateClass([
    (0, import_schema.type)("number")
  ], Player.prototype, "y", 2);
  __decorateClass([
    (0, import_schema.type)("number")
  ], Player.prototype, "angle", 2);
  __decorateClass([
    (0, import_schema.type)(Vertex)
  ], Player.prototype, "position", 2);
  __decorateClass([
    (0, import_schema.type)(Ship)
  ], Player.prototype, "ship", 2);
  var State = class extends import_schema.Schema {
    constructor() {
      super(...arguments);
      this.players = new import_schema.MapSchema();
    }
  };
  __decorateClass([
    (0, import_schema.type)({ map: Player })
  ], State.prototype, "players", 2);

  // src/linear_operations.ts
  var distance = (p1, p2) => {
    return Math.floor(Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2));
  };
  var distanceFloat = (p1, p2) => {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
  };
  var checkLineCollision = (lineA, lineB) => {
    let intersectionX, intersectionY;
    let x1, x2, x3, x4, y1, y2, y3, y4;
    x1 = lineA.p1.x;
    x2 = lineA.p2.x;
    y1 = lineA.p1.y;
    y2 = lineA.p2.y;
    x3 = lineB.p1.x;
    x4 = lineB.p2.x;
    y3 = lineB.p1.y;
    y4 = lineB.p2.y;
    let denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator == 0) {
      return false;
    }
    let pA = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denominator;
    let pB = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / denominator;
    if (pA >= 0 && pA <= 1 && pB >= 0 && pB <= 1) {
      intersectionX = x1 + pA * (x2 - x1);
      intersectionY = y1 + pA * (y2 - y1);
      return { x: intersectionX, y: intersectionY };
    } else {
      return false;
    }
  };
  var checkPointCircleCollision = (pt, circle) => {
    let dist = distanceFloat(circle.center, pt);
    if (dist <= circle.radius) {
      return true;
    } else {
      return false;
    }
  };
  var checkLinePointCollision = (line, point) => {
    let lineLength = line.distance();
    let dist1 = distanceFloat(point, line.p1);
    let dist2 = distanceFloat(point, line.p2);
    let buffer = 0.1;
    if (dist1 + dist2 >= lineLength - buffer && dist1 + dist2 <= lineLength + buffer) {
      return true;
    } else {
      return false;
    }
  };
  var checkLineCircleCollision = (line, circle) => {
    let inside1 = checkPointCircleCollision(line.p1, circle);
    let inside2 = checkPointCircleCollision(line.p2, circle);
    if (inside1)
      return line.p1;
    if (inside2)
      return line.p2;
    let lineDistance = line.distance();
    let dot2 = dotCircle(line, circle) / lineDistance ** 2;
    let p1 = line.p1;
    let p2 = line.p2;
    let closest = { x: p1.x + dot2 * (p2.x - p1.x), y: p1.y + dot2 * (p2.y - p1.y) };
    let onSegment = checkLinePointCollision(line, closest);
    if (!onSegment)
      return false;
    let c = circle.center;
    let dist = distanceFloat(c, closest);
    if (dist <= circle.radius) {
      return closest;
    } else {
      return false;
    }
  };
  var dotCircle = (line, circle) => {
    let c = circle.center;
    let p1 = line.p1;
    let p2 = line.p2;
    return (c.x - p1.x) * (p2.x - p1.x) + (c.y - p1.y) * (p2.y - p1.y);
  };
  var toRad = (degrees) => {
    return degrees * Math.PI / 180;
  };
  var toDeg = (radians) => {
    return radians * 180 / Math.PI;
  };
  var getAngle = (p1, p2) => {
    let a = p2.x - p1.x;
    let b = p2.y - p1.y;
    let radians = Math.atan2(b, a);
    return radians;
  };

  // src/ray.ts
  var Ray = class {
    constructor(p1, p2) {
      this.p1 = { x: 0, y: 0 };
      this.p2 = { x: 0, y: 0 };
      this.p1 = p1 === void 0 ? this.p1 : p1;
      this.p2 = p2 === void 0 ? this.p2 : p2;
    }
    distance() {
      return Math.sqrt((this.p2.x - this.p1.x) ** 2 + (this.p2.y - this.p1.y) ** 2);
    }
    slope() {
      if (this.p1.x - this.p2.x !== 0) {
        return (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
      }
      return Number.MAX_VALUE;
    }
    normalize() {
      let normalX = this.p2.x - this.p1.x;
      let normalY = this.p2.y - this.p1.y;
      let normalLength = this.distance();
      normalX = normalX / normalLength;
      normalY = normalY / normalLength;
      return { x: normalX, y: normalY };
    }
    rayExtension(distance2 = 1500) {
      let normal = this.normalize();
      let xPos = this.p2.x + distance2 * normal.x;
      let yPos = this.p2.y + distance2 * normal.y;
      this.p2 = { x: xPos, y: yPos };
    }
    getRayAngle() {
      return getAngle(this.p1, this.p2);
    }
    getXComponent() {
      return this.p2.x - this.p1.x;
    }
    getYComponent() {
      return this.p2.y - this.p1.y;
    }
    getXYComponents() {
      return { x: this.p2.x - this.p1.x, y: this.p2.y - this.p1.y };
    }
  };

  // src/polygon.ts
  var Polygon = class {
    constructor(ctx2, sides = 3, position, radius = 10, strokeColor = "cyan", vertices = [], angle = 0) {
      this.sides = 3;
      this.angle = 0;
      // In degrees
      this.radius = 10;
      this.lines = [];
      this.rotPos = [];
      this.vertices = [];
      this.fillColor = "rgba(0,0,0,0)";
      this.strokeColor = "rgba(0,0,0,0)";
      this.position = { x: 0, y: 0 };
      this.ctx = ctx2;
      this.sides = sides;
      this.angle = angle;
      this.radius = radius;
      this.position = position;
      this.strokeColor = strokeColor;
      if (vertices.length === 0) {
        this.createPoints();
      } else {
        this.vertices = vertices;
      }
      this.position = this.getCenterPosition();
      this.update();
    }
    draw(vertices) {
      vertices = vertices === void 0 ? this.vertices : vertices;
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.beginPath();
      this.ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length; i++) {
        let pos = vertices[i];
        this.ctx.lineTo(pos.x, pos.y);
      }
      this.ctx.closePath();
      this.ctx.stroke();
    }
    createPoints() {
      for (let angle = 0; angle <= 360; angle += Math.floor(360 / this.sides)) {
        let radians = toRad(angle);
        let posX = Math.cos(radians) * this.radius + this.position.x;
        let posY = Math.sin(radians) * this.radius + this.position.y;
        this.vertices.push({ x: posX, y: posY });
      }
    }
    getLines() {
      let lines = [];
      let p1 = this.rotPos[0];
      let p2 = this.rotPos[this.rotPos.length - 1];
      lines.push(new Ray(p1, p2));
      for (let i = 0; i < this.rotPos.length - 1; i++) {
        p1 = this.rotPos[i];
        p2 = this.rotPos[i + 1];
        let line = new Ray(p1, p2);
        lines.push(line);
      }
      return lines;
    }
    checkInside(ray) {
      let count = 0;
      let sides = this.getLines();
      for (let side of sides) {
        let hit = checkLineCollision(ray, side);
        if (hit) {
          count++;
        }
      }
      return count & 1;
    }
    checkShellHit(circle) {
      let sides = this.getLines();
      for (let side of sides) {
        let intersect = checkLineCircleCollision(side, circle);
        if (intersect) {
          return { side, intersect };
        }
      }
    }
    updatePosition(points) {
      this.vertices = points;
    }
    update() {
      this.position = this.getCenterPosition();
      this.rotate();
    }
    getCenterPosition() {
      if (this.sides == 3) {
        return {
          x: (this.vertices[0].x + this.vertices[1].x + this.vertices[2].x) / 3,
          y: (this.vertices[0].y + this.vertices[1].y + this.vertices[2].y) / 3
        };
      }
      let signedArea = 0;
      let centerX = 0;
      let centerY = 0;
      for (let i = 0; i < this.sides; i++) {
        let x0 = this.vertices[i].x;
        let y0 = this.vertices[i].y;
        let x1 = this.vertices[(i + 1) % this.sides].x;
        let y1 = this.vertices[(i + 1) % this.sides].y;
        let A = x0 * y1 - x1 * y0;
        signedArea += A;
        centerX += (x0 + x1) * A;
        centerY += (y0 + y1) * A;
      }
      signedArea *= 0.5;
      centerX /= 6 * signedArea;
      centerY /= 6 * signedArea;
      return { x: centerX, y: centerY };
    }
    rotate() {
      this.rotPos = [];
      for (let point of this.vertices) {
        if (point) {
          let pos = {
            x: point.x - this.position.x,
            y: point.y - this.position.y
          };
          let xPrime = pos.x * Math.cos(toRad(this.angle)) - pos.y * Math.sin(toRad(this.angle));
          let yPrime = pos.y * Math.cos(toRad(this.angle)) + pos.x * Math.sin(toRad(this.angle));
          this.rotPos.push({
            x: xPrime + this.position.x,
            y: yPrime + this.position.y
          });
        }
      }
      this.draw(this.rotPos);
    }
  };

  // src/circle.ts
  var drawCirlce = (ctx2, x = 0, y = 0, radius = 1, fillColor = "red", strokeColor = "rgba(0,0,0,0)") => {
    ctx2.fillStyle = fillColor;
    ctx2.strokeStyle = strokeColor;
    ctx2.beginPath();
    ctx2.arc(x, y, radius, 0, 2 * Math.PI);
    ctx2.closePath();
    ctx2.stroke();
    ctx2.fill();
  };
  var Circle = class {
    constructor(radius = 1, x = 0, y = 0) {
      this.mass = 1;
      this.moi = 1;
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

  // src/lights/directional_light.ts
  var DirectLight = class {
    constructor(ctx2, position = { x: 0, y: 0 }, startAngle = 0, endAngle = 1, lightColor = "cyan", increment = 0.1, rayLength = 500, drawExtenders = true) {
      this.endAngle = 1;
      this.startAngle = 0;
      this.increment = 0.1;
      this.rayLength = 500;
      this.rays = [];
      this.lightColor = "cyan";
      this.rotRays = [];
      this.drawExtenders = true;
      this.sceneWalls = [];
      this.position = { x: 0, y: 0 };
      this.findClosest = (walls, rays) => {
        rays = rays === void 0 ? this.rays : rays;
        let intersects = [];
        for (let ray of rays) {
          let closest = null;
          let max = Number.MAX_VALUE;
          for (let wall of walls) {
            let hit = checkLineCollision(ray, wall);
            if (hit) {
              const dist = distance(ray.p1, hit);
              if (dist < max && dist !== 0) {
                max = dist;
                closest = hit;
              }
            }
          }
          if (closest) {
            intersects.push(closest);
          } else if (this.drawExtenders) {
            intersects.push(ray.p2);
          }
        }
        return intersects;
      };
      this.ctx = ctx2;
      this.endAngle = endAngle;
      this.position = position;
      this.increment = increment;
      this.rayLength = rayLength;
      this.lightColor = lightColor;
      this.startAngle = startAngle;
      this.drawExtenders = drawExtenders;
      this.createRays(position);
    }
    // Create rays between a starting angle and ending angle
    createRays(position) {
      for (let angle = this.startAngle; angle <= this.endAngle; angle += this.increment) {
        let radians = toRad(angle);
        let posX = Math.cos(radians) + position.x;
        let posY = Math.sin(radians) + position.y;
        let ray = new Ray(position, {
          x: posX,
          y: posY
        });
        ray.rayExtension(this.rayLength);
        this.rays.push(ray);
      }
    }
    updatePosition(sourcePoint) {
      this.position = sourcePoint;
      for (let i = 0; i < this.rays.length; i++) {
        let distance2 = this.rays[i].distance();
        let normal = this.rays[i].normalize();
        let pos = {
          x: sourcePoint.x + distance2 * normal.x,
          y: sourcePoint.y + distance2 * normal.y
        };
        this.rays[i].p1 = sourcePoint;
        this.rays[i].p2 = pos;
      }
    }
    calcIntersects(walls, position, rays) {
      position = position === void 0 ? this.position : position;
      rays = rays === void 0 ? this.rays : rays;
      let sightLines = [];
      let intersects = this.findClosest(walls, rays);
      for (let intersect of intersects) {
        let line = new Ray(position, intersect);
        sightLines.push(line);
      }
      this.drawSightPolygon(sightLines);
    }
    drawSightPolygon(lines) {
      let angles = [];
      this.ctx.fillStyle = this.lightColor;
      for (let line of lines) {
        angles.push({ line, angle: line.getRayAngle() });
      }
      this.ctx.beginPath();
      this.ctx.moveTo(angles[0].line.p2.x, angles[0].line.p2.y);
      for (let i = 1; i < angles.length; i++) {
        this.ctx.lineTo(angles[i].line.p2.x, angles[i].line.p2.y);
      }
      this.ctx.lineTo(
        angles[angles.length - 1].line.p2.x,
        angles[angles.length - 1].line.p2.y
      );
      this.ctx.lineTo(
        angles[angles.length - 1].line.p1.x,
        angles[angles.length - 1].line.p1.y
      );
      this.ctx.closePath();
      this.ctx.fill();
    }
    rotate(walls, angle = 0) {
      this.rotRays = [];
      for (let ray of this.rays) {
        if (ray) {
          let pos = { x: ray.p2.x - ray.p1.x, y: ray.p2.y - ray.p1.y };
          let xPrime = pos.x * Math.cos(toRad(angle)) - pos.y * Math.sin(toRad(angle));
          let yPrime = pos.y * Math.cos(toRad(angle)) + pos.x * Math.sin(toRad(angle));
          let rotationalRay = new Ray(ray.p1, { x: xPrime + ray.p1.x, y: yPrime + ray.p1.y });
          this.rotRays.push(rotationalRay);
        }
      }
      this.calcIntersects(walls, this.position, this.rotRays);
    }
    lookAt(walls, trackPoint) {
      let trackAngle = getAngle(this.position, trackPoint);
      this.rotate(walls, toDeg(trackAngle));
    }
  };

  // src/reflectors.ts
  var MAX_RAYS = 10;
  var Reflectors = class {
    constructor(ctx2, starter = new Ray(
      { x: 0, y: 0 },
      { x: 0, y: 0 }
    ), strokeColor = "red") {
      this.strokeColor = "red";
      this.reflectorRays = [];
      this.findReflection = (line, ray, iX, iY) => {
        let normal = line.normalize();
        let rayX = ray.p1.x - iX;
        let rayY = ray.p1.y - iY;
        let dotProduct = rayX * normal.x + rayY * normal.y;
        let dotNormalX = dotProduct * normal.x;
        let dotNormalY = dotProduct * normal.y;
        let reflectedRayX = ray.p1.x - dotNormalX * 2;
        let reflectedRayY = ray.p1.y - dotNormalY * 2;
        return { x: reflectedRayX, y: reflectedRayY };
      };
      this.ctx = ctx2;
      this.starter = starter;
      this.strokeColor = strokeColor;
    }
    // Calculates the number of possible hits for reflections
    calculateHits(walls, ray) {
      ray = ray === void 0 ? new Ray() : ray;
      let starterRay = ray;
      let reflectorRay = new Ray();
      let hit = this.findClosest(walls, this.starter);
      let prevHit = hit;
      let nextHit = null;
      let rays = [];
      if (hit[0] && hit[1]) {
        for (let i = 0; i < MAX_RAYS - 1; i++) {
          let closestHit = prevHit[0];
          let closestWall = prevHit[1];
          if (closestHit) {
            if (rays.length === 0) {
              starterRay.p2 = closestHit;
              rays.push(starterRay);
            } else {
              starterRay = new Ray(rays[i - 1].p2, closestHit);
              rays.push(starterRay);
            }
            let rPoints = this.findReflection(
              closestWall,
              rays[i],
              closestHit.x,
              closestHit.y
            );
            reflectorRay = new Ray(closestHit, rPoints);
            reflectorRay.rayExtension();
          }
          nextHit = this.findClosest(walls, reflectorRay);
          prevHit = nextHit;
        }
        rays.push(reflectorRay);
      } else if (rays.length === 0) {
        rays.push(this.starter);
      }
      this.reflectorRays = rays;
      this.drawReflections(rays);
    }
    drawReflections(rays) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.strokeColor;
      let start2 = rays[0].p1;
      let end = rays[0].p2;
      this.ctx.moveTo(start2.x, start2.y);
      this.ctx.lineTo(end.x, end.y);
      for (let i = 1; i < rays.length; i++) {
        start2 = rays[i].p1;
        end = rays[i].p2;
        this.ctx.moveTo(start2.x, start2.y);
        this.ctx.lineTo(end.x, end.y);
      }
      this.ctx.closePath();
      this.ctx.stroke();
    }
    findClosest(walls, ray) {
      let closest = null;
      let closestWall = null;
      let max = Number.MAX_VALUE;
      for (let wall of walls) {
        let hit = checkLineCollision(ray, wall);
        if (hit) {
          const dist = distance(ray.p1, hit);
          if (dist < max && dist !== 0) {
            max = dist;
            closest = hit;
            closestWall = wall;
          }
        }
      }
      return [closest, closestWall];
    }
  };

  // src/projectiles/laser.ts
  var Laser = class extends Reflectors {
    constructor(ctx2, starter) {
      super(ctx2, starter);
      this.damage = 0.25;
    }
    damageShip(ships) {
      for (let reflector of this.reflectorRays) {
        if (Array.isArray(ships)) {
          for (let ship2 of ships) {
            if (ship2.checkHit(reflector)) {
              if (ship2.durability > -1) {
                ship2.durability -= this.damage;
                ship2.redCol += this.damage * 10;
                ship2.greenCol -= this.damage * 2;
                ship2.centerCircle.fillColor = `rgb(${ship2.redCol}, ${ship2.greenCol}, 0)`;
              }
            }
          }
        } else {
          if (ships.checkHit(reflector)) {
            if (ships.durability > -1) {
              ships.durability -= this.damage;
              ships.centerCircle.fillColor = `rgb(55, ${ships.durability + 100}, 0)`;
            }
          }
        }
      }
    }
  };

  // src/ship.ts
  var Ship2 = class extends Polygon {
    constructor(ctx2, addLight = false, position = { x: 0, y: 0 }, mass = 1, sides = 3, radius = 10, shipColor = "cyan", playerControlled = false, vertices = [], angle = 0) {
      super(ctx2, sides, position, radius, shipColor, vertices, angle);
      this.mass = 2;
      this.speed = 0;
      this.maxSpeed = 10;
      this.turnSpeed = 0.4;
      this.durability = 100;
      this.redCol = 55;
      this.greenCol = this.durability + 100;
      this.shipColor = "cyan";
      this.playerControlled = false;
      this.velocity = { x: 0, y: 0 };
      this.force = { x: 0, y: 0 };
      this.mass = mass;
      let healthColor = `rgb(${this.redCol}, ${this.greenCol}, 0)`;
      this.centerCircle = new RenderCircle(
        ctx2,
        this.radius / 5,
        this.position.x,
        this.position.y,
        healthColor
      );
      this.laser = new Laser(ctx2, new Ray());
      this.playerControlled = playerControlled;
      if (addLight) {
        this.shipLight = new DirectLight(
          ctx2,
          this.position,
          -45,
          45,
          "cyan",
          0.1,
          500
        );
      } else {
        this.shipLight = null;
      }
    }
    checkHit(ray) {
      let sides = this.getLines();
      for (let side of sides) {
        let hit = checkLineCollision(ray, side);
        if (hit) {
          return true;
        }
      }
    }
    lookAt(trackPoint) {
      if (this.durability > 0) {
        let pointerRay = new Ray(this.position, trackPoint);
        let angle = toDeg(pointerRay.getRayAngle());
        this.angle = angle;
      }
    }
    move(keys2) {
      let accel = 0.1;
      if (keys2.w.pressed) {
        if (this.speed <= this.maxSpeed) {
          this.speed += accel;
        }
      }
      if (keys2.s.pressed) {
        if (this.speed >= -1) {
          this.speed -= accel;
        }
      }
      if (keys2.a.pressed) {
        this.angle -= this.turnSpeed * 0.7;
      }
      if (keys2.d.pressed) {
        this.angle += this.turnSpeed * 0.7;
      }
    }
    fire(mouseKey2, walls, ships) {
      if (mouseKey2.mousedown.pressed) {
        let posX = Math.cos(toRad(this.angle)) * 10 + this.rotPos[0].x;
        let posY = Math.sin(toRad(this.angle)) * 10 + this.rotPos[0].y;
        let pos = { x: posX, y: posY };
        let starterRay = new Ray(this.rotPos[0], pos);
        starterRay.rayExtension(1500);
        this.laser.starter.p1 = starterRay.p1;
        this.laser.starter.p2 = starterRay.p2;
        this.laser.calculateHits(walls, starterRay);
        this.laser.damageShip(ships);
      }
    }
    updateSimulation(deltaTime2, cameraOffset) {
      let posX = Math.cos(toRad(this.angle)) * this.speed + this.position.x;
      let posY = Math.sin(toRad(this.angle)) * this.speed + this.position.y;
      let forceVector = new Ray(this.position, { x: posX, y: posY });
      let xAccel = (forceVector.p2.x - forceVector.p1.x) / this.mass;
      let yAccel = (forceVector.p2.y - forceVector.p1.y) / this.mass;
      this.velocity.x += xAccel * deltaTime2;
      this.velocity.y += yAccel * deltaTime2;
      let vt = { x: this.velocity.x * deltaTime2, y: this.velocity.y * deltaTime2 };
      for (let i = 0; i < this.vertices.length; i++) {
        this.vertices[i].x += vt.x;
        this.vertices[i].y += vt.y;
        this.rotPos[i].x += vt.x;
        this.rotPos[i].y += vt.y;
      }
      let center = this.getCenterPosition();
      this.centerCircle.update();
      if (this.playerControlled) {
        this.centerCircle.updatePosition(
          this.position.x + cameraOffset.x,
          this.position.y + cameraOffset.y
        );
      } else {
        this.centerCircle.updatePosition(center.x + vt.x, center.y + vt.y);
      }
      if (this.durability < 0) {
        this.strokeColor = "grey";
        this.speed = 0;
        this.angle = 0;
        this.velocity.x = 0;
        this.velocity.y = 0;
      }
    }
    drawShipLight(walls) {
      var _a, _b;
      (_a = this.shipLight) == null ? void 0 : _a.updatePosition({
        x: this.rotPos[0].x,
        y: this.rotPos[0].y
      });
      (_b = this.shipLight) == null ? void 0 : _b.rotate(walls, this.angle);
    }
    translateCamera(deltaTime2, camera2) {
      camera2.updatePosition({
        x: -this.position.x + this.ctx.canvas.width / 2,
        y: -this.position.y + this.ctx.canvas.height / 2
      });
    }
  };

  // src/camera.ts
  var Rectangle = class {
    constructor(startPoint, width, height) {
      this.topLeftPos = { x: 0, y: 0 };
      this.topRightPos = { x: 0, y: 0 };
      this.bottomRightPos = { x: 0, y: 0 };
      this.bottomLeftPos = { x: 0, y: 0 };
      this.width = 0;
      this.height = 0;
      this.topLeftPos = startPoint;
      this.topRightPos = { x: startPoint.x + width, y: startPoint.y };
      this.bottomRightPos = { x: startPoint.x + width, y: startPoint.y + height };
      this.bottomLeftPos = { x: startPoint.x, y: startPoint.y + height };
      this.width = width;
      this.height = height;
    }
    updatePosition(startPoint) {
      this.topLeftPos = startPoint;
      this.topRightPos = { x: startPoint.x + this.width, y: startPoint.y };
      this.bottomRightPos = { x: startPoint.x + this.width, y: startPoint.y + this.height };
      this.bottomLeftPos = { x: startPoint.x, y: startPoint.y + this.height };
    }
  };

  // src/particle.ts
  var Particle = class {
    constructor() {
      this.position = { x: 0, y: 0 };
      this.velocity = { x: 0, y: 0 };
      this.mass = 1;
    }
  };

  // src/lights/point_light.ts
  var PointLight = class extends DirectLight {
    constructor(ctx2, center = { x: 0, y: 0 }, lightColor = "cyan") {
      super(ctx2, center, 0, 360, lightColor, 1, 1500, true);
      this.uniquePoints = [];
      this.getUniquePoints = (walls) => {
        let pts = [];
        walls.forEach((wall) => {
          pts.push(wall.p1, wall.p2);
        });
        let set = {};
        const uniquePoints = pts.filter((p2) => {
          let key = p2.x + "," + p2.y;
          if (key in set) {
            return false;
          } else {
            set[key] = true;
            return true;
          }
        });
        this.uniquePoints = uniquePoints;
      };
      this.ctx = ctx2;
      this.position = center;
    }
    getUniqueRays(position) {
      for (let i = 0; i < this.uniquePoints.length; i++) {
        let pos = this.uniquePoints[i];
        let ray = new Ray(position, pos);
        let magnitude = ray.distance();
        let angle = ray.getRayAngle();
        let leftRayEnd = {
          x: magnitude * Math.cos(angle - 1e-5) + position.x,
          y: magnitude * Math.sin(angle - 1e-5) + position.y
        };
        let rightRayEnd = {
          x: magnitude * Math.cos(angle + 1e-5) + position.x,
          y: magnitude * Math.sin(angle + 1e-5) + position.y
        };
        let rightRay = new Ray(position, rightRayEnd);
        let leftRay = new Ray(position, leftRayEnd);
        leftRay.rayExtension();
        rightRay.rayExtension();
        this.rays.push(leftRay, ray, rightRay);
      }
    }
    drawSightPolygon(lines) {
      let angles = [];
      this.ctx.fillStyle = this.lightColor;
      for (let line of lines) {
        angles.push({ line, angle: line.getRayAngle() });
      }
      angles = angles.sort((a, b) => {
        return a.angle - b.angle;
      });
      this.ctx.beginPath();
      this.ctx.moveTo(angles[0].line.p2.x, angles[0].line.p2.y);
      for (let i = 1; i < angles.length; i++) {
        this.ctx.lineTo(angles[i].line.p2.x, angles[i].line.p2.y);
      }
      this.ctx.fill();
      this.ctx.closePath();
    }
    // If the walls are moving we have to get the new vertex positions and rebuild all the rays
    // Incorrect, this should be renamed calculate hits.
    calculateHits(walls, position) {
      position = position === void 0 ? this.position : position;
      this.rays = [];
      this.getUniquePoints(walls);
      this.getUniqueRays(position);
      this.createRays(position);
      this.calcIntersects(walls);
    }
  };

  // src/world.ts
  var canvas = document.getElementById(
    "container"
  );
  var ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var camera = new Rectangle({ x: 0, y: 0 }, canvas.width, canvas.height);
  var p = new Particle();
  var polygons = [
    new Ship2(ctx, void 0, { x: 120, y: 330 }, 2, 3, 25, "red"),
    new Ship2(ctx, void 0, { x: 121, y: 330 }, 5, 3, 12, "magenta"),
    new Ship2(ctx, void 0, { x: 122, y: 330 }, 3, 3, 12, "yellow"),
    new Ship2(ctx, void 0, { x: 123, y: 330 }, 2.5, 3, 20, "blue"),
    new Ship2(ctx, void 0, { x: 124, y: 330 }, 1, 3, 11, "green"),
    new Ship2(ctx, void 0, { x: 125, y: 330 }, 8, 3, 8, "orange"),
    new Polygon(ctx, 3, { x: 300, y: 400 }, 40),
    new Polygon(ctx, 4, { x: 700, y: 100 }, 60),
    new Polygon(ctx, 5, { x: 800, y: 600 }, 80),
    new Polygon(ctx, 5, { x: 100, y: 650 }, 100),
    new Polygon(ctx, 7, { x: 1300, y: 300 }, 80),
    new Polygon(ctx, 4, { x: 110, y: 150 }, 100),
    new Polygon(ctx, 4, { x: 900, y: 500 }, 200),
    new Polygon(ctx, 5, { x: 2e3, y: 500 }, 200)
  ];
  var getWalls = (sceneWalls) => {
    let walls = [];
    for (let wall of sceneWalls) {
      if (wall instanceof Polygon) {
        let rays = wall.getLines();
        walls.push(...rays);
      } else {
        walls.push(wall);
      }
    }
    return walls;
  };
  var shipArray = [];
  var getShips = () => {
    for (let poly of polygons) {
      if (poly instanceof Ship2) {
        shipArray.push(poly);
      }
    }
    return shipArray;
  };
  getShips();
  var ship = new Ship2(
    ctx,
    true,
    { x: canvas.width / 2, y: canvas.height / 2 },
    1,
    3,
    50,
    void 0,
    true
  );
  var renderCircle = new RenderCircle(ctx, 15, canvas.width / 2, canvas.height / 2, "gray");
  var Collections = [];
  Collections.push(...polygons);
  Collections.push(renderCircle);
  var circlePointer = { x: renderCircle.circle.x, y: renderCircle.circle.y };
  var pointLight = new PointLight(ctx, circlePointer, "rgba(0,255,255,0.5)");
  var directLight = new DirectLight(ctx, circlePointer, -30, 30);
  var mousePointer = { x: 0, y: 0 };
  var startRay = new Ray({ x: 0, y: 0 }, { x: 1400, y: 1440 });
  var laser = new Laser(ctx, startRay);
  var checkHit = (scanRay) => {
    for (let entity of Collections) {
      let hit = entity.checkInside(scanRay);
      if (hit)
        return entity;
    }
  };
  var drag = (event) => {
    let scanRay = new Ray(
      {
        x: event.offsetX - camera.topLeftPos.x,
        y: event.offsetY - camera.topLeftPos.y
      },
      {
        x: event.offsetX + 10 - camera.topLeftPos.x,
        y: event.offsetY - camera.topLeftPos.y
      }
    );
    let initialPoint = { x: event.offsetX, y: event.offsetY };
    let initialPosition;
    let initialCirclePosition;
    scanRay.rayExtension();
    let initialEntity = checkHit(scanRay);
    let initialPositions = [];
    if (initialEntity && initialEntity instanceof Polygon) {
      for (let vertex of initialEntity.vertices) {
        initialPosition = {
          x: initialPoint.x - vertex.x,
          y: initialPoint.y - vertex.y
        };
        initialPositions.push(initialPosition);
      }
    } else if (initialEntity instanceof RenderCircle) {
      initialCirclePosition = {
        x: initialPoint.x - initialEntity.circle.x,
        y: initialPoint.y - initialEntity.circle.y
      };
    }
    const move = (event2) => {
      let offsetX = event2.offsetX;
      let offsetY = event2.offsetY;
      let translate = [];
      if (initialEntity && initialEntity instanceof Polygon) {
        for (let position of initialPositions) {
          translate.push({ x: offsetX - position.x, y: offsetY - position.y });
        }
        initialEntity.updatePosition(translate);
      } else if (initialEntity instanceof RenderCircle) {
        let posX = offsetX - initialCirclePosition.x;
        let posY = offsetY - initialCirclePosition.y;
        initialEntity.updatePosition(posX, posY);
      }
    };
    canvas.addEventListener("mousemove", move);
    canvas.onmouseup = () => {
      canvas.removeEventListener("mousemove", move);
      canvas.onmouseup = null;
    };
  };
  var draw = () => {
    ship.update();
    for (let polygon of polygons) {
      polygon.update();
      polygon.checkShellHit(renderCircle.circle);
    }
    renderCircle.update();
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
  var deltaTime = 1 / 100;
  var accumulator = 0;
  var currentTime = performance.now();
  var previousState = p;
  var currentState = p;
  var computeForce = (particle) => {
    let accelConstant = 10;
    let gravity = 9.81;
    return { x: particle.mass * accelConstant, y: particle.mass * gravity };
  };
  var integrate = (particle, deltaTime2) => {
    let force = computeForce(particle);
    let acceleration = { x: force.x / particle.mass, y: force.y / particle.mass };
    particle.velocity.x += acceleration.x * deltaTime2;
    particle.velocity.y += acceleration.y * deltaTime2;
    particle.position.x += particle.velocity.x * deltaTime2;
    particle.position.y += particle.velocity.y * deltaTime2;
  };
  var update = (timestamp) => {
    if (!start)
      start = timestamp;
    const elapsed = timestamp - start;
    let newTime = timestamp;
    let frameTime2 = (newTime - currentTime) / 1e3;
    if (frameTime2 && frameTime2 > 0.25) {
      frameTime2 = 0.25;
    }
    currentTime = newTime;
    accumulator += frameTime2;
    while (accumulator >= deltaTime) {
      previousState = currentState;
      integrate(currentState, deltaTime);
      accumulator -= deltaTime;
    }
    const alpha = accumulator / deltaTime;
    let particleSate = new Particle();
    particleSate.position = {
      x: currentState.position.x * alpha + previousState.position.x * (1 - alpha),
      y: currentState.position.y * alpha + previousState.position.y * (1 - alpha)
    };
    particleSate.velocity = {
      x: currentState.velocity.x * alpha + previousState.velocity.x * (1 - alpha),
      y: currentState.velocity.y * alpha + previousState.velocity.y * (1 - alpha)
    };
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCirlce(ctx, particleSate.position.x, particleSate.position.y, 10, "red", "black");
    let mouseCamOffset = {
      x: mousePointer.x - camera.topLeftPos.x,
      y: mousePointer.y - camera.topLeftPos.y
    };
    displayFPS();
    ship.updateSimulation(deltaTime, camera.topLeftPos);
    ship.move(keys);
    ship.lookAt(mouseCamOffset);
    ;
    ctx.translate(camera.topLeftPos.x, camera.topLeftPos.y);
    laser.calculateHits(getWalls(polygons));
    pointLight.calculateHits(getWalls(polygons));
    ship.fire(mouseKey, getWalls(polygons), shipArray);
    for (let ship2 of shipArray) {
      ship2.updateSimulation(deltaTime, camera.topLeftPos);
      ship2.speed = 5;
      ship2.lookAt(mouseCamOffset);
    }
    draw();
    requestAnimationFrame(update);
  };
  canvas.addEventListener("mousemove", (event) => {
    let mouseX = event.offsetX;
    let mouseY = event.offsetY;
    circlePointer = { x: renderCircle.circle.x, y: renderCircle.circle.y };
    mousePointer = { x: mouseX, y: mouseY };
  });
  var mouseKey = {
    mousedown: {
      pressed: false
    }
  };
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
  canvas.addEventListener("mousedown", drag);
  window.addEventListener("mousedown", (mouseEvent) => {
    switch (mouseEvent.type) {
      case "mousedown":
        mouseKey.mousedown.pressed = true;
        break;
    }
  });
  window.addEventListener("mouseup", (mouseEvent) => {
    switch (mouseEvent.type) {
      case "mouseup":
        mouseKey.mousedown.pressed = false;
        break;
    }
  });
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
