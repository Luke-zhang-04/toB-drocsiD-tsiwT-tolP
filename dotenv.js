// __dirname in esm
import dotenv from "dotenv"
import {__dirname} from "./globals"

dotenv.config({path: `${__dirname}/.env`})
