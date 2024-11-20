import { useEffect, useState } from "react"; 
import { useParams, Link } from "react-router-dom"; 
import Navbar from "../components/Navbar"; 
import Logo from "../components/Logo";
import ErrorMessage from './ErrorMessage'; // Import the ErrorMessage component

const Edit = () => {
    const { id } = useParams(); // Get the 'id' parameter from the URL
    const [book, setBook] = useState(null); // Initialize state for the book
    const [title, setTitle] = useState(''); // State for the book title
    const [author, setAuthor] = useState(''); // State for the book author
    const [description, setDescription] = useState(''); // State for the book description
    const [publicationDate, setPublicationDate] = useState(''); // State for the publication date
    const [coverImage, setCoverImage] = useState(''); // State for the book cover image
    const [errorMessage, setErrorMessage] = useState(null); // To store error messages


    useEffect(() => {
        // Fetch book data from the API
        const fetchBooks = async () => {
            const response = await fetch('/books'); // Send a GET request to fetch all books
            const json = await response.json(); // Convert the response to JSON format

            if (response.ok) {
                // If the response is successful (status code 200 OK)
                const foundBook = json.find((b) => b.id === parseInt(id)); // Find the book with the matching 'id'
                if (foundBook) {
                    setBook(foundBook); // Set the found book in the state
                    setTitle(foundBook.title); // Set the title in the state
                    setAuthor(foundBook.author); // Set the author in the state
                    setDescription(foundBook.description); // Set the description in the state
                    setPublicationDate(foundBook.publicationDate); // Set the publication date in the state
                    setCoverImage(foundBook.coverImage); // Set the cover image in the state
                }
            }
        };
        fetchBooks(); // Call the function to fetch book data
    }, [id]); // Effect runs when 'id' changes

    // Function to handle updating the book
    const handleUpdateBook = async () => {
        try {
            // Sends a PUT request to the API(http://localhost:7000/books/:id) to add a new book:
            // Create an object with the updated book data
            const updatedBook = { title, author, description, publicationDate, coverImage }; 
            const response = await fetch(`/books/${book.id}`, {
                method: 'PUT', // Set the method to PUT for updating
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                body: JSON.stringify(updatedBook), // Convert the updated book object to JSON
            });

            if (response.ok) {
                const updatedData = await response.json(); // Get the updated data from the response
                setBook(updatedData); // Update the local state with the updated book
            } else {
                throw new Error('Failed to update the book'); // Throw an error if update fails
            }
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <Navbar /> {/* Render Navbar */}
            <Logo />
            <div className="create">
                {book && ( // If the book exists, display the edit form
                    <div>
                        <h2>Edit Book</h2> {/* Heading for the edit section */}
                        <label>Title</label>
                        <input
                            type="text"
                            value={title} // Bind input value to the title state
                            onChange={(e) => setTitle(e.target.value)} // Update title state on change
                            required
                        />
                        <label>Author</label>
                        <input
                            type="text"
                            value={author} // Bind input value to the author state
                            onChange={(e) => setAuthor(e.target.value)} // Update author state on change
                            required
                        />
                        <label>Description</label>
                        <textarea
                            value={description} // Bind textarea value to the description state
                            onChange={(e) => setDescription(e.target.value)} // Update description state on change
                            required
                        />
                        <label>Publication Date</label>
                        <input
                            type="date"
                            value={publicationDate} // Bind input value to the publicationDate state
                            onChange={(e) => setPublicationDate(e.target.value)} // Update publication date state on change
                            required
                        />
                        <label>Cover Image</label>
                        <input
                            type="text"
                            value={coverImage} // Bind input value to the coverImage state
                            onChange={(e) => setCoverImage(e.target.value)} // Update cover image state on change
                            required
                        />
                        <Link to="/">
                        <button className="btn btn-primary" onClick={handleUpdateBook}>Update Book</button> {/* Button to trigger book update */}
                        </Link>
                        &nbsp;
                        <Link to="/">
                            <button className="btn btn-primary">Back Collection</button>
                        </Link> {/* Go back to collection page */}
                    </div>
                )}
                {/* Display error message if an error exists */}
                {errorMessage && <ErrorMessage message={errorMessage} onClose={() => setErrorMessage(null)} />}
            </div>
        </>
    );
};

export default Edit;
