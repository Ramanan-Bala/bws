export function toDateString(d: Date): string {
  let dd: string = d.getDate().toString();
  let mm: string = (d.getMonth() + 1).toString();
  const yyyy: string = d.getFullYear().toString();

  if (dd < '10') {
    dd = `0${dd}`;
  }

  if (mm < '10') {
    mm = `0${mm}`;
  }
  return `${yyyy}-${mm}-${dd}`;
  // new Date(d.getFullYear(), d.getMonth(), d.getDate()).toString();
}
