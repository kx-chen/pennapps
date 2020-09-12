export const displayTime = (total) => {
    let minutes = Math.floor(total / 60);
    let seconds = total % 60;
    return `${minutes}:${('0' + seconds.toString()).slice(-2)}`
}