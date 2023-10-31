import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import toast from "react-hot-toast";
import {server_url} from '../App'


const EditPostPage = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${server_url}/post/`+id)
            .then(response => {
                response.json().then(postInfo => {
                    setTitle(postInfo.title);
                    setContent(postInfo.content);
                    setSummary(postInfo.summary);
                });
            });
    }, []);

    const updatePostHandler = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if (files?.[0]) {
            data.set('file', files?.[0]);
        }
        const response = await fetch(`${server_url}/post/`+id, {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });
        if (response.status === 200) {
            toast.success('Post updated successfully');
            navigate('/');
        }
        else {
            toast.error("Error while updating Post . Please try Again ")
        }
    }


    return (
        <>
            <div className="w-[90%] mx-auto bg-white rounded-md shadow-lg mt-6 mb-[6rem] border border-black">
                <div className="text-center p-4">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Create Your New Blog Here
                    </h2>
                </div>

                <form className="p-4" onSubmit={updatePostHandler}>
                    <div className="mb-4">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            id="title"
                            type="title"
                            placeholder="Title"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <input
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                            id="summary"
                            type="summary"
                            placeholder="Summary"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        {/* <label className="w-40  px-4 py-2 text-white bg-green-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
                        <span className="mt-2 text-md leading-normal mr-3">Upload file</span> */}
                        <input
                            onChange={(ev) => setFiles(ev.target.files)}
                            type="file"

                        />
                        {/* </label> */}
                    </div>

                    <div className="mb-6">
                        <Editor value={content} onChange={setContent} required />
                    </div>
                    <div className="mb-4 text-center">
                        <button
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                            type="submit"
                        >
                            Update Post
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditPostPage