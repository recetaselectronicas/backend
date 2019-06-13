const { states } = require('../../state-machine/state')

const availableStates = Object.keys(states).reduce((map, state) => {
  const newMap = { ...map }
  newMap[state] = {
    id: state,
    value: states[state].status,
  }
  return newMap
}, {})

module.exports = availableStates
