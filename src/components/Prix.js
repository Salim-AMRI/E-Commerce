export default function formatPrix(num) {
  return "" + Number.parseFloat(num).toFixed(3).toLocaleString() + " TND";
}
