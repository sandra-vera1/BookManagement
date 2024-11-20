import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom"; // Import Link and useHistory for navigation
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import ErrorMessage from './ErrorMessage'; // Import the ErrorMessage component

const Collection = () => {
    const [books, setBooks] = useState([]); // Initializes the 'book' state as null to store book data later
    const [error, setError] = useState(null); // State to manage error messages
    const [search, setSearch] = useState(''); // State for the search input
    const [filterOptions, setFilterOptions] = useState({ // State to manage filter options
        titleFilter: false,
        authorFilter: false,
        descriptionFilter: false,
        dateFilter: false
    });
    const [filteredBooks, setFilteredBooks] = useState([]); // State for storing filtered books
    const [searchTriggered, setSearchTriggered] = useState(false); // State to track if search has been clicked
    const [statusSession, setStatusSession] = useState(null); // To track user's login status
    const history = useHistory(); // For redirection if user is not logged in
    const [errorMessage, setErrorMessage] = useState(null); // To store error messages
    try {
    useEffect(() => {
        // Check the session status from localStorage
        const savedSession = localStorage.getItem('statusSession');
        if (savedSession === 'True') {
            setStatusSession(true);
        } else {
            setStatusSession(false);
        }

   
        // Fetch books after checking session status
        const fetchBooks = async () => {
            const response = await fetch('/books'); // Fetch all books from the server API
            const json = await response.json(); // Convert the response data to JSON

            if (response.ok) { // If the response status is 200 (success)
                const sortedBooks = json.sort((a, b) => b.id - a.id); // Sort books in descending order.
                setBooks(sortedBooks); // Update the state with sorted book data
                console.log('Book details fetched:', json, 'Status Code: 200 OK');
            }
        };

        fetchBooks(); // Call the function to load books when component loads
    }, []); // The empty dependency array ensures it only runs once when the component mounts

    } catch (error) {
        // Catch any errors during the fetch or unexpected errors
        setErrorMessage(`Error: ${error.message}`);
    }


    // Function to delete a book
    const handleDelete = async (book) => {
        const response = await fetch('/books/' + book.id, {
            method: 'DELETE', // Send delete request for the selected book
        });

        if (response.ok) { // If deletion is successful (status code "204 No Content")
            setBooks(books.filter(b => b.id !== book.id)); // Remove the deleted book from the state
        } else {
            const json = await response.json();
            if (response.status === 401) {
                setError(json.message || 'Invalid user.'); // Handle 401 Unauthorized
            } else if (response.status === 404) {
                setError(json.message || 'Book not found.'); // Handle 404 Not Found
            }
        }
    };

    const FilterChange = (e) => {
        const selectedFilter = e.target.name; // Get the name of the selected filter
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
        setSearchTriggered(true); // Mark that search has been clicked
    };

    if (statusSession === null) {
        return <div>Loading...</div>; // Show loading message until session is checked
    }

    return (
        <>
            <Navbar />
            <Logo />
            <div className="book-list">
                <div className="filters">
                    <input
                        type="text"
                        placeholder="           Search books"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="filter-options">
                        <label>
                            <input
                                type="checkbox"
                                name="titleFilter"
                                checked={filterOptions.titleFilter}
                                onChange={FilterChange}
                            />&nbsp;Title
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="authorFilter"
                                checked={filterOptions.authorFilter}
                                onChange={FilterChange}
                            />
                            &nbsp;Author
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="descriptionFilter"
                                checked={filterOptions.descriptionFilter}
                                onChange={FilterChange}
                            />
                            &nbsp;Keyword
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="dateFilter"
                                checked={filterOptions.dateFilter}
                                onChange={FilterChange}
                            />
                            &nbsp;Publication Date
                        </label>
                    </div>
                    <button className="btn btn-primary d-inline-flex align-items-center btnsearch" onClick={handleSearch}>Search</button>
                </div>
                <div className="cover-book">
                    {searchTriggered && filteredBooks.length === 0 ? (
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

                                    {/* Only show "Edit" and "Delete" if user is logged in */}
                                    {statusSession && (
                                        <>
                                            <Link to={`/Edit/${book.id}`}>
                                                <button className="btn btn-primary d-inline-flex align-items-center">Edit</button>
                                            </Link>
                                            <button className="btn btn-primary d-inline-flex align-items-center" onClick={() => handleDelete(book)}>Delete</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
                {/* Display error message if an error exists */}
                {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)} />}
                {error && <ErrorMessage message={error} onClose={() => setErrorMessage(null)} />}
            </div>
        </>
    );
};

export default Collection;
