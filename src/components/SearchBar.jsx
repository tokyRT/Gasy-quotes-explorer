import { useEffect, useRef, useState } from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { MdRestore } from "react-icons/md"
import useStore from "../store";
import levenshteinDistance from "../utils/levenshtein";

const selector = (state) => ({
  history: state.history,
  addToHistory: state.addToHistory,
  matchedHistory: state.matchedHistory,
  setGlobalQuery: state.setQuery
})
export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [focused, setFocused] = useState(false)
  const { addToHistory, matchedHistory, setGlobalQuery } = useStore(selector)
  const [matched, setMatched] = useState(null)
  const [suggestionPlaceholder, setSuggestionPlaceholder] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault()
    if (suggestionPlaceholder != "") {
      setSearchQuery(suggestionPlaceholder)
      addToHistory(suggestionPlaceholder)
      setGlobalQuery(suggestionPlaceholder)
    } else {
      addToHistory(searchQuery)
      setGlobalQuery(searchQuery)
    }
    setFocused(false)
  }
  useEffect(() => {
    if (matched && matched.authorsStartWith.length > 0 && searchQuery.length > 0) setSuggestionPlaceholder(matched.authorsStartWith[0])
    else setSuggestionPlaceholder("")
  }, [matched])
  const handleOnKeyUp = (e) => {
    setMatched(matchedHistory(searchQuery))
    if (e.keyCode == 13) {
      setFocused(false)
    } else {
      setFocused(true)
    }
  }
  const handleItemClick = (author) => {
    console.log(author);
    setSearchQuery(author)
    setGlobalQuery(author)
    addToHistory(author)
    setFocused(false)
  }
  const handleOnblur = () => {
    setTimeout(() => {
      setFocused(false)
    }, 200)
  }
  const renderHistory = () => {
    if (searchQuery == "" || !matched || matched.authorsStartWith?.length + matched.similars?.length == 0 || !focused) return
    return (
      <div className="history">
        <span> <MdRestore className="icon" /> From your recent research</span>
        <ul>
          {
            matched.authorsStartWith.map((item, i) => (
              <li key={i} onClick={() => handleItemClick(item)}>{item}</li>
            ))
          }
          {
            matched.similars.map((item, i) => (
              <li key={i} onClick={() => handleItemClick(item)}>{item}</li>
            ))
          }
        </ul>
      </div>
    )
  }
  const renderPlaceholder = () => {
    if (!matched || matched.authorsStartWith.length == 0 || !focused) return
    return (
      <span className="suggestion">{suggestionPlaceholder}</span>
    )
  }
  return (
    <div className={`search-bar ${focused ? "focused" : ""}`}>
      <form onSubmit={handleSubmit} onReset={() => { setSearchQuery(""); setSuggestionPlaceholder(""); setGlobalQuery("") }}>
        <label className="icon" htmlFor="searchField">
          <BsSearch />
        </label>
        {renderPlaceholder()}
        <input
          type="text"
          name="searchQuery"
          id="searchField"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyUp={handleOnKeyUp}
          onFocus={() => setFocused(true)}
          onBlur={handleOnblur}
          placeholder="Agrad / Andry Nirina Rajoelina ..."
          autoComplete="off"
        />
        {
          searchQuery != "" ? (<button className="clear" title="clear field" type="reset">
            <BsX />
          </button>) : ""
        }
        <button type="submit" className="search">
          <BsSearch className="icon" />
          <span className="text">search</span>
        </button>
        {
          renderHistory()
        }
      </form>
    </div>
  )

}