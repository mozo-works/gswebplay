import React, {Component} from 'react'
import { Nav, NavItem } from '@bootstrap-styled/v4'
import styled from 'styled-components'
import slugify from 'slugify'
import { HashRouter as Router, Switch, Route, NavLink, Redirect} from "react-router-dom"
import StaticPage from './StaticPage.jsx'
import ProductCategory from './ProductCategory.jsx'

const $ = document.querySelector.bind(document)

const Sidebar1 = styled('aside')`
  flex: 0 0 160px; overflow-x: hidden;
`

const FixedCol = styled(Nav)`
  position: sticky;
  top: 0;
  height: calc(100vh);
  overflow-x: hidden;
  overflow-y: auto;
`

const Main = styled('main')`
  flex: 1;
`

const PrimaryMenuItem = styled(NavItem)`
  display: inline-block;
  vertical-align: middle;
`

const PrimaryMenuItemLink = styled(NavLink)`
  display: inline-block;
  width: 160px;
  height: 160px;
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
  background-color: rgba(0,0,0,.3);
  transition: background .5s ease-in-out;
  &.menu-item-${props => props.slug} {
    background: url(/finder/assets/menu/${props => props.slug}_inactive.png) no-repeat;
    background-size: cover;
    &.active, &:hover {
     background: url(/finder/assets/menu/${props => props.slug}_active.png) no-repeat;
     background-size: cover;
    }
  }
`

export default class SidebarFirst extends Component {
  constructor(props) {
    super(props)
    this.state = {
      terms: []
    }
  }

  componentDidMount() {
    $('.menu-item-home').setAttribute('href', '/')
    $('.menu-item-home').onclick = function(e) {
      e.preventDefault()
      window.location.href= "/"
    }
  }

  render() {
    const { menu, routes } = this.props
    return (
      <Router>
        <Route exact path="/"><Redirect to={menu[1].link} /></Route>
        <Sidebar1 id="SidebarFirst" className="sidebar">
          <FixedCol vertical tag="nav">
            {menu.map((item, index) => (
              <MenuItem key={index} link={item.link} title={item.title} />
            ))}
          </FixedCol>
        </Sidebar1>
        <Main>
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route key={index} path={route.path} exact={route.exact} children={({ match }) => ( ComponentByType(route, match) )} />
              )
            })}
          </Switch>
        </Main>
      </Router>
    )
  }
}

const MenuItem = (data) => {
  let slug = slugify(data.title).toLowerCase()
  return (
    <PrimaryMenuItem>
      <PrimaryMenuItemLink slug={slug} to={data.link} activeClassName="active" className={ `nav-link menu-item-${slug}` }>{data.title}</PrimaryMenuItemLink>
    </PrimaryMenuItem>
  )
}

const ComponentByType = (route, match) => {
  if (route.type === 'page') return <StaticPage id={route.id} match={match} />
  if (route.type === 'term') return <ProductCategory id={route.id} match={match} />
  return <></>
}
