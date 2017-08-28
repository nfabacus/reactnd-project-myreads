import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

export default class Main extends Component {

    render() {
        return (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf 
                    title="Currently Reading"
                    shelf="currentlyReading"
                    myBooks={this.props.myBooks}
                    updateMyBooks={()=>this.props.updateMyBooks()}
                  />
                  <BookShelf 
                    title="Want to Read"
                    shelf="wantToRead"
                    myBooks={this.props.myBooks}
                    updateMyBooks={()=>this.props.updateMyBooks()}
                   />
                  <BookShelf 
                    title="Read"
                    shelf="read"
                    myBooks={this.props.myBooks}
                    updateMyBooks={()=>this.props.updateMyBooks()}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </div>
        )
    }

}

