const _ = require('lodash');

const Err = require('./error');

const pkgdata = require('../package.json');
/**
 * A Better Set with more utility methods
 * @extends {Set}
 */
class Adset extends Set {
    /**
     * Initializes a new Betterser
     * @param {Iterator} iterator Any type of iterator
     */
    constructor(iterator) {
        super(iterator);
    }

    /**
     * Creates a new Map object containing the type of value as the key, and an array of every value
     * as the value
     * @returns {Map<String, Array>} A map with the typeof value as the key, and an array of values as the value
     */
    access() {
        const stringArray = new Array();
        const numberArray = new Array();
        const arrayArray = new Array();
        const objectArray = new Array();
        const stringSet = this.strings();
        const numberSet = this.numbers();
        const arraySet = this.arrays();
        const objectSet = this.objects();
        for (const val of stringSet) stringArray.push(val);
        for (const val of numberSet) numberArray.push(val);
        for (const val of arraySet) arrayArray.push(val);
        for (const val of objectSet) objectArray.push(val);
        const stringIterator = ['Strings', stringArray];
        const numberIterator = ['Numbers', numberArray];
        const arrayIterator = ['Arrays', arrayArray];
        const objectIterator = ['Objects', objectArray];
        const mainIterator = [stringIterator, numberIterator, arrayIterator, objectIterator];
        return new Map(mainIterator);
    }

    /**
     * Retrieves all the arrays in the set
     * @returns {Adset<Array>} All the arrays that are in the Adset
     */
    arrays() {
        const results = new this.constructor();
        for (const val of this) {
            if (val instanceof Array) results.add(val);
        }
        return results;
    }

    /**
     * Exactly the same as [`Set.clear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) but
     * returns the old Adset instead of undefined
     * @returns {Adset<*>} The old set, can be discarded if not needed anymore
     */
    clear() {
        const set = new this.constructor(this);
        super.clear();
        return set;
    }

    /**
     * Combines this Adset with others into a new Set. None of the Adsets are modified
     * @param {...Adset} Adsets Adsets to merge
     * @returns {Adset}
     * @example const newSet = someSet.concat(someOtherSet, anotherSet, ohBoyASet);
     */
    concat(...Adsets) {
        const newSet = this.clone();
        for (const set of Adsets) {
            for (const val of set) newSet.add(val);
        }
    }

    /**
     * Retrieves all the strings in the set
     * @returns {Adset<String>} All the strings that are in the Adset
     */
    strings() {
        const results = new this.constructor();
        for (const val of this) {
            if (val.constructor === String) results.add(val);
        }
        return results;
    }

    /**
     * Retrieves all the objects in the set
     * @returns {Adset<Object>} All the objects that are in the Adset
     */
    objects() {
        const results = new this.constructor();
        for (const val of this) {
            if (val instanceof Object && val.constructor === Object) results.add(val);
        }
        return results;
    }

    /**
     * Retrieves all the numbers in the set
     * @returns {Adset<Number>} All the numbers that are in the Adset
     */
    numbers() {
        const results = new this.constructor();
        for (const val of this) {
            if (typeof val === 'number') results.add(val);
        }
        return results;
    }

    /**
     * Exactly the same as [`Set.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach) but
     * returns the Adset instead of undefined
     * @param {Function} fn The function to run
     * @param {*} [thisArg] The argument to use as `this`
     * @returns {Adset<*>} The set after the function was ran
     */
    each(fn, thisArg) {
        this.forEach(fn, thisArg);
        return this;
    }

    /**
     * Exactly the same as [`Array.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
     * @param {Function} fn Function that produces an element of the new array, taking two arguments
     * @param {*} [thisArg] The argument to use as `this`
     * @returns {Array<*>} The array after mapping
     */
    map(fn, thisArg) {
        if (thisArg) fn = fn.bind(thisArg);
        const arr = new Array(this.size);
        let i = 0;
        for (const val of this) arr[i++] = fn(val, this);
        return arr;
    }

    /**
     * Creates an identical copy of the Set
     * @returns {Adset}
     * @example const newSet = oldSet.clone();
     */
    clone() {
        return new this.constructor(this);
    }


}
module.exports = Adset;