/**
 * @description Formata uma data no formato dd/mm/yy, às hh:mm
 * @param {string} dateString Data no formato ISO 8601
 * @returns {string} Data formatada
 * @example
 * formatDate({date: '2021-08-01T00:00:00.000Z'}) // '01/08/21, às 21:00'
 * formatDate({date: '2021-08-01T00:00:00.000Z'}) // '01/08/21, às 21:00'
 * formatDate({date: new Date()}) // '01/08/21, às 21:00'
 */
export function formatDate({
  date,
  withTime = true,
}: {
  date: string | Date;
  withTime?: boolean;
}): string {
  const date_ = date instanceof Date ? date : new Date(date);

  const day = date_.getDate().toString().padStart(2, "0");
  const month = (date_.getMonth() + 1).toString().padStart(2, "0");
  const year = date_.getFullYear().toString().slice(-2);
  const hours = date_.getHours().toString().padStart(2, "0");
  const minutes = date_.getMinutes().toString().padStart(2, "0");

  if (!withTime) {
    return `${day}/${month}/${year}`;
  }
  return `${day}/${month}/${year}, às ${hours}:${minutes}`;
}
