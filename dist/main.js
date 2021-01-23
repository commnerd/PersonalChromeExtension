/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_tab_handler_tab_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

_lib_tab_handler_tab_handler__WEBPACK_IMPORTED_MODULE_0__.TabHandler.init();


/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TabHandler": () => /* binding */ TabHandler
/* harmony export */ });
/* harmony import */ var _triage_handler_triage_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

class TabHandler {
    constructor() {
        this.triageHandler = new _triage_handler_triage_handler__WEBPACK_IMPORTED_MODULE_0__.TriageHandler();
    }
    static init() {
        let tabHandler = new TabHandler();
        chrome.tabs.onActivated.addListener(tabHandler.tabChange.bind(tabHandler));
    }
    tabChange(activeInfo) {
        chrome.tabs.query({ active: true }, (tabs) => {
            this.currentTab = tabs[0];
            this.currentSite = this.triageHandler.triage(this.currentTab.url);
            this.currentSite?.executeLifeCycle();
        });
    }
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TriageHandler": () => /* binding */ TriageHandler
/* harmony export */ });
/* harmony import */ var _site_personal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);

class TriageHandler {
    constructor() {
        this.sites = [
            _site_personal__WEBPACK_IMPORTED_MODULE_0__.Personal
        ];
    }
    triage(url) {
        for (let site of this.sites) {
            let instance = new site;
            let domainRegex = new RegExp(instance.domain.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'));
            if (domainRegex.test(url)) {
                return instance;
            }
        }
        return undefined;
    }
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Personal": () => /* binding */ Personal
/* harmony export */ });
/* harmony import */ var _site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);

class Personal extends _site__WEBPACK_IMPORTED_MODULE_0__.Site {
    constructor() {
        super();
        this.domain = "michaeljmiller.net";
        this.script = `
    alert('${this.domain}');
  `;
    }
    init() {
        super.init();
        this.injectJS(this.script);
    }
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Site": () => /* binding */ Site
/* harmony export */ });
class Site {
    constructor() {
        this.initialized = false;
    }
    executeLifeCycle() {
        this.init();
    }
    init() {
        this.initialized = true;
    }
    injectJS(js) {
        chrome.tabs.query({ active: true }, (tabs) => {
            let currentTab = tabs[0];
            chrome.tabs.executeScript(currentTab.id, {
                code: js
            }, (result) => { });
        });
    }
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__(0);
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;