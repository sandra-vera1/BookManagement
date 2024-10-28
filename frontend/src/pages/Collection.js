import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link and useHistory for navigation
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";

const Collection = () => {
    const [books, setBooks] = useState([]); // Initializes the 'book' state as null to store book data later
    const [error, setError] = useState(null); // State to manage error messages
    const [search, setSearch] = useState(''); //State for the search input
    const [filterOptions, setFilterOptions] = useState({ // State to manage filter options
        titleFilter: false,          
        authorFilter: false,
        descriptionFilter: false,
        dateFilter: false
    });
    const [filteredBooks, setFilteredBooks] = useState([]); // State for storing filtered books
    const [searchTriggered, setSearchTriggered] = useState(false); // State to track if search has been clicked

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/books');// Fetch all books from the server API
            const json = await response.json();// Convert the response data to JSON

            if (response.ok) { // If the response status is 200 (success)
                setBooks(json); // Update the state with fetched book data
                //test:
                console.log('Book details fetched:', json, 'Status Code: 200 OK');
            }
        };
        fetchBooks(); // Call the function to load books when component loads
    }, []);  // Only runs when the component is first displayed

    // funtion to delete a book:
    const handleDelete = async (book) => {
        const response = await fetch('/books/' + book.id, {
            method: 'DELETE', // Send delete request for the selected book
        });

        if (response.ok) { // If deletion is successful. status code "204 No Content": 
            //Delete and update the local books state to delete the book
            setBooks(books.filter(b => b.id !== book.id)); // Remove the deleted book from the state
            //console.log(`Book deleted: ${book.id}, Status Code: ${response.status}`); 
        } else {
            const json = await response.json(); // if there are any error: // Get error message from server
            if (response.status === 401) {
                setError(json.message || 'Invalid user.'); // Handle 401 Unauthorized
            } else if (response.status === 404) {
                setError(json.message || 'Book not found.'); // Handle 404 Not Found
            } 
        }
    }

    const FilterChange = (e) => { // Handle filter option changes
        const selectedFilter = e.target.name;  // Get the name of the selected filter
    
        setFilterOptions(prevState => ({
            ...prevState,
            [selectedFilter]: !prevState[selectedFilter] // Toggle the selected filter option
        }));
    };

    const handleSearch = () => {  // Function to handle search functionality
        const searchText = search.toLowerCase();  // Convert search input to lowercase

        const result = books.filter((book) => { // Filter books based on selected filters
            if (!filterOptions.titleFilter && !filterOptions.authorFilter && !filterOptions.descriptionFilter && !filterOptions.dateFilter) {
                return true; // If no filters are selected, return all books
            }

            // Check each filter option against the book properties:
            if (filterOptions.titleFilter && book.title.toLowerCase().includes(searchText)) {
                return true;
            }
            if (filterOptions.authorFilter && book.author.toLowerCase().includes(searchText)) {
                return true;
            }
            if (filterOptions.descriptionFilter && book.description?.toLowerCase().includes(searchText)) {
                return true;
            }
            if (filterOptions.dateFilter && book.publicationDate.includes(searchText)) {
                return true;
            }

            return false;
        });

        setFilteredBooks(result); // Update the state with filtered books
        setSearchTriggered(true); // Mark that search has been cliked
    };

    return (
        <>
        <Navbar /> 
        <Logo />
            <div className="book-list">
                
                <div className="filters"> {/* Container for the search input and filter options */}
                    <input 
                        type="text" 
                        placeholder="Search books" 
                        value={search} 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                    <div className="filter-options"> {/* Container for filter checkboxes */}
                        <label>
                            <input 
                                type="checkbox" 
                                name="titleFilter" 
                                checked={filterOptions.titleFilter} 
                                onChange={FilterChange} 
                            />
                            Title
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                name="authorFilter" 
                                checked={filterOptions.authorFilter} 
                                onChange={FilterChange} 
                            />
                            Author
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                name="descriptionFilter" 
                                checked={filterOptions.descriptionFilter} 
                                onChange={FilterChange} 
                            />
                            Keyword
                        </label>
                        <label>
                            <input 
                                type="checkbox" 
                                name="dateFilter" 
                                checked={filterOptions.dateFilter} 
                                onChange={FilterChange} 
                            />
                            Publication Date
                        </label>
                    </div>
                    <button className="btn btn-primary d-inline-flex align-items-center btnsearch" onClick={handleSearch}>Search</button> {/* Button to do the search */}
                </div>
                <div className="cover-book">
                    {searchTriggered && filteredBooks.length === 0 ? (  // Map over filtered or original books
                        <p>No books found</p>
                    ) : (
                        (searchTriggered ? filteredBooks : books).map((book) => (
                            <div className="align-container" key={book.id}>
                                <div className="Image-container">
                                    <img src={book.coverImage} alt={book.title} />
                                </div>
                                <div className="book-details">
                                    <p><strong>Title:</strong> {book.title}</p>
                                    <p><strong>Author:</strong> {book.author}</p>
                                </div>
                                <div className="buttons">
                                    <Link to={`/Details/${book.id}`}>
                                        <button className="btn btn-primary d-inline-flex align-items-center">Details</button>
                                    </Link>
                                    <Link to={`/Edit/${book.id}`}>
                                        <button className="btn btn-primary d-inline-flex align-items-center">Edit</button>
                                    </Link>
                                    <button className="btn btn-primary d-inline-flex align-items-center" onClick={() => handleDelete(book)}>Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/*we need to show those errors in the error page:*/}
                {error && <div className="error">{error}</div>}
            </div>
        </>
    );
};

export default Collection;
