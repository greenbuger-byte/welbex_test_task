export const useHumanTime = (format) => {
    function addZeroBefore(cropData) {
        const crop = (`0${cropData}`).slice(-2);
        return crop === '00' ? '12' : crop;
    }
    return (time) => {
        let humanDate = format;
        const date = new Date(time);
        humanDate = humanDate.replace("D", addZeroBefore(date.getDay()));
        humanDate = humanDate.replace("Y", addZeroBefore(date.getFullYear()));
        humanDate = humanDate.replace("M", addZeroBefore(date.getMonth()));
        humanDate = humanDate.replace("h", addZeroBefore(date.getHours()));
        humanDate = humanDate.replace("m", addZeroBefore(date.getMinutes()));
        return humanDate;
    }
}