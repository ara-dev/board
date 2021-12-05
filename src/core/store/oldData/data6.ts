export default {
  elements: [
    {
      type: 'element',
      name: 'svg',
      attributes: {
        'xml:space': 'preserve',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        viewBox: '0 0 500 500',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      elements: [
        {
          type: 'element',
          name: 'rect',
          attributes: {
            width: '500',
            height: '500',
            fill: '#ffe97b',
          },
        },
        {
          type: 'element',
          name: 'image',
          attributes: {
            'xlink:href':
              'data:image/png;base64,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 +wAAAABJRU5ErkJggg==',
            width: '383',
            height: '509',
            opacity: '.8',
            overflow: 'visible',
            transform: 'translate(61 -3)',
          },
        },
        {
          type: 'element',
          name: 'rect',
          attributes: {
            width: '309.6',
            height: '436.78',
            x: '95.2',
            y: '31.61',
            fill: '#a1d0ff',
          },
        },
        {
          type: 'element',
          name: 'path',
          attributes: {
            fill: '#e58c8c',
            d: 'M305.72 402.42h-106c-5.97 0-10.81-4.84-10.81-10.81 0-5.97 4.84-10.81 10.81-10.81h106c5.97 0 10.81 4.84 10.81 10.81 0 5.97-4.84 10.81-10.81 10.81z',
          },
        },
        {
          type: 'element',
          name: 'text',
          attributes: {
            fill: '#fff',
            'font-family': 'SFCartoonistHand-Bold',
            'font-size': '15.623',
            transform: 'translate(191.496 331.25)',
          },
          elements: [
            {
              type: 'text',
              text: 'Join us for the party',
            },
          ],
        },
        {
          type: 'element',
          name: 'text',
          attributes: {
            fill: '#fff',
            'font-family': 'SFCartoonistHand-Bold',
            'font-size': '15.623',
            transform: 'translate(207.293 398.19)',
          },
          elements: [
            {
              type: 'text',
              text: 'is  turning 6!',
            },
          ],
        },
        {
          type: 'element',
          name: 'text',
          attributes: {
            fill: '#cfe3ff',
            'font-family': 'Vanilla',
            'font-size': '33.145',
            transform: 'translate(176.224 369.699)',
          },
          elements: [
            {
              type: 'text',
              text: 'Celina',
            },
          ],
        },
        {
          type: 'element',
          name: 'text',
          attributes: {
            fill: '#fff878',
            'font-family': 'Vanilla',
            'font-size': '33.145',
            transform: 'translate(173.037 365.771)',
          },
          elements: [
            {
              type: 'text',
              text: 'Celina',
            },
          ],
        },
        {
          type: 'element',
          name: 'text',
          attributes: {
            fill: '#343660',
            'font-family': 'Vanilla',
            'font-size': '13',
            transform: 'translate(146.04 422.78)',
          },
          elements: [
            {
              type: 'text',
              text: 'sunday - 20 April - 3pm',
            },
          ],
        },
        {
          type: 'element',
          name: 'rect',
          attributes: {
            width: '183.38',
            height: '34.3',
            x: '157.83',
            y: '431.43',
            fill: 'none',
          },
        },
        {
          type: 'element',
          name: 'text',
          attributes: {
            transform: 'translate(162.344 437.108)',
          },
          elements: [
            {
              type: 'element',
              name: 'tspan',
              attributes: {
                x: '0',
                y: '0',
                fill: '#fff',
                'font-family': 'SFCartoonistHand-Bold',
                'font-size': '8',
              },
              elements: [
                {
                  type: 'text',
                  text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing ',
                },
              ],
            },
            {
              type: 'element',
              name: 'tspan',
              attributes: {
                x: '2.6',
                y: '9.6',
                fill: '#fff',
                'font-family': 'SFCartoonistHand-Bold',
                'font-size': '8',
              },
              elements: [
                {
                  type: 'text',
                  text: 'elit, sed diam nonummy nibh euismod tincidunt ut ',
                },
              ],
            },
            {
              type: 'element',
              name: 'tspan',
              attributes: {
                x: '75.47',
                y: '19.2',
                fill: '#fff',
                'font-family': 'SFCartoonistHand-Bold',
                'font-size': '8',
              },
              elements: [
                {
                  type: 'text',
                  text: 'laoreet ',
                },
              ],
            },
          ],
        },
        {
          type: 'element',
          name: 'defs',
          elements: [
            {
              type: 'element',
              name: 'rect',
              attributes: {
                id: '100_svg__a',
                width: '310',
                height: '437',
                x: '95.2',
                y: '31.61',
              },
            },
          ],
        },
        {
          type: 'element',
          name: 'clipPath',
          attributes: {
            id: '100_svg__b',
          },
          elements: [
            {
              type: 'element',
              name: 'use',
              attributes: {
                'xlink:href': '#100_svg__a',
                overflow: 'visible',
              },
            },
          ],
        },
        {
          type: 'element',
          name: 'g',
          attributes: {
            'clip-path': 'url(#100_svg__b)',
          },
          elements: [
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#cfe3ff',
                d: 'M359.24 135.54c-12.72-27.33-35.14-50.94-63.28-62.43-30.99-12.65-62.03-6.22-90.95 8.67-22.68 11.67-43.94 28.38-58.84 49.25-34.55 48.38-17.76 119.46 29.26 153.39 49.11 35.43 124.61 32.17 169.62-9.1 37.52-34.41 34.01-97.2 14.19-139.78z',
              },
            },
            {
              type: 'element',
              name: 'polygon',
              attributes: {
                fill: '#ffb8b3',
                points:
                  '409.45,17.18 405.2,327.67 330.98,286.6 127.88,174.22 95.2,156.14 81.86,18.23',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#ffb8b3',
                d: 'M344.12 275.5c-3.9 3.9-8.3 7.48-13.24 10.71L128.04 173.83c9.72-48.25 52.23-87.1 97.98-101.96 13.48-4.38 27.77-6.59 41.93-5.39 33.5 2.84 62.89 26.05 79.67 55.23.66 1.15 1.3 2.31 1.9 3.49 12.09 23.54 18.27 48.19 18.66 74.63.43 29.16-4.02 55.67-24.06 75.67z',
                opacity: '.7',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#e58c8c',
                d: 'M157.36-13.51C150.72-5.54 143.01-3 140.43 7.77c-2.49 10.41-.53 21.91 5.45 30.8 8.55 12.71 24.49 19.72 39.75 18.39 6.76-.59 13.35-2.65 20.13-3.05 7.63-.45 13.39 2.05 20.44 4.12 7.48 2.2 16.38 2.49 24.12 2.4 17.62-.19 35.12-3.02 52.74-3.37 18.02-.36 38.29 3.14 48.72 17.83 12.42 17.49 5.42 42.94 15.81 61.7 6.61 11.93 19.9 17.46 26.01 30.89 5.78 12.69 7.17 27.53 2.84 40.87-3.26 10.06-9.25 18.96-14.1 28.35-4.3 8.34-7.77 17.32-8.26 26.69-.5 9.37 2.29 19.23 9 25.79 4.56 4.47 10.66 7.22 14.82 12.07 2.97 3.47 4.75 7.79 7.28 11.6 2.53 3.81 6.28 7.3 10.84 7.57 5.19.31 9.66-3.61 12.79-7.75 12.58-16.64 13.27-39.06 19.39-59.01 7.2-23.49 23.08-40.84 27.36-65.65 7.28-42.28 6.75-85.56 3.17-128.31-2.82-33.65-8.15-68.78-28.4-95.8-13.9-18.55-34.05-31.87-55.82-39.84-21.77-7.97-45.15-10.81-68.33-10.92-43.63-.2-87.28 9.23-126.93 27.43-13.86 6.36-31.15 15.39-34.71 31.53-1.35 6.05-3.93 10.51-7.18 14.39z',
                opacity: '.373',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#cfe3ff',
                d: 'M436.48 371.86c-6.5 4.43-15.4 2.8-22.54-.49-7.15-3.29-13.72-8.07-21.4-9.78-7.68-1.71-17.26.98-19.85 8.41-1.58 4.52-.18 9.49 1.27 14.05 4.15 13.08 8.66 27.53 3.15 40.1-6.34 14.49-23.81 20.75-39.62 21.21-15.82.46-31.64-3.26-47.38-1.67-20.98 2.12-39.76 13.38-57.76 24.36-9.91 6.05-20.98 13.95-21.48 25.55-.12 2.82 2.58 4.26 5.34 3.64 2.76-.62 5.06-2.43 7.38-4.05 6.55-4.6 13.88-8.08 21.59-10.24 3.49-.98 7.1-1.69 10.71-1.39 3.32.27 6.5 1.39 9.65 2.45 14.32 4.78 30.43 10.5 45.66 10.12 14.71-.36 28.9 5.06 43.71 3.1 7.59-1.01 14.87-3.67 22.41-4.99 8.47-1.47 17.13-1.22 25.72-.92 2.05.07 4.21.12 6.01-.85 2.03-1.09 3.22-3.26 4.2-5.35 5.51-11.72 8.1-24.78 7.65-37.72-.49-13.84-4.06-25.45 1.5-39.07 2.68-6.55 8.27-11.39 12.36-17.17 4.09-5.76 5.81-13.51 1.72-19.3zm-294.81 1.55c-2 9.84-12.72 14.74-21.6 19.43-15.39 8.13-28.82 19.96-38.81 34.21-2.39 3.41-4.67 7.04-8.04 9.5-3.37 2.45-8.21 3.45-11.69 1.15-2.78-1.85-4.01-5.25-5-8.45-13.12-42.64-12.67-88.06-6.13-131.82 2.59-17.34 10.7-105.28 47.74-74.37 5.55 4.63 9.26 11.08 12.4 17.6 3.13 6.52 5.84 13.29 9.9 19.28 5.64 8.31 13.62 14.7 20.89 21.64 7.27 6.94 14.14 14.96 16.49 24.73 2.35 9.77-1.15 21.57-10.2 25.94-7.99 3.86-12.6 5.76-11.27 15.59 1.16 8.61 7.15 16.55 5.32 25.57z',
              },
            },
            {
              type: 'element',
              name: 'defs',
              elements: [
                {
                  type: 'element',
                  name: 'path',
                  attributes: {
                    id: '100_svg__c',
                    d: 'M349.58 187.88c8.64 89.28-45.86 102.43-102.43 102.43s-102.48-56.37-102.43-102.43c.05-46.79 41.62-85.3 102.43-102.43 54.45-15.34 96.98 46.12 102.43 102.43z',
                  },
                },
              ],
            },
            {
              type: 'element',
              name: 'clipPath',
              attributes: {
                id: '100_svg__d',
              },
              elements: [
                {
                  type: 'element',
                  name: 'use',
                  attributes: {
                    'xlink:href': '#100_svg__c',
                    overflow: 'visible',
                  },
                },
              ],
            },
            {
              type: 'element',
              name: 'g',
              attributes: {
                'clip-path': 'url(#100_svg__d)',
              },
              elements: [
                {
                  type: 'element',
                  name: 'rect',
                  attributes: {
                    width: '311.39',
                    height: '219.49',
                    x: '102.83',
                    y: '78.91',
                    fill: '#f1f3f2',
                  },
                },
              ],
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: 'none',
                stroke: '#fff',
                'stroke-dasharray': '1.996,6.9858',
                'stroke-linecap': 'round',
                'stroke-miterlimit': '10',
                'stroke-width': '2',
                d: 'M355.61 187.83c9.19 94.95-48.77 108.94-108.94 108.94s-108.99-59.95-108.94-108.94C137.8 138.07 182 97.11 246.68 78.9c57.91-16.31 103.14 49.05 108.93 108.93z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#2d2d2d',
                d: 'M372.89 42.65c4.81 19.54-3.87 51.5-23.5 56.28s-42.8-19.42-47.61-38.96 7.21-39.26 26.85-44.04c19.64-4.78 39.45 7.18 44.26 26.72z',
                opacity: '.224',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#a9d4ff',
                d: 'M375.87 37.88c4.81 19.54-3.87 51.5-23.5 56.28s-42.8-19.42-47.61-38.96c-4.81-19.54 7.21-39.26 26.85-44.04 19.63-4.78 39.45 7.19 44.26 26.72z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#b6d7ff',
                d: 'M352.37 94.17c-.37.09-.73.16-1.1.23 10.97-11.76 15.18-33.97 11.51-48.92-4.81-19.54-24.62-31.5-44.26-26.72-.95.23-1.87.5-2.79.8 4.37-3.96 9.75-6.9 15.88-8.4 19.64-4.78 39.45 7.18 44.26 26.72 4.81 19.54-3.86 51.51-23.5 56.29z',
                opacity: '.33',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#e58c8c',
                d: 'M336.55 40.09c-2.61-5.55-7.55-9.7-14.22-9.79-6.12-.09-10 4.46-10.97 10.17-.97 5.72.96 11.6 3.99 16.55 1.6 2.62 3.55 5.1 6.13 6.76 2.58 1.66 5.88 2.41 8.8 1.45 7.24-2.39 9.13-12.8 8.07-19.29-.33-2.03-.94-4.02-1.8-5.85z',
                opacity: '.678',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#2d2d2d',
                d: 'M416.35 119.53c-1.26 16.94-16.6 40.32-33.61 39.01-17.01-1.31-29.26-26.8-28-43.74 1.26-16.94 16.07-29.61 33.09-28.31 17.01 1.31 29.78 16.1 28.52 33.04z',
                opacity: '.224',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#d9ef5b',
                d: 'M421.43 114.11c-1.26 16.94-16.6 40.32-33.61 39.01s-29.26-26.8-28-43.74c1.26-16.94 16.07-29.61 33.09-28.31 17.01 1.31 29.78 16.1 28.52 33.04z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#bdd25f',
                d: 'M387.83 153.12c-.32-.03-.63-.06-.95-.1 11.89-6.56 21.09-23.28 22.05-36.24 1.26-16.94-11.51-31.73-28.52-33.04-.82-.06-1.63-.09-2.45-.09 4.54-2.03 9.63-2.98 14.95-2.58 17.01 1.31 29.78 16.09 28.52 33.04-1.26 16.94-16.59 40.32-33.6 39.01z',
                opacity: '.314',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#e58c8c',
                d: 'M389.29 105.58c-.64-5.14-3.52-9.76-8.84-11.58-4.89-1.67-9.19.96-11.47 5.29-2.28 4.33-2.26 9.56-1.14 14.33.6 2.52 1.51 5.02 3.15 7.03 1.64 2.01 4.09 3.48 6.69 3.47 6.44-.02 10.68-7.88 11.53-13.36.26-1.73.3-3.48.08-5.18z',
                opacity: '.678',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#a9d4ff',
                d: 'M348.54 91.42c-1.78 2.54-3.4 5.19-4.84 7.94-.11.21-.22.45-.14.68.12.32.53.38.87.39l7.37.21a.9.9 0 0 0 .81-1.34c-1.18-2.18-2.2-4.46-3.04-6.79',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: 'none',
                stroke: '#fff',
                'stroke-dasharray': '2,7',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-miterlimit': '10',
                'stroke-width': '2',
                d: 'M153.71 210.41c1.58 6.89 3.23 13.94 7.04 19.9 1.89 2.96 4.29 5.6 5.94 8.7 2.8 5.26 2.95 11.93 2.39 17.86',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#2d2d2d',
                d: 'M169.61 155.93c6.89 18.61 1.95 50.9-16.76 57.77-18.71 6.88-44.11-14.26-51-32.87s2.69-39.27 21.4-46.15c18.72-6.87 39.47 2.64 46.36 21.25z',
                opacity: '.224',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#e58c8c',
                d: 'M172.37 147.71c6.89 18.61 1.95 50.9-16.76 57.77-18.71 6.88-44.11-14.26-51-32.87-6.89-18.61 2.69-39.27 21.4-46.15 18.72-6.87 39.47 2.64 46.36 21.25z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#e58c8c',
                d: 'M155.62 205.48c-.35.13-.7.24-1.06.35 9.44-12.75 11.09-34.98 5.83-49.22-6.89-18.61-27.64-28.12-46.35-21.25-.9.33-1.78.7-2.64 1.09 3.84-4.36 8.78-7.85 14.63-10 18.71-6.87 39.45 2.64 46.35 21.25 6.88 18.62 1.95 50.9-16.76 57.78z',
                opacity: '.358',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#e58c8c',
                d: 'M134.09 154.26c-3.18-5.15-8.48-8.66-15.02-8.01-6 .6-9.3 5.48-9.62 11.19-.32 5.71 2.24 11.26 5.75 15.77 1.86 2.39 4.04 4.6 6.76 5.94 2.72 1.34 6.04 1.71 8.79.44 6.83-3.15 7.52-13.56 5.76-19.8-.56-1.96-1.37-3.84-2.42-5.53z',
                opacity: '.678',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#e58c8c',
                d: 'M151.52 203.5c-.66 3.56-1.09 7.17-1.28 10.78-.01.28-.02.59.18.79.28.28.75.14 1.12-.01l7.93-3.36c.76-.32.86-1.33.21-1.82-2.32-1.74-4.5-3.67-6.53-5.74',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: 'none',
                stroke: '#fff',
                'stroke-dasharray': '2,7',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-miterlimit': '10',
                'stroke-width': '2',
                d: 'M348.07 194.76c.38 9.45-2.27 18.93-1.07 28.31.72 5.58 2.77 10.89 4.81 16.13m33.2-78.38c-1.37 20.19-3.16 41.6-15.18 57.88-3.5 4.74-7.79 8.89-12.64 12.23m-7.91-134.24c-2.03 6.67-1.4 13.84-.32 20.73 1.23 7.8 3.02 15.51 5.35 23.05m-177.04 4.67c1.17 6.63 3.72 12.96 4.97 19.58 2.66 14.12-.73 28.64-4.96 42.37-1.62 5.27-3.39 10.62-3.39 16.14.01 7.43 3.17 15.23.15 22.01',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#2d2d2d',
                d: 'M205.16 106.47c.31 16.98-12.81 41.68-29.87 41.94-17.06.27-31.61-23.99-31.91-40.97-.31-16.98 13.28-30.97 30.34-31.24 17.05-.26 31.13 13.29 31.44 30.27z',
                opacity: '.224',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#b49cff',
                d: 'M209.72 100.61c.31 16.98-12.81 41.68-29.87 41.94-17.06.27-31.61-23.99-31.91-40.97-.31-16.98 13.28-30.97 30.34-31.24 17.05-.27 31.13 13.28 31.44 30.27z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#cdb8ff',
                d: 'M179.86 142.55c-.32 0-.63 0-.95-.02 11.23-7.63 18.85-25.13 18.62-38.12-.31-16.98-14.39-30.53-31.45-30.27-.82.01-1.63.06-2.44.14 4.33-2.44 9.32-3.86 14.65-3.94 17.06-.27 31.13 13.28 31.45 30.27.29 16.98-12.82 41.67-29.88 41.94z',
                opacity: '.461',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#e58c8c',
                d: 'M176.93 95.08c-1.11-5.06-4.4-9.39-9.87-10.72-5.02-1.21-9.06 1.8-10.93 6.33-1.87 4.52-1.37 9.73.19 14.37.82 2.45 1.97 4.86 3.78 6.71 1.82 1.85 4.39 3.09 6.98 2.84 6.41-.62 9.91-8.83 10.25-14.37.1-1.75-.03-3.49-.4-5.16z',
                opacity: '.678',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#b49cff',
                d: 'M177.1 139.79c-1.54 2.69-2.9 5.48-4.08 8.35-.09.22-.18.47-.08.69.15.31.57.33.9.31l7.35-.47c.7-.05 1.07-.83.68-1.41-1.38-2.06-2.6-4.23-3.65-6.48',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#2d2d2d',
                d: 'M376.48 154.23c.31 16.98-12.81 41.68-29.87 41.94-17.06.27-31.61-23.99-31.91-40.97-.31-16.98 13.28-30.97 30.34-31.24 17.06-.26 31.14 13.29 31.44 30.27z',
                opacity: '.224',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#ffe97b',
                d: 'M381.04 148.37c.31 16.98-12.81 41.68-29.87 41.94-17.06.27-31.61-23.99-31.91-40.97-.31-16.98 13.28-30.97 30.34-31.24 17.06-.27 31.14 13.28 31.44 30.27z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#ffd576',
                d: 'M351.18 190.31c-.32 0-.63 0-.95-.02 11.23-7.63 18.85-25.13 18.62-38.12-.31-16.98-14.39-30.53-31.45-30.27-.82.01-1.63.06-2.44.14 4.33-2.44 9.32-3.86 14.65-3.94 17.06-.27 31.13 13.28 31.45 30.27.29 16.98-12.82 41.67-29.88 41.94z',
                opacity: '.366',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#e58c8c',
                d: 'M348.26 142.84c-1.11-5.06-4.4-9.39-9.87-10.72-5.02-1.21-9.06 1.8-10.93 6.33-1.87 4.52-1.37 9.73.19 14.37.82 2.45 1.97 4.86 3.78 6.71 1.82 1.85 4.39 3.09 6.98 2.84 6.41-.62 9.91-8.83 10.25-14.37.09-1.75-.04-3.49-.4-5.16z',
                opacity: '.678',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#ffe97b',
                d: 'M348.43 187.55c-1.54 2.69-2.9 5.48-4.08 8.35-.09.22-.18.47-.08.69.15.31.57.33.9.31l7.35-.47c.7-.05 1.07-.83.68-1.41-1.38-2.06-2.6-4.23-3.65-6.48',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: 'none',
                stroke: '#fff',
                'stroke-dasharray': '2,7',
                'stroke-linecap': 'round',
                'stroke-miterlimit': '10',
                'stroke-width': '2',
                d: 'M409.74 359.02c-7.29-1.76-14.64-7.13-21.55-4.23-3.79 1.59-6.23 5.39-7.47 9.3-3.45 10.84.7 22.42 3.46 33.46s3.53 24.31-4.68 32.19c-11.72 11.24-32.91 3.59-45.94 13.26-7.56 5.61-10.26 15.51-12.49 24.65-1.39 5.73-2.79 11.45-4.18 17.18M89.8 305.39c4.23 18.06 27.58 26.64 31.63 44.74 3.08 13.78-6.39 27.13-16.59 36.89-10.2 9.76-22.23 18.89-26.61 32.31',
              },
            },
            {
              type: 'element',
              name: 'circle',
              attributes: {
                cx: '296.2',
                cy: '60.61',
                r: '4',
                fill: '#fff878',
              },
            },
            {
              type: 'element',
              name: 'circle',
              attributes: {
                cx: '128.2',
                cy: '107.61',
                r: '3',
                fill: '#fff878',
              },
            },
            {
              type: 'element',
              name: 'circle',
              attributes: {
                cx: '210.7',
                cy: '78.11',
                r: '4.5',
                fill: '#fff',
              },
            },
            {
              type: 'element',
              name: 'circle',
              attributes: {
                cx: '151.7',
                cy: '273.11',
                r: '4.5',
                fill: '#fff',
              },
            },
            {
              type: 'element',
              name: 'circle',
              attributes: {
                cx: '149.7',
                cy: '445.11',
                r: '4.5',
                fill: '#fff',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#fff878',
                d: 'M360.51 251.53c-1.61-.38-2.61-2-2.23-3.61.38-1.61 2-2.61 3.61-2.23 1.61.38 2.61 2 2.23 3.61-.38 1.61-2 2.61-3.61 2.23zm-177 56c-1.61-.38-2.61-2-2.23-3.61.38-1.61 2-2.61 3.61-2.23 1.61.38 2.61 2 2.23 3.61-.38 1.61-2 2.61-3.61 2.23zm196.15-64.04c-2.42-.57-3.91-3-3.34-5.42.57-2.42 3-3.91 5.42-3.34 2.42.57 3.91 3 3.34 5.42-.58 2.42-3 3.91-5.42 3.34z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#fff',
                d: 'M301.31 80.34s9.92 5.05 11.94 9.59l4.88-4.88s-9.92-8.24-13.96-8.75l-2.86 4.04z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#a9d4ff',
                d: 'M379.55 219.13s7.46-3.25 10.96-2.27l-.48-5.02s-9.26 1.76-11.43 3.8l.95 3.49z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#d9ef5b',
                d: 'M128.71 451.96s-2.99-7.57-1.9-11.03l-5.03.31s1.45 9.32 3.41 11.55l3.52-.83z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#fff878',
                d: 'M314.86 113.85s11.74-7.38 17.89-6.64l-2.1-8.33s-15.16 5.34-18.28 9.33l2.49 5.64z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#a8a6ff',
                d: 'M369.11 375.67s-9.19-10.38-9.46-16.57l-7.88 3.42s7.73 14.09 12.18 16.52l5.16-3.37z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#d9ef5b',
                d: 'M152.83 257.28s11.74-7.38 17.89-6.64l-2.1-8.33s-15.16 5.34-18.28 9.33l2.49 5.64z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#ffe97b',
                d: 'M141.98 83.46s-3.99-13.28-1.64-19.01l-8.59-.2s1.11 16.03 4.13 20.1l6.1-.89zm4.99 150.6s-12.16-2.06-15.79-6.2l-3.55 6.77s13.21 5.44 17.65 4.64l1.69-5.21z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#ffe05c',
                d: 'm271.51 41.1 3.37 2.64c.36.28.84.37 1.28.23l4.08-1.28c1.11-.35 2.13.73 1.74 1.82l-1.47 4.02c-.16.43-.09.92.17 1.29l2.48 3.49c.67.95-.03 2.25-1.19 2.21l-4.28-.15c-.46-.02-.9.19-1.18.56l-2.55 3.44c-.69.93-2.15.67-2.47-.45l-1.18-4.12c-.13-.44-.46-.8-.9-.94l-4.06-1.37c-1.1-.37-1.3-1.84-.34-2.49l3.55-2.39c.38-.26.61-.69.62-1.15l.04-4.28c.04-1.16 1.38-1.8 2.29-1.08zm94.58 409.16 3.09 5.05c.33.54.91.89 1.55.92l5.91.32c1.6.09 2.41 1.97 1.37 3.19l-3.85 4.49a1.96 1.96 0 0 0-.4 1.76l1.52 5.71c.41 1.55-1.13 2.9-2.61 2.29l-5.46-2.27c-.59-.24-1.26-.18-1.79.16l-4.96 3.21c-1.35.87-3.11-.18-2.98-1.78l.47-5.9c.05-.64-.21-1.25-.71-1.66l-4.59-3.73c-1.25-1.01-.79-3.01.77-3.39l5.75-1.38a1.94 1.94 0 0 0 1.36-1.19l2.13-5.52c.55-1.46 2.59-1.65 3.43-.28zM94.51 269.1l3.37 2.64c.36.28.84.37 1.28.23l4.08-1.28c1.11-.35 2.13.73 1.74 1.82l-1.47 4.02c-.16.43-.09.92.17 1.29l2.48 3.49c.67.95-.03 2.25-1.19 2.21l-4.28-.15c-.46-.02-.9.19-1.18.56l-2.55 3.44c-.69.93-2.15.67-2.47-.45l-1.18-4.12c-.13-.44-.46-.8-.9-.94l-4.06-1.37c-1.1-.37-1.3-1.84-.34-2.49l3.55-2.39c.38-.26.61-.69.62-1.15l.05-4.28c.03-1.16 1.37-1.8 2.28-1.08z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#d9ef5b',
                d: 'm154.51 350.75 3.37 2.64c.36.28.84.37 1.28.23l4.08-1.28c1.11-.35 2.13.73 1.74 1.82l-1.47 4.02c-.16.43-.09.92.17 1.29l2.48 3.49c.67.95-.03 2.25-1.19 2.21l-4.28-.15c-.46-.02-.9.19-1.18.56l-2.55 3.44c-.69.93-2.15.67-2.47-.45l-1.18-4.12c-.13-.44-.46-.8-.9-.94l-4.06-1.37c-1.1-.37-1.3-1.84-.34-2.49l3.55-2.39c.38-.26.61-.69.62-1.15l.04-4.28c.04-1.16 1.38-1.8 2.29-1.08z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#fff',
                d: 'm121.19 75.2.42 5.92c.04.64.4 1.21.95 1.54l5.11 3.01c1.39.82 1.23 2.87-.26 3.47l-5.5 2.22c-.59.24-1.03.76-1.17 1.38l-1.29 5.79c-.35 1.57-2.35 2.06-3.38.83l-3.81-4.54c-.41-.49-1.04-.75-1.67-.68l-5.91.57c-1.6.15-2.68-1.6-1.83-2.96l3.14-5.03c.34-.54.39-1.22.13-1.8l-2.36-5.44c-.64-1.48.69-3.05 2.25-2.66l5.76 1.43c.62.15 1.28-.01 1.76-.43l4.44-3.93c1.2-1.07 3.1-.3 3.22 1.31z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#fff878',
                d: 'm350.22 288.45 2.21 3.66c.24.39.66.65 1.12.67l4.27.25c1.16.07 1.74 1.44.98 2.32l-2.8 3.24c-.3.35-.41.82-.3 1.27l1.08 4.14c.29 1.12-.83 2.1-1.9 1.64l-3.94-1.66c-.42-.18-.91-.14-1.3.11l-3.61 2.31c-.98.63-2.25-.14-2.15-1.3l.36-4.27c.04-.46-.15-.91-.51-1.2l-3.31-2.72c-.9-.74-.56-2.18.57-2.45l4.17-.97c.45-.1.82-.42.99-.85l1.56-3.99c.43-1.07 1.91-1.2 2.51-.2z',
              },
            },
            {
              type: 'element',
              name: 'path',
              attributes: {
                fill: '#fff',
                d: 'm378.58 258.41 1.94 5.46c.21.59.69 1.04 1.3 1.2l5.6 1.5c1.52.41 1.91 2.38.67 3.34l-4.6 3.53c-.5.38-.77.98-.74 1.6l.31 5.79c.08 1.57-1.67 2.55-2.97 1.67l-4.78-3.28c-.52-.35-1.17-.43-1.75-.21l-5.41 2.08c-1.47.56-2.95-.8-2.5-2.31l1.64-5.56c.18-.6.05-1.25-.35-1.73l-3.65-4.5c-.99-1.22-.15-3.05 1.42-3.09l5.8-.16c.62-.02 1.2-.34 1.54-.86l3.16-4.86c.85-1.33 2.85-1.1 3.37.39zm-228.47 53.02 1.94 5.46c.21.59.69 1.04 1.3 1.2l5.6 1.5c1.52.41 1.91 2.38.67 3.34l-4.6 3.53c-.5.38-.77.98-.74 1.6l.31 5.79c.08 1.57-1.67 2.55-2.97 1.67l-4.78-3.28c-.52-.35-1.17-.43-1.75-.21l-5.41 2.08c-1.47.56-2.95-.8-2.5-2.31l1.64-5.56c.18-.6.05-1.25-.35-1.73l-3.65-4.5c-.99-1.22-.15-3.05 1.42-3.09l5.8-.16c.62-.02 1.2-.34 1.54-.86l3.16-4.86c.85-1.33 2.84-1.09 3.37.39zm192.51 66.42 1.29 3.62c.14.39.46.69.86.79l3.71.99c1.01.27 1.27 1.58.44 2.21l-3.04 2.34c-.33.25-.51.65-.49 1.06l.2 3.83c.05 1.04-1.11 1.69-1.97 1.1l-3.17-2.17c-.34-.23-.78-.29-1.16-.14l-3.58 1.38c-.97.37-1.95-.53-1.66-1.53l1.09-3.68c.12-.4.03-.83-.23-1.15l-2.42-2.98c-.66-.81-.1-2.02.94-2.05l3.84-.1c.41-.01.8-.23 1.02-.57l2.09-3.22c.57-.87 1.89-.71 2.24.27z',
              },
            },
          ],
        },
      ],
    },
  ],
}
