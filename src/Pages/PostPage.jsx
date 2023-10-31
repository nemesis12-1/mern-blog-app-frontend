import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../context/UserContext";
import { Link , useNavigate } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import toast from "react-hot-toast";
import {server_url} from '../App'


const PostPage = () => {

    const [postInfo, setPostInfo] = useState(null);
    const { userInfo } = useContext(UserContext);
   

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        fetch(`${server_url}/post/${id}`)
            .then(response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo);
                });
            });
    }, []);

    const deleteHandler = async () => {
        const response = await fetch(`${server_url}/post/${id}`, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (response.status === 200) {
            toast.success('Post Deleted successfully');
          
            navigate('/');
        }
        else {
            toast.error("Error while Deleting Post, Please try Again")
        }
    }

    if (!postInfo) return '';

    return (
        <>
            <div className="w-[90%] mx-auto bg-gray-100 shadow-lg p-4 mt-4  border border-slate-200">
                <h1 className="text-center text-2xl font-bold py-3">{postInfo.title}</h1>
                <div className="text-center font-bold text-xs text-gray-500">
                    <time >{formatISO9075(new Date(postInfo.createdAt))}</time>
                </div>
                <div className="text-center text-xs font-semibold py-2">by @{postInfo.author.email}</div>
                { userInfo && userInfo.id === postInfo.author._id && (
                    <div className="md:flex  justify-center  gap-4 mb-4">
                        <Link to={`/edit/${postInfo._id}`}>
                            <div className="flex justify-center items-center my-3 gap-1 bg-green-400 w-40 rounded px-2 py-1 hover:bg-green-600 hover:text-white">
                                <div>
                                    <BiEdit />
                                </div>
                                <div >
                                    Edit this post
                                </div>
                            </div>
                        </Link>
                        <div >
                            <button onClick={deleteHandler} className="flex justify-center items-center my-3 gap-1 bg-red-400 w-40 rounded px-2 py-1 hover:bg-red-600 hover:text-white">Delete</button>
                        </div>
                    </div>
                )}
                <div className="w-[80%] mx-auto ">
                    {/* <img src={`http://localhost:3000/${postInfo.cover}`} className="rounded-lg w-[100%] h-[300px] object-cover" alt="" /> */}
                    <img src={`${server_url}/post/${postInfo.cover}`} className="rounded-lg w-[100%] h-[300px] object-cover" alt="" />
                </div>
                <div className="text-md leading-7 my-9 w-[80%] mx-auto" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
            </div>
        </>
    )
}

export default PostPage