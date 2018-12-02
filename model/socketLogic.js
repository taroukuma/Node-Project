import { jsonData } from './createJson'

let socketCall = function (socketIO) {
  return () => socketIO.emit('update', JSON.stringify(jsonData))
}

export { socketCall }
