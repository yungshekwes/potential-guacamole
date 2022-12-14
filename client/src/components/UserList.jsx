/**
 * Imports from packages that will be used in the file
 */
import React, {useEffect, useState} from 'react'
import {Avatar, useChatContext} from 'stream-chat-react'

/**
 * Importing components from Assets directory for the stylization of the User List
 */
import { InviteIcon } from '../assets'

/**
 * Stylization component for User List
 */
const ListContainer = ({children}) => {
  return (
    <div className='user-list__container'>
      <div className='user-list__header'>
        <p>User</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  )
}

/**
 * Stylization component for each user in the User List, along with a clickable invite icon
 */
const UserItem = ({user, setSelectedUsers}) => {
  const [selected, setSelected] = useState(false)

  const handleSelect = () => {
    if (selected) {
        setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id))
    } else {
        setSelectedUsers((prevUsers) => [...prevUsers, user.id])
    }
    setSelected((prevSelected) => !prevSelected)
  }

  return (
    <div className='user-item__wrapper' onClick={handleSelect}>
      <div className='user-item__name-wrapper'>
        <Avatar image={user.image} name={user.fullName || user.id} size={32} />
        <p className='user-item__name'>{user.fullName || user.id}</p>
      </div>
      {selected 
        ? <InviteIcon />
        : <div className='user-item__invite-empty' />
      }
    </div>
  )
}

/**
 * Actual User List logic implementation that is used when a user wants to invite other members to their existing Team Channel
 * Makes use of the stylization components above, along with actually displaying the available users that the current user
 * can possible invite to their Team Channel.
 */
const UserList = ({setSelectedUsers}) => {
  const {client} = useChatContext()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [listEmpty, setListEmpty] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return 
      
      setLoading(true)
      
      try {
        const res = await client.queryUsers(
          {id: {$ne: client.userID}},
          {id: 1},
          {limit: 8}
        )

        if (res.users.length) {
          setUsers(res.users)
        } else {
          setListEmpty(true)
        }
      } catch (err) {
        setError(true)
      }
      setLoading(false)
    }

    if(client) getUsers()
  }, [])

  if (error) {
    return (
      <ListContainer>
        <div className='user-list__message'>
            Error loading, please refresh and try again.
        </div>
      </ListContainer>
    )
  }

  if (listEmpty) {
    return (
      <ListContainer>
        <div className='user-list__message'>
            No users found.
        </div>
      </ListContainer>
    )
  }

  return (
    <ListContainer>
      {loading 
        ? <div className='user-list__message'>Loading users...</div>
        : (users?.map((user, i) => (
          <UserItem 
            index={i} 
            key={user.id} 
            user={user}
            setSelectedUsers={setSelectedUsers}
          />
        )))
    }
    </ListContainer>
  )
}

export default UserList