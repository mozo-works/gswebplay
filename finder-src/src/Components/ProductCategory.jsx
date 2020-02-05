import React from 'react'
import SidebarSecond from './SidebarSecond.jsx'
import styled from 'styled-components'
import { NavItem } from '@bootstrap-styled/v4'
import appConfig from '../config'
import { Switch, Route, NavLink } from "react-router-dom"
import slugify from 'slugify'
import ProductDetail from './ProductDetail.jsx'

const SubLayout = styled('div')`
  display: flex
`
const Content = styled('main')`
  flex: 1;
`

const ProductCategoryItem = styled(NavItem)`
  display: inline-block;
  vertical-align: middle;
  border-bottom: 2px solid #fff;
`

const ProductCategoryItemLink = styled(NavLink)`
  display: flex !important;
  align-items: center;
  padding: 0 !important;
  background-color: #f5f5f5;
  color: #c5241f;
  height: 100px;
  transition: background .5s ease-in-out;
  i.cat-icon {
    display: inline-block;
    width: 100px;
    height: 100px;
    float: left;
    margin-right: 15px;
    transition: background .5s ease-in-out;
    background: url(/finder/assets/menu/${props => props.tid}-p.png) no-repeat;
    background-size: cover;
  }
  span.cat-title {
    display: inline-block;
    font-size: 1.1rem
    line-height: 1.5;
    letter-spacing: normal;
    width: 190px;
  }

  &.active, &:hover {
    background-color: #c5241f;
    color: #fff;
    .cat-icon {
      background: url(/finder/assets/menu/${props => props.tid}-n.png) no-repeat;
      background-size: cover;
    }
  }
`

export default class ProductCategory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      terms: [],
      data: [],
      match: props.match
    }
  }

  componentDidMount() {
    let product_sub_terms_url = `${appConfig.data_sources.products_sub_terms.url}/${this.props.id}`
    let match = this.props.match
    fetch(product_sub_terms_url)
      .then(results => { return results.json() })
      .then(data => {
        let terms = data.map((term, index) => {
          let slug = slugify(term.name[0].value, {remove: /[*+~.()'"!:@]/g}).toLowerCase()
          let link = `${match.path}/${slug}`
          let name = term.name[0].value
          let tid = term.tid[0].value
          return (
            <ProductCategoryItem key={index}>
              <ProductCategoryItemLink tid={tid} to={link} activeClassName="active" className={ `nav-link menu-item-${slug}` }>
                <i className="cat-icon"></i>
                <span className="cat-title">{name}</span>
              </ProductCategoryItemLink>
            </ProductCategoryItem>
          )
        })
        this.setState({terms: terms, data: data})
      })
  }

  render() {
    let { data, match } = this.state
    return (
      <SubLayout>
        <SidebarSecond id={this.props.id} match={this.props.match} terms={this.state.terms} />
        <Content>
          <Switch>
            {data.map((term, index) => {
              let tid = term.tid[0].value
              let slug = slugify(term.name[0].value, {remove: /[*+~.()'"!:@]/g}).toLowerCase()
              return (
                <Route key={index} path={`${this.props.match.path}/${slug}`} children={ <ProductDetail match={match} data={data[index]} tid={tid} slug={slug} /> }  />
              )
            })}
          </Switch>
        </Content>
      </SubLayout>
    )
  }
}
