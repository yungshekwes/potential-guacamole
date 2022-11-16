# AvoChat - Instant Messenger Application

## First, why is it called AvoChat?

Look at the name of the repository ;)

## How do I run this locally?

We are assuming that Node.js, the open-source and cross-platform Javascript runtime environment is installed in your computer. If it is not installed, please follow this [link to install Node.js](https://nodejs.org/en/) first before continuing onto the next steps.

Have you Node.js already? Good! This means that we can use the Node.js package manager, also known as npm for the following steps.

### Client Side (AvoChat Frontend)

For the client, we need to navigate to the client directory, that is '../client'. Then run the following command

### `npm install`

This downloads all the packages that are necessary for the operation of AvoChat's frontend.

Now, to actually run the frontend, run the following command:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view AvoChat in your browser.

### Server Side (AvoChat Backend)

For the server, we need to navigate to the server directory, that is '../server'. Then run the following command

### `npm install`

This downloads all the packages that are necessary for the operation of AvoChat's backend.

Now, to actually run the backend, run the following command:

### `npm start`

Open [http://localhost:5000](http://localhost:5000) to see the AvoChat server in your browser (although, this only displays "Welcome to the AvoChat Backend!").

## But isn't the project deployed?

Yes, it is! We made use of Netlify and Heroku to deploy our frontend and backend portions of the AvoChat app respectively, so if you would like to simply test out the functionality of AvoChat, all you have to do is click on this link:

### [AvoChat Frontend Deployment](avochat.netlify.app)

This is only the frontend, which is the only part needed for the standard use, but if you are curious as to the deployment of the backend, here you go:

### [AvoChat Server Deployment](avochat.herokuapp.com)

## Code Documentation

The code is well documented with all functions and constants in the codebase having some form of comments on them, describing their usages and what they do in general. Since Javascript does not have a industry standard for documentation, we chose to use our own commenting style that, in essence, describes what kind of a function/constant it is, along with a blackbox definition of what that particular component brings to the table. 

We decided on this style of documentation since it is extremely readable for anyone who would like to understand what is going on in the code of AvoChat. The following is an example of how we documented our code, using the main App function:

```javascript
/**
 * The actual implementation of AvoChat's frontend, which is quite simply just a getStream StreamChat client that contains
 * a Channel List Container for the different Direct Message and Team Channels, and a Channel Container that has the actual chat screen, with which users can interact.
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
```

There is definitely a downside to this form of commenting as it does not explicitly indicate what are the arguments passed into each function and also what exactly it returns. However, for the sake of readability, we decided against using that kind of "Javadoc" documentation style.

## Licensing

We decided that the entirety of AvoChat should be open-sourced, and allow for unlimited distribution and 