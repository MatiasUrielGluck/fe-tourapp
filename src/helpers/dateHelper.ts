export function formatDate(date: Date): string {
  let formattedDate = date.toLocaleDateString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  formattedDate = formattedDate.replace(', ', ' - ');

  return formattedDate;
}

export function formatDateOnly(date: Date): string {
  return date.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function formatDateSymbol(
  date: Date,
  symbol = '-',
  order = 'yyyy-mm-dd'
): string {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  let result = order;
  result = result.replace('yyyy', year);
  result = result.replace('mm', month);
  result = result.replace('dd', day);
  result = result.replaceAll('-', symbol);
  return result;
}
