import { useWindowSize } from 'components/hook'
import { shadows, breakpoints } from 'theme'
import Microlink from '@microlink/react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Choose } from 'react-extras'
import { match } from 'styled-is'
import { mqlCode } from 'helpers'

import {
  CodeEditor,
  MultiCodeEditor,
  Card,
  Box,
  Flex,
  Iframe
} from 'components/elements'

import * as code from './code'
import * as data from './data'
import * as html from './html'
import * as json from './json'

const TYPES = ['meta', 'iframe', 'screenshot', 'pdf', 'insights']
const MODES = ['preview', 'html', 'json', 'code']
const SMALL_BREAKPOINT = Number(breakpoints[0].replace('px', ''))

const MicrolinkCard = styled(Microlink)`
  --microlink-hover-background-color: white;
  width: 100%;

  @media screen and (max-width: ${breakpoints[1]}) {
    .microlink_card__content {
      display: none;
    }
  }
`

const MQLCard = styled(Card)`
  &:hover {
    box-shadow: ${shadows[0]};
  }

  ${match('type', 'screenshot')`
  ${match('mode', 'preview')`
    background-image: url("${data.screenshotUrl}");
    background-size: cover;
    background-position: center;
    box-shadow: none;

    &:hover {
      box-shadow: none;
    }
    `}
  `};

  ${match('type', 'iframe')`
    ${match('mode', 'preview')`
      display: flex;
      justify-content: center;
      background-color: transparent;
      box-shadow: none;
      &:hover {
        box-shadow: none;
      }
    `}
  `};
`

export default props => {
  const size = useWindowSize({ width: 1440, height: 798 })

  const [mode, setMode] = useState(MODES[0])
  const [type, setType] = useState(TYPES[0])

  const cardBase = size.width < SMALL_BREAKPOINT ? 1.2 : 2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  return (
    <Flex
      alignItems='center'
      justifyContent='center'
      flexDirection='column'
      mb={[4, 0]}
      {...props}
    >
      <Choose>
        <MQLCard width={cardWidth} height={cardHeight} mode={mode} type={type}>
          <Choose.When condition={mode === 'preview'}>
            <Choose>
              <Choose.When condition={type === 'pdf'}>
                <Iframe src={data.pdfUrl} />
              </Choose.When>
              <Choose.When condition={type === 'insights'}>
                <Iframe src={data.insightsUrl} />
              </Choose.When>
              <Choose.When condition={type === 'meta' || type === 'iframe'}>
                <MicrolinkCard
                  key={type}
                  fetchData={false}
                  media={type === 'iframe' ? 'iframe' : 'video'}
                  style={{ border: '0', height: 'inherit', maxWidth: '100%' }}
                  url={data[type] && data[type].url}
                  setData={data[type]}
                  size='large'
                />
              </Choose.When>
            </Choose>
          </Choose.When>
          <Choose.When condition={mode === 'json'}>
            <CodeEditor
              width='100%'
              language='json'
              children={mqlCode.json(data[type], json[type])}
            />
          </Choose.When>
          <Choose.When condition={mode === 'html'}>
            <CodeEditor
              width='100%'
              language='html'
              children={html[type](data[type])}
            />
          </Choose.When>
          <Choose.When condition={mode === 'code'}>
            <MultiCodeEditor width='100%' languages={code[type]} />
          </Choose.When>
        </MQLCard>
      </Choose>
      <Flex
        width='100%'
        pl='15px'
        pr='7px'
        alignItems={['center', undefined, undefined, undefined]}
        justifyContent='space-between'
        flexDirection={['column', 'row', 'row', 'row']}
      >
        <Box pt={4}>
          {MODES.map(children => (
            <Card.Option
              key={children}
              value={mode}
              children={children}
              onClick={() => setMode(children)}
            />
          ))}
        </Box>
        <Box pt={[3, 4, 4, 4]}>
          {TYPES.map(children => (
            <Card.Option
              key={children}
              children={children}
              value={type}
              onClick={() => setType(children)}
            />
          ))}
        </Box>
      </Flex>
    </Flex>
  )
}
