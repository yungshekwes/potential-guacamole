import React, {useState} from 'react'
import { ChannelList, useChatContext } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'
import AvoIcon from '../assets/avocado.png'
import LogoutIcon from '../assets/logout.png'

const cookies = new Cookies()

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

const CompanyHeader = () => (
    <div className='channel-list__header'>
        <p className='channel-list__header__text'>
            AvoChat
        </p>
    </div>
)

const customChannelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team')
}

const customChannelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'messaging')
}

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