import styles from "./search.module.css"

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
        <div className={styles["search"]}>
            <input onKeyPress={keyPressHandler} onChange={handleInput} type="search" name="searchs" placeholder="Search" className={styles["search_bar"]}></input>
            <button onClick={onSearch} type="button" className={styles["search_button"]}>Search</button>
        </div>
     );
}
 
export default SearchA;