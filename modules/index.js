import * as deleteMode from "./delete"
import * as mockMode from "./mock"
import * as offMode from "./off"
import * as spamMode from "./spam"

/**
 * @type {{[key: string]: {
 *  onMessageCreate?: () => {},
 *  onMessageUpdate?: () => {},
 *  onStart?: () => {},
 *  onFinish?: () => {},
 *  onPresenceUpdate?: () => {}
 * }}}
 * */
export const modes = {
    delete: deleteMode,
    mock: mockMode,
    off: offMode,
    spam: spamMode,
}

export default modes
