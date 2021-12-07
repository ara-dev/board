//import convert from 'xml-js/lib'
import { convertXML } from 'simple-xml-to-json'
const data = `<svg xml:space="preserve" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 595.3 841.9" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <polygon id="100_svg__a" points="361.4,518.8 250.5,452.5 133,506.2 161.9,380.2 74.4,285.1 203.1,273.6 266.6,161 317.4,279.9 444,305.5 346.6,390.5"/>
  </defs>
  <clipPath id="100_svg__b">
    <use xlink:href="#100_svg__a" overflow="visible"/>
  </clipPath>
  <rect width="221" height="283" x="145.4" y="213.8" fill="#40403f" clip-path="url(#100_svg__b)"/>
  <linearGradient id="100_svg__c" x1="32" x2="171" y1="770.89" y2="770.89" gradientTransform="matrix(1 0 0 -1 0 841.89)" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#fff"/>
    <stop offset=".411" stop-color="#fbb040"/>
    <stop offset=".662" stop-color="#f9ed32"/>
    <stop offset="1" stop-color="#ed1c24"/>
  </linearGradient>
  <rect width="139" height="100" x="32" y="21" fill="url(#100_svg__c)" stroke="#000" stroke-miterlimit="10"/>
  <ellipse cx="385" cy="86" fill="#ef4136" stroke="#ec008c" stroke-miterlimit="10" stroke-width="20" rx="121" ry="55"/>
  <line x1="61" x2="489" y1="167" y2="199" fill="none" stroke="#8dc63f" stroke-miterlimit="10" stroke-width="5"/>
  <path fill="none" stroke="#8dc63f" stroke-miterlimit="10" stroke-width="5" d="M428 232c0 38.7 21.5 70 48 70"/>
  <polygon fill="#00aeef" stroke="#8dc63f" stroke-miterlimit="10" stroke-width="5" points="191,701 82.5,724.9 7.5,642.9 41,537 149.5,513 224.5,595"/>
  <polygon fill="#ffde17" stroke="#8dc63f" stroke-miterlimit="10" stroke-width="5" points="549,485.4 484.9,477 441.7,525.1 429.8,461.6 370.7,435.3 427.5,404.4 434.2,340.1 481.2,384.5 544.4,371.1 516.6,429.4"/>
  <circle cx="74.4" cy="220.7" r="42" fill="#009444"/>
  <radialGradient id="100_svg__d" cx="301.73" cy="60.483" r="71.784" gradientTransform="matrix(1 0 0 -1 0 841.89)" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#fff"/>
    <stop offset=".411" stop-color="#fbb040"/>
    <stop offset=".662" stop-color="#f9ed32"/>
    <stop offset="1" stop-color="#ed1c24"/>
  </radialGradient>
  <rect width="182" height="90" x="210.7" y="736.4" fill="url(#100_svg__d)"/>
  <path fill="#ffde17" stroke="#8dc63f" stroke-miterlimit="10" stroke-width="5" d="M578.8 612.9 473.6 761.4c-3.8 5.4-11.4 6.7-16.7 2.8l-97.1-68.8c-5.4-3.8-6.7-11.3-2.9-16.7l105.3-148.5c3.8-5.4 11.4-6.7 16.7-2.8l97.1 68.8c5.4 3.8 6.7 11.3 2.8 16.7z"/>
  <circle cx="66" cy="468.5" r="42" fill="#009444"/>
  <circle cx="549" cy="240.6" r="42" fill="#e5580a"/>
  <path fill="#e5580a" d="M66 298.9c-23.6 22.5-28.4 32.2-26 36 4.5 7.2 33.7-8.2 43 3 4.5 5.4 3.1 15.5-1 22-12.4 19.7-50.7 8.6-53 17-3 10.7 53.9 49.7 75 31 13.8-12.3 5-42.8 4-46"/>
  <polyline fill="#b421ea" points="253,532.9 309,546.9 297.6,580.9 354.7,576.9 375,525.1 412,541.9 343,645.8 264,625.9"/>
  <text font-family="AdobeArabic-Regular" font-size="28.892" transform="matrix(.8185 0 0 1 404 811.406)">این متن فارسشی است </text>
  <text transform="translate(4 811.406)"><tspan x="0" y="0" font-family="Leelawadee" font-size="24">this is </tspan><tspan x="70.5" y="0" fill="#ea1818" font-family="Leelawadee" font-size="24">english</tspan><tspan x="149.3" y="0" font-family="Leelawadee" font-size="24"> text </tspan></text>
</svg>
`
export function xmlToJson(xml = '') {
  const myJson = convertXML(data)
  return myJson
  //return convert.xml2json(xml, { compact: true, spaces: 4 })
  /*xml2js.parseString(xml, (err, result) => {
    if (err) {
      throw err
    }

    // `result` is a JavaScript object
    // convert it to a JSON string
    const json = JSON.stringify(result, null, 4)

    // log JSON string
    console.log(json)
  })*/
}
