//2023-03-13T17:42:06.471Z to 13.3.2023 19:42
const formatDate = (date: string) => {
    const d = new Date(date)
    return d.getDate()  + "." + (d.getMonth()+1) + "." + d.getFullYear() + " " +
      d.getHours() + ":" + ("0" + d.getMinutes()).slice(-2);
}

export { formatDate };