import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Collectionuser = () => {
    const [books, setBooks] = useState(null); // Initializes the 'book' state as null to store book data later

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('/books'); // Fetch all books from the server API
            const json = await response.json(); // Convert the response data to JSON

            if (response.ok) { // If the response status is 200 (success)
                setBooks(json); // Update the state with fetched book data
            }
        };
        fetchBooks(); // Call the function to load books when component loads
    }, []);  // Only runs when the component is first displayed

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
                            
                            {/* Use Link to go to Bookcreation: */}
                            <Link to={`/Details/${book.id}`}> 
                                <button>Details</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Collectionuser;