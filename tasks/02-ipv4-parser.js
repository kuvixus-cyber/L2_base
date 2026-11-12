// 2. IPv4 Parser (6 kyu)
// https://www.codewars.com/kata/556d120c7c58dacb9100008b

function ipv4Parser(ip, mask) {
  const ipOctets = ip.split('.').map(Number);
  const maskOctets = mask.split('.').map(Number);

  const network = [];
  const host = [];

  for (let i = 0; i < 4; i++) {
    const netOctet = ipOctets[i] & maskOctets[i];
    // Mask to 8 bits (& 0xff) because JS bitwise ~ operates on 32-bit signed integers.
    const hostOctet = ipOctets[i] & (~maskOctets[i] & 0xff);
    network.push(netOctet);
    host.push(hostOctet);
  }

  return [network.join('.'), host.join('.')];
}
