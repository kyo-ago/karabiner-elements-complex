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
let files = read_complex_modifications_1.read_complex_modifications(~process.argv.indexOf("--json")
    ? process.argv[process.argv.indexOf("--json") + 1]
    : __dirname);
if (!files.length) {
    console.error("missing setting json files");
    process.exit(1);
}
let rules = read_rules_1.read_rules(files);
if (!~process.argv.indexOf("--noUpdate")) {
    write_rules_1.write_rules(rules);
}
else {
    console.log({
        title: "private settings",
        rules: rules,
    });
}

/* WEBPACK VAR INJECTION */}.call(this, "/"))

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
        .filter(file => !file.match(/\.result\.json$/))
        .map(file => {
        let path = `${dirname}/${file}`;
        return {
            fileName: file,
            textContent: fs.readFileSync(path, "utf-8"),
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
const json_transform_1 = __webpack_require__(/*! ./rules/json_transform */ "./src/rules/json_transform.ts");
const only_filter_1 = __webpack_require__(/*! ./rules/only_filter */ "./src/rules/only_filter.ts");
function read_rules(files) {
    let results = files.map((file) => {
        try {
            let json = eval(`(${file.textContent})`);
            return json_transform_1.json_transform(json, file.fileName);
        }
        catch (e) {
            console.error(e.message, file.fileName);
        }
    });
    return only_filter_1.only_filter(results);
}
exports.read_rules = read_rules;


/***/ }),

/***/ "./src/rules/json_to_rule.ts":
/*!***********************************!*\
  !*** ./src/rules/json_to_rule.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function json_to_rule(json) {
    if (json.length) {
        if (json.find(rule => rule.description)) {
            return json;
        }
        return [
            {
                manipulators: json,
            },
        ];
    }
    return json.rules || [json];
}
exports.json_to_rule = json_to_rule;


/***/ }),

/***/ "./src/rules/json_transform.ts":
/*!*************************************!*\
  !*** ./src/rules/json_transform.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const make_rules_1 = __webpack_require__(/*! ./make_rules */ "./src/rules/make_rules.ts");
const map_rule_1 = __webpack_require__(/*! ./map_rule */ "./src/rules/map_rule.ts");
function json_transform(json, fileName) {
    let ruleSet = make_rules_1.make_rules(json);
    ruleSet.rules = ruleSet.rules.map(rule => map_rule_1.map_rule(rule, fileName));
    return ruleSet;
}
exports.json_transform = json_transform;


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
    if (rule.length) {
        return {
            manipulators: rule,
        };
    }
    if (rule[":manipulators"]) {
        rule.manipulators = (rule.manipulators || []).concat(rule[":manipulators"]);
        delete rule[":manipulators"];
    }
    return rule;
}
exports.make_rule = make_rule;


/***/ }),

/***/ "./src/rules/make_rule_set.ts":
/*!************************************!*\
  !*** ./src/rules/make_rule_set.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function make_rule_set(rules) {
    if (!rules.find(rule => rule[":only"])) {
        return {
            only: false,
            rules: rules,
        };
    }
    return {
        only: true,
        rules: rules.map(rule => {
            delete rule[":only"];
            return rule;
        }),
    };
}
exports.make_rule_set = make_rule_set;


/***/ }),

/***/ "./src/rules/make_rules.ts":
/*!*********************************!*\
  !*** ./src/rules/make_rules.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const json_to_rule_1 = __webpack_require__(/*! ./json_to_rule */ "./src/rules/json_to_rule.ts");
const make_rule_1 = __webpack_require__(/*! ./make_rule */ "./src/rules/make_rule.ts");
const make_rule_set_1 = __webpack_require__(/*! ./make_rule_set */ "./src/rules/make_rule_set.ts");
function make_rules(json) {
    let rules = json_to_rule_1.json_to_rule(json).map(rule => make_rule_1.make_rule(rule));
    return make_rule_set_1.make_rule_set(rules);
}
exports.make_rules = make_rules;


/***/ }),

/***/ "./src/rules/map_rule.ts":
/*!*******************************!*\
  !*** ./src/rules/map_rule.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(/*! ./rule/app */ "./src/rules/rule/app.ts");
const device_1 = __webpack_require__(/*! ./rule/device */ "./src/rules/rule/device.ts");
const from_1 = __webpack_require__(/*! ./rule/from */ "./src/rules/rule/from.ts");
const lang_1 = __webpack_require__(/*! ./rule/lang */ "./src/rules/rule/lang.ts");
const pear_1 = __webpack_require__(/*! ./rule/pear */ "./src/rules/rule/pear.ts");
const string_shortcut_1 = __webpack_require__(/*! ./rule/string_shortcut */ "./src/rules/rule/string_shortcut.ts");
const to_1 = __webpack_require__(/*! ./rule/to */ "./src/rules/rule/to.ts");
const set_attrs_1 = __webpack_require__(/*! ./set_attrs */ "./src/rules/set_attrs.ts");
const type_basic_1 = __webpack_require__(/*! ./type_basic */ "./src/rules/type_basic.ts");
function map_rule(json, fileName) {
    let { rule, attr } = set_attrs_1.set_attrs(json);
    rule.description = rule.description || fileName.replace(/\.\w+/, "");
    rule.manipulators = rule.manipulators
        .map(string_shortcut_1.string_shortcut)
        .map((manip) => Object.assign({}, manip, attr))
        .map(type_basic_1.type_basic)
        .map(app_1.app)
        .map(device_1.device)
        .map(lang_1.lang)
        .map(from_1.from)
        .map(to_1.to)
        .map(pear_1.pear);
    return rule;
}
exports.map_rule = map_rule;


/***/ }),

/***/ "./src/rules/only_filter.ts":
/*!**********************************!*\
  !*** ./src/rules/only_filter.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function only_filter(rules) {
    let isOnly = rules.find(rule => rule.only);
    let filteredRules = isOnly ? rules.filter(rule => rule.only) : rules;
    return filteredRules
        .map(rule => rule.rules)
        .reduce((base, cur) => base.concat(cur), []);
}
exports.only_filter = only_filter;


/***/ }),

/***/ "./src/rules/rule/app.ts":
/*!*******************************!*\
  !*** ./src/rules/rule/app.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const condition_map_1 = __webpack_require__(/*! ./libs/condition_map */ "./src/rules/rule/libs/condition_map.ts");
let conditionAppMap = {
    browsers: [
        "^com\\.google\\.Chrome$",
        "^org\\.mozilla\\.firefox$",
        "^com\\.apple\\.Safari$",
    ],
    chrome: ["^com\\.google\\.Chrome$"],
    jetbrains: ["^com\\.jetbrains\\."],
    finder: ["^com\\.apple\\.finder"],
};
exports.app = condition_map_1.condition_map(":app", (condition) => {
    if (conditionAppMap[condition]) {
        return {
            type: "frontmost_application_if",
            bundle_identifiers: conditionAppMap[condition],
        };
    }
    if (condition.match(/^!/) &&
        conditionAppMap[condition.replace(/^!/, "")]) {
        return {
            type: "frontmost_application_unless",
            bundle_identifiers: [
                conditionAppMap[condition.replace(/^!/, "")],
            ],
        };
    }
    return {
        type: "frontmost_application_if",
        bundle_identifiers: Array.isArray(condition)
            ? condition
            : [condition],
    };
});


