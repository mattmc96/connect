import React, {useState} from 'react'
import {withRouter} from 'react-router-dom'


const SinglePost = props => {
    let { id, content, image_url, created_at} = props.posts;
    const [firstImage, setFirstImage] = useState(
        'https://image.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-260nw-1037719192jpg'
      );
    const [imageFunc, setImageFunc] = useState({
        image: image_url ? null : (image_url = firstImage) 
    })
    return (
        <div className='post-singlePost'>
            <div className='post-img'> 
                <img src={imageFunc}/>
                <div className='post-box'>
                <p className='title'>{content}</p> 
                <p className='created_at-section'>{created_at}</p>
                </div>
                <div className='post-btn-box'>
                    <button onClick={() => props.deletePost(id)}>Delete</button>
                    <button 
                    onClick={() => props.history.push(`/edit/${props.posts.id}`)}>
                        Edit
                    </button>
                </div>  
        </div>
    )
}

export default withRouter(SinglePost)