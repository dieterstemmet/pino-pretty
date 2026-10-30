'use strict'

module.exports = getLogPropertyValue

const getPropertyValue = require('./get-property-value')
const splitPropertyKey = require('./split-property-key')

/**
 * Reads a log property, supporting the same `.` / `\.` path rules as
 * `levelKey`. Top-level (single-segment) keys keep legacy `key in log`
 * lookup so inherited properties still resolve; nested paths use own-property
 * traversal via {@link getPropertyValue}.
 *
 * @param {object} log
 * @param {string} property
 * @returns {*}
 */
function getLogPropertyValue (log, property) {
  const props = splitPropertyKey(property)

  if (props.length === 1) {
    const key = props[0]
    if (key in log) {
      return log[key]
    }
    return undefined
  }

  return getPropertyValue(log, props)
}
