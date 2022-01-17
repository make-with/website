import React, { useState } from 'react';

function Search(props) {
  const [SearchTerm, setSerchTerm] = useState('');
  const onSerchHandler = (event) => {
    setSerchTerm(event.currentTarget.value);
    props.update(event.currentTarget.value);
  };
  return (
    <div className="search">
      <input
        type="text"
        placeholder="검색어를 입력해주세요."
        onChange={onSerchHandler}
        value={SearchTerm}
      />
      <img src="/images/search_icon.png" alt="search_icon" />
    </div>
  );
}

export default Search;
