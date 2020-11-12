export function toDateString(d: Date | string): string {
  if (typeof d === 'string') {
    d = new Date(Date.parse(d));
  }

  let dd: string = d.getDate().toString();
  let mm: string = (d.getMonth() + 1).toString();
  const yyyy: string = d.getFullYear().toString();

  // tslint:disable-next-line: radix
  if (parseInt(dd) < 10) {
    dd = `0${dd}`;
  }

  // tslint:disable-next-line: radix
  if (parseInt(mm) < 10) {
    mm = `0${mm}`;
  }
  return `${yyyy}-${mm}-${dd}`;
  // new Date(d.getFullYear(), d.getMonth(), d.getDate()).toString();
}
