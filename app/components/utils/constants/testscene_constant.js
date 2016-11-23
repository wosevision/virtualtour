const testScene = {
  '2a': {
    'name': 'Interior 2A',
    'code': 'ua_int_2a',
    'entities': [
      {
        'type': 'entity',
        'attrs': {
          'position': [
            '0',
            '1.8',
            '0'
          ],
          'id': '57195e0397cd55e725185606'
        },
        'entities': [
          {
            'type': 'camera',
            'attrs': {
              'wasd-controls': 'enabled:false;',
              'drag-look-controls': '',
              'mouse-cursor': '',
              'id': '5768116013b4ea194c2cb995'
            },
            'entities': [
              {
                'type': 'cursor',
                'attrs': {
                  'color': '#0077CA',
                  'id': '57621af2485bead118b0ac0c'
                }
              }
            ]
          }
        ]
      },
      {
        'type': 'entity',
        'attrs': {
          'selectable': '',
          'id': '5761ac2d8a29c6b61765a38e'
        },
        'entities': [
          {
            'type': 'entity',
            'attrs': {
              'position': [
                '2.886773194919842',
                '0',
                '-4.463338604300865'
              ],
              'rotation': [
                '0',
                '-35',
                '0'
              ],
              'wasd-controls': '',
              'id': '57681b5c13b4ea194c2cb9c1'
            },
            'entities': [
              {
                'type': 'cone',
                'attrs': {
                  'position': [
                    '0',
                    '0',
                    '0'
                  ],
                  'radius-bottom': '0.5',
                  'radius-top': '0',
                  'color': '#0077CA',
                  'scale': [
                    '0.75',
                    '2',
                    '0.75'
                  ],
                  'rotation': [
                    '-90',
                    '0',
                    '0'
                  ],
                  'opacity': '0.8',
                  'id': '5760d254b41a4e1100e62d7c'
                },
                'entities': [
                  {
                    'type': 'animation',
                    'attrs': {
                      'attribute': 'position',
                      'dur': '500',
                      'to': [
                        '0',
                        '0',
                        '-0.1'
                      ],
                      'repeat': 'indefinite',
                      'direction': 'alternate',
                      'from': [
                        '0',
                        '0',
                        '0'
                      ],
                      'id': '5761bfc23e3273f61747a48d'
                    }
                  },
                  {
                    'type': 'animation',
                    'attrs': {
                      'attribute': 'scale',
                      'dur': '180',
                      'to': [
                        '0.8',
                        '2.1',
                        '0.8'
                      ],
                      'easing': 'ease-in-out',
                      'begin': 'mouseenter',
                      'id': '576850772225244b4ed73a63'
                    }
                  },
                  {
                    'type': 'animation',
                    'attrs': {
                      'attribute': 'scale',
                      'dur': '180',
                      'to': [
                        '0.75',
                        '2',
                        '0.75'
                      ],
                      'easing': 'ease-in-out',
                      'begin': 'mouseleave',
                      'id': '576851312225244b4ed73a7b'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  '3a': {
    'name': 'Interior 3A',
    'code': 'ua_int_3a',
    'entities': [
      {
        'type': 'entity',
        'attrs': {
          'position': [
            '0',
            '1.8',
            '0'
          ],
          'id': '57195e0397cd55e725185606'
        },
        'entities': [
          {
            'type': 'camera',
            'attrs': {
              'wasd-controls': 'enabled:false;',
              'drag-look-controls': '',
              'mouse-cursor': '',
              'id': '5768116013b4ea194c2cb995'
            },
            'entities': [
              {
                'type': 'cursor',
                'attrs': {
                  'color': '#0077CA',
                  'id': '57621af2485bead118b0ac0c'
                }
              }
            ]
          }
        ]
      }
    ]
  }
}

export default {
	name: 'testScene',
	fn: testScene
}