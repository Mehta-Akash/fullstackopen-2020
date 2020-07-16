import React from 'react'

const SearchForm = ({value, onChange}) => {

    return (
      <div>
        <form>
          find countries <input value ={value} onChange={onChange}/>
        </form>
      </div>
    )
  }

  export default SearchForm