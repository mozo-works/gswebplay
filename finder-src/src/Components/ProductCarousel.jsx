import React from 'react'
import styled from 'styled-components'
import { Nav, NavItem } from '@bootstrap-styled/v4'

export default function ProductCarousel(props) {
  let { images, title } = props
  images = images.split('||')
  let firstImage = images[0]
  const $ = document.querySelector.bind(document)

  function handleClick(e) {
    e.preventDefault()
    var selected = e.target.nextSibling.getAttribute('src')
    $('#productImage').setAttribute('src', selected)
  }

  return (
    <div id="productCarousel">
      <ProductImage>
        <ProductImageCover />
        <img id="productImage" src={firstImage} alt={title} style={{ maxWidth: 100+'%' }} />
      </ProductImage>
      <ProductImageNavbar id="productImageNavbar" className="flex-wrap">
        { images.map((image, index) => {
          return (
            <NavItem key={index} style={{ height: '94px', marginBottom: '5px' }}>
              <Covering onClick={handleClick} />
              <img key={ index } src={ image } alt={title} width="125" height="92" />
            </NavItem>
          )
        }) }
      </ProductImageNavbar>
    </div>
  )
}

const ProductImage = styled('div')`
  height: 374px;
  overflow: hidden;
  position: relative;
  border: 1px solid #e0e0e0;
  margin-bottom: 5px;
`

const ProductImageCover = styled('div')`
  width: 100%;
  z-index: 10;
  overflow: hidden;
  position: absolute;
  display: table;
  text-align: center;
  background-color: rgba(0,0,0,.03);
  height: 374px;
`
const ProductImageNavbar = styled(Nav)`
  li {
    margin-right: 7px;
    border: 1px solid #ccc;
    &:nth-of-type(4n+4) {
      margin-right: 0;
    }
  }
`

const Covering = styled('div')`
  width: 125px;
  height: 92px;
  background-color: rgba(0,0,0,.04);
  overflow: hidden;
  position: absolute;
  display: table;
  text-align: center;
  transition: box-shadow .3s ease-in-out;
  &:hover {
    box-shadow: 0 5px 15px 0 rgba(0,0,0,.4);
  }
`
