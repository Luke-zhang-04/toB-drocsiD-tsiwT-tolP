import * as deleteMode from "./delete"
import * as mockMode from "./mock"

/** @type {{[key: string]: {onMessageCreate?: () => {}, onMessageUpdate?: () => {}}}} */
export const modes = {
    delete: deleteMode,
    mock: mockMode,
}

export default modes
