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
