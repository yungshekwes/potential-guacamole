/**
 * Imports from packages that will be used in the file
 */
import React, { useState } from 'react'
import { useChatContext } from 'stream-chat-react'

/**
 * Import from the Components directory that will be used in the Create Channel component
 */
import { UserList } from './'

/**
 * Importing components from Assets directory for the stylization of the Closing Icon for Creating Channels
 */
import { CloseCreateChannel } from '../assets'

/**
 * Component that implements logic for accepting the input of a Channel Name
 * This will be used in the Create Channel component below
 * Exactly the same as that in the CreateChannel.jsx file
 */
const ChannelNameInput = ({channelName = '', setChannelName}) => {
  const handleChange = (e) => {
    e.preventDefault()

    setChannelName(e.target.value)
  }
  
  return (
    <div className='channel-name-input__wrapper'>
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="channel-name" />
    </div>
  )
}

/**
 * Actual implementation of the Create Channel logic that creates a new channel given selected users, along with an optional channel name.
 * If the name of the Team Channel is not specified, getStream would provide a randomized name that corresponds to the ID of that channel in
 * the getStream databases.
 */
const CreateChannel = ({createType, setIsCreating}) => {
  const {client, setActiveChannel} = useChatContext()
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
  const [channelName, setChannelName] = useState('')

  const createChannel = async (e) => {
    e.preventDefault()

    try{
      const newChannel = await client.channel(createType, channelName, {
        name: channelName, members: selectedUsers
      })

      await newChannel.watch()

      setChannelName('')
      setIsCreating(false)
      setSelectedUsers([client.userID])
      setActiveChannel(newChannel)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='create-channel__container'>
      <div className='create-channel__header'>
        <p>{createType === 'team' ? 'Create a New Channel' : 'Send a DM'}</p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === 'team' && 
        <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
      }
      <UserList setSelectedUsers={setSelectedUsers}/>
      <div className='create-channel__button-wrapper' onClick={createChannel}>
        <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
      </div>
    </div>
  )
}

export default CreateChannel