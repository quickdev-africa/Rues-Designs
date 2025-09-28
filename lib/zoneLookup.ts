// Zone lookup utility for zip code to zone/price mapping
// This should be replaced with a DB query in production

const ZONE_DATA = [
  { zone: 'A', zips: ['10001', '10002', '10003'], price: 20 },
  { zone: 'B', zips: ['20001', '20002', '20003'], price: 30 },
  { zone: 'C', zips: ['30001', '30002', '30003'], price: 40 },
];

export function getZoneByZip(zip: string) {
  for (const zone of ZONE_DATA) {
    if (zone.zips.includes(zip)) {
      return { zone: zone.zone, price: zone.price };
    }
  }
  return null;
}
