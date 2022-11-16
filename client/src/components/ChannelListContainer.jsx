/**
 * Imports from packages that will be used in the file
 */
import React, {useState} from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie'

/**
 * Imports from the Components directory that will be used in the Channel List Container
 */
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'

/**
 * Importing images from Assets directory for the AvoChat icon and the Logout icon
 */
import AvoIcon from '../assets/avocado.png'
import LogoutIcon from '../assets/logout.png'

/**
 * Initializaing a new instance of Cookies
 */
const cookies = new Cookies()

/**
 * Stylization component for the display of the sidebar that will be used in the Channel List Container
 */
const SideBar = ({logout}) => (
    <div className='channel-list__sidebar'>
        <div className='channel-list__sidebar__icon1'>
            <div className='icon1__inner'>
                <img src={AvoIcon} alt='AvoChat' width='30' />
            </div>
        </div>
        <div className='channel-list__sidebar__icon2'>
            <div className='icon1__inner' onClick={logout}>
                <img src={LogoutIcon} alt='Logout' width='30' />
            </div>
        </div>
    </div>
)

/**
 * Stylization component for AvoChat that will be used in the Channel List Container
 */
const CompanyHeader = () => (
    <div className='channel-list__header'>
        <p className='channel-list__header__text'>
            AvoChat
        </p>
    </div>
)

/**
 * Defining a filter for all Team Channels of a user
 */
const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team')
}

/**
 * Defining a filter for all Direct Message Channels of a user
 */
const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging')
}

/**
 * Logic for the components of the Channel List, and therefore is called Channel List Content
 * Also implements the logout logic, which clears the browser of the set cookies such that no login information is remembered
 * upon the next instance.
 * This component will be made use of in the actual Channel List Container, which is defined below.
 */
const ChannelListContent = ({isCreating, setIsCreating, setCreateType, setIsEditing, setToggle}) => {
  const {client} = useChatContext()
  
  const logout = () => {
    cookies.remove('token')
    cookies.remove('userId')
    cookies.remove('username')
    cookies.remove('fullName')
    cookies.remove('avatarURL')
    cookies.remove('hashedPassword')
    cookies.remove('phoneNumber')

    window.location.reload()
  }

  const filters = {members: {$in: [client.userID]}}

  return (
    <>
      <SideBar logout={logout}/>
      <div className='channel-list__list__wrapper'>
        <CompanyHeader />
        <ChannelSearch setToggle={setToggle}/>
        <ChannelList 
          filters={filters}
          channelRenderFilterFn={customChannelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type='team'
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggle={setToggle}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview 
              {...previewProps}
              type='team'
              setToggle={setToggle}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
            />
          )}
        />
        <ChannelList 
          filters={filters}
          channelRenderFilterFn={customChannelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type='messaging'
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggle={setToggle}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview 
              {...previewProps}
              type='messaging'
              setToggle={setToggle}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
            />
          )}
        />
      </div>
    </>
  )
}

/**
 * Actual implementation of the logic behind the Channel List Container component
 * This component brings together all the components defined in the file, along with the defined filters and stylizations
 */
const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing}) => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className='channel-list__container'>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setIsEditing={setIsEditing}
          setCreateType={setCreateType}
        />
      </div>

      <div className="channel-list__container-responsive"
        style={{ left: toggle ? "0%" : "-89%", backgroundColor: "#005fff"}}
      >
      <div className="channel-list__container-toggle" onClick={() => setToggle((prevToggle) => !prevToggle)}></div>
        <ChannelListContent 
          setIsCreating={setIsCreating} 
          setCreateType={setCreateType} 
          setIsEditing={setIsEditing}
          setToggle={setToggle}
        />
      </div>
    </>
  )
}

export default ChannelListContainer