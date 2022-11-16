/**
 * Imports from packages that will be used in the file
 */
import React, {useState} from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

/**
 * Importing components from Components directory for the functionality of AvoChat
 */
import { ChannelContainer, ChannelListContainer, Auth } from './components'

/**
 * Importing CSS stylesheets that are integral in the stylization of AvoChat, which are used globally.
 * A problem here was that the getStream stylesheets were deprecated at the time of coding and therefore,
 * we had to make use of the new stylesheets that, while work relatively decently with the code that we have,
 * do not exactly work all the time. This will be explained in the report.
 */
import 'stream-chat-react/dist/css/v2/index.css'
import './App.css'

/**
 * Initializaing a new instance of Cookies
 */
const cookies = new Cookies()

/**
 * These are keys and API Tokens that are required for the StreamChat client to connect and work properly
 */
const apiKey = 'xx38euy6udc4'
const authToken = cookies.get('token')

/**
 * Obtaining an instance of the getStream StreamChat such that the user can interact with it
 * This is only successful if provided a valid API Key
 */
const client = StreamChat.getInstance(apiKey)

/**
 * Only after the successful validation of the authentication token, we can connect the user to the getStream StreamChat client
 * This will be done by using the values that are stored in cookies, as follows.
 */
if(authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}

/**
 * The actual implementation of AvoChat's frontend, which is quite simply just a getStream StreamChat client that contains
 * a Channel List Container for the different Direct Message and Team Channels, and a Channel Container that has the 
 * actual chat screen, with which users can interact.
 */
const App = () => {
  const [createType, setCreateType] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  if (!authToken) return <Auth />
  
  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light'>
        <ChannelListContainer 
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />
        <ChannelContainer 
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
  )
}

export default App