/***/ }),

/***/ "./src/rules/rule/device.ts":
/*!**********************************!*\
  !*** ./src/rules/rule/device.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const condition_map_1 = __webpack_require__(/*! ./libs/condition_map */ "./src/rules/rule/libs/condition_map.ts");
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
exports.device = condition_map_1.condition_map(":device", (condition) => {
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
});


/***/ }),

/***/ "./src/rules/rule/from.ts":
/*!********************************!*\
  !*** ./src/rules/rule/from.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const parse_shortcut_1 = __webpack_require__(/*! ./libs/parse_shortcut */ "./src/rules/rule/libs/parse_shortcut.ts");
const remove_property_1 = __webpack_require__(/*! ./libs/remove_property */ "./src/rules/rule/libs/remove_property.ts");
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

/***/ "./src/rules/rule/lang.ts":
/*!********************************!*\
  !*** ./src/rules/rule/lang.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const condition_map_1 = __webpack_require__(/*! ./libs/condition_map */ "./src/rules/rule/libs/condition_map.ts");
exports.lang = condition_map_1.condition_map(":lang", (lang) => ({
    type: "input_source_if",
    input_sources: [{ language: lang }],
}));


/***/ }),

/***/ "./src/rules/rule/libs/condition_map.ts":
/*!**********************************************!*\
  !*** ./src/rules/rule/libs/condition_map.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const remove_property_1 = __webpack_require__(/*! ./remove_property */ "./src/rules/rule/libs/remove_property.ts");
function condition_map(name, mapper) {
    return remove_property_1.remove_property(name, (manip, prop) => {
        manip.conditions = (manip.conditions || []).concat(mapper(prop));
        return manip;
    });
}
exports.condition_map = condition_map;


/***/ }),

/***/ "./src/rules/rule/libs/parse_shortcut.ts":
/*!***********************************************!*\
  !*** ./src/rules/rule/libs/parse_shortcut.ts ***!
  \***********************************************/
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

/***/ "./src/rules/rule/libs/remove_property.ts":
/*!************************************************!*\
  !*** ./src/rules/rule/libs/remove_property.ts ***!
  \************************************************/
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

/***/ "./src/rules/rule/libs/shortcut_to_modifier.ts":
/*!*****************************************************!*\
  !*** ./src/rules/rule/libs/shortcut_to_modifier.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
    ";": {
        key: "semicolon",
    },
    ":": {
        key: "semicolon",
        mod: "shift",
    },
};
function shortcut_to_modifier(short) {
    return short
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
}
exports.shortcut_to_modifier = shortcut_to_modifier;


/***/ }),

/***/ "./src/rules/rule/pear.ts":
/*!********************************!*\
  !*** ./src/rules/rule/pear.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const from_1 = __webpack_require__(/*! ./from */ "./src/rules/rule/from.ts");
const to_1 = __webpack_require__(/*! ./to */ "./src/rules/rule/to.ts");
function pear(manip) {
    Object.keys(manip)
        .filter(key => key.match(/^:/))
        .filter(key => "string" === typeof manip[key])
        .forEach(key => {
        manip.from = from_1.fromModifier(manip.from, key.replace(/^:/, ""));
        manip.to = to_1.toModifier(manip.to, manip[key]);
        delete manip[key];
    });
    return manip;
}
exports.pear = pear;


/***/ }),

/***/ "./src/rules/rule/string_shortcut.ts":
/*!*******************************************!*\
  !*** ./src/rules/rule/string_shortcut.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function string_shortcut(manip) {
    if ("string" !== typeof manip) {
        return manip;
    }
    let kv = manip.split(":");
    if (kv.length === 1) {
        return manip;
    }
    let result = {};
    result[":" + (kv.shift() || "").trim()] = kv.join(":").trim();
    return result;
}
exports.string_shortcut = string_shortcut;


/***/ }),

/***/ "./src/rules/rule/to.ts":
/*!******************************!*\
  !*** ./src/rules/rule/to.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const parse_shortcut_1 = __webpack_require__(/*! ./libs/parse_shortcut */ "./src/rules/rule/libs/parse_shortcut.ts");
const remove_property_1 = __webpack_require__(/*! ./libs/remove_property */ "./src/rules/rule/libs/remove_property.ts");
const shortcut_to_modifier_1 = __webpack_require__(/*! ./libs/shortcut_to_modifier */ "./src/rules/rule/libs/shortcut_to_modifier.ts");
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
        return base.concat(shortcut_to_modifier_1.shortcut_to_modifier(short));
    }, []);
    return (base || []).concat(results);
}
exports.toModifier = toModifier;
exports.to = remove_property_1.remove_property(":to", (manip, prop) => {
    manip.to = toModifier(manip.to, prop);
    return manip;
});


/***/ }),

