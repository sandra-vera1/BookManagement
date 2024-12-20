import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import ErrorMessage from './ErrorMessage'; // Import the ErrorMessage component

const Details = () => {
    const { id } = useParams(); //get the 'id' parameter from the API
    const [book, setBook] = useState(null); // Initializes the 'book' state as null to store book data later
    const [errorMessage, setErrorMessage] = useState(null); // To store error messages
    try {
    useEffect(() => {
        // Fetch the book data from the API when the component is rendered or when 'id' changes:
        const fetchBooks = async () => {
            const response = await fetch('/books'); // Send a GET request to fetch all books
            const json = await response.json(); // Convert the response to JSON format

            if (response.ok) { // If the response is successful (status code 200 OK)
                const foundBook = json.find((b) => b.id === parseInt(id));  // Find the book with the matching 'id'
                if (foundBook) {
                    setBook(foundBook);  // Set the found book in the 'book' state
                    console.log('Book details fetched:', foundBook, 'Status Code: 200 OK'); // Log book details
                }
            }
        };
        fetchBooks(); // Call the function to fetch books
    }, [id]); // The effect runs when 'id' changes
    } catch (error) {
        // Catch any errors during the fetch or unexpected errors
        setErrorMessage(`Error: ${error.message}`);
    }
    return ( 
        <>
        <Navbar /> {/*show Navbar*/}
        <Logo />
        <div className="details-container"> {/* Reuse the class for styling */}
            {book && ( // If 'book' exists, display the details:
                <div className="details-content"> {/* New container for layout */}
                    <div className="image-container"> {/* Image container */}
                        <div className="image-wrapper">
                            <img src={book.coverImage} alt={book.title} />
                        </div>
                    </div>
                    <div className="info-container"> {/* Info container */}
                        <p><strong>Title:</strong> {book.title}</p>
                        <p><strong>Id:</strong> {book.id}</p>
                        <p><strong>Publication Date:</strong> {book.publicationDate}</p>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Description:</strong> {book.description}</p> 
                        <Link to="/">
                            <button className="btn btn-primary">Back Collection</button>
                        </Link> {/* Go back to collection page */}
                    </div>
                </div>
                )}
                {/* Display error message if an error exists */}
                {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)} />}
        </div>
        </>
    );
};

export default Details; 
