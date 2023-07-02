import {LiaQuoteLeftSolid} from 'react-icons/lia'

export default function QuoteItem({ quote }) {
  return (
    <div className="quote-item">
      <LiaQuoteLeftSolid className='icon'/>

      <p className="quote">{quote.quote}</p>
      <p className="author">{quote.author}</p>
    </div>
  )
}