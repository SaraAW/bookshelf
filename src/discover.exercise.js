/** @jsx jsx */
import {jsx} from '@emotion/core'
import React from 'react'

import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import { useState } from 'react'
import { client } from 'utils/api-client.exercise'
// 🐨 import the client from './utils/api-client'

function DiscoverBooksScreen() {
  // 🐨 add state for status ('idle', 'loading', or 'success'), data, and query
  const [status, setStatus] = React.useState('idle')
  const [data, setData] = React.useState(null) //const data = null // 💣 remove this, it's just here so the example doesn't explode
  const [query, setQuery] = React.useState('')

  // 🐨 you'll also notice that we don't want to run the search until the
  // user has submitted the form, so you'll need a boolean for that as well
  // 💰 I called it "queried"
  const [queried, setQueried] = React.useState(false)


  // 🐨 Add a useEffect callback here for making the request with the
  // client and updating the status and data.
  // 💰 Here's the endpoint you'll call: `books?query=${encodeURIComponent(query)}`
  // 🐨 remember, effect callbacks are called on the initial render too
  // so you'll want to check if the user has submitted the form yet and if
  // they haven't then return early (💰 this is what the queried state is for).

  // 🐨 replace these with derived state values based on the status.
  const isLoading = status === 'loading'
  const isSuccess = status === 'success'

  React.useEffect(() => {
    if(!queried) {
      return
    } 
    setStatus('loading')
    client(`books?query=${encodeURIComponent(query)}`).then(responseData => {
      setData(responseData)
      setStatus('success')
    })
  }, [query, queried])

  function handleSearchSubmit(event) {
    event.preventDefault() // 🐨 call preventDefault on the event so you don't get a full page reload
    setQueried(true) // 🐨 set the queried state to true
    setQuery(event.target.elements.search.value) // 🐨 set the query value which you can get from event.target.elements
    console.log(event.target.elements.search.value) // 💰 console.log(event.target.elements) if you're not sure.
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? <Spinner /> : <FaSearch aria-label="search" />}
            </button>
          </label>
        </Tooltip>
      </form>

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