/***/ "./src/rules/set_attrs.ts":
/*!********************************!*\
  !*** ./src/rules/set_attrs.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function set_attrs(rule) {
    let attrs = Object.keys(rule)
        .filter(key => key.match(/^:/))
        .filter(key => "string" === typeof rule[key])
        .reduce((base, cur) => {
        base[cur] = rule[cur];
        delete rule[cur];
        return base;
    }, {});
    return {
        rule: rule,
        attr: attrs,
    };
}
exports.set_attrs = set_attrs;


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
    let karabinerJson = eval(`(${fs.readFileSync(karabinerJsonPath, "utf-8")})`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9yZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhZF9ydWxlcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvanNvbl90b19ydWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9qc29uX3RyYW5zZm9ybS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvbWFrZV9ydWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9tYWtlX3J1bGVfc2V0LnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9tYWtlX3J1bGVzLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9tYXBfcnVsZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvb25seV9maWx0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvYXBwLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlL2RldmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZS9mcm9tLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlL2xhbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvbGlicy9jb25kaXRpb25fbWFwLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlL2xpYnMvcGFyc2Vfc2hvcnRjdXQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvbGlicy9yZW1vdmVfcHJvcGVydHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3J1bGVzL3J1bGUvbGlicy9zaG9ydGN1dF90b19tb2RpZmllci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZS9wZWFyLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy9ydWxlL3N0cmluZ19zaG9ydGN1dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvcnVsZS90by50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcnVsZXMvc2V0X2F0dHJzLnRzIiwid2VicGFjazovLy8uL3NyYy9ydWxlcy90eXBlX2Jhc2ljLnRzIiwid2VicGFjazovLy8uL3NyYy93cml0ZV9ydWxlcy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNvdXJjZS1tYXAtc3VwcG9ydFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQSw2RkFBdUQ7QUFDdkQsb0lBQTBFO0FBQzFFLG9GQUEwQztBQUMxQyx1RkFBNEM7QUFFNUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7QUFFM0IsSUFBSSxLQUFLLEdBQUcsdURBQTBCLENBQ2xDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxD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QyxDQUFDO1FBQ2pCLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNYLE9BQU87UUFDSCxJQUFJLEVBQUUsSUFBSTtRQUNWLElBQUksRUFBRSxLQUFLO0tBQ2QsQ0FBQztBQUNOLENBQUM7QUFsQkQsOEJBa0JDOzs7Ozs7Ozs7Ozs7Ozs7QUNsQkQsb0JBQTJCLEtBQWtCO0lBQ3pDLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUM7SUFDbkMsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQUhELGdDQUdDOzs7Ozs7Ozs7Ozs7Ozs7QUNMRCwrQ0FBeUI7QUFjekIscUJBQTRCLEtBQWdDO0lBQ3hELElBQUksaUJBQWlCLEdBQUcsR0FDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUNoQixtQ0FBbUMsQ0FBQztJQUNwQyxJQUFJLGFBQWEsR0FBa0IsSUFBSSxDQUNuQyxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FDckQsQ0FBQztJQUNGLGFBQWEsQ0FBQyxRQUFRO1NBQ2pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDbkMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkUsRUFBRSxDQUFDLGFBQWEsQ0FDWixpQkFBaUIsRUFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUM1QyxDQUFDO0FBQ04sQ0FBQztBQWRELGtDQWNDOzs7Ozs7Ozs7Ozs7QUM1QkQsK0I7Ozs7Ozs7Ozs7O0FDQUEsK0MiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsImltcG9ydCAqIGFzIFNvdXJjZU1hcFN1cHBvcnQgZnJvbSBcInNvdXJjZS1tYXAtc3VwcG9ydFwiO1xuaW1wb3J0IHsgcmVhZF9jb21wbGV4X21vZGlmaWNhdGlvbnMgfSBmcm9tIFwiLi9yZWFkX2NvbXBsZXhfbW9kaWZpY2F0aW9uc1wiO1xuaW1wb3J0IHsgcmVhZF9ydWxlcyB9IGZyb20gXCIuL3JlYWRfcnVsZXNcIjtcbmltcG9ydCB7IHdyaXRlX3J1bGVzIH0gZnJvbSBcIi4vd3JpdGVfcnVsZXNcIjtcblxuU291cmNlTWFwU3VwcG9ydC5pbnN0YWxsKCk7XG5cbmxldCBmaWxlcyA9IHJlYWRfY29tcGxleF9tb2RpZmljYXRpb25zKFxuICAgIH5wcm9jZXNzLmFyZ3YuaW5kZXhPZihcIi0tanNvblwiKVxuICAgICAgICA/IHByb2Nlc3MuYXJndltwcm9jZXNzLmFyZ3YuaW5kZXhPZihcIi0tanNvblwiKSArIDFdXG4gICAgICAgIDogX19kaXJuYW1lXG4pO1xuaWYgKCFmaWxlcy5sZW5ndGgpIHtcbiAgICBjb25zb2xlLmVycm9yKFwibWlzc2luZyBzZXR0aW5nIGpzb24gZmlsZXNcIik7XG4gICAgcHJvY2Vzcy5leGl0KDEpO1xufVxuXG5sZXQgcnVsZXMgPSByZWFkX3J1bGVzKGZpbGVzKTtcblxuaWYgKCF+cHJvY2Vzcy5hcmd2LmluZGV4T2YoXCItLW5vVXBkYXRlXCIpKSB7XG4gICAgd3JpdGVfcnVsZXMocnVsZXMpO1xufSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyh7XG4gICAgICAgIHRpdGxlOiBcInByaXZhdGUgc2V0dGluZ3NcIixcbiAgICAgICAgcnVsZXM6IHJ1bGVzLFxuICAgIH0pO1xufVxuIiwiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGxleE1vZGlmaWNhdGlvbkZpbGUge1xuICAgIGZpbGVOYW1lOiBzdHJpbmc7XG4gICAgdGV4dENvbnRlbnQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlYWRfY29tcGxleF9tb2RpZmljYXRpb25zKFxuICAgIGRpcm5hbWU6IHN0cmluZ1xuKTogQ29tcGxleE1vZGlmaWNhdGlvbkZpbGVbXSB7XG4gICAgcmV0dXJuIGZzXG4gICAgICAgIC5yZWFkZGlyU3luYyhkaXJuYW1lKVxuICAgICAgICAuZmlsdGVyKGZpbGUgPT4gZmlsZS5tYXRjaCgvXFwuanNvbiQvKSlcbiAgICAgICAgLmZpbHRlcihmaWxlID0+ICFmaWxlLm1hdGNoKC9cXC5yZXN1bHRcXC5qc29uJC8pKVxuICAgICAgICAubWFwKGZpbGUgPT4ge1xuICAgICAgICAgICAgbGV0IHBhdGggPSBgJHtkaXJuYW1lfS8ke2ZpbGV9YDtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZmlsZU5hbWU6IGZpbGUsXG4gICAgICAgICAgICAgICAgdGV4dENvbnRlbnQ6IGZzLnJlYWRGaWxlU3luYyhwYXRoLCBcInV0Zi04XCIpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG59XG4iLCJpbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uRmlsZSB9IGZyb20gXCIuL3JlYWRfY29tcGxleF9tb2RpZmljYXRpb25zXCI7XG5pbXBvcnQgeyBqc29uX3RyYW5zZm9ybSB9IGZyb20gXCIuL3J1bGVzL2pzb25fdHJhbnNmb3JtXCI7XG5pbXBvcnQge1xuICAgIENvbXBsZXhNb2RpZmljYXRpb25SdWxlLFxuICAgIENvbXBsZXhNb2RpZmljYXRpb25SdWxlU2V0LFxufSBmcm9tIFwiLi9ydWxlcy9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBvbmx5X2ZpbHRlciB9IGZyb20gXCIuL3J1bGVzL29ubHlfZmlsdGVyXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkX3J1bGVzKFxuICAgIGZpbGVzOiBDb21wbGV4TW9kaWZpY2F0aW9uRmlsZVtdXG4pOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVtdIHtcbiAgICBsZXQgcmVzdWx0cyA9IGZpbGVzLm1hcChcbiAgICAgICAgKGZpbGUpOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVNldCA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxldCBqc29uID0gZXZhbChgKCR7ZmlsZS50ZXh0Q29udGVudH0pYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGpzb25fdHJhbnNmb3JtKGpzb24sIGZpbGUuZmlsZU5hbWUpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZS5tZXNzYWdlLCBmaWxlLmZpbGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICk7XG4gICAgcmV0dXJuIG9ubHlfZmlsdGVyKHJlc3VsdHMpO1xufVxuIiwiaW1wb3J0IHsgQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUgfSBmcm9tIFwiLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBqc29uX3RvX3J1bGUoanNvbjogYW55KTogQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVbXSB7XG4gICAgaWYgKGpzb24ubGVuZ3RoKSB7XG4gICAgICAgIGlmIChqc29uLmZpbmQocnVsZSA9PiBydWxlLmRlc2NyaXB0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIGpzb247XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBtYW5pcHVsYXRvcnM6IGpzb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgIH1cbiAgICByZXR1cm4ganNvbi5ydWxlcyB8fCBbanNvbl07XG59XG4iLCJpbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVNldCwgbWFrZV9ydWxlcyB9IGZyb20gXCIuL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IG1hcF9ydWxlIH0gZnJvbSBcIi4vbWFwX3J1bGVcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGpzb25fdHJhbnNmb3JtKFxuICAgIGpzb246IGFueSxcbiAgICBmaWxlTmFtZTogc3RyaW5nXG4pOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVNldCB7XG4gICAgbGV0IHJ1bGVTZXQgPSBtYWtlX3J1bGVzKGpzb24pO1xuICAgIHJ1bGVTZXQucnVsZXMgPSBydWxlU2V0LnJ1bGVzLm1hcChydWxlID0+IG1hcF9ydWxlKHJ1bGUsIGZpbGVOYW1lKSk7XG4gICAgcmV0dXJuIHJ1bGVTZXQ7XG59XG4iLCJpbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB9IGZyb20gXCIuL21ha2VfcnVsZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VfcnVsZShydWxlOiBhbnkpOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB7XG4gICAgaWYgKHJ1bGUubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtYW5pcHVsYXRvcnM6IHJ1bGUsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChydWxlW1wiOm1hbmlwdWxhdG9yc1wiXSkge1xuICAgICAgICBydWxlLm1hbmlwdWxhdG9ycyA9IChydWxlLm1hbmlwdWxhdG9ycyB8fCBbXSkuY29uY2F0KFxuICAgICAgICAgICAgcnVsZVtcIjptYW5pcHVsYXRvcnNcIl1cbiAgICAgICAgKTtcbiAgICAgICAgZGVsZXRlIHJ1bGVbXCI6bWFuaXB1bGF0b3JzXCJdO1xuICAgIH1cbiAgICByZXR1cm4gcnVsZTtcbn1cbiIsImltcG9ydCB7XG4gICAgQ29tcGxleE1vZGlmaWNhdGlvblJ1bGUsXG4gICAgQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVTZXQsXG59IGZyb20gXCIuL21ha2VfcnVsZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VfcnVsZV9zZXQoXG4gICAgcnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW11cbik6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlU2V0IHtcbiAgICBpZiAoIXJ1bGVzLmZpbmQocnVsZSA9PiBydWxlW1wiOm9ubHlcIl0pKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvbmx5OiBmYWxzZSxcbiAgICAgICAgICAgIHJ1bGVzOiBydWxlcyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb25seTogdHJ1ZSxcbiAgICAgICAgcnVsZXM6IHJ1bGVzLm1hcChydWxlID0+IHtcbiAgICAgICAgICAgIGRlbGV0ZSBydWxlW1wiOm9ubHlcIl07XG4gICAgICAgICAgICByZXR1cm4gcnVsZTtcbiAgICAgICAgfSksXG4gICAgfTtcbn1cbiIsImltcG9ydCB7IGpzb25fdG9fcnVsZSB9IGZyb20gXCIuL2pzb25fdG9fcnVsZVwiO1xuaW1wb3J0IHsgbWFrZV9ydWxlIH0gZnJvbSBcIi4vbWFrZV9ydWxlXCI7XG5pbXBvcnQgeyBtYWtlX3J1bGVfc2V0IH0gZnJvbSBcIi4vbWFrZV9ydWxlX3NldFwiO1xuaW1wb3J0IHsgRGV2aWNlSWRlbnRpZmllcnMgfSBmcm9tIFwiLi9ydWxlL2RldmljZVwiO1xuaW1wb3J0IHsgRnJvbU1vZGlmaWVyIH0gZnJvbSBcIi4vcnVsZS9mcm9tXCI7XG5pbXBvcnQgeyBMYW5nSW5wdXRTb3VyY2VzIH0gZnJvbSBcIi4vcnVsZS9sYW5nXCI7XG5pbXBvcnQgeyBUb01vZGlmaWVyIH0gZnJvbSBcIi4vcnVsZS90b1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGJ1bmRsZV9pZGVudGlmaWVycz86IHN0cmluZ1tdO1xuICAgIGlkZW50aWZpZXJzPzogRGV2aWNlSWRlbnRpZmllcnNbXTtcbiAgICBpbnB1dF9zb3VyY2VzPzogTGFuZ0lucHV0U291cmNlc1tdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1hbmlwdWxhdG9yIHtcbiAgICB0eXBlPzogc3RyaW5nO1xuICAgIGNvbmRpdGlvbnM/OiBNYW5pcHVsYXRvckNvbmRpdGlvbnNbXTtcbiAgICBmcm9tPzogRnJvbU1vZGlmaWVyO1xuICAgIHRvPzogVG9Nb2RpZmllcltdO1xuXG4gICAgXCI6ZnJvbVwiPzogc3RyaW5nO1xuICAgIFwiOnRvXCI/OiBzdHJpbmc7XG4gICAgXCI6YXBwXCI/OiBzdHJpbmc7XG4gICAgXCI6ZGV2aWNlXCI/OiBzdHJpbmc7XG4gICAgXCI6bGFuZ1wiPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBsZXhNb2RpZmljYXRpb25SdWxlIHtcbiAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICBtYW5pcHVsYXRvcnM/OiBNYW5pcHVsYXRvcltdO1xuICAgIFwiOm1hbmlwdWxhdG9yc1wiPzogTWFuaXB1bGF0b3IgfCBNYW5pcHVsYXRvcltdO1xuICAgIFwiOm9ubHlcIj86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29tcGxleE1vZGlmaWNhdGlvblJ1bGVTZXQge1xuICAgIG9ubHk6IGJvb2xlYW47XG4gICAgcnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW107XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlX3J1bGVzKGpzb246IGFueSk6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlU2V0IHtcbiAgICBsZXQgcnVsZXMgPSBqc29uX3RvX3J1bGUoanNvbikubWFwKHJ1bGUgPT4gbWFrZV9ydWxlKHJ1bGUpKTtcbiAgICByZXR1cm4gbWFrZV9ydWxlX3NldChydWxlcyk7XG59XG4iLCJpbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSwgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBhcHAgfSBmcm9tIFwiLi9ydWxlL2FwcFwiO1xuaW1wb3J0IHsgZGV2aWNlIH0gZnJvbSBcIi4vcnVsZS9kZXZpY2VcIjtcbmltcG9ydCB7IGZyb20gfSBmcm9tIFwiLi9ydWxlL2Zyb21cIjtcbmltcG9ydCB7IGxhbmcgfSBmcm9tIFwiLi9ydWxlL2xhbmdcIjtcbmltcG9ydCB7IHBlYXIgfSBmcm9tIFwiLi9ydWxlL3BlYXJcIjtcbmltcG9ydCB7IHN0cmluZ19zaG9ydGN1dCB9IGZyb20gXCIuL3J1bGUvc3RyaW5nX3Nob3J0Y3V0XCI7XG5pbXBvcnQgeyB0byB9IGZyb20gXCIuL3J1bGUvdG9cIjtcbmltcG9ydCB7IHNldF9hdHRycyB9IGZyb20gXCIuL3NldF9hdHRyc1wiO1xuaW1wb3J0IHsgdHlwZV9iYXNpYyB9IGZyb20gXCIuL3R5cGVfYmFzaWNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1hcF9ydWxlKFxuICAgIGpzb246IENvbXBsZXhNb2RpZmljYXRpb25SdWxlLFxuICAgIGZpbGVOYW1lOiBzdHJpbmdcbik6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlIHtcbiAgICBsZXQgeyBydWxlLCBhdHRyIH0gPSBzZXRfYXR0cnMoanNvbik7XG4gICAgcnVsZS5kZXNjcmlwdGlvbiA9IHJ1bGUuZGVzY3JpcHRpb24gfHwgZmlsZU5hbWUucmVwbGFjZSgvXFwuXFx3Ky8sIFwiXCIpO1xuICAgIHJ1bGUubWFuaXB1bGF0b3JzID0gcnVsZS5tYW5pcHVsYXRvcnNcbiAgICAgICAgLm1hcChzdHJpbmdfc2hvcnRjdXQpXG4gICAgICAgIC5tYXAoXG4gICAgICAgICAgICAobWFuaXA6IE1hbmlwdWxhdG9yKTogTWFuaXB1bGF0b3IgPT4gT2JqZWN0LmFzc2lnbih7fSwgbWFuaXAsIGF0dHIpXG4gICAgICAgIClcbiAgICAgICAgLm1hcCh0eXBlX2Jhc2ljKVxuICAgICAgICAubWFwKGFwcClcbiAgICAgICAgLm1hcChkZXZpY2UpXG4gICAgICAgIC5tYXAobGFuZylcbiAgICAgICAgLm1hcChmcm9tKVxuICAgICAgICAubWFwKHRvKVxuICAgICAgICAubWFwKHBlYXIpO1xuICAgIHJldHVybiBydWxlO1xufVxuIiwiaW1wb3J0IHtcbiAgICBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSxcbiAgICBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVNldCxcbn0gZnJvbSBcIi4vbWFrZV9ydWxlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gb25seV9maWx0ZXIoXG4gICAgcnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlU2V0W11cbik6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW10ge1xuICAgIGxldCBpc09ubHkgPSBydWxlcy5maW5kKHJ1bGUgPT4gcnVsZS5vbmx5KTtcbiAgICBsZXQgZmlsdGVyZWRSdWxlcyA9IGlzT25seSA/IHJ1bGVzLmZpbHRlcihydWxlID0+IHJ1bGUub25seSkgOiBydWxlcztcbiAgICByZXR1cm4gZmlsdGVyZWRSdWxlc1xuICAgICAgICAubWFwKHJ1bGUgPT4gcnVsZS5ydWxlcylcbiAgICAgICAgLnJlZHVjZSgoYmFzZSwgY3VyKSA9PiBiYXNlLmNvbmNhdChjdXIpLCBbXSk7XG59XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvckNvbmRpdGlvbnMgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgY29uZGl0aW9uX21hcCB9IGZyb20gXCIuL2xpYnMvY29uZGl0aW9uX21hcFwiO1xuXG5sZXQgY29uZGl0aW9uQXBwTWFwID0ge1xuICAgIGJyb3dzZXJzOiBbXG4gICAgICAgIFwiXmNvbVxcXFwuZ29vZ2xlXFxcXC5DaHJvbWUkXCIsXG4gICAgICAgIFwiXm9yZ1xcXFwubW96aWxsYVxcXFwuZmlyZWZveCRcIixcbiAgICAgICAgXCJeY29tXFxcXC5hcHBsZVxcXFwuU2FmYXJpJFwiLFxuICAgIF0sXG4gICAgY2hyb21lOiBbXCJeY29tXFxcXC5nb29nbGVcXFxcLkNocm9tZSRcIl0sXG4gICAgamV0YnJhaW5zOiBbXCJeY29tXFxcXC5qZXRicmFpbnNcXFxcLlwiXSxcbiAgICBmaW5kZXI6IFtcIl5jb21cXFxcLmFwcGxlXFxcXC5maW5kZXJcIl0sXG59O1xuXG5leHBvcnQgY29uc3QgYXBwID0gY29uZGl0aW9uX21hcChcbiAgICBcIjphcHBcIixcbiAgICAoY29uZGl0aW9uOiBzdHJpbmcpOiBNYW5pcHVsYXRvckNvbmRpdGlvbnMgPT4ge1xuICAgICAgICBpZiAoY29uZGl0aW9uQXBwTWFwW2NvbmRpdGlvbl0pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJmcm9udG1vc3RfYXBwbGljYXRpb25faWZcIixcbiAgICAgICAgICAgICAgICBidW5kbGVfaWRlbnRpZmllcnM6IGNvbmRpdGlvbkFwcE1hcFtjb25kaXRpb25dLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjb25kaXRpb24ubWF0Y2goL14hLykgJiZcbiAgICAgICAgICAgIGNvbmRpdGlvbkFwcE1hcFtjb25kaXRpb24ucmVwbGFjZSgvXiEvLCBcIlwiKV1cbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiZnJvbnRtb3N0X2FwcGxpY2F0aW9uX3VubGVzc1wiLFxuICAgICAgICAgICAgICAgIGJ1bmRsZV9pZGVudGlmaWVyczogW1xuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb25BcHBNYXBbY29uZGl0aW9uLnJlcGxhY2UoL14hLywgXCJcIildLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcImZyb250bW9zdF9hcHBsaWNhdGlvbl9pZlwiLFxuICAgICAgICAgICAgYnVuZGxlX2lkZW50aWZpZXJzOiBBcnJheS5pc0FycmF5KGNvbmRpdGlvbilcbiAgICAgICAgICAgICAgICA/IGNvbmRpdGlvblxuICAgICAgICAgICAgICAgIDogW2NvbmRpdGlvbl0sXG4gICAgICAgIH07XG4gICAgfVxuKTtcbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5pbXBvcnQgeyBjb25kaXRpb25fbWFwIH0gZnJvbSBcIi4vbGlicy9jb25kaXRpb25fbWFwXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGV2aWNlSWRlbnRpZmllcnMge1xuICAgIHZlbmRvcl9pZDogbnVtYmVyO1xuICAgIHByb2R1Y3RfaWQ6IG51bWJlcjtcbn1cblxubGV0IGNvbmRpdGlvbkRldmljZU1hcCA9IHtcbiAgICBiYXJvY2NvOiB7XG4gICAgICAgIHZlbmRvcl9pZDogMTI0MSxcbiAgICAgICAgcHJvZHVjdF9pZDogMzIzLFxuICAgIH0sXG4gICAgYXBwbGU6IHtcbiAgICAgICAgdmVuZG9yX2lkOiAxNDUyLFxuICAgICAgICBwcm9kdWN0X2lkOiA2MjksXG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBkZXZpY2UgPSBjb25kaXRpb25fbWFwKFxuICAgIFwiOmRldmljZVwiLFxuICAgIChjb25kaXRpb24pOiBNYW5pcHVsYXRvckNvbmRpdGlvbnMgPT4ge1xuICAgICAgICBpZiAoY29uZGl0aW9uRGV2aWNlTWFwW2NvbmRpdGlvbl0pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJkZXZpY2VfaWZcIixcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyczogW2NvbmRpdGlvbkRldmljZU1hcFtjb25kaXRpb25dXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgY29uZGl0aW9uLm1hdGNoKC9eIS8pICYmXG4gICAgICAgICAgICBjb25kaXRpb25EZXZpY2VNYXBbY29uZGl0aW9uLnJlcGxhY2UoL14hLywgXCJcIildXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImRldmljZV91bmxlc3NcIixcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyczogW2NvbmRpdGlvbkRldmljZU1hcFtjb25kaXRpb24ucmVwbGFjZSgvXiEvLCBcIlwiKV1dLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gQ29uZGl0aW9uRGV2aWNlIFwiJHtjb25kaXRpb259XCJgKTtcbiAgICB9XG4pO1xuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgcGFyc2Vfc2hvcnRjdXQgfSBmcm9tIFwiLi9saWJzL3BhcnNlX3Nob3J0Y3V0XCI7XG5pbXBvcnQgeyByZW1vdmVfcHJvcGVydHkgfSBmcm9tIFwiLi9saWJzL3JlbW92ZV9wcm9wZXJ0eVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEZyb21Nb2RpZmllciB7XG4gICAga2V5X2NvZGU6IHN0cmluZztcbiAgICBtb2RpZmllcnM/OiB7XG4gICAgICAgIG9wdGlvbmFsPzogc3RyaW5nW107XG4gICAgICAgIG1hbmRhdG9yeTogc3RyaW5nW107XG4gICAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Nb2RpZmllcihcbiAgICBiYXNlOiBGcm9tTW9kaWZpZXIgfCB2b2lkLFxuICAgIHNob3J0OiBzdHJpbmdcbik6IEZyb21Nb2RpZmllciB7XG4gICAgbGV0IGtleXMgPSBwYXJzZV9zaG9ydGN1dChzaG9ydCk7XG4gICAgbGV0IHJlc3VsdDogRnJvbU1vZGlmaWVyID0gT2JqZWN0LmFzc2lnbihiYXNlIHx8IHt9LCB7XG4gICAgICAgIGtleV9jb2RlOiBrZXlzLnBvcCgpLFxuICAgIH0pO1xuICAgIGlmICgha2V5cy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVzdWx0Lm1vZGlmaWVycyA9IHJlc3VsdC5tb2RpZmllcnMgfHwge1xuICAgICAgICBtYW5kYXRvcnk6IFtdLFxuICAgIH07XG4gICAgaWYgKH5rZXlzLmluZGV4T2YoXCJhbnlcIikpIHtcbiAgICAgICAgcmVzdWx0Lm1vZGlmaWVycy5vcHRpb25hbCA9IFtcImFueVwiXTtcbiAgICAgICAga2V5cyA9IGtleXMuZmlsdGVyKGtleSA9PiBrZXkgIT09IFwiYW55XCIpO1xuICAgIH1cbiAgICBpZiAoa2V5cy5maW5kKGtleSA9PiBrZXkuaW5jbHVkZXMoXCI/XCIpKSkge1xuICAgICAgICBsZXQgb3B0aW9uYWwgPSBrZXlzXG4gICAgICAgICAgICAuZmlsdGVyKGtleSA9PiBrZXkuaW5jbHVkZXMoXCI/XCIpKVxuICAgICAgICAgICAgLm1hcChrZXkgPT4ga2V5LnJlcGxhY2UoXCI/XCIsIFwiXCIpKTtcbiAgICAgICAgcmVzdWx0Lm1vZGlmaWVycy5vcHRpb25hbCA9IChyZXN1bHQubW9kaWZpZXJzLm9wdGlvbmFsIHx8IFtdKS5jb25jYXQoXG4gICAgICAgICAgICBvcHRpb25hbFxuICAgICAgICApO1xuICAgICAgICBrZXlzID0ga2V5cy5maWx0ZXIoa2V5ID0+ICFrZXkuaW5jbHVkZXMoXCI/XCIpKTtcbiAgICB9XG4gICAgaWYgKCFrZXlzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICByZXN1bHQubW9kaWZpZXJzLm1hbmRhdG9yeSA9IGtleXM7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGNvbnN0IGZyb20gPSByZW1vdmVfcHJvcGVydHkoXG4gICAgXCI6ZnJvbVwiLFxuICAgIChtYW5pcDogTWFuaXB1bGF0b3IsIHByb3A6IHN0cmluZyk6IE1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgbWFuaXAuZnJvbSA9IGZyb21Nb2RpZmllcihtYW5pcC5mcm9tLCBwcm9wKTtcbiAgICAgICAgcmV0dXJuIG1hbmlwO1xuICAgIH1cbik7XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvckNvbmRpdGlvbnMgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgY29uZGl0aW9uX21hcCB9IGZyb20gXCIuL2xpYnMvY29uZGl0aW9uX21hcFwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIExhbmdJbnB1dFNvdXJjZXMge1xuICAgIGxhbmd1YWdlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjb25zdCBsYW5nID0gY29uZGl0aW9uX21hcChcbiAgICBcIjpsYW5nXCIsXG4gICAgKGxhbmc6IHN0cmluZyk6IE1hbmlwdWxhdG9yQ29uZGl0aW9ucyA9PiAoe1xuICAgICAgICB0eXBlOiBcImlucHV0X3NvdXJjZV9pZlwiLFxuICAgICAgICBpbnB1dF9zb3VyY2VzOiBbeyBsYW5ndWFnZTogbGFuZyB9XSxcbiAgICB9KVxuKTtcbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yLCBNYW5pcHVsYXRvckNvbmRpdGlvbnMgfSBmcm9tIFwiLi4vLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgcmVtb3ZlX3Byb3BlcnR5IH0gZnJvbSBcIi4vcmVtb3ZlX3Byb3BlcnR5XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25kaXRpb25fbWFwKFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBtYXBwZXI6IChwcm9wOiBzdHJpbmcpID0+IE1hbmlwdWxhdG9yQ29uZGl0aW9uc1xuKTogKG1hbmlwOiBNYW5pcHVsYXRvcikgPT4gTWFuaXB1bGF0b3Ige1xuICAgIHJldHVybiByZW1vdmVfcHJvcGVydHkoXG4gICAgICAgIG5hbWUsXG4gICAgICAgIChtYW5pcDogTWFuaXB1bGF0b3IsIHByb3A6IHN0cmluZyk6IE1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgICAgIG1hbmlwLmNvbmRpdGlvbnMgPSAobWFuaXAuY29uZGl0aW9ucyB8fCBbXSkuY29uY2F0KG1hcHBlcihwcm9wKSk7XG4gICAgICAgICAgICByZXR1cm4gbWFuaXA7XG4gICAgICAgIH1cbiAgICApO1xufVxuIiwibGV0IG1vZGlmaWVyTWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgIHNoaWZ0OiBcInNoaWZ0XCIsXG4gICAgY21kOiBcImNvbW1hbmRcIixcbiAgICBjb206IFwiY29tbWFuZFwiLFxuICAgIG9wdDogXCJvcHRpb25cIixcbiAgICBhbHQ6IFwiYWx0XCIsXG4gICAgY3RybDogXCJjb250cm9sXCIsXG4gICAgXCIqXCI6IFwiYW55XCIsXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2Vfc2hvcnRjdXQoc2hvcnRjdXQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gc2hvcnRjdXQuc3BsaXQoXCItXCIpLm1hcChrZXkgPT4gbW9kaWZpZXJNYXBba2V5XSB8fCBrZXkpO1xufVxuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi4vLi4vbWFrZV9ydWxlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlX3Byb3BlcnR5KFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBjYWxsYmFjazogKG1hbmlwOiBNYW5pcHVsYXRvciwgcHJvcDogc3RyaW5nKSA9PiBNYW5pcHVsYXRvclxuKSB7XG4gICAgcmV0dXJuIChtYW5pcDogTWFuaXB1bGF0b3IpOiBNYW5pcHVsYXRvciA9PiB7XG4gICAgICAgIGlmICghbWFuaXBbbmFtZV0pIHtcbiAgICAgICAgICAgIHJldHVybiBtYW5pcDtcbiAgICAgICAgfVxuICAgICAgICBtYW5pcCA9IGNhbGxiYWNrKG1hbmlwLCBtYW5pcFtuYW1lXSk7XG4gICAgICAgIGRlbGV0ZSBtYW5pcFtuYW1lXTtcbiAgICAgICAgcmV0dXJuIG1hbmlwO1xuICAgIH07XG59XG4iLCJpbXBvcnQgeyBUb01vZGlmaWVyIH0gZnJvbSBcIi4uL3RvXCI7XG5cbmxldCB0b01vZGlmaWVyTWFwOiB7XG4gICAgW2tleTogc3RyaW5nXToge1xuICAgICAgICBrZXk6IHN0cmluZztcbiAgICAgICAgbW9kPzogc3RyaW5nO1xuICAgIH07XG59ID0ge1xuICAgIFwiKFwiOiB7XG4gICAgICAgIGtleTogXCI5XCIsXG4gICAgICAgIG1vZDogXCJzaGlmdFwiLFxuICAgIH0sXG4gICAgXCIpXCI6IHtcbiAgICAgICAga2V5OiBcIjBcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIntcIjoge1xuICAgICAgICBrZXk6IFwib3Blbl9icmFja2V0XCIsXG4gICAgICAgIG1vZDogXCJzaGlmdFwiLFxuICAgIH0sXG4gICAgXCJ9XCI6IHtcbiAgICAgICAga2V5OiBcImNsb3NlX2JyYWNrZXRcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIjxcIjoge1xuICAgICAgICBrZXk6IFwiY29tbWFcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIj5cIjoge1xuICAgICAgICBrZXk6IFwicGVyaW9kXCIsXG4gICAgICAgIG1vZDogXCJzaGlmdFwiLFxuICAgIH0sXG4gICAgJ1wiJzoge1xuICAgICAgICBrZXk6IFwicXVvdGVcIixcbiAgICAgICAgbW9kOiBcInNoaWZ0XCIsXG4gICAgfSxcbiAgICBcIidcIjoge1xuICAgICAgICBrZXk6IFwicXVvdGVcIixcbiAgICB9LFxuICAgIFwiLFwiOiB7XG4gICAgICAgIGtleTogXCJjb21tYVwiLFxuICAgIH0sXG4gICAgXCIuXCI6IHtcbiAgICAgICAga2V5OiBcInBlcmlvZFwiLFxuICAgIH0sXG4gICAgXCIgXCI6IHtcbiAgICAgICAga2V5OiBcInNwYWNlYmFyXCIsXG4gICAgfSxcbiAgICBcIj1cIjoge1xuICAgICAgICBrZXk6IFwiZXF1YWxfc2lnblwiLFxuICAgIH0sXG4gICAgXCI7XCI6IHtcbiAgICAgICAga2V5OiBcInNlbWljb2xvblwiLFxuICAgIH0sXG4gICAgXCI6XCI6IHtcbiAgICAgICAga2V5OiBcInNlbWljb2xvblwiLFxuICAgICAgICBtb2Q6IFwic2hpZnRcIixcbiAgICB9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3J0Y3V0X3RvX21vZGlmaWVyKHNob3J0OiBzdHJpbmcpOiBUb01vZGlmaWVyW10ge1xuICAgIHJldHVybiBzaG9ydFxuICAgICAgICAucmVwbGFjZSgvXicoLis/KSckLywgXCIkMVwiKVxuICAgICAgICAuc3BsaXQoLyg/OikvKVxuICAgICAgICAubWFwKFxuICAgICAgICAgICAgKGtleTogc3RyaW5nKTogVG9Nb2RpZmllciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0b01vZGlmaWVyTWFwW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleS50b0xvd2VyQ2FzZSgpID09PSBrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7IGtleV9jb2RlOiBrZXkgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5X2NvZGU6IGtleS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kaWZpZXJzOiBbXCJzaGlmdFwiXSxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG1vZCA9IHRvTW9kaWZpZXJNYXBba2V5XVtcIm1vZFwiXTtcbiAgICAgICAgICAgICAgICBpZiAoIW1vZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBrZXlfY29kZTogdG9Nb2RpZmllck1hcFtrZXldW1wia2V5XCJdIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGtleV9jb2RlOiB0b01vZGlmaWVyTWFwW2tleV1bXCJrZXlcIl0sXG4gICAgICAgICAgICAgICAgICAgIG1vZGlmaWVyczogW21vZF0sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbn1cbiIsImltcG9ydCB7IE1hbmlwdWxhdG9yIH0gZnJvbSBcIi4uL21ha2VfcnVsZXNcIjtcbmltcG9ydCB7IGZyb21Nb2RpZmllciB9IGZyb20gXCIuL2Zyb21cIjtcbmltcG9ydCB7IHRvTW9kaWZpZXIgfSBmcm9tIFwiLi90b1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gcGVhcihtYW5pcDogTWFuaXB1bGF0b3IpOiBNYW5pcHVsYXRvciB7XG4gICAgT2JqZWN0LmtleXMobWFuaXApXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGtleS5tYXRjaCgvXjovKSlcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gXCJzdHJpbmdcIiA9PT0gdHlwZW9mIG1hbmlwW2tleV0pXG4gICAgICAgIC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBtYW5pcC5mcm9tID0gZnJvbU1vZGlmaWVyKG1hbmlwLmZyb20sIGtleS5yZXBsYWNlKC9eOi8sIFwiXCIpKTtcbiAgICAgICAgICAgIG1hbmlwLnRvID0gdG9Nb2RpZmllcihtYW5pcC50bywgKDxhbnk+bWFuaXApW2tleV0pO1xuICAgICAgICAgICAgZGVsZXRlICg8YW55Pm1hbmlwKVtrZXldO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gbWFuaXA7XG59XG4iLCJpbXBvcnQgeyBNYW5pcHVsYXRvciB9IGZyb20gXCIuLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdfc2hvcnRjdXQoXG4gICAgbWFuaXA6IE1hbmlwdWxhdG9yIHwgc3RyaW5nXG4pOiBNYW5pcHVsYXRvciB8IHN0cmluZyB7XG4gICAgaWYgKFwic3RyaW5nXCIgIT09IHR5cGVvZiBtYW5pcCkge1xuICAgICAgICByZXR1cm4gbWFuaXA7XG4gICAgfVxuICAgIGxldCBrdiA9IG1hbmlwLnNwbGl0KFwiOlwiKTtcbiAgICBpZiAoa3YubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBtYW5pcDtcbiAgICB9XG4gICAgbGV0IHJlc3VsdDogYW55ID0ge307XG4gICAgcmVzdWx0W1wiOlwiICsgKGt2LnNoaWZ0KCkgfHwgXCJcIikudHJpbSgpXSA9IGt2LmpvaW4oXCI6XCIpLnRyaW0oKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi4vbWFrZV9ydWxlc1wiO1xuaW1wb3J0IHsgcGFyc2Vfc2hvcnRjdXQgfSBmcm9tIFwiLi9saWJzL3BhcnNlX3Nob3J0Y3V0XCI7XG5pbXBvcnQgeyByZW1vdmVfcHJvcGVydHkgfSBmcm9tIFwiLi9saWJzL3JlbW92ZV9wcm9wZXJ0eVwiO1xuaW1wb3J0IHsgc2hvcnRjdXRfdG9fbW9kaWZpZXIgfSBmcm9tIFwiLi9saWJzL3Nob3J0Y3V0X3RvX21vZGlmaWVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVG9Nb2RpZmllciB7XG4gICAga2V5X2NvZGU6IHN0cmluZztcbiAgICBtb2RpZmllcnM/OiBzdHJpbmdbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvTW9kaWZpZXIoXG4gICAgYmFzZTogVG9Nb2RpZmllcltdIHwgdm9pZCxcbiAgICBzaG9ydDogc3RyaW5nXG4pOiBUb01vZGlmaWVyW10ge1xuICAgIGxldCByZXN1bHRzID0gc2hvcnRcbiAgICAgICAgLnNwbGl0KC8sLylcbiAgICAgICAgLmZpbHRlcihzaG9ydCA9PiBzaG9ydClcbiAgICAgICAgLnJlZHVjZSgoYmFzZTogVG9Nb2RpZmllcltdLCBzaG9ydDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXNob3J0Lm1hdGNoKC9eJy4rPyckLykpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5cyA9IHBhcnNlX3Nob3J0Y3V0KHNob3J0KTtcbiAgICAgICAgICAgICAgICBsZXQgcmVzdWx0OiBUb01vZGlmaWVyID0ge1xuICAgICAgICAgICAgICAgICAgICBrZXlfY29kZToga2V5cy5wb3AoKSB8fCBcIlwiLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5tb2RpZmllcnMgPSBrZXlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYmFzZS5jb25jYXQocmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBiYXNlLmNvbmNhdChzaG9ydGN1dF90b19tb2RpZmllcihzaG9ydCkpO1xuICAgICAgICB9LCBbXSk7XG4gICAgcmV0dXJuIChiYXNlIHx8IFtdKS5jb25jYXQocmVzdWx0cyk7XG59XG5cbmV4cG9ydCBjb25zdCB0byA9IHJlbW92ZV9wcm9wZXJ0eShcbiAgICBcIjp0b1wiLFxuICAgIChtYW5pcDogTWFuaXB1bGF0b3IsIHByb3A6IHN0cmluZyk6IE1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgbWFuaXAudG8gPSB0b01vZGlmaWVyKG1hbmlwLnRvLCBwcm9wKTtcbiAgICAgICAgcmV0dXJuIG1hbmlwO1xuICAgIH1cbik7XG4iLCJpbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB9IGZyb20gXCIuL21ha2VfcnVsZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldF9hdHRycyhcbiAgICBydWxlOiBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZVxuKToge1xuICAgIHJ1bGU6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlO1xuICAgIGF0dHI6IGFueTtcbn0ge1xuICAgIGxldCBhdHRycyA9IE9iamVjdC5rZXlzKHJ1bGUpXG4gICAgICAgIC5maWx0ZXIoa2V5ID0+IGtleS5tYXRjaCgvXjovKSlcbiAgICAgICAgLmZpbHRlcihrZXkgPT4gXCJzdHJpbmdcIiA9PT0gdHlwZW9mIHJ1bGVba2V5XSlcbiAgICAgICAgLnJlZHVjZSgoYmFzZSwgY3VyKSA9PiB7XG4gICAgICAgICAgICBiYXNlW2N1cl0gPSBydWxlW2N1cl07XG4gICAgICAgICAgICBkZWxldGUgcnVsZVtjdXJdO1xuICAgICAgICAgICAgcmV0dXJuIGJhc2U7XG4gICAgICAgIH0sIHt9KTtcbiAgICByZXR1cm4ge1xuICAgICAgICBydWxlOiBydWxlLFxuICAgICAgICBhdHRyOiBhdHRycyxcbiAgICB9O1xufVxuIiwiaW1wb3J0IHsgTWFuaXB1bGF0b3IgfSBmcm9tIFwiLi9tYWtlX3J1bGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0eXBlX2Jhc2ljKG1hbmlwOiBNYW5pcHVsYXRvcik6IE1hbmlwdWxhdG9yIHtcbiAgICBtYW5pcC50eXBlID0gbWFuaXAudHlwZSB8fCBcImJhc2ljXCI7XG4gICAgcmV0dXJuIG1hbmlwO1xufVxuIiwiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBDb21wbGV4TW9kaWZpY2F0aW9uUnVsZSB9IGZyb20gXCIuL3J1bGVzL21ha2VfcnVsZXNcIjtcblxuaW50ZXJmYWNlIEthcmFiaW5lckpzb25Qcm9maWxlIHtcbiAgICBzZWxlY3RlZDogYm9vbGVhbjtcbiAgICBjb21wbGV4X21vZGlmaWNhdGlvbnM6IHtcbiAgICAgICAgcnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW107XG4gICAgfTtcbn1cblxuaW50ZXJmYWNlIEthcmFiaW5lckpzb24ge1xuICAgIHByb2ZpbGVzOiBLYXJhYmluZXJKc29uUHJvZmlsZVtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gd3JpdGVfcnVsZXMocnVsZXM6IENvbXBsZXhNb2RpZmljYXRpb25SdWxlW10pIHtcbiAgICBsZXQga2FyYWJpbmVySnNvblBhdGggPSBgJHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuSE9NRVxuICAgIH0vLmNvbmZpZy9rYXJhYmluZXIva2FyYWJpbmVyLmpzb25gO1xuICAgIGxldCBrYXJhYmluZXJKc29uOiBLYXJhYmluZXJKc29uID0gZXZhbChcbiAgICAgICAgYCgke2ZzLnJlYWRGaWxlU3luYyhrYXJhYmluZXJKc29uUGF0aCwgXCJ1dGYtOFwiKX0pYFxuICAgICk7XG4gICAga2FyYWJpbmVySnNvbi5wcm9maWxlc1xuICAgICAgICAuZmlsdGVyKHByb2ZpbGUgPT4gcHJvZmlsZS5zZWxlY3RlZClcbiAgICAgICAgLmZvckVhY2gocHJvZmlsZSA9PiAocHJvZmlsZS5jb21wbGV4X21vZGlmaWNhdGlvbnMucnVsZXMgPSBydWxlcykpO1xuICAgIGZzLndyaXRlRmlsZVN5bmMoXG4gICAgICAgIGthcmFiaW5lckpzb25QYXRoLFxuICAgICAgICBKU09OLnN0cmluZ2lmeShrYXJhYmluZXJKc29uLCBudWxsLCBcIiAgXCIpXG4gICAgKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNvdXJjZS1tYXAtc3VwcG9ydFwiKTsiXSwic291cmNlUm9vdCI6IiJ9