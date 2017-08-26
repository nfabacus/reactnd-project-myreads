import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Main from './Main'
import BookShelf from './BookShelf'


class BooksApp extends Component {
  state = {
    searchTerm: "",
    books: []
  }

  onSearchChange=(e)=>{
    this.setState({
      searchTerm: e.target.value
    },()=>{
      if(this.state.searchTerm.trim() !== "") {
        BooksAPI.search(this.state.searchTerm, 100).then(books=>{
          this.setState({books})
        })
      } else {
        this.setState({
          books:[]
        })
      }
    })
  }

  render() {
    
    return (
      <div className="app">
        <Switch>
          <Route path="/search" render={()=>(
            <div className="search-books">
              <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  <input 
                    type="text" 
                    placeholder="Search by title or author"
                    value={this.state.searchTerm}
                    onChange={this.onSearchChange}
                  />
                  
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  <BookShelf
                    title=""
                    shelf=""
                    myBooks={this.state.books}
                  />
                </ol>
              </div>
            </div>
          )}/>

          <Route path="/" render={()=>(
            <Main />
          )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
