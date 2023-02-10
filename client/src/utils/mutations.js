//This file exports all the mutations on the front end
//Login user mutation add user mutation, save book and remove mutations and export the 4 so we can access  different part of the code.
import gql from "graphql-tag";

//LOGIN_USER
export const LOGIN_USER = gql `
mutation login($email: String!,$password: String!) {
    login(email: $email, password: $password){
        token
        user {
            _id
            username
        }
    }
}`;

//ADD_USER
export const ADD_USER = gql `
mutation addUser($username: String!, $email: String!,$password: String!) {
    addUser(username: $username, email: $email, password: $password){
        token
        user {
            _id
            username
        }
    }
}`;

//SAVE_BOOK
export const SAVE_BOOK = gql `
mutation saveBook($book: SavedBookInput!) {
    saveBook(book: $book){
        username
        email
        bookCount
        savedBooks{
            authors
            description
            bookId
            image
            link
            title
        }
    }
}`;

//REMOVE_BOOK

export const REMOVE_BOOK = gql `
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId){
        username
        email
        bookCount
        savedBooks{
            authors
            description
            bookId
            image
            link
            title
        }
    }
}`;