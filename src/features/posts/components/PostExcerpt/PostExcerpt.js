/* eslint-disable multiline-ternary */
/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { UserNameAndLogo } from '../../../users/UserNameAndLogo'
import { TimeAgo } from '../../../../components/TimeAgo'
import {
  removePost,
  selectPostById
} from '../../reducers/postsSlice'
import { saveState } from '../../../../helpers/localStorage'
import Likes from '../../../likes/likes'
import { CommentsList } from '../../../comments/CommentsList'
import { AddCommentForm } from '../../../comments/AddCommentForm'
import { selectCommentsByPostId } from '../../../../reducers/commentsSlice'
import useVisualMode from '../../../../hooks/useVisualMode'
import { EditPostForm } from '../EditPostForm/EditPostForm'
import PostExcerptSkills from './components/PostExcerptSkills/PostExcerptSkills'
import { onEditPostClicked } from '../../utils/onEditPostClicked'
import EditDeleteButtons from './components/EditDeleteButtons'
import HelpUserActions from './components/HelpUserActions'
import ConfirmCancelDelete from './components/ConfirmCancelDelete'
import UserLink from './components/UserLink'
import onDeletePostClicked from '../../utils/onDeletePostClicked'
import CommentsCount from '../CommentsCount/CommentsCount'

const SHOW = 'SHOW'
const CONFIRM = 'CONFIRM'
// const SAVING = "SAVING";
const EDITING = 'EDITING'
// const ERROR_SAVE = "ERROR_SAVE";
// const ERROR_DELETE = "ERROR_DELETE";

export default function PostExcerpt ({
  postId,
  onPost,
  index,
  loggedInUser,
  onCancelDelete,
  onConfirmDelete,
  onEdit,
  onSaveEdit
}) {
  const [showMessage, setShowMessage] = useState(false)
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.user)

  let userId

  if (loggedInUser) {
    userId = loggedInUser.id
  }

  const post = useSelector((state) => selectPostById(state, postId))

  const postComments = useSelector((state) => selectCommentsByPostId(state, postId))

  const commentsLength = postComments.length

  const { mode, transition } = useVisualMode(SHOW)

  const [addRequestStatus, setAddRequestStatus] = useState('idle')
  const canEditOrRemove =
  [userId].every(Boolean) && addRequestStatus === 'idle'

  const experienceOption = {
    value: post.owner_id,
    label: post.first_name + ' ' + post.last_name
  }

  return (
    <article className="rounded-lg p-4 my-2 bg-white shadow-lg space-y-4 mx-2" key={post.id}>
      {/* TAGS, TIMEAGO */}
      <div className="flex justify-between my-3">
        <PostExcerptSkills postSkillIds={post.skill_ids} />
        <div className='flex flex-col items-end'>
          <TimeAgo timestamp={post.time_posted} />
          { userId === post.owner_id
            ? mode === SHOW && (
                  <EditDeleteButtons
                    onEdit={onEdit}
                    onConfirmDelete={onConfirmDelete} transition={transition}
                    EDITING={EDITING}
                    CONFIRM={CONFIRM} />
            )
            : <HelpUserActions
                userId={userId}
                experienceOption={experienceOption}
              />
          }
        </div>
      </div>

      {/* POST AUTHOR */}
      <UserLink post={post} saveState={saveState} />

      {/* TEXT BODY */}
      {mode === SHOW && (
        <p className="flex justify-center px-12">{post.text_body}</p>
      )}

      {mode === EDITING && (
        <EditPostForm
          postId={postId}
          onSaveEdit={() => onSaveEdit(transition, SHOW)}
          value={post.text_body}
          onEditPostClicked={() => onEditPostClicked(
            setAddRequestStatus,
            canEditOrRemove,
            postId,
            dispatch
          )}
        />
      )}

      {mode === CONFIRM && (
        <ConfirmCancelDelete
          onCancelDelete={onCancelDelete}
          onDeletePostClicked={() => onDeletePostClicked()}
          transition={transition}
          SHOW={SHOW}
          setAddRequestStatus={setAddRequestStatus}
          canEditOrRemove={canEditOrRemove}
          postId={postId}
          dispatch={dispatch}
         />
      )}

      {/* LIKES */}
      <Likes postId={postId} userId={userId} />

      <div>

        {commentsLength === 0 ? ''
          : <CommentsCount
              commentsLength={commentsLength}
              setShowMessage={setShowMessage}
              showMessage={showMessage}
              />
        }
        <CSSTransition
          in={showMessage}
          timeout={300}
          classNames="alert"
          unmountOnExit
        >
          <div>
            <CommentsList key={index} postId={postId} />
            <div>
              {/* <section className="validation">{error}</section> */}
            </div>
            <AddCommentForm postId={postId} />
          </div>
        </CSSTransition>

      </div>

      { onPost === true && user && user.id === post.owner_id
        ? <div className="flex justify-center">
          <Link
            to={`/editPost/${post.id}`}
            className="btn btn-primary"
          >
            Edit Post
          </Link>
        </div>
        : ''
      }
    </article>
  )
}
