import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
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

    updateMyBooks=()=>{
        BooksAPI.getAll().then((results)=>{
            this.setState({
                myBooks: results
            })
        })
    }

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
                    myBooks={this.state.myBooks}
                    updateMyBooks={()=>this.updateMyBooks()}
                  />
                  <BookShelf 
                    title="Want to Read"
                    shelf="wantToRead"
                    myBooks={this.state.myBooks}
                    updateMyBooks={()=>this.updateMyBooks()}
                   />
                  <BookShelf 
                    title="Read"
                    shelf="read"
                    myBooks={this.state.myBooks}
                    updateMyBooks={()=>this.updateMyBooks()}
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

