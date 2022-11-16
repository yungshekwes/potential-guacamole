/**
 * Imports from packages that will be used in the file
 */
import React from 'react'
import {Avatar, useChatContext} from 'stream-chat-react'

/**
 * Implements the logic behind the preview component for Channels that shows a user their active Channels.
 * In the case where there are no active Team or Direct Message Channels, the component displays a default message.
 */
const TeamChannelPreview = ({setActiveChannel, setIsCreating, setIsEditing, setToggle, channel, type}) => {
  const {channel : activeChannel, client} = useChatContext()

  const ChannelPreview = () => (
    <p className='channel-preview__item'>
      # {channel?.data?.name || channel?.data?.id}
    </p>
  )

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(({user}) => user.id !== client.userID)
    
    return (
      <div className='channel-preview__item single'>
        <Avatar 
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.fullName}</p>
      </div>
    )
  }

  return (
    <div className={
      channel?.id === activeChannel?.id
        ? 'channel-preview__wrapper__selected'
        : 'channel-preview__wrapper'
    }
    onClick={() => {
      setIsCreating(false)
      setIsEditing(false)
      setActiveChannel(channel)

      if (setToggle) {
        setToggle((prevToggle) => !prevToggle)
      }
    }}
    >
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />} 
    </div>
  )
}

export default TeamChannelPreview