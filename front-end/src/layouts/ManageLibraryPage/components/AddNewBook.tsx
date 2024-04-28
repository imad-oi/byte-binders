import { useOktaAuth } from "@okta/okta-react"
import { useState } from "react";
import AdminBookRequest from "../../../models/AdminBookRequest";
import ImageUploader from "../../utils/ImageUploader";

const bookCategories = [
    { id: 1, name: "Category", value: "category" },
    { id: 2, name: "Front-end", value: "fe" },
    { id: 3, name: "Back-end", value: "be" },
    { id: 4, name: "DevOps", value: "devops" },
    { id: 5, name: "Data", value: "data" },
]

// type AddNewBookProps = {
//     setShowAlert: (showAlert: boolean) => void;
//     setAlertDesc: (alertDesc: string) => void;
// }

const AddNewBook = () => {

    const { authState } = useOktaAuth();

    // New Book 
    const [newBook, setNewBook] = useState<AdminBookRequest>({
        title: "",
        author: "",
        description: "",
        category: "Category",
        copies: 0,
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [ImageName, setImageName] = useState<string>("");

    // Category field
    const categoryField = (value: string) => {
        setNewBook({
            ...newBook,
            category: value
        })
    }



    // Image upload
    const base64ConvertionForImage = (e: any) => {
        if (e.target.files[0]) {
            setImageName(e.target.files[0].name);
            getBase64(e.target.files[0]);
        }
    }

    const getBase64 = (file: any) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setSelectedImage(reader.result as any);
        }
        reader.onerror = function (error) {
            console.log('Error: ', error);
        }
    }

    const submitNewBook = async (e: any) => {
        e.preventDefault();
        const url = "http://localhost:8888/api/admin/secure/add/book";
        if (authState?.isAuthenticated && newBook.title !== "" && newBook.author !== "" && newBook.category !== "Category" && newBook.copies !== 0) {
            const book: AdminBookRequest = new AdminBookRequest(
                newBook.title,
                newBook.author,
                newBook.description,
                newBook.category,
                newBook.copies
            )
            book.img = selectedImage as any;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authState?.accessToken?.accessToken}`
                },
                body: JSON.stringify(book)
            }
            const submitBookResponse = await fetch(url, requestOptions);
            if (!submitBookResponse.ok) {
                console.log(submitBookResponse);
                // setAlertDesc("Something went wrong");
                // setShowAlert(true);
            }
            setNewBook({
                ...newBook,
                title: "", description: "", author: "", category: "Category", copies: 0
            });
            setSelectedImage(null);
            setImageName("");
            // setShowAlert(true);
            window.scrollTo(0, 0);
            // setAlertDesc("Book added successfully");
        }
    }



    return (
        <div className="">
            <div className="ring-1 ring-slate-200 rounded-md">
                <p className="p-3 bg-gray-100 font-bold">Add new Book</p>
                <form method="post" className="p-3" onSubmit={submitNewBook}>
                    <div className=" flex flex-col md:flex-row gap-2">
                        <div className="md:w-2/5">
                            <label htmlFor="title"
                                className="block mb-2 text-sm font-medium text-gray-900">Book Title</label>
                            <input
                                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                value={newBook.title}
                                type="text" id="title"
                                className="input-primary "
                                placeholder="Title" required />
                        </div>
                        <div className="md:w-2/5">
                            <label htmlFor="author"
                                className="block mb-2 text-sm font-medium text-gray-900">Author</label>
                            <input
                                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                                value={newBook.author}
                                type="text" id="author"
                                className="input-primary "
                                placeholder="Title" required />
                        </div>
                        <div className="md:w-1/5">
                            <label htmlFor="countries"
                                className="block mb-2 text-sm font-medium text-gray-900">
                                Select a Category</label>
                            <select
                                onChange={(e) => categoryField(e.target.value)}
                                value={newBook.category}
                                id="countries"
                                className="input-primary">
                                {
                                    bookCategories.map((item, i) => (
                                        <option key={i} value={item.value}> {item.name} </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="mt-4" >
                        <label htmlFor="message"
                            className="block mb-2 text-sm font-medium text-gray-900">
                            Book Description</label>
                        <textarea
                            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                            id="message" rows={5}
                            className="input-primary"
                            placeholder="Leave a description..."></textarea>
                    </div>
                    <div className="w-1/3 mt-4">
                        <label htmlFor="copies"
                            className="block mb-2 text-sm font-medium text-gray-900">
                            Copies</label>
                        <input
                            onChange={(e) => setNewBook({ ...newBook, copies: parseInt(e.target.value) })}
                            type="text" id="copies"
                            className="input-primary"
                            placeholder="0" required />
                    </div>

                    <div className="mt-4">
                        <ImageUploader
                            ImageName={ImageName}
                            selectedImage={selectedImage}
                            handleImageUpload={base64ConvertionForImage}
                        />
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800
                     focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
                      text-sm px-5 py-2.5 mr-2 mb-2">Add Book</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddNewBook