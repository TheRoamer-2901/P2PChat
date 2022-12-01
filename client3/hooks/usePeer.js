import { useContext } from "react";
import { PeerContext } from "../context/AuthContext";

export function usePeer() {
    return useContext(PeerContext)
}