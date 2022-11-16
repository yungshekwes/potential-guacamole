/**
 * Imports from packages that will be used in the file
 */
import React from 'react'
import {Channel, useChatContext, MessageSimple, Avatar } from 'stream-chat-react'

/**
 * Imports from the Components directory that will be used in the Channel Container
 */
import {ChannelInner, CreateChannel, EditChannel} from './'

/**
 * 
 * The actual container component wherein the chat container is placed in the
 * This is where either Direct Messages or Group Chats will be displayed upon user selection
 * Unfortunately, there are a couple of components from getStream that are deprecated,
 * and therefore do not display optimal behaviour, i.e.: displaying "This is the beginning of your chat history" when the user has no chats
 * However, the logic still works and therefore, we settled for it. This is definitely an area for improvement. 
 */
const ChannelContainer = ({isCreating, setIsCreating, isEditing, setIsEditing, createType}) => {
  const {channel} = useChatContext()

  if (isCreating) {
    return(
      <div className="channel__container">
        <CreateChannel 
          createType={createType}
          setIsCreating={setIsCreating}
        />
      </div>

    )
  }

  if (isEditing) {
    return(
      <div className="channel__container">
        <EditChannel 
          setIsEditing={setIsEditing}
        />
      </div>
    )
  }

  const EmptyState = () => (
    <div className='channel-empty__container'>
      <p className='channel-empty__first'>
        This is the beginning of your chat history.
      </p>
      <p className='channel-empty__second'>
        Send messages, attachements, links, emojis and more!
      </p>
    </div>
  )

  return (
    <div className='channel__container'>
      <Channel
        EmptyStateIndicator={EmptyState}
        Avatar={(messageProps, i) => <Avatar key={i} {...messageProps.avatarURL} />} 
        Message={(messageProps, i) => <MessageSimple key={i} {...messageProps} />}
      >
        <ChannelInner setIsEditing={setIsEditing}/>
      </Channel>
    </div>
  )
}

export default ChannelContainer