export default function QuoteItem({ quote }) {
  return (
    <div className="quote-item">
      <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_19_18)">
          <path d="M23.2941 8.97059H29.1471V20.6765H17.4412V8.58862L21.4855 0.5H26.7204L22.8469 8.24698L22.4851 8.97059H23.2941ZM6.35294 8.97059H12.2059V20.6765H0.5V8.58862L4.54431 0.5H9.77922L5.90573 8.24698L5.54392 8.97059H6.35294Z" stroke="#727378" />
        </g>
        <defs>
          <clipPath id="clip0_19_18">
            <rect width="30" height="21.1765" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <p className="quote">{quote.quote}</p>
      <p className="author">{quote.author}</p>
    </div>
  )
}