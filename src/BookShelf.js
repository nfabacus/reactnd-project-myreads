import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class BookShelf extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        if(this.props.clearSearch) {
            this.props.clearSearch()
        }
    }

    handleSelect=(e, book)=>{
        BooksAPI.update(book, e.target.value).then((result)=>{
            console.log("result: ", result)
            if(this.props.updateMyBooks) {
                this.props.updateMyBooks()
            }
        })
    }

    filterBooksByShelf =book=>{
        console.log("book.shelf:: ", book.shelf)
        if(this.props.shelf !=="" && book.shelf) {
            return book.shelf===this.props.shelf
        } else {
            return book
        }
    }

    renderBookList = ()=>{
        return this.props.myBooks.filter(this.filterBooksByShelf).map((book, index)=>{
            return <li key={index}>
              <div className="book">
              <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks&&book.imageLinks.smallThumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select
                            onChange={(e)=>this.handleSelect(e, book)}
                          >
                            <option value="">Move to...</option>
                            <option value="currentlyReading">Currently Reading {book.shelf==="currentlyReading"&&"\u2713"}</option>
                            <option value="wantToRead">Want to Read {book.shelf==="wantToRead"&&"\u2713"}</option>
                            <option value="read">Read {book.shelf==="read"&&"\u2713"}</option>
                            <option value="none">None {book.shelf==="none"&&"\u2713"}</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">
                        {book.authors&&book.authors.length>0&&book.authors.map((author, index)=><span key={index}>{author}</span>)}
                      </div>
              </div>
            </li>
        })
    }
    render() {
        if(this.props.myBooks && this.props.myBooks.length >0){
            return (
                <div className="bookshelf">
                <h2>
                    {this.props.title}
                </h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.renderBookList()}
                    </ol>
                </div>
            </div>
            )
        } else {
        return <span></span>
        }
    }
}

export default BookShelf