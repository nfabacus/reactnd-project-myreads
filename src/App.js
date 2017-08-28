import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Main from './Main'
import BookShelf from './BookShelf'
import _ from 'lodash'


class BooksApp extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchTerm: "",
      searchedBooks: [],
      myBooks: []
    }
  }

  componentDidMount() {
      BooksAPI.getAll().then((results)=>{
          this.setState({
              myBooks: results
          })
      })
  }

  clearSearch=()=>{
    this.setState({
      searchTerm:"",
      searchedBooks:[]
    })
  }

  updateMyBooks=()=>{
      BooksAPI.getAll().then((results)=>{
          this.setState({
              myBooks: results
          },()=>{
            const searchedBooksWithoutDuplicate = this.state.searchedBooks.filter(searchedBook=>{
              const matchedBooks = this.state.myBooks.filter(myBook=>myBook.id === searchedBook.id)
              return matchedBooks.length === 0
            })
            const allSearchedBooks = [...searchedBooksWithoutDuplicate, ...this.state.myBooks]
            this.setState({searchedBooks: allSearchedBooks})
          })
      })
  }

  onSearchChange=(e)=>{
    this.setState({
      searchTerm: e.target.value
    },()=>{
      if(this.state.searchTerm.trim() !== "") {
        BooksAPI.search(this.state.searchTerm, 100).then(searchedBooks=>{
          const searchedBooksWithoutDuplicate = searchedBooks.filter(searchedBook=>{
            const matchedBooks = this.state.myBooks.filter(myBook=>myBook.id === searchedBook.id)
            return matchedBooks.length === 0
          })

          const allSearchedBooks = [...searchedBooksWithoutDuplicate, ...this.state.myBooks]
          this.setState({searchedBooks: allSearchedBooks})
        })
      } else {
        this.setState({
          searchedBooks:[]
        })
      }
    })
  }

  render() {
    
    return (
      <div className="app">
        <Switch>
          <Route path="/search" render={(props)=>(
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
                    myBooks={this.state.searchedBooks}
                    clearSearch={()=>this.clearSearch()}
                    updateMyBooks={()=>this.updateMyBooks()}
                  />
                </ol>
              </div>
            </div>
          )}/>

          <Route path="/" render={()=>(
            <Main
              updateMyBooks={()=>this.updateMyBooks()}
              myBooks={this.state.myBooks}
            />
          )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
