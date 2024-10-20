import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link and useHistory for navigation

const Collection = () => {
    const [books, setBooks] = useState(null); // Initializes the 'book' state as null to store book data later
    const [error, setError] = useState(null); // State to manage error messages
    

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
            //test:
            console.log(`Book deleted: ${book.id}, Status Code: ${response.status}`); 
        } else {
            const json = await response.json(); // if there are any error: // Get error message from server
            if (response.status === 401) {
                setError(json.message || 'Invalid user.'); // Handle 401 Unauthorized
            } else if (response.status === 404) {
                setError(json.message || 'Book not found.'); // Handle 404 Not Found
            } 
        }
    }

    return ( 
        <div className="book-list">
            <div className="cover-book">
                {books && books.map((book) => (
                    <div className="align-container" key={book.id}>
                        <div className="Image-container">
                            <img src={book.coverImage} alt={book.title} />
                        </div>
                        <div className="Info-container">
                            <h4>{book.title}</h4>
                            <p><strong>Author:</strong> {book.author}</p>
                            {/* Button to view book details: */}
                            <Link to={`/Details/${book.id}`}>
                            <button>Details</button>
                            </Link>
                            {/* Button to edit book: */}
                            <Link to={`/Edit/${book.id}`}> 
                            <button>Edit</button>
                            </Link>
                            {/* Button to delete book: */}
                            <button onClick={() => handleDelete(book)}>Delete</button> 
                        </div>
                    </div>
                ))}
            </div>
            {/*we need to show those errors in the error page:*/}
            {error && <div className="error">{error}</div>}
        </div>
    );
};

export default Collection;
