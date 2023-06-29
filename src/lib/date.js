
export function localeDateString(dateObj) {
    const timezone_offset = -4
    dateObj.setHours(dateObj.getHours() + timezone_offset)
    return dateObj.toISOString().substring(0,10)
}