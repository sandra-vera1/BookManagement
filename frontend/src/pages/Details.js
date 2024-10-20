import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; 

const Details = () => {
    const { id } = useParams(); //get the 'id' parameter from the API
    const [book, setBook] = useState(null); // Initializes the 'book' state as null to store book data later

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

    return ( 
        <div>
            {book && ( // If 'book' exists, display the Next details:
                <>
                    <h2>Book Title: {book.title}</h2>
                        <div className="Image-container">
                            <img src={book.coverImage} alt={book.title} />
                        <h4>Book id - {book.id}</h4>
                        <div className="Info-container">
                            <p><strong>Publication Date:</strong> {book.publicationDate}</p>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Description:</strong> {book.description}</p> 
                            
                            {/*PENDING add validation if user=Admin go to Collection, else 
                            go to Collectionuser*/}
                            <Link to="/collection"><button>Book collection</button></Link>{/*go back to collection page*/}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Details; 
