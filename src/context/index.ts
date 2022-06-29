import React from "react"
import { IGlobal } from "../types";
export const GlobalContext = React.createContext<IGlobal>({
    getFiles(_path,_trigger) {
    },
    paths:[],
    path:"/",
    url:"",
});