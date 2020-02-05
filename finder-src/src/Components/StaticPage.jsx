import React from 'react';
import appConfig from '../config'
import './contact-us.css'

export default class StaticPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: [],
      content: []
    }
  }

  componentDidMount() {
    fetch(`${appConfig.data_sources.page.url}/${this.props.id}`)
      .then(results => { return results.text() })
      .then(html => {
        let parser = new DOMParser()
        let doc = parser.parseFromString(html, "text/html")
        let title =doc.querySelector('.block-content .container .box').innerHTML
        let content = doc.querySelector('article.node.page--full').outerHTML
        this.setState({title: title, content: content})
      })
  }

  render() {
    return (
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: this.state.title }} />
        <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
      </div>
    )
  }
}
