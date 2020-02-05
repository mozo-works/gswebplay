import React from 'react'
import styled from 'styled-components'
import { Nav } from '@bootstrap-styled/v4'

const Sidebar2 = styled('aside')`
  flex: 0 0 320px; overflow-x: hidden;
`
const FixedCol = styled(Nav)`
  position: sticky;
  top: 0;
  height: calc(100vh);
  overflow-x: hidden;
  overflow-y: auto;
`

export default class SidebarSecond extends React.Component {
  render() {
    let terms = this.props.terms
    return (
      <Sidebar2>
        <FixedCol vertical tag="nav">
          {terms}
        </FixedCol>
      </Sidebar2>
    )
  }
}
