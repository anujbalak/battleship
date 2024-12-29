/* eslint-disable no-unused-vars */
import { home } from "./app/home.mjs"
import { playerGui} from "./app/playerGui.mjs"
import { computerGui} from "./app/computerGui.mjs";
import { battle } from "./app/battle.mjs";
import { shipMenuUi } from "./app/ship-menu.mjs";
import style from "./styles/style.css"
import './styles/ship-menu.css'
import './styles/highlights.css'
import "./styles/adaptive_screen.css"
home()
playerGui()
computerGui()
battle()
shipMenuUi();