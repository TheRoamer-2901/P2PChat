import { useAuth } from './useAuth'

export function useFriend() {
    const {friendList} = useAuth()
    return friendList
}