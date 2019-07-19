import React from 'react'
import { storiesOf } from '@storybook/react'
import { Subhead, Text, Flex, Box } from 'components/elements'
import isHexColor from 'is-hexcolor'
import contrast from 'contrast'
import { range } from 'lodash'
import { colors } from 'theme'
import { Story } from 'story'
import rgbHex from 'rgb-hex'

const toHex = color =>
  (isHexColor(color) ? color : `#${rgbHex(color)}`).toLowerCase()

const contrastColor = color =>
  contrast(toHex(color)) === 'light' ? 'black' : 'white'

const Palette = ({ name, keywords }) => (
  <Box as='section' pt={5}>
    <Subhead textAlign='left' pb={3}>
      {name}
    </Subhead>
    <Flex flexDirection='column'>
      {keywords.map(keyword => (
        <Flex
          color={contrastColor(colors[keyword])}
          justifyContent='space-between'
          px={5}
          py={4}
          key={keyword}
          bg={keyword}
        >
          <Text fontSize={3} children={keyword} />
          <Text fontSize={3} children={toHex(colors[keyword])} />
        </Flex>
      ))}
    </Flex>
  </Box>
)

const PaletteRange = ({ name: keyword }) => (
  <Palette name={keyword} keywords={range(9).map(n => `${keyword}${n}`)} />
)

storiesOf('Elements', module).add('Colors', () => (
  <Story mt={0} name='Colors' width='100%'>
    <Palette
      name='others'
      keywords={['link', 'secondary', 'primary', 'pinky', 'pinkest', 'border']}
    />
    {/* <Palette
      name='white'
      keywords={[
        'white',
        'white95',
        'white90',
        'white80',
        'white70',
        'white60',
        'white50',
        'white40',
        'white30',
        'white20',
        'white10',
        'white05',
        'white025',
        'white0125'
      ]}
    />
    <Palette
      name='black'
      keywords={[
        'black',
        'black95',
        'black90',
        'black80',
        'black70',
        'black60',
        'black50',
        'black40',
        'black30',
        'black20',
        'black10',
        'black05',
        'black025',
        'black0125'
      ]}
    /> */}
    <PaletteRange name='gray' />
    <PaletteRange name='blue' />
    <PaletteRange name='cyan' />
    <PaletteRange name='indigo' />
    <PaletteRange name='violet' />
    <PaletteRange name='fuschia' />
    <PaletteRange name='pink' />
    <PaletteRange name='red' />
    <PaletteRange name='orange' />
    <PaletteRange name='yellow' />
    <PaletteRange name='lime' />
    <PaletteRange name='green' />
    <PaletteRange name='teal' />
  </Story>
))
