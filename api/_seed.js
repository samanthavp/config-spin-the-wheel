// Mirrors the prize list in public/index.html's makePrizes() — used only to
// seed KV on first run. The two don't need to stay byte-identical after that.
const PALETTE = ['#2BB0F4', '#FB3A2E', '#2ECC6F', '#B583E6', '#EEF53A', '#FF8A3D', '#FF5FA2', '#18C8B4', '#6C5CE7', '#A8E05F', '#FF6B5B', '#4D7CFF'];

const RAW = [
  ['"Meet me in the browser" cap', 5], ['Blue Figma Cap', 5], ['Baggu Bag', 10],
  ['Washi Tape', 20], ['Mini Pouch', 10], ['Figma Patch', 20],
  ['FoF Toronto T-shirt', 80], ['2026 FoF Toronto Tote', 120], ['FoF Toronto Sticker Sheet', 50],
  ['2025 FoF Toronto Tote', 106], ['FoF Pin', 25], ['FoF Coloured Pen', 10],
  ['Config 2026 Tote', 7], ['Config 2026 Hat', 140], ['Config Stickers', 100],
  ['Config 2026 Pin', 120], ['QT Fidget Toy', 40], ['QT Baseball Cap', 15],
  ['QT Tumbler', 8], ['QT Water Bottle', 12], ['QT Mug', 15], ['QT Notebook', 25]
];

function seedPrizes() {
  return RAW.map((x, i) => ({
    id: 'p' + (i + 1),
    name: x[0],
    initialQty: x[1],
    weight: x[1],
    color: PALETTE[i % PALETTE.length],
    deleted: false
  }));
}

module.exports = { seedPrizes };
