// Sample data taken from the screenshot. `color: 'split'` renders the
// black/white diagonal swatch. `linked` rows come from an external file.
const native = (name) => ({
  source: '', linked: false, name, on: true, locked: false,
  printable: true, active: false, color: '#000000', lineType: 'Simple Line',
  lineWidth: 0, description: '',
})

const LINKED_SOURCE = 'Elata_Nova_less...'
const linked = (name, color) => ({
  ...native(name), source: LINKED_SOURCE, linked: true, color,
})
let sampleCount = 0
const sample = (color) => {
  sampleCount += 1
  return linked(`Sample ${String(sampleCount).padStart(2, '0')}`, color)
}

export const layers = [
  ...[
    'Point', 'Polygon', 'Railing', 'Raster image', 'Roof', 'Room survey',
    'Shaft', 'Slab', 'Solid model', 'Space', 'Stair', 'Terrain', 'Text',
    'Text - Annotation', 'Text - Notes', 'Title box', 'Viewport',
    'Wall - Load-bearing wall', 'Wall - Partition wall',
  ].map((name) => ({
    ...native(name),
    active: name === 'Slab',
    empty: ['Text', 'Text - Annotation', 'Text - Notes'].includes(name),
  })),
  linked('0', 'split'),
  sample('#f9a08c'),
  sample('#00bfff'),
  sample('#ff8400'),
  sample('#ff80ff'),
  sample('#b3b3b3'),
  sample('#000000'),
  sample('split'),
  sample('#cc0000'),
  sample('#4caf50'),
  sample('#9b59b6'),
  sample('#3498db'),
]

export const filterTree = [
  {
    label: 'All layers (139)', expanded: true,
    children: [
      { label: 'All Native Layers (64)' },
      { label: 'All Linked (75)', collapsed: true },
    ],
  },
  {
    label: 'All Groups', expanded: true,
    children: [{ label: 'Group 1 (0)' }, { label: 'Group 2 (0)' }],
  },
]

export const variations = {
  root: 'Available variations',
  items: ['Show all layers', 'Variation 1', 'Variation 2', 'Variation 3'],
  selected: 'Variation 3',
}
