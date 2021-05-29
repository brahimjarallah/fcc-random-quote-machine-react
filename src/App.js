// import { library, dom } from "@fortawesome/fontawesome-svg-core"
// import { faUserAstronaut } from "@fortawesome/free-solid-svg-icons"
// library.add(faUserAstronaut)
// dom.watch()


import "./index.css"
import React, { Component } from "react"
// import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.min.css"

const API =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

const colors = [
  "#16a085",
  "#27ae60",
  "#2c3e50",
  "#f39c12",
  "#e74c3c",
  "#9b59b6",
  "#FB6964",
  "#342224",
  "#472E32",
  "#BDBB99",
  "#77B1A9",
  "#73A857",
]

export default class App extends Component {
  state = {
    quotes: [
      {
        quote: "Quotes loading...",
        author: "author",
      },
    ],
    index: 0,
    indexColor: 0,
  }

  componentDidMount() {
    //call the api and update state
    fetch(API)
      .then((res) => res.json())
      .then((res) =>
        this.setState({ quotes: res.quotes }, this.getRandomQuoteIndex)
      )
  }

  getRandomQuoteIndex = () => {
    const { quotes } = this.state
    const randomIndex = Math.floor(Math.random() * quotes.length)
    const randomIndexColor = Math.floor(Math.random() * colors.length)

    if (quotes.length > 0) {
      this.setState({
        index: randomIndex,
        indexColor: randomIndexColor,
      })
    }
  }

  render() {
    const { quotes, index, indexColor } = this.state
    const quote = quotes[index]
    const color = colors[indexColor]
    const tweetURL = `https://twitter.com/intent/tweet?text=${quote.quote} - ${quote.author}`
    return (
      <div id="app" className="app-class" style={{ backgroundColor: color }}>
        <div id="quote-box" className="box">
          {console.log("state -> ", color)}
          <i className="fas fa-quote-left"></i>
          <p id="text" className="quote-text" style={{ color: color }}>
            {quote.quote}
          </p>
          <cite
            id="author"
            className="quote-author"
            style={{ color: color }}
          >
            - {quote.author}
          </cite>
          <button
            onClick={this.getRandomQuoteIndex}
            id="new-quote"
            className="btn btn-light"
            style={{ backgroundColor: color }}
          >
            New Quote
          </button>
          <ul>
            <li className="share-twitter">
              <a
                href={tweetURL}
                className="btn btn-primary"
                id="tweet-quote"
                target="_blank"
                style={{ backgroundColor: color }}
                rel="noreferrer"
              >
                <i className="fab fa-twitter"></i>
                Twitter
              </a>
            </li>

            <li className="share-facebook">
              <a
                className="btn btn-primary"
                id="facebook-quote"
                href="https://www.facebook.com/sharer/sharer.php?kid_directed_site=0&sdk=joey&u=http%3A%2F%2F127.0.0.1%3A5500%2FFccRandomQuoteMachine%2Findex.html&display=popup&ref=plugin&src=share_button"
                target="_blank"
                style={{ backgroundColor: color }}
                rel="noreferrer"
              >
                <i className="fab fa-facebook"></i>
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
