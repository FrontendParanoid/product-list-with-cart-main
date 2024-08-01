export function FormatPrice(price: number | string): string {
  let result!: string;
  if (typeof price == 'number') {
    let correctForm = price.toFixed(2);
    result = `$${correctForm.toString()}`;
  } else if (typeof price == 'string') {
    let number = parseInt(price);
    let correctForm = number.toFixed(2);
    result = `$${correctForm.toString()}`;
  } else {
    result = 'error';
  }

  return result;
}
