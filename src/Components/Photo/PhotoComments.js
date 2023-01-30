import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import PhotoCommentsForm from './PhotoCommentsForm'
import styles from './PhotoComments.module.css'

const PhotoComments = (props) => {
  const [comments, setComments] = useState(() => props.comments)
  const {login} = useContext(UserContext)

  return (
    <>
      <ul className={styles.comments}>
        {comments.map(comment => (
          <li key={comment.comment_ID}>
            <strong>{comment.comment_author}: </strong>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && <PhotoCommentsForm id={props.id} setComments={setComments} />}
    </>
  )
}

export default PhotoComments