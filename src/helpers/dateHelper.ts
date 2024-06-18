export function formatDate(date: Date): string {
  let formattedDate = date.toLocaleDateString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  formattedDate = formattedDate.replace(', ', ' - ');

  return formattedDate;
}
