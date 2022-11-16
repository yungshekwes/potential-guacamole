/**
 * Imports from packages that will be used in the file
 */
import React, {useState, useEffect} from 'react'
import {useChatContext} from 'stream-chat-react'

/**
 * Import from the Components directory that will be used in the Channel Search component
 */
import {ResultsDropdown} from './'

/**
 * Importing components from Assets directory for the stylization of the Search Icon
 */
import {SearchIcon} from '../assets'

/**
 * Implements the main logic behind the Search component in AvoChat that allows users to both search
 * for Direct Message Channels and Team Channels, given a search parameter
 */
const ChannelSearch = ({setToggle}) => {
  const {client, setActiveChannel} = useChatContext()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [teamChannels, setTeamChannels] = useState([])
  const [directChannels, setDirectChannels] = useState([])

  useEffect(() => {
    if(!query) {
      setTeamChannels([])
      setDirectChannels([])
    }
  }, [query])

  const getChannels = async (text) => {
    try {
      const channelResponse = await client.queryChannels({
        type: 'team',
        name: { $autocomplete: text}, 
        members: { $in: [client.userID]}
      })
      const userResponse = await client.queryUsers({
        id: { $ne: client.userID},
        name: { $autocomplete: text}
      })

      const [channels, {users}] = await Promise.all([channelResponse, userResponse]) 

      if (channels.length) setTeamChannels(channels)
      if (users.length) setDirectChannels(users)
    } catch (error) {
      setQuery('')
    }
  }

  const onSearch = (e) => {
    e.preventDefault()

    setLoading(true)
    setQuery(e.target.value)
    getChannels(e.target.value)
  }

  const setChannel = (channel) => {
    setQuery('')
    setActiveChannel(channel)
  }

  return (
    <div className='channel-search__container'>
      <div className='channel-search__input__wrapper'>
        <div className='channel-search__input__icon'>
            <SearchIcon />
        </div>
        <input 
          className='channel-search__input__text' 
          placeholder='Search' 
          type='text' 
          value={query} 
          onChange={onSearch}
        />
      </div>
      {query && (
        <ResultsDropdown 
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggle={setToggle}
        />
      )}
    </div>
  )
}

export default ChannelSearch