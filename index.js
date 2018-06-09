/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src sync recursive":
/*!******************!*\
  !*** ./src sync ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./src sync recursive";

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
const SourceMapSupport = __webpack_require__(/*! source-map-support */ "source-map-support");
const read_complex_modifications_1 = __webpack_require__(/*! ./read_complex_modifications */ "./src/read_complex_modifications.ts");
const read_rules_1 = __webpack_require__(/*! ./read_rules */ "./src/read_rules.ts");
const write_rules_1 = __webpack_require__(/*! ./write_rules */ "./src/write_rules.ts");
SourceMapSupport.install();
let files = read_complex_modifications_1.read_complex_modifications(__dirname);
if (!files.length) {
    console.error("missing setting json files");
    process.exit(1);
}
let rules = read_rules_1.read_rules(files);
if (~process.argv.indexOf("--update")) {
    write_rules_1.write_rules(rules);
}
else {
    console.log({
        "title": "private settings",
        "rules": rules,
    });
}

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./src/make_rules.ts":
/*!***************************!*\
  !*** ./src/make_rules.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(/*! ./rules/app */ "./src/rules/app.ts");
const device_1 = __webpack_require__(/*! ./rules/device */ "./src/rules/device.ts");
const from_1 = __webpack_require__(/*! ./rules/from */ "./src/rules/from.ts");
const lang_1 = __webpack_require__(/*! ./rules/lang */ "./src/rules/lang.ts");
const make_rule_1 = __webpack_require__(/*! ./rules/make_rule */ "./src/rules/make_rule.ts");
const pear_1 = __webpack_require__(/*! ./rules/pear */ "./src/rules/pear.ts");
const string_shortcut_1 = __webpack_require__(/*! ./rules/string_shortcut */ "./src/rules/string_shortcut.ts");
const to_1 = __webpack_require__(/*! ./rules/to */ "./src/rules/to.ts");
const type_basic_1 = __webpack_require__(/*! ./rules/type_basic */ "./src/rules/type_basic.ts");
function make_rules(text) {
    let json = eval(`(${text})`);
    return (json.rules || (json.length ? json : [json]))
        .map(make_rule_1.make_rule)
        .map(rule => rule.manipulators
        .map(string_shortcut_1.string_shortcut)
        .map(type_basic_1.type_basic)
        .map(app_1.app)
        .map(device_1.device)
        .map(lang_1.lang)
        .map(from_1.from)
        .map(to_1.to)
        .map(pear_1.pear));
}
exports.make_rules = make_rules;


/***/ }),

/***/ "./src/read_complex_modifications.ts":
/*!*******************************************!*\
  !*** ./src/read_complex_modifications.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(/*! fs */ "fs");
function read_complex_modifications(dirname) {
    return fs
        .readdirSync(dirname)
        .filter(file => file.match(/\.json$/))
        .map(file => {
        let path = `${dirname}/${file}`;
        return {
            fileName: file,
            textContent: String(fs.readFileSync(path)),
        };
    });
}
exports.read_complex_modifications = read_complex_modifications;


/***/ }),

/***/ "./src/read_rules.ts":
/*!***************************!*\
  !*** ./src/read_rules.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const make_rules_1 = __webpack_require__(/*! ./make_rules */ "./src/make_rules.ts");
function read_rules(files) {
    return files
        .map(file => {
        try {
            return make_rules_1.make_rules(file.textContent);
        }
        catch (e) {
            console.error(e.message, file.fileName);
        }
    })
        .reduce((base, cur) => base.concat(cur), []);
}
exports.read_rules = read_rules;


/***/ }),

/***/ "./src/rules/app.ts":
/*!**************************!*\
  !*** ./src/rules/app.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const condition_map_1 = __webpack_require__(/*! ./libs/condition_map */ "./src/rules/libs/condition_map.ts");
let conditionAppMap = {
    browsers: [
        "^com\\.google\\.Chrome$",
        "^org\\.mozilla\\.firefox$",
        "^com\\.apple\\.Safari$",
    ],
    chrome: ["^com\\.google\\.Chrome$"],
    jetbrains: ["^com\\.jetbrains\\."],
};
let toConditionApp = (condition) => {
    if (conditionAppMap[condition]) {
        return {
            type: "frontmost_application_if",
            bundle_identifiers: conditionAppMap[condition],
        };
    }
    if (condition.match(/^!/) && conditionAppMap[condition.replace(/^!/, "")]) {
        return {
            type: "frontmost_application_unless",
            bundle_identifiers: [conditionAppMap[condition.replace(/^!/, "")]],
        };
    }
    throw new Error(`Unknown ConditionAppMap "${condition}"`);
};
exports.app = condition_map_1.condition_map(":app", toConditionApp);


/***/ }),

/***/ "./src/rules/device.ts":
/*!*****************************!*\
  !*** ./src/rules/device.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const condition_map_1 = __webpack_require__(/*! ./libs/condition_map */ "./src/rules/libs/condition_map.ts");
let conditionDeviceMap = {
    barocco: {
        vendor_id: 1241,
        product_id: 323,
    },
    apple: {
        vendor_id: 1452,
        product_id: 629,
    },
};
let toConditionDevice = (condition) => {
    if (conditionDeviceMap[condition]) {
        return {
            type: "device_if",
            identifiers: [conditionDeviceMap[condition]],
        };
    }
    if (condition.match(/^!/) &&
        conditionDeviceMap[condition.replace(/^!/, "")]) {
        return {
            type: "device_unless",
            identifiers: [conditionDeviceMap[condition.replace(/^!/, "")]],
        };
    }
    throw new Error(`Unknown ConditionDevice "${condition}"`);
};
exports.device = condition_map_1.condition_map(":device", toConditionDevice);


/***/ }),

/***/ "./src/rules/from.ts":
/*!***************************!*\
  !*** ./src/rules/from.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const parse_shortcut_1 = __webpack_require__(/*! ./libs/parse_shortcut */ "./src/rules/libs/parse_shortcut.ts");
const remove_property_1 = __webpack_require__(/*! ./libs/remove_property */ "./src/rules/libs/remove_property.ts");
function fromModifier(base, short) {
    let keys = parse_shortcut_1.parse_shortcut(short);
    let result = Object.assign(base || {}, {
        key_code: keys.pop(),
    });
    if (!keys.length) {
        return result;
    }
    result.modifiers = result.modifiers || {
        mandatory: [],
    };
    if (~keys.indexOf("any")) {
        result.modifiers.optional = ["any"];
        keys = keys.filter(key => key !== "any");
    }
    if (keys.find(key => key.includes("?"))) {
        let optional = keys
            .filter(key => key.includes("?"))
            .map(key => key.replace("?", ""));
        result.modifiers.optional = (result.modifiers.optional || []).concat(optional);
        keys = keys.filter(key => !key.includes("?"));
    }
    if (!keys.length) {
        return result;
    }
    result.modifiers.mandatory = keys;
    return result;
}
exports.fromModifier = fromModifier;
exports.from = remove_property_1.remove_property(":from", (manip, prop) => {
    manip.from = fromModifier(manip.from, prop);
    return manip;
});


/***/ }),

/***/ "./src/rules/lang.ts":
/*!***************************!*\
  !*** ./src/rules/lang.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const condition_map_1 = __webpack_require__(/*! ./libs/condition_map */ "./src/rules/libs/condition_map.ts");
let toConditionLanguage = (lang) => ({
    type: "input_source_if",
    input_sources: [{ language: lang }],
});
exports.lang = condition_map_1.condition_map(":lang", toConditionLanguage);


/***/ }),

/***/ "./src/rules/libs/condition_map.ts":
/*!*****************************************!*\
  !*** ./src/rules/libs/condition_map.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const remove_property_1 = __webpack_require__(/*! ./remove_property */ "./src/rules/libs/remove_property.ts");
