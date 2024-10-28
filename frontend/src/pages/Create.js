import { useState } from "react";
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";

const Create = () => {
    //state variables to manage form input values:
    const [title, setTitle] = useState(''); //store the book title
    const [author, setAuthor] = useState(''); //store the book author
    const [description, setDescription] = useState(''); //store the description
    const [publicationDate, setPublicationDate] = useState(''); //store the publication date
    const [coverImage, setCoverImage] = useState(''); //store the cover image URL

    //function to handle the submition form:
    const submitForm = async (e) => {
        e.preventDefault();

        const book = { title, author, description, publicationDate, coverImage };// Creates a new book object with input values

        // Sends a POST request to the API(http://localhost:7000/books/) to add a new book:
        const response = await fetch('/books', {
            method: 'POST',
            body: JSON.stringify(book),// Converts the book object to JSON format
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Handle successful creation from the server:
        if (response.ok) {
            const json = await response.json(); // the response body
            //console.log('New book added:', json, 'Status Code:', response.status); // Log success message
            // Clear fields after successful addition
            setTitle('');
            setAuthor('');
            setDescription('');
            setPublicationDate('');
            setCoverImage('');
            console.log('New book added:', json, 'Status Code:', response.status); 
        }
    };

    return (
        <>
        <Navbar /> {/*show Navbar*/}
        <Logo />
            <form className="create" onSubmit={submitForm}>
                <h3>Add a New Book</h3>

                <label>Title</label>
                <input 
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}   // Updates the 'title' state
                    value={title}
                    required
                />
                <label>Author</label>
                <input 
                    type="text"
                    onChange={(e) => setAuthor(e.target.value)}  // Updates the 'author' state
                    value={author}
                    required
                />
                <label>Description</label>
                <input 
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}  // Updates the 'author' state
                    value={description}
                    required
                />
                <label>Publication Date</label>
                <input 
                    type="date"
                    onChange={(e) => setPublicationDate(e.target.value)}  // Updates the 'author' state
                    value={publicationDate}
                    required
                />
                <label>Cover Image</label>
                <input 
                    type="text"
                    onChange={(e) => setCoverImage(e.target.value)}  // Updates the 'author' state
                    value={coverImage}
                    required
                />
                <button className="btn btn-primary d-inline-flex align-items-center">Add Book</button>
            </form>
        </>
    );
};

export default Create;