import SearchBar from '../searchBar/SearchBar'
// import "./Nav.css"

export default function NavS({onSearch, showSearchBar, showNav}){
    return( 
    <div> 
      { showNav && <div>
        <div className="nav-right">
            <div className="search-container">
              {showSearchBar && <SearchBar onSearch={onSearch} />} 
              </div>
          </div>
      </div>}
    </div> 
    );
}