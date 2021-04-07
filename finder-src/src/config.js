const appConfig = {
  "menu": [
    {
      "title": "Home",
      "link": "/"
    },
    {
      "title": "Standard",
      "link": "/standard/antz-hill/115"
    },
    {
      "title": "New Products",
      "link": "/new-products/top-of-the-placetop/285"
    },
    {
      "title": "Customized",
      "link": "/customized/modified/122"
    },
    {
      "title": "Contact us",
      "link": "/contact-us"
    }
  ],
  "theme": {
    "$btn-primary-bg": "blue",
    "$btn-primary-color": "white"
  },
  "routes": [
    {
      path: "/",
      exact: true,
      type: "link"
    },
    {
      path: "/standard",
      type: "term",
      id: 1
    },
    {
      path: "/new-products",
      type: "term",
      id: 2
    },
    {
      path: "/customized",
      type: "term",
      id: 3
    },
    {
      path: "/contact-us",
      type: "page",
      id: 13
    }
  ],
  "data_sources": {
    "products_sub_terms": {
      "url": "/api/products/terms",
      "arg": "tid",
      "type": "term"
    },
    "products_of_sub_terms": {
      "url": "/api/products",
      "arg": "tid",
      "type": "node"
    },
    "page": {
      "url": "/node",
      "arg": "nid",
      "type": "node",
      "format": "?_format=json"
    }
  }
}

export default appConfig
