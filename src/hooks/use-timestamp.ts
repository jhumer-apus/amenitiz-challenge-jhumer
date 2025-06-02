export const useTimestamp = () => {

    const formatTimestamp = (timestamp:number = 0) => {
        const now = Date.now();
        const msTimestamp = timestamp * 1000 // Convert timestamp to ms 

        const getDiff = Math.max(now - msTimestamp, 0) 
        const getTotalSeconds = Math.floor(getDiff/ 1000)

        const seconds = (getTotalSeconds % 60).toString().padStart(2, '0')
        const mins = Math.floor((getTotalSeconds % 3600) / 60).toString().padStart(2, '0')
        const hours = Math.floor(getTotalSeconds / 3600).toString().padStart(2, '0')

        return `${hours}:${mins}:${seconds}`
    }
    return {
        formatTimestamp
    }
}