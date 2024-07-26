export function FormatPrice(price: number): string {
  let correctForm = price.toFixed(2);
  const result = `$${correctForm.toString()}`;

  return result;
}
