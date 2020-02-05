import React from 'react'
import appConfig from './config'

import { createGlobalStyle } from 'styled-components'
import BootstrapProvider from '@bootstrap-styled/provider/lib/BootstrapProvider'
import { Container, Row } from '@bootstrap-styled/v4'

import SidebarFirst from './Components/SidebarFirst'

export default function App() {
  let { theme, menu, routes } = appConfig
  return (
    <>
      <GlobalStyle />
      <BootstrapProvider theme={theme}>
        <Container fluid>
          <Row>
            <SidebarFirst menu={menu} routes={routes} />
          </Row>
        </Container>
      </BootstrapProvider>
    </>
  )
}

const GlobalStyle = createGlobalStyle`body { margin: 0; }`
