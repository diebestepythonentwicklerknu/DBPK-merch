export const getSessionItems = <T>(storageName: string): T[] => {
    try {
        const storage = JSON.parse(sessionStorage.getItem(storageName) || '[]')

        return storage
    } catch (error) {
        console.error('Error parsing session storage data:', error)
        return []
    }
}

export const updateSessionItems = <T>(storageName: string, items: T[]) => {
    try {
        sessionStorage.setItem(storageName, JSON.stringify(items))
    } catch (error) {
        console.error('Error updating session storage data:', error)
    }
}