function condition_map(name, mapper) {
    return remove_property_1.remove_property(name, (manip, prop) => {
        manip.conditions = (manip.conditions || []).concat(mapper(prop));
        return manip;
    });
}
exports.condition_map = condition_map;


/***/ }),

/***/ "./src/rules/libs/parse_shortcut.ts":
/*!******************************************!*\
  !*** ./src/rules/libs/parse_shortcut.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let modifierMap = {
    shift: "shift",
    cmd: "command",
    com: "command",
    opt: "option",
    alt: "alt",
    ctrl: "control",
    "*": "any",
};
function parse_shortcut(shortcut) {
    return shortcut.split("-").map(key => modifierMap[key] || key);
}
exports.parse_shortcut = parse_shortcut;


/***/ }),

/***/ "./src/rules/libs/remove_property.ts":
/*!*******************************************!*\
  !*** ./src/rules/libs/remove_property.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function remove_property(name, callback) {
    return (manip) => {
        if (!manip[name]) {
            return manip;
        }
        manip = callback(manip, manip[name]);
        delete manip[name];
        return manip;
    };
}
exports.remove_property = remove_property;


/***/ }),

/***/ "./src/rules/make_rule.ts":
/*!********************************!*\
  !*** ./src/rules/make_rule.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function make_rule(rule) {
    if (rule[":manipulators"]) {
        rule.manipulators = (rule.manipulators || []).concat(rule[":manipulators"]);
        delete rule[":manipulators"];
    }
    let attrs = Object.keys(rule)
        .filter(key => key.match(/^:/))
        .reduce((base, cur) => {
        base[cur] = rule[cur];
        delete rule[cur];
        return base;
    }, {});
    rule.manipulators = rule.manipulators.map(manip => Object.assign({}, manip, attrs));
    return rule;
}
exports.make_rule = make_rule;


/***/ }),

/***/ "./src/rules/pear.ts":
/*!***************************!*\
  !*** ./src/rules/pear.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const from_1 = __webpack_require__(/*! ./from */ "./src/rules/from.ts");
const to_1 = __webpack_require__(/*! ./to */ "./src/rules/to.ts");
function pear(manip) {
    Object.keys(manip)
        .filter(key => key.match(/^:/))
        .forEach(key => {
        manip.from = from_1.fromModifier(manip.from, key.replace(/^:/, ""));
        manip.to = to_1.toModifier(manip.to, manip[key]);
        delete manip[key];
    });
    return manip;
}
exports.pear = pear;


/***/ }),

/***/ "./src/rules/string_shortcut.ts":
/*!**************************************!*\
  !*** ./src/rules/string_shortcut.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function string_shortcut(manip) {
    if ("string" !== typeof manip) {
        return manip;
    }
    let kv = manip.split(":");
    let result = {};
    result[":" + (kv.shift() || "").trim()] = kv.join(":").trim();
    return result;
}
exports.string_shortcut = string_shortcut;


/***/ }),

/***/ "./src/rules/to.ts":
/*!*************************!*\
  !*** ./src/rules/to.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const parse_shortcut_1 = __webpack_require__(/*! ./libs/parse_shortcut */ "./src/rules/libs/parse_shortcut.ts");
const remove_property_1 = __webpack_require__(/*! ./libs/remove_property */ "./src/rules/libs/remove_property.ts");
let toModifierMap = {
    "(": {
        key: "9",
        mod: "shift",
    },
    ")": {
        key: "0",
        mod: "shift",
    },
    "{": {
        key: "open_bracket",
        mod: "shift",
    },
    "}": {
        key: "close_bracket",
        mod: "shift",
    },
    "<": {
        key: "comma",
        mod: "shift",
    },
    ">": {
        key: "period",
        mod: "shift",
    },
    '"': {
        key: "quote",
        mod: "shift",
    },
    "'": {
        key: "quote",
    },
    ",": {
        key: "comma",
    },
    ".": {
        key: "period",
    },
    " ": {
        key: "spacebar",
    },
    "=": {
        key: "equal_sign",
    },
};
function toModifier(base, short) {
    let results = short
        .split(/,/)
        .filter(short => short)
        .reduce((base, short) => {
        if (!short.match(/^'.+?'$/)) {
            let keys = parse_shortcut_1.parse_shortcut(short);
            let result = {
                key_code: keys.pop() || "",
            };
            if (keys.length) {
                result.modifiers = keys;
            }
            return base.concat(result);
        }
        let results = short
            .replace(/^'(.+?)'$/, "$1")
            .split(/(?:)/)
            .map((key) => {
            if (!toModifierMap[key]) {
                if (key.toLowerCase() === key) {
                    return { key_code: key };
                }
                return {
                    key_code: key.toLowerCase(),
                    modifiers: ["shift"],
                };
            }
            let mod = toModifierMap[key]["mod"];
            if (!mod) {
                return { key_code: toModifierMap[key]["key"] };
            }
            return {
                key_code: toModifierMap[key]["key"],
                modifiers: [mod],
            };
        });
        return base.concat(results);
    }, []);
    return (base || []).concat(results);
}
exports.toModifier = toModifier;
exports.to = remove_property_1.remove_property(":to", (manip, prop) => {
    manip.to = toModifier(manip.to, prop);
    return manip;
});


/***/ }),

/***/ "./src/rules/type_basic.ts":
/*!*********************************!*\
  !*** ./src/rules/type_basic.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function type_basic(manip) {
    manip.type = manip.type || "basic";
    return manip;
}
exports.type_basic = type_basic;


/***/ }),

/***/ "./src/write_rules.ts":
/*!****************************!*\
  !*** ./src/write_rules.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(/*! fs */ "fs");
function write_rules(rules) {
    let karabinerJsonPath = `${process.env.HOME}/.config/karabiner/karabiner.json`;
    let karabinerJson = __webpack_require__("./src sync recursive")(karabinerJsonPath);
    karabinerJson.profiles
        .filter(profile => profile.selected)
        .forEach(profile => (profile.complex_modifications.rules = rules));
    fs.writeFileSync(karabinerJsonPath, JSON.stringify(karabinerJson, null, "  "));
}
exports.write_rules = write_rules;


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "source-map-support":
/*!*************************************!*\
  !*** external "source-map-support" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("source-map-support");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjIHN5bmMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9tYWtlX3J1bGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9yZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZF9ydWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9kZXZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2Zyb20udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xhbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL2xpYnMvY29uZGl0aW9uX21hcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvbGlicy9wYXJzZV9zaG9ydGN1dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvbGlicy9yZW1vdmVfcHJvcGVydHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL21ha2VfcnVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcGVhci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvc3RyaW5nX3Nob3J0Y3V0LnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy90by50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvdHlwZV9iYXNpYy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvd3JpdGVfcnVsZXMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzb3VyY2UtbWFwLXN1cHBvcnRcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxXQUFXO0FBQ2xEO0FBQ0E7QUFDQSxnRDs7Ozs7Ozs7Ozs7Ozs7QUNSQSw2RkFBdUQ7QUFDdkQsb0lBQTBFO0FBQzFFLG9GQUEwQztBQUMxQyx1RkFBNEM7QUFFNUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7QUFFM0IsSUFBSSxLQUFLLEdBQUcsdURBQTBCLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7SUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDNUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNuQjtBQUVELElBQUksS0FBSyxHQUFHLHVCQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7QUFFOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO0lBQ25DLHlCQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Q0FDdEI7S0FBTTtJQUNILE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDUixPQUFPLEVBQUUsa0JBQWtCO1FBQzNCLE9BQU8sRUFBRSxLQUFLO0tBQ2pCLENBQUMsQ0FBQztDQUNOOzs7Ozs7Ozs7Ozs7Ozs7O0FDdEJELDJFQUFrQztBQUNsQyxvRkFBMkQ7QUFDM0QsOEVBQWtEO0FBQ2xELDhFQUFzRDtBQUN0RCw2RkFBOEM7QUFDOUMsOEVBQW9DO0FBQ3BDLCtHQUEwRDtBQUMxRCx3RUFBNEM7QUFDNUMsZ0dBQWdEO0FBMkJoRCxvQkFBMkIsSUFBWTtJQUNuQyxJQUFJLElBQUksR0FBbUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztJQUM3RCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQy9DLEdBQUcsQ0FBQyxxQkFBUyxDQUFDO1NBQ2QsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQ1IsSUFBSSxDQUFDLFlBQVk7U0FDWixHQUFHLENBQUMsaUNBQWUsQ0FBQztTQUNwQixHQUFHLENBQUMsdUJBQVUsQ0FBQztTQUNmLEdBQUcsQ0FBQyxTQUFHLENBQUM7U0FDUixHQUFHLENBQUMsZUFBTSxDQUFDO1NBQ1gsR0FBRyxDQUFDLFdBQUksQ0FBQztTQUNULEdBQUcsQ0FBQyxXQUFJLENBQUM7U0FDVCxHQUFHLENBQUMsT0FBRSxDQUFDO1NBQ1AsR0FBRyxDQUFDLFdBQUksQ0FBQyxDQUNqQixDQUFDO0FBQ1YsQ0FBQztBQWZELGdDQWVDOzs7Ozs7Ozs7Ozs7Ozs7QUNsREQsK0NBQXlCO0FBT3pCLG9DQUNJLE9BQWU7SUFFZixPQUFPLEVBQUU7U0FDSixXQUFXLENBQUMsT0FBTyxDQUFDO1NBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ1IsSUFBSSxJQUFJLEdBQUcsR0FBRyxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7UUFDaEMsT0FBTztZQUNILFFBQVEsRUFBRSxJQUFJO1lBQ2QsV0FBVyxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdDLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztBQUNYLENBQUM7QUFiRCxnRUFhQzs7Ozs7Ozs7Ozs7Ozs7O0FDcEJELG9GQUEwQztBQUcxQyxvQkFBMkIsS0FBZ0M7SUFDdkQsT0FBTyxLQUFLO1NBQ1AsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ1IsSUFBSTtZQUNBLE9BQU8sdUJBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDdkM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDM0M7SUFDTCxDQUFDLENBQUM7U0FDRCxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFWRCxnQ0FVQzs7Ozs7Ozs7Ozs7Ozs7O0FDWkQsNkdBQXFEO0FBRXJELElBQUksZUFBZSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNOLHlCQUF5QjtRQUN6QiwyQkFBMkI7UUFDM0Isd0JBQXdCO0tBQzNCO0lBQ0QsTUFBTSxFQUFFLENBQUMseUJBQXlCLENBQUM7SUFDbkMsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7Q0FDckMsQ0FBQztBQUVGLElBQUksY0FBYyxHQUFHLENBQUMsU0FBaUIsRUFBeUIsRUFBRTtJQUM5RCxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUM1QixPQUFPO1lBQ0gsSUFBSSxFQUFFLDBCQUEwQjtZQUNoQyxrQkFBa0IsRUFBRSxlQUFlLENBQUMsU0FBUyxDQUFDO1NBQ2pELENBQUM7S0FDTDtJQUNELElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtRQUN2RSxPQUFPO1lBQ0gsSUFBSSxFQUFFLDhCQUE4QjtZQUNwQyxrQkFBa0IsRUFBRSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3JFLENBQUM7S0FDTDtJQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDOUQsQ0FBQyxDQUFDO0FBRVcsV0FBRyxHQUFHLDZCQUFhLENBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUM1QnpELDZHQUFxRDtBQU9yRCxJQUFJLGtCQUFrQixHQUFHO0lBQ3JCLE9BQU8sRUFBRTtRQUNMLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLEdBQUc7S0FDbEI7SUFDRCxLQUFLLEVBQUU7UUFDSCxTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxHQUFHO0tBQ2xCO0NBQ0osQ0FBQztBQUVGLElBQUksaUJBQWlCLEdBQUcsQ0FBQyxTQUFTLEVBQXlCLEVBQUU7SUFDekQsSUFBSSxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUMvQixPQUFPO1lBQ0gsSUFBSSxFQUFFLFdBQVc7WUFDakIsV0FBVyxFQUFFLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDL0MsQ0FBQztLQUNMO0lBQ0QsSUFDSSxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztRQUNyQixrQkFBa0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxFQUNqRDtRQUNFLE9BQU87WUFDSCxJQUFJLEVBQUUsZUFBZTtZQUNyQixXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2pFLENBQUM7S0FDTDtJQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDOUQsQ0FBQyxDQUFDO0FBRVcsY0FBTSxHQUFHLDZCQUFhLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3JDbEUsZ0hBQXVEO0FBQ3ZELG1IQUF5RDtBQVV6RCxzQkFDSSxJQUF5QixFQUN6QixLQUFhO0lBRWIsSUFBSSxJQUFJLEdBQUcsK0JBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxJQUFJLE1BQU0sR0FBaUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFO1FBQ2pELFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO0tBQ3ZCLENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO1FBQ2QsT0FBTyxNQUFNLENBQUM7S0FDakI7SUFDRCxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUk7UUFDbkMsU0FBUyxFQUFFLEVBQUU7S0FDaEIsQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUM7S0FDNUM7SUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDckMsSUFBSSxRQUFRLEdBQUcsSUFBSTthQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FDaEUsUUFBUSxDQUNYLENBQUM7UUFDRixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ2pEO0lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7UUFDZCxPQUFPLE1BQU0sQ0FBQztLQUNqQjtJQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUNsQyxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBaENELG9DQWdDQztBQUVZLFlBQUksR0FBRyxpQ0FBZSxDQUMvQixPQUFPLEVBQ1AsQ0FBQyxLQUFrQixFQUFFLElBQVksRUFBZSxFQUFFO0lBQzlDLEtBQUssQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUMsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQyxDQUNKLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ25ERiw2R0FBcUQ7QUFNckQsSUFBSSxtQkFBbUIsR0FBRyxDQUFDLElBQVksRUFBeUIsRUFBRSxDQUFDLENBQUM7SUFDaEUsSUFBSSxFQUFFLGlCQUFpQjtJQUN2QixhQUFhLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztDQUN0QyxDQUFDLENBQUM7QUFFVSxZQUFJLEdBQUcsNkJBQWEsQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDWGhFLDhHQUFvRDtBQUVwRCx1QkFDSSxJQUFZLEVBQ1osTUFBK0M7SUFFL0MsT0FBTyxpQ0FBZSxDQUNsQixJQUFJLEVBQ0osQ0FBQyxLQUFrQixFQUFFLElBQVksRUFBZSxFQUFFO1FBQzlDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNqRSxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDLENBQ0osQ0FBQztBQUNOLENBQUM7QUFYRCxzQ0FXQzs7Ozs7Ozs7Ozs7Ozs7O0FDZEQsSUFBSSxXQUFXLEdBQThCO0lBQ3pDLEtBQUssRUFBRSxPQUFPO0lBQ2QsR0FBRyxFQUFFLFNBQVM7SUFDZCxHQUFHLEVBQUUsU0FBUztJQUNkLEdBQUcsRUFBRSxRQUFRO0lBQ2IsR0FBRyxFQUFFLEtBQUs7SUFDVixJQUFJLEVBQUUsU0FBUztJQUNmLEdBQUcsRUFBRSxLQUFLO0NBQ2IsQ0FBQztBQUVGLHdCQUErQixRQUFnQjtJQUMzQyxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ25FLENBQUM7QUFGRCx3Q0FFQzs7Ozs7Ozs7Ozs7Ozs7O0FDVkQseUJBQ0ksSUFBWSxFQUNaLFFBQTJEO0lBRTNELE9BQU8sQ0FBQyxLQUFrQixFQUFlLEVBQUU7UUFDdkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNkLE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0QsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckMsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQyxDQUFDO0FBQ04sQ0FBQztBQVpELDBDQVlDOzs7Ozs7Ozs7Ozs7Ozs7QUNaRCxtQkFDSSxJQUE2QjtJQUU3QixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQ2hELElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDeEIsQ0FBQztRQUNGLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ2hDO0lBQ0QsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDeEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QixNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDbEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDWCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQzlDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FDbEMsQ0FBQztJQUNGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFwQkQsOEJBb0JDOzs7Ozs7Ozs7Ozs7Ozs7QUNyQkQsd0VBQXNDO0FBQ3RDLGtFQUFrQztBQUVsQyxjQUFxQixLQUFrQjtJQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNiLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ1gsS0FBSyxDQUFDLElBQUksR0FBRyxtQkFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM3RCxLQUFLLENBQUMsRUFBRSxHQUFHLGVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFRLEtBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ25ELE9BQWEsS0FBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQVRELG9CQVNDOzs7Ozs7Ozs7Ozs7Ozs7QUNYRCx5QkFBZ0MsS0FBMkI7SUFDdkQsSUFBSSxRQUFRLEtBQUssT0FBTyxLQUFLLEVBQUU7UUFDM0IsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFDRCxJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQztJQUNyQixNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5RCxPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO0FBUkQsMENBUUM7Ozs7Ozs7Ozs7Ozs7OztBQ1RELGdIQUF1RDtBQUN2RCxtSEFBeUQ7QUFFekQsSUFBSSxhQUFhLEdBS2I7SUFDQSxHQUFHLEVBQUU7UUFDRCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxPQUFPO0tBQ2Y7SUFDRCxHQUFHLEVBQUU7UUFDRCxHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxPQUFPO0tBQ2Y7SUFDRCxHQUFHLEVBQUU7UUFDRCxHQUFHLEVBQUUsY0FBYztRQUNuQixHQUFHLEVBQUUsT0FBTztLQUNmO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsR0FBRyxFQUFFLGVBQWU7UUFDcEIsR0FBRyxFQUFFLE9BQU87S0FDZjtJQUNELEdBQUcsRUFBRTtRQUNELEdBQUcsRUFBRSxPQUFPO1FBQ1osR0FBRyxFQUFFLE9BQU87S0FDZjtJQUNELEdBQUcsRUFBRTtRQUNELEdBQUcsRUFBRSxRQUFRO1FBQ2IsR0FBRyxFQUFFLE9BQU87S0FDZjtJQUNELEdBQUcsRUFBRTtRQUNELEdBQUcsRUFBRSxPQUFPO1FBQ1osR0FBRyxFQUFFLE9BQU87S0FDZjtJQUNELEdBQUcsRUFBRTtRQUNELEdBQUcsRUFBRSxPQUFPO0tBQ2Y7SUFDRCxHQUFHLEVBQUU7UUFDRCxHQUFHLEVBQUUsT0FBTztLQUNmO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsR0FBRyxFQUFFLFFBQVE7S0FDaEI7SUFDRCxHQUFHLEVBQUU7UUFDRCxHQUFHLEVBQUUsVUFBVTtLQUNsQjtJQUNELEdBQUcsRUFBRTtRQUNELEdBQUcsRUFBRSxZQUFZO0tBQ3BCO0NBQ0osQ0FBQztBQU9GLG9CQUNJLElBQXlCLEVBQ3pCLEtBQWE7SUFFYixJQUFJLE9BQU8sR0FBRyxLQUFLO1NBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztTQUN0QixNQUFNLENBQUMsQ0FBQyxJQUFrQixFQUFFLEtBQWEsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQ3pCLElBQUksSUFBSSxHQUFHLCtCQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsSUFBSSxNQUFNLEdBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTthQUM3QixDQUFDO1lBQ0YsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNiLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2FBQzNCO1lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzlCO1FBQ0QsSUFBSSxPQUFPLEdBQUcsS0FBSzthQUNkLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDO2FBQzFCLEtBQUssQ0FBQyxNQUFNLENBQUM7YUFDYixHQUFHLENBQ0EsQ0FBQyxHQUFXLEVBQWMsRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQixJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxHQUFHLEVBQUU7b0JBQzNCLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUM7aUJBQzVCO2dCQUNELE9BQU87b0JBQ0gsUUFBUSxFQUFFLEdBQUcsQ0FBQyxXQUFXLEVBQUU7b0JBQzNCLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQztpQkFDdkIsQ0FBQzthQUNMO1lBQ0QsSUFBSSxHQUFHLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3BDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ04sT0FBTyxFQUFFLFFBQVEsRUFBRSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzthQUNsRDtZQUNELE9BQU87Z0JBQ0gsUUFBUSxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ25DLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQzthQUNuQixDQUFDO1FBQ04sQ0FBQyxDQUNKLENBQUM7UUFDTixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ1gsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQTdDRCxnQ0E2Q0M7QUFFWSxVQUFFLEdBQUcsaUNBQWUsQ0FDN0IsS0FBSyxFQUNMLENBQUMsS0FBa0IsRUFBRSxJQUFZLEVBQWUsRUFBRTtJQUM5QyxLQUFLLENBQUMsRUFBRSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3RDLE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUMsQ0FDSixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMvR0Ysb0JBQTJCLEtBQWtCO0lBQ3pDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUM7SUFDbkMsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUhELGdDQUdDOzs7Ozs7Ozs7Ozs7Ozs7QUNMRCwrQ0FBeUI7QUFjekIscUJBQTRCLEtBQWdDO0lBQ3hELElBQUksaUJBQWlCLEdBQUcsR0FDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUNoQixtQ0FBbUMsQ0FBQztJQUNwQyxJQUFJLGFBQWEsR0FBa0IsNENBQVEsaUJBQWlCLENBQUMsQ0FBQztJQUM5RCxhQUFhLENBQUMsUUFBUTtTQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO1NBQ25DLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLEVBQUUsQ0FBQyxhQUFhLENBQ1osaUJBQWlCLEVBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FDNUMsQ0FBQztBQUNOLENBQUM7QUFaRCxrQ0FZQzs7Ozs7Ozs7Ozs7O0FDMUJELCtCOzs7Ozs7Ozs7OztBQ0FBLCtDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJmdW5jdGlvbiB3ZWJwYWNrRW1wdHlDb250ZXh0KHJlcSkge1xuXHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0dGhyb3cgZTtcbn1cbndlYnBhY2tFbXB0eUNvbnRleHQua2V5cyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gW107IH07XG53ZWJwYWNrRW1wdHlDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrRW1wdHlDb250ZXh0O1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlDb250ZXh0O1xud2VicGFja0VtcHR5Q29udGV4dC5pZCA9IFwiLi9zcmMgc3luYyByZWN1cnNpdmVcIjsiLCJpbXBvcnQgKiBhcyBTb3VyY2VNYXBTdXBwb3J0IGZyb20gXCJzb3VyY2UtbWFwLXN1cHBvcnRcIjtcbmltcG9ydCB7IHJlYWRfY29tcGxleF9tb2RpZmljYXRpb25zIH0gZnJvbSBcIi4vcmVhZF9jb21wbGV4X21vZGlmaWNhdGlvbnNcIjtcbmltcG9ydCB7IHJlYWRfcnVsZXMgfSBmcm9tIFwiLi9yZWFkX3J1bGVzXCI7XG5pbXBvcnQgeyB3cml0ZV9ydWxlcyB9IGZyb20gXCIuL3dyaXRlX3J1bGVzXCI7XG5cblNvdXJjZU1hcFN1cHBvcnQuaW5zdGFsbCgpO1xuXG5sZXQgZmlsZXMgPSByZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucyhfX2Rpcm5hbWUpO1xuaWYgKCFmaWxlcy5sZW5ndGgpIHtcbiAgICBjb25zb2xlLmVycm9yKFwibWlzc2luZyBzZXR0aW5nIGpzb24gZmlsZXNcIik7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xufVxuXG5sZXQgcnVsZXMgPSByZWFkX3J1bGVzKGZpbGVzKTtcblxuaWYgKH5wcm9jZXNzLmFyZ3YuaW5kZXhPZihcIi0tdXBkYXRlXCIpKSB7XG4gICAgd3JpdGVfcnVsZXMocnVsZXMpO1xufSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyh7XG4gICAgICAgIFwidGl0bGVcIjogXCJwcml2YXRlIHNldHRpbmdzXCIsXG4gICAgICAgIFwicnVsZXNcIjogcnVsZXMsXG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi9ydWxlcy9hcHBcIjtcbmltcG9ydCB7IGRldmljZSwgRGV2aWNlSWRlbnRpZmllcnMgfSBmcm9tIFwiLi9ydWxlcy9kZXZpY2VcIjtcbmltcG9ydCB7IGZyb20sIEZyb21Nb2RpZmllciB9IGZyb20gXCIuL3J1bGVzL2Zyb21cIjtcbmltcG9ydCB7IGxhbmcsIExhbmdJbnB1dFNvdXJjZXMgfSBmcm9tIFwiLi9ydWxlcy9sYW5nXCI7XG5pbXBvcnQgeyBtYWtlX3J1bGUgfSBmcm9tIFwiLi9ydWxlcy9tYWtlX3J1bGVcIjtcbmltcG9ydCB7IHBlYXIgfSBmcm9tIFwiLi9ydWxlcy9wZWFyXCI7XG5pbXBvcnQgeyBzdHJpbmdfc2hvcnRjdXQgfSBmcm9tIFwiLi9ydWxlcy9zdHJpbmdfc2hvcnRjdXRcIjtcbmltcG9ydCB7IHRvLCBUb01vZGlmaWVyIH0gZnJvbSBcIi4vcnVsZXMvdG9cIjtcbmltcG9ydCB7IHR5cGVfYmFzaWMgfSBmcm9tIFwiLi9ydWxlcy90eXBlX2Jhc2ljXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFuaXB1bGF0b3JDb25kaXRpb25zIHtcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgYnVuZGxlX2lkZW50aWZpZXJzPzogc3RyaW5nW107XG4gICAgaWRlbnRpZmllcnM/OiBEZXZpY2VJZGVudGlmaWVyc1tdO1xuICAgIGlucHV0X3NvdXJjZXM/OiBMYW5nSW5wdXRTb3VyY2VzW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFuaXB1bGF0b3Ige1xuICAgIHR5cGU/OiBzdHJpbmc7XG4gICAgY29uZGl0aW9ucz86IE1hbmlwdWxhdG9yQ29uZGl0aW9uc1tdO1xuICAgIGZyb20/OiBGcm9tTW9kaWZpZXI7XG4gICAgdG8/OiBUb01vZGlmaWVyW107XG5cbiAgICBcIjpmcm9tXCI/OiBzdHJpbmc7XG4gICAgXCI6dG9cIj86IHN0cmluZztcbiAgICBcIjphcHBcIj86IHN0cmluZztcbiAgICBcIjpsYW5nXCI/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUge1xuICAgIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gICAgbWFuaXB1bGF0b3JzPzogTWFuaXB1bGF0b3JbXTtcbiAgICBcIjptYW5pcHVsYXRvcnNcIj86IE1hbmlwdWxhdG9yIHwgTWFuaXB1bGF0b3JbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VfcnVsZXModGV4dDogc3RyaW5nKTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVbXSB7XG4gICAgbGV0IGpzb246IHsgcnVsZXM6IGFueVtdIH0gfCBhbnlbXSB8IGFueSA9IGV2YWwoYCgke3RleHR9KWApO1xuICAgIHJldHVybiAoanNvbi5ydWxlcyB8fCAoanNvbi5sZW5ndGggPyBqc29uIDogW2pzb25dKSlcbiAgICAgICAgLm1hcChtYWtlX3J1bGUpXG4gICAgICAgIC5tYXAocnVsZSA9PlxuICAgICAgICAgICAgcnVsZS5tYW5pcHVsYXRvcnNcbiAgICAgICAgICAgICAgICAubWFwKHN0cmluZ19zaG9ydGN1dClcbiAgICAgICAgICAgICAgICAubWFwKHR5cGVfYmFzaWMpXG4gICAgICAgICAgICAgICAgLm1hcChhcHApXG4gICAgICAgICAgICAgICAgLm1hcChkZXZpY2UpXG4gICAgICAgICAgICAgICAgLm1hcChsYW5nKVxuICAgICAgICAgICAgICAgIC5tYXAoZnJvbSlcbiAgICAgICAgICAgICAgICAubWFwKHRvKVxuICAgICAgICAgICAgICAgIC5tYXAocGVhcilcbiAgICAgICAgKTtcbn1cbiIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBsZXhNb2RpZmljYXRpb25GaWxlIHtcbiAgICBmaWxlTmFtZTogc3RyaW5nO1xuICAgIHRleHRDb250ZW50OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucyhcbiAgICBkaXJuYW1lOiBzdHJpbmdcbik6IENvbXBsZXhNb2RpZmljYXRpb25GaWxlW10ge1xuICAgIHJldHVybiBmc1xuICAgICAgICAucmVhZGRpclN5bmMoZGlybmFtZSlcbiAgICAgICAgLmZpbHRlcihmaWxlID0+IGZpbGUubWF0Y2goL1xcLmpzb24kLykpXG4gICAgICAgIC5tYXAoZmlsZSA9PiB7XG4gICAgICAgICAgICBsZXQgcGF0aCA9IGAke2Rpcm5hbWV9LyR7ZmlsZX1gO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogZmlsZSxcbiAgICAgICAgICAgICAgICB0ZXh0Q29udGVudDogU3RyaW5nKGZzLnJlYWRGaWxlU3luYyhwYXRoKSksXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbn1cbiIsImltcG9ydCB7IG1ha2VfcnVsZXMgfSBmcm9tIFwiLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uRmlsZSB9IGZyb20gXCIuL3JlYWRfY29tcGxleF9tb2RpZmljYXRpb25zXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkX3J1bGVzKGZpbGVzOiBDb21wbGV4TW9kaWZpY2F0aW9uRmlsZVtdKSB7XG4gICAgcmV0dXJuIGZpbGVzXG4gICAgICAgIC5tYXAoZmlsZSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYWtlX3J1bGVzKGZpbGUudGV4dENvbnRlbnQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZS5tZXNzYWdlLCBmaWxlLmZpbGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnJlZHVjZSgoYmFzZSwgY3VyKSA9PiBiYXNlLmNvbmNhdChjdXIpLCBbXSk7XG59XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvckNvbmRpdGlvbnMgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgY29uZGl0aW9uX21hcCB9IGZyb20gXCIuL2xpYnMvY29uZGl0aW9uX21hcFwiO1xuXG5sZXQgY29uZGl0aW9uQXBwTWFwID0ge1xuICAgIGJyb3dzZXJzOiBbXG4gICAgICAgIFwiXmNvbVxcXFwuZ29vZ2xlXFxcXC5DaHJvbWUkXCIsXG4gICAgICAgIFwiXm9yZ1xcXFwubW96aWxsYVxcXFwuZmlyZWZveCRcIixcbiAgICAgICAgXCJeY29tXFxcXC5hcHBsZVxcXFwuU2FmYXJpJFwiLFxuICAgIF0sXG4gICAgY2hyb21lOiBbXCJeY29tXFxcXC5nb29nbGVcXFxcLkNocm9tZSRcIl0sXG4gICAgamV0YnJhaW5zOiBbXCJeY29tXFxcXC5qZXRicmFpbnNcXFxcLlwiXSxcbn07XG5cbmxldCB0b0NvbmRpdGlvbkFwcCA9IChjb25kaXRpb246IHN0cmluZyk6IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyA9PiB7XG4gICAgaWYgKGNvbmRpdGlvbkFwcE1hcFtjb25kaXRpb25dKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcImZyb250bW9zdF9hcHBsaWNhdGlvbl9pZlwiLFxuICAgICAgICAgICAgYnVuZGxlX2lkZW50aWZpZXJzOiBjb25kaXRpb25BcHBNYXBbY29uZGl0aW9uXSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKGNvbmRpdGlvbi5tYXRjaCgvXiEvKSAmJiBjb25kaXRpb25BcHBNYXBbY29uZGl0aW9uLnJlcGxhY2UoL14hLywgXCJcIildKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcImZyb250bW9zdF9hcHBsaWNhdGlvbl91bmxlc3NcIixcbiAgICAgICAgICAgIGJ1bmRsZV9pZGVudGlmaWVyczogW2NvbmRpdGlvbkFwcE1hcFtjb25kaXRpb24ucmVwbGFjZSgvXiEvLCBcIlwiKV1dLFxuICAgICAgICB9O1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gQ29uZGl0aW9uQXBwTWFwIFwiJHtjb25kaXRpb259XCJgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBhcHAgPSBjb25kaXRpb25fbWFwKFwiOmFwcFwiLCB0b0NvbmRpdGlvbkFwcCk7XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvckNvbmRpdGlvbnMgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgY29uZGl0aW9uX21hcCB9IGZyb20gXCIuL2xpYnMvY29uZGl0aW9uX21hcFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIERldmljZUlkZW50aWZpZXJzIHtcbiAgICB2ZW5kb3JfaWQ6IG51bWJlcjtcbiAgICBwcm9kdWN0X2lkOiBudW1iZXI7XG59XG5cbmxldCBjb25kaXRpb25EZXZpY2VNYXAgPSB7XG4gICAgYmFyb2Njbzoge1xuICAgICAgICB2ZW5kb3JfaWQ6IDEyNDEsXG4gICAgICAgIHByb2R1Y3RfaWQ6IDMyMyxcbiAgICB9LFxuICAgIGFwcGxlOiB7XG4gICAgICAgIHZlbmRvcl9pZDogMTQ1MixcbiAgICAgICAgcHJvZHVjdF9pZDogNjI5LFxuICAgIH0sXG59O1xuXG5sZXQgdG9Db25kaXRpb25EZXZpY2UgPSAoY29uZGl0aW9uKTogTWFuaXB1bGF0b3JDb25kaXRpb25zID0+IHtcbiAgICBpZiAoY29uZGl0aW9uRGV2aWNlTWFwW2NvbmRpdGlvbl0pIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwiZGV2aWNlX2lmXCIsXG4gICAgICAgICAgICBpZGVudGlmaWVyczogW2NvbmRpdGlvbkRldmljZU1hcFtjb25kaXRpb25dXSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgICBjb25kaXRpb24ubWF0Y2goL14hLykgJiZcbiAgICAgICAgY29uZGl0aW9uRGV2aWNlTWFwW2NvbmRpdGlvbi5yZXBsYWNlKC9eIS8sIFwiXCIpXVxuICAgICkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJkZXZpY2VfdW5sZXNzXCIsXG4gICAgICAgICAgICBpZGVudGlmaWVyczogW2NvbmRpdGlvbkRldmljZU1hcFtjb25kaXRpb24ucmVwbGFjZSgvXiEvLCBcIlwiKV1dLFxuICAgICAgICB9O1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gQ29uZGl0aW9uRGV2aWNlIFwiJHtjb25kaXRpb259XCJgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZXZpY2UgPSBjb25kaXRpb25fbWFwKFwiOmRldmljZVwiLCB0b0NvbmRpdGlvbkRldmljZSk7XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBwYXJzZV9zaG9ydGN1dCB9IGZyb20gXCIuL2xpYnMvcGFyc2Vfc2hvcnRjdXRcIjtcbmltcG9ydCB7IHJlbW92ZV9wcm9wZXJ0eSB9IGZyb20gXCIuL2xpYnMvcmVtb3ZlX3Byb3BlcnR5XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRnJvbU1vZGlmaWVyIHtcbiAgICBrZXlfY29kZTogc3RyaW5nO1xuICAgIG1vZGlmaWVycz86IHtcbiAgICAgICAgb3B0aW9uYWw/OiBzdHJpbmdbXTtcbiAgICAgICAgbWFuZGF0b3J5OiBzdHJpbmdbXTtcbiAgICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbU1vZGlmaWVyKFxuICAgIGJhc2U6IEZyb21Nb2RpZmllciB8IHZvaWQsXG4gICAgc2hvcnQ6IHN0cmluZ1xuKTogRnJvbU1vZGlmaWVyIHtcbiAgICBsZXQga2V5cyA9IHBhcnNlX3Nob3J0Y3V0KHNob3J0KTtcbiAgICBsZXQgcmVzdWx0OiBGcm9tTW9kaWZpZXIgPSBPYmplY3QuYXNzaWduKGJhc2UgfHwge30sIHtcbiAgICAgICAga2V5X2NvZGU6IGtleXMucG9wKCksXG4gICAgfSk7XG4gICAgaWYgKCFrZXlzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXN1bHQubW9kaWZpZXJzID0gcmVzdWx0Lm1vZGlmaWVycyB8fCB7XG4gICAgICAgIG1hbmRhdG9yeTogW10sXG4gICAgfTtcbiAgICBpZiAofmtleXMuaW5kZXhPZihcImFueVwiKSkge1xuICAgICAgICByZXN1bHQubW9kaWZpZXJzLm9wdGlvbmFsID0gW1wiYW55XCJdO1xuICAgICAgICBrZXlzID0ga2V5cy5maWx0ZXIoa2V5ID0+IGtleSAhPT0gXCJhbnlcIik7XG4gICAgfVxuICAgIGlmIChrZXlzLmZpbmQoa2V5ID0+IGtleS5pbmNsdWRlcyhcIj9cIikpKSB7XG4gICAgICAgIGxldCBvcHRpb25hbCA9IGtleXNcbiAgICAgICAgICAgIC5maWx0ZXIoa2V5ID0+IGtleS5pbmNsdWRlcyhcIj9cIikpXG4gICAgICAgICAgICAubWFwKGtleSA9PiBrZXkucmVwbGFjZShcIj9cIiwgXCJcIikpO1xuICAgICAgICByZXN1bHQubW9kaWZpZXJzLm9wdGlvbmFsID0gKHJlc3VsdC5tb2RpZmllcnMub3B0aW9uYWwgfHwgW10pLmNvbmNhdChcbiAgICAgICAgICAgIG9wdGlvbmFsXG4gICAgICAgICk7XG4gICAgICAgIGtleXMgPSBrZXlzLmZpbHRlcihrZXkgPT4gIWtleS5pbmNsdWRlcyhcIj9cIikpO1xuICAgIH1cbiAgICBpZiAoIWtleXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlc3VsdC5tb2RpZmllcnMubWFuZGF0b3J5ID0ga2V5cztcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgY29uc3QgZnJvbSA9IHJlbW92ZV9wcm9wZXJ0eShcbiAgICBcIjpmcm9tXCIsXG4gICAgKG1hbmlwOiBNYW5pcHVsYXRvciwgcHJvcDogc3RyaW5nKTogTWFuaXB1bGF0b3IgPT4ge1xuICAgICAgICBtYW5pcC5mcm9tID0gZnJvbU1vZGlmaWVyKG1hbmlwLmZyb20sIHByb3ApO1xuICAgICAgICByZXR1cm4gbWFuaXA7XG4gICAgfVxuKTtcbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBjb25kaXRpb25fbWFwIH0gZnJvbSBcIi4vbGlicy9jb25kaXRpb25fbWFwXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGFuZ0lucHV0U291cmNlcyB7XG4gICAgbGFuZ3VhZ2U6IHN0cmluZztcbn1cblxubGV0IHRvQ29uZGl0aW9uTGFuZ3VhZ2UgPSAobGFuZzogc3RyaW5nKTogTWFuaXB1bGF0b3JDb25kaXRpb25zID0+ICh7XG4gICAgdHlwZTogXCJpbnB1dF9zb3VyY2VfaWZcIixcbiAgICBpbnB1dF9zb3VyY2VzOiBbeyBsYW5ndWFnZTogbGFuZyB9XSxcbn0pO1xuXG5leHBvcnQgY29uc3QgbGFuZyA9IGNvbmRpdGlvbl9tYXAoXCI6bGFuZ1wiLCB0b0NvbmRpdGlvbkxhbmd1YWdlKTtcbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yLCBNYW5pcHVsYXRvckNvbmRpdGlvbnMgfSBmcm9tIFwiLi4vLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgcmVtb3ZlX3Byb3BlcnR5IH0gZnJvbSBcIi4vcmVtb3ZlX3Byb3BlcnR5XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25kaXRpb25fbWFwKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtYXBwZXI6IChwcm9wOiBzdHJpbmcpID0+IE1hbmlwdWxhdG9yQ29uZGl0aW9uc1xuKTogKG1hbmlwOiBNYW5pcHVsYXRvcikgPT4gTWFuaXB1bGF0b3Ige1xuICAgIHJldHVybiByZW1vdmVfcHJvcGVydHkoXG4gICAgICAgIG5hbWUsXG4gICAgICAgIChtYW5pcDogTWFuaXB1bGF0b3IsIHByb3A6IHN0cmluZyk6IE1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgICAgIG1hbmlwLmNvbmRpdGlvbnMgPSAobWFuaXAuY29uZGl0aW9ucyB8fCBbXSkuY29uY2F0KG1hcHBlcihwcm9wKSk7XG4gICAgICAgICAgICByZXR1cm4gbWFuaXA7XG4gICAgICAgIH1cbiAgICApO1xufVxuIiwibGV0IG1vZGlmaWVyTWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgIHNoaWZ0OiBcInNoaWZ0XCIsXG4gICAgY21kOiBcImNvbW1hbmRcIixcbiAgICBjb206IFwiY29tbWFuZFwiLFxuICAgIG9wdDogXCJvcHRpb25cIixcbiAgICBhbHQ6IFwiYWx0XCIsXG4gICAgY3RybDogXCJjb250cm9sXCIsXG4gICAgXCIqXCI6IFwiYW55XCIsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Vfc2hvcnRjdXQoc2hvcnRjdXQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gc2hvcnRjdXQuc3BsaXQoXCItXCIpLm1hcChrZXkgPT4gbW9kaWZpZXJNYXBba2V5XSB8fCBrZXkpO1xufVxuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi4vLi4vbWFrZV9ydWxlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlX3Byb3BlcnR5KFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBjYWxsYmFjazogKG1hbmlwOiBNYW5pcHVsYXRvciwgcHJvcDogc3RyaW5nKSA9PiBNYW5pcHVsYXRvclxuKSB7XG4gICAgcmV0dXJuIChtYW5pcDogTWFuaXB1bGF0b3IpOiBNYW5pcHVsYXRvciA9PiB7XG4gICAgICAgIGlmICghbWFuaXBbbmFtZV0pIHtcbiAgICAgICAgICAgIHJldHVybiBtYW5pcDtcbiAgICAgICAgfVxuICAgICAgICBtYW5pcCA9IGNhbGxiYWNrKG1hbmlwLCBtYW5pcFtuYW1lXSk7XG4gICAgICAgIGRlbGV0ZSBtYW5pcFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIG1hbmlwO1xuICAgIH07XG59XG4iLCJpbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlX3J1bGUoXG4gICAgcnVsZTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVcbik6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlIHtcbiAgICBpZiAocnVsZVtcIjptYW5pcHVsYXRvcnNcIl0pIHtcbiAgICAgICAgcnVsZS5tYW5pcHVsYXRvcnMgPSAocnVsZS5tYW5pcHVsYXRvcnMgfHwgW10pLmNvbmNhdChcbiAgICAgICAgICAgIHJ1bGVbXCI6bWFuaXB1bGF0b3JzXCJdXG4gICAgICAgICk7XG4gICAgICAgIGRlbGV0ZSBydWxlW1wiOm1hbmlwdWxhdG9yc1wiXTtcbiAgICB9XG4gICAgbGV0IGF0dHJzID0gT2JqZWN0LmtleXMocnVsZSlcbiAgICAgICAgLmZpbHRlcihrZXkgPT4ga2V5Lm1hdGNoKC9eOi8pKVxuICAgICAgICAucmVkdWNlKChiYXNlLCBjdXIpID0+IHtcbiAgICAgICAgICAgIGJhc2VbY3VyXSA9IHJ1bGVbY3VyXTtcbiAgICAgICAgICAgIGRlbGV0ZSBydWxlW2N1cl07XG4gICAgICAgICAgICByZXR1cm4gYmFzZTtcbiAgICAgICAgfSwge30pO1xuICAgIHJ1bGUubWFuaXB1bGF0b3JzID0gcnVsZS5tYW5pcHVsYXRvcnMubWFwKG1hbmlwID0+XG4gICAgICAgIE9iamVjdC5hc3NpZ24oe30sIG1hbmlwLCBhdHRycylcbiAgICApO1xuICAgIHJldHVybiBydWxlO1xufVxuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgZnJvbU1vZGlmaWVyIH0gZnJvbSBcIi4vZnJvbVwiO1xuaW1wb3J0IHsgdG9Nb2RpZmllciB9IGZyb20gXCIuL3RvXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBwZWFyKG1hbmlwOiBNYW5pcHVsYXRvcik6IE1hbmlwdWxhdG9yIHtcbiAgICBPYmplY3Qua2V5cyhtYW5pcClcbiAgICAgICAgLmZpbHRlcihrZXkgPT4ga2V5Lm1hdGNoKC9eOi8pKVxuICAgICAgICAuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgbWFuaXAuZnJvbSA9IGZyb21Nb2RpZmllcihtYW5pcC5mcm9tLCBrZXkucmVwbGFjZSgvXjovLCBcIlwiKSk7XG4gICAgICAgICAgICBtYW5pcC50byA9IHRvTW9kaWZpZXIobWFuaXAudG8sICg8YW55Pm1hbmlwKVtrZXldKTtcbiAgICAgICAgICAgIGRlbGV0ZSAoPGFueT5tYW5pcClba2V5XTtcbiAgICAgICAgfSk7XG4gICAgcmV0dXJuIG1hbmlwO1xufVxuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc3RyaW5nX3Nob3J0Y3V0KG1hbmlwOiBNYW5pcHVsYXRvciB8IHN0cmluZyk6IE1hbmlwdWxhdG9yIHtcbiAgICBpZiAoXCJzdHJpbmdcIiAhPT0gdHlwZW9mIG1hbmlwKSB7XG4gICAgICAgIHJldHVybiBtYW5pcDtcbiAgICB9XG4gICAgbGV0IGt2ID0gbWFuaXAuc3BsaXQoXCI6XCIpO1xuICAgIGxldCByZXN1bHQ6IGFueSA9IHt9O1xuICAgIHJlc3VsdFtcIjpcIiArIChrdi5zaGlmdCgpIHx8IFwiXCIpLnRyaW0oKV0gPSBrdi5qb2luKFwiOlwiKS50cmltKCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IHBhcnNlX3Nob3J0Y3V0IH0gZnJvbSBcIi4vbGlicy9wYXJzZV9zaG9ydGN1dFwiO1xuaW1wb3J0IHsgcmVtb3ZlX3Byb3BlcnR5IH0gZnJvbSBcIi4vbGlicy9yZW1vdmVfcHJvcGVydHlcIjtcblxubGV0IHRvTW9kaWZpZXJNYXA6IHtcbiAgICBba2V5OiBzdHJpbmddOiB7XG4gICAgICAgIGtleTogc3RyaW5nO1xuICAgICAgICBtb2Q/OiBzdHJpbmc7XG4gICAgfTtcbn0gPSB7XG4gICAgXCIoXCI6IHtcbiAgICAgICAga2V5OiBcIjlcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIilcIjoge1xuICAgICAgICBrZXk6IFwiMFwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwie1wiOiB7XG4gICAgICAgIGtleTogXCJvcGVuX2JyYWNrZXRcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIn1cIjoge1xuICAgICAgICBrZXk6IFwiY2xvc2VfYnJhY2tldFwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwiPFwiOiB7XG4gICAgICAgIGtleTogXCJjb21tYVwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwiPlwiOiB7XG4gICAgICAgIGtleTogXCJwZXJpb2RcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICAnXCInOiB7XG4gICAgICAgIGtleTogXCJxdW90ZVwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxuICAgIFwiJ1wiOiB7XG4gICAgICAgIGtleTogXCJxdW90ZVwiLFxuICAgIH0sXG4gICAgXCIsXCI6IHtcbiAgICAgICAga2V5OiBcImNvbW1hXCIsXG4gICAgfSxcbiAgICBcIi5cIjoge1xuICAgICAgICBrZXk6IFwicGVyaW9kXCIsXG4gICAgfSxcbiAgICBcIiBcIjoge1xuICAgICAgICBrZXk6IFwic3BhY2ViYXJcIixcbiAgICB9LFxuICAgIFwiPVwiOiB7XG4gICAgICAgIGtleTogXCJlcXVhbF9zaWduXCIsXG4gICAgfSxcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9Nb2RpZmllciB7XG4gICAga2V5X2NvZGU6IHN0cmluZztcbiAgICBtb2RpZmllcnM/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvTW9kaWZpZXIoXG4gICAgYmFzZTogVG9Nb2RpZmllcltdIHwgdm9pZCxcbiAgICBzaG9ydDogc3RyaW5nXG4pOiBUb01vZGlmaWVyW10ge1xuICAgIGxldCByZXN1bHRzID0gc2hvcnRcbiAgICAgICAgLnNwbGl0KC8sLylcbiAgICAgICAgLmZpbHRlcihzaG9ydCA9PiBzaG9ydClcbiAgICAgICAgLnJlZHVjZSgoYmFzZTogVG9Nb2RpZmllcltdLCBzaG9ydDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXNob3J0Lm1hdGNoKC9eJy4rPyckLykpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5cyA9IHBhcnNlX3Nob3J0Y3V0KHNob3J0KTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBUb01vZGlmaWVyID0ge1xuICAgICAgICAgICAgICAgICAgICBrZXlfY29kZToga2V5cy5wb3AoKSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5tb2RpZmllcnMgPSBrZXlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5jb25jYXQocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCByZXN1bHRzID0gc2hvcnRcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXicoLis/KSckLywgXCIkMVwiKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgvKD86KS8pXG4gICAgICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgICAgICAgKGtleTogc3RyaW5nKTogVG9Nb2RpZmllciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRvTW9kaWZpZXJNYXBba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChrZXkudG9Mb3dlckNhc2UoKSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGtleV9jb2RlOiBrZXkgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5X2NvZGU6IGtleS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2RpZmllcnM6IFtcInNoaWZ0XCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbW9kID0gdG9Nb2RpZmllck1hcFtrZXldW1wibW9kXCJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtb2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBrZXlfY29kZTogdG9Nb2RpZmllck1hcFtrZXldW1wia2V5XCJdIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleV9jb2RlOiB0b01vZGlmaWVyTWFwW2tleV1bXCJrZXlcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXJzOiBbbW9kXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIGJhc2UuY29uY2F0KHJlc3VsdHMpO1xuICAgICAgICB9LCBbXSk7XG4gICAgcmV0dXJuIChiYXNlIHx8IFtdKS5jb25jYXQocmVzdWx0cyk7XG59XG5cbmV4cG9ydCBjb25zdCB0byA9IHJlbW92ZV9wcm9wZXJ0eShcbiAgICBcIjp0b1wiLFxuICAgIChtYW5pcDogTWFuaXB1bGF0b3IsIHByb3A6IHN0cmluZyk6IE1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgbWFuaXAudG8gPSB0b01vZGlmaWVyKG1hbmlwLnRvLCBwcm9wKTtcbiAgICAgICAgcmV0dXJuIG1hbmlwO1xuICAgIH1cbik7XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0eXBlX2Jhc2ljKG1hbmlwOiBNYW5pcHVsYXRvcik6IE1hbmlwdWxhdG9yIHtcbiAgICBtYW5pcC50eXBlID0gbWFuaXAudHlwZSB8fCBcImJhc2ljXCI7XG4gICAgcmV0dXJuIG1hbmlwO1xufVxuIiwiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB9IGZyb20gXCIuL21ha2VfcnVsZXNcIjtcblxuaW50ZXJmYWNlIEthcmFiaW5lckpzb25Qcm9maWxlIHtcbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcbiAgICBjb21wbGV4X21vZGlmaWNhdGlvbnM6IHtcbiAgICAgICAgcnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW107XG4gICAgfTtcbn1cblxuaW50ZXJmYWNlIEthcmFiaW5lckpzb24ge1xuICAgIHByb2ZpbGVzOiBLYXJhYmluZXJKc29uUHJvZmlsZVtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JpdGVfcnVsZXMocnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW10pIHtcbiAgICBsZXQga2FyYWJpbmVySnNvblBhdGggPSBgJHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuSE9NRVxuICAgIH0vLmNvbmZpZy9rYXJhYmluZXIva2FyYWJpbmVyLmpzb25gO1xuICAgIGxldCBrYXJhYmluZXJKc29uOiBLYXJhYmluZXJKc29uID0gcmVxdWlyZShrYXJhYmluZXJKc29uUGF0aCk7XG4gICAga2FyYWJpbmVySnNvbi5wcm9maWxlc1xuICAgICAgICAuZmlsdGVyKHByb2ZpbGUgPT4gcHJvZmlsZS5zZWxlY3RlZClcbiAgICAgICAgLmZvckVhY2gocHJvZmlsZSA9PiAocHJvZmlsZS5jb21wbGV4X21vZGlmaWNhdGlvbnMucnVsZXMgPSBydWxlcykpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoXG4gICAgICAgIGthcmFiaW5lckpzb25QYXRoLFxuICAgICAgICBKU09OLnN0cmluZ2lmeShrYXJhYmluZXJKc29uLCBudWxsLCBcIiAgXCIpXG4gICAgKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvdXJjZS1tYXAtc3VwcG9ydFwiKTsiXSwic291cmNlUm9vdCI6IiJ9