/**
 * Imports from packages that will be used in the file
 */
import React from 'react'

/**
 * Importing components from Assets directory for the stylization of the Team Channel List
 */
import {AddChannel} from '../assets'

/**
 * Implements the logic behind the Team Channel and Direct Message Channel list components
 * Showcases to a user the Channels that are currently available, and in the case that there is an error 
 * (due to internet connection being lost, for example), the component dynamically updates to show an error message
 */
const TeamChannelList = ({children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing, setToggle}) => {
  if (error) {
    return type === 'team' ? (
      <div className='team-channel-list'>
        <p className='team-channel-list__message'>
          Connection error, please wait a moment and try again
        </p>
      </div>
    ) : null
  }

  if (loading) {
    return (
      <div className='team-channel-list'>
        <p className='team-channel-list__message.loading'>
          {type === 'team' ? 'Channels' : 'Messages'} loading ...
        </p>
      </div>
    )
  }

  return (
    <div className='team-channel-list'>
      <div className='team-channel-list__header'>
        <p className='team-channel-list__header__title'>
          {type === 'team' ? 'Channels' : 'Direct Messages'}
        </p>
        <AddChannel 
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggle={setToggle}
          type={type === 'team' ? 'team' : 'messaging'}
        />
      </div>
      {children}
    </div>
  )
}

export default TeamChannelList