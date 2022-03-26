const SearchA = () => {
    const keyPressHandler = (e) => { 
        console.log("clicked search bar");
    }
    const handleInput = (e) => { 
        console.log("handle input");
    }
    const onSearch = (e) => { 
        console.log("search");
    }
    return ( 
        <div className="search">
            <input onKeyPress={keyPressHandler} onChange={handleInput} type="search" name="searchs" placeholder="Search Collabs" className="search_bar"></input>
            <button onClick={onSearch} type="button" className="search_button">Search</button>
        </div>
     );
}
 
export default SearchA;