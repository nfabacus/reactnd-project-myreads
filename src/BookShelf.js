import React from 'react'
import * as BooksAPI from './BooksAPI'

const BookShelf=(props)=>{
    const { title, shelf, myBooks } = props

    const handleSelect=(e, book)=>{
        BooksAPI.update(book, e.target.value).then((result)=>{
            console.log("result: ", result)
            if(props.updateMyBooks) {
                props.updateMyBooks()
            }
        })
    }

    const filterBooksByShelf =book=>{
        if(book.shelf) {
            return book.shelf===shelf
        } else {
            return book
        }
    }

    const renderBookList = ()=>(
        
        myBooks.filter(filterBooksByShelf).map((book, index)=>(
            <li key={index}>
              <div className="book">
              <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks&&book.imageLinks.smallThumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select
                            onChange={(e)=>handleSelect(e, book)}
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
        ))
    )
    
    if(myBooks && myBooks.length >0){
        return (
            <div className="bookshelf">
            <h2>
                {title}
            </h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {renderBookList()}
                </ol>
            </div>
        </div>
        )
      } else {
        return <span></span>
      }
}

export default BookShelf