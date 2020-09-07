import React, {useEffect} from 'react'
import { Container, Row, Col } from '@bootstrap-styled/v4'
import appConfig from '../config'
import ProductCarousel from './ProductCarousel.jsx'
import { Nav, NavItem } from '@bootstrap-styled/v4'
import { Route, NavLink, Redirect, useParams } from "react-router-dom"
import slugify from 'slugify'
import styled from 'styled-components'
import './product-detail.css'

const $ = document.querySelector.bind(document)

export default class ProductDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nodes: [],
      routePath: '',
      productId: null,
      productIdFirst: 0,
      match: this.props.match
    }
  }

  componentDidMount() {
    let nid = window.location.pathname.split('/')[4]
    if(nid) this.setState({productId: parseInt(nid)})
    let products_of_sub_terms = `${appConfig.data_sources.products_of_sub_terms.url}/${this.props.tid}`
    fetch(products_of_sub_terms)
      .then(results => { return results.json() })
      .then(nodes => {
        let routePath = `${this.props.match.path}/${this.props.slug}/`
        if(nodes[0]) {
          let productIdFirst = nodes[0].nid;
          this.setState({nodes: nodes, routePath: routePath, productIdFirst: productIdFirst, productId: this.state.productId })
        }
      })
  }

  render() {
    let { nodes, routePath, productId, productIdFirst } = this.state
    return (
      <Container style={{ maxWidth: 960 + 'px', marginLeft: 0 }}>
        { productIdFirst !== 0 ? <Redirect to={`${routePath}${productIdFirst}`} /> : ''}
        <Route path={`${routePath}:productId`} children={<ProductNode nodes={nodes} />} />
        <Row>
          <ProductNavBar nodes={nodes} routePath={routePath} productId={productId} />
        </Row>
      </Container>
    )
  }
}

function decodeHtml(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function ProductNode(nodeObjects) {
  let { productId } = useParams()
  let { nodes } = nodeObjects
  let i = 0
  if (productId) {
    i = nodes.findIndex(node => node.nid === productId)
  }
  let node = nodes[i]
  var cert;
  if(node.field_cert) {
    cert = <div className="product__field-cert">
      <a href={ node.field_cert } className="btn-download">
        Certificate &nbsp; <i className="fa fa-download" aria-hidden="true"></i>
      </a>
    </div>
  }
  return (
    <Row className="pt-3">
      <Col lg={7}>
        <ProductCarousel images={node.field_image} title={node.title} />
      </Col>
      <Col lg={5}>
        <div className="group-right">
          <div className="product__node-title">
            <h2>{ node.title }</h2>
          </div>
          { node.field_ages.length > 0 &&
          <div className="product__field-ages">
            <strong className="field__label">Ages</strong>
            <div className="field__item">{ node.field_ages }</div>
          </div>
          }
          { node.field_capacity.length > 0 &&
          <div className="product__field-capacity">
            <strong className="field__label">Capacity</strong>
            <div className="field__item">{ node.field_capacity }</div>
          </div>
          }
          { node.field_size_meter.length > 0 &&
          <div className="product__field-size-meter">
            <strong className="field__label">Size (m)</strong>
            <div className="field__item">{ node.field_size_meter }</div>
          </div>
          }
          { node.field_size_inch.length > 0 &&
          <div className="product__field-size-inch">
            <strong className="field__label">Size ('-")</strong>
            <div className="field__item">{ decodeHtml(node.field_size_inch) }</div>
          </div>
          }
          { node.field_use_zone.length > 0 &&
          <div className="product__field-use-zone">
            <strong className="field__label">Use Zone (m)</strong>
            <div className="field__item">{ node.field_use_zone }</div>
          </div>
          }
          { node.field_fall_height.length > 0 &&
          <div className="product__field-fall-height">
            <strong className="field__label">Fall Height (m)</strong>
            <div className="field__item">{ node.field_fall_height }</div>
          </div>
          }
          { cert }
        </div>
      </Col>
    </Row>
  )
}

const BottomFixedNav = styled('div')`
  position: absolute;
  bottom: 10px;
  display: flex;
  flex: 1;
  height: 150px;
  margin-left: 5px;
  overflow-x: hidden;
  max-width: 1000px;
  .arrow {
    width: 40px;
    height: 120px;
    color: #eee;
    font-size: 30px;
  }
  #arrowLeft {
    background: url(/finder/assets/arrow_left_inactive.png) no-repeat 0;
    background-size: 21.5px 40px;
    top: 0; right: 0;
    margin-left: 10px; margin-right: -15px;
    &:hover {
      background: url(/finder/assets/arrow_left_active.png) no-repeat 0;
      background-size: 21.5px 40px;
      top: 0; right: 0;
    }
  }
  #arrowRight {
    background: url(/finder/assets/arrow_right_inactive.png) no-repeat 0;
    background-size: 21.5px 40px;
    top: 0; right: 0;
    margin-left: -10px;
    &:hover {
      background: url(/finder/assets/arrow_right_active.png) no-repeat 0;
      background-size: 21.5px 40px;
      top: 0;
      right: 0;
    }
  }
  .productNavBarContainer {
    max-width: 900px;
    overflow-x: hidden;
  }
  ul {
    position: relative;
    width: 100%;
    left: 0;
    flex-wrap: nowrap;
    li {
      a {
        font-size: 14px;
        font-style: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: normal;
        text-align: center;
        color: #cfcfcf;
        margin: 0;
        padding: 0;
        font-weight: 700;
        text-decoration: none;
        &.active, &:hover {
          text-decoration: none;
          font-weight: 700;
          color: #c5241f;
        }
        img {
          margin-bottom: 13px;
        }
    }
  }
`

function ProductNavBar(props) {
  var { nodes, routePath } = props

  useEffect(() => {
    $('#arrowLeft').style.display = 'none';
    $('#arrowRight').style.display = 'block';
  })

  function prev() {
    var position = $('#productNavBar').getBoundingClientRect()
    var left = Number($('#productNavBar').style.left.replace('px', ''));
    left += 900;
    $('#productNavBar').style.left = left + 'px';
    if(position.right > 0) {
      $('#arrowLeft').style.display = 'none';
    } else {
      $('#arrowLeft').style.display = 'block';
    }
    $('#arrowRight').style.display = 'block';
  }

  function next() {
    var left = Number($('#productNavBar').style.left.replace('px', ''));
    left -= 900;
    $('#productNavBar').style.left = left + 'px';
    $('#arrowLeft').style.display = 'block';
    var last = $('#productNavBar .nav-item:last-child').getBoundingClientRect()
    console.log(last.right, window.screen.availWidth)
    if(last.right < window.screen.availWidth - 40) {
      $('#arrowRight').style.display = 'none';
    } else {
      $('#arrowRight').style.display = 'block';
    }
  }

  return (
    <BottomFixedNav>
      <span id="arrowLeft" className="arrow" onClick={prev}>&nbsp;</span>
      <div className="productNavBarContainer">
        <Nav id="productNavBar">
        {nodes.map((node, index) => {
          let title = node.title
          let slug = slugify(title, {remove: /[*+~.()'"!:@]/g}).toLowerCase()
          let images = node.field_image.split('||')
          let cover = images[0]
          let productId = node.nid
          return (
            <NavItem key={index}>
              <NavLink to={`${routePath}${productId}`} activeClassName="active" className={ `nav-link product-item product-${slug}` }>
                <Covering />
                <img src={cover} alt={title} width="100px" height="73px" /><br />
                { title }
              </NavLink>
            </NavItem>
          )
        })}
        </Nav>
      </div>
      <span id="arrowRight" className="arrow" onClick={next}>&nbsp;</span>
    </BottomFixedNav>
  )
}

const Covering = styled('div')`
  width: 100px;
  height: 73px;
  z-index: 10;
  overflow: hidden;
  position: absolute;
  display: table;
  text-align: center;
  background-color: rgba(0,0,0,.03);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
  transition: box-shadow .3s ease-in-out;
  &:hover {
    box-shadow: 0 5px 15px 0 rgba(0,0,0,.4);
  }
`
