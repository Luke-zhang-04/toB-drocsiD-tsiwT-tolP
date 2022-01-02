import * as deleteMode from "./delete"
import * as mockMode from "./mock"
import * as offMode from "./off"

/** @type {{[key: string]: {onMessageCreate?: () => {}, onMessageUpdate?: () => {}}}} */
export const modes = {
    delete: deleteMode,
    mock: mockMode,
    off: offMode,
}

export default modes
