import React from 'react'
import { Link } from 'react-router-dom'
// import image from "../images/img1.jpg";
import {formatISO9075} from "date-fns";
import {server_url} from '../App'



const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
    return (
        <>
            <div className="bg-white mt-6 rounded-lg shadow-md flex flex-col md:flex-row p-4 mx-auto max-w-[70%]">
                <div className="md:w-[30%]">
                    <Link to={`/post/${_id}`}>
                        <img
                            src={`${server_url}/`+cover}
                            alt="Image"
                            className="w-[100%] h-auto object-cover rounded"
                        />
                    </Link>
                </div>

                <div className="md:w-2/3 mt-4 md:mt-0 md:ml-4">
                    <Link to={`/post/${_id}`}>
                        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                    </Link>


                    <div className="flex justify-between mb-3 text-sm font-semibold ">
                        <div className='text-xs font-semibold'>created by : {author.email}</div>
                        <div>{formatISO9075(new Date(createdAt) , 'MMM d , yyyy HH:mm')}</div>
                    </div>

                    <p className="text-gray-600">{summary}</p>


                </div>
            </div>

        </>
    )
}

export default Post