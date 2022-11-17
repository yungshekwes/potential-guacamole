# AvoChat - Instant Messenger Application

## First, why is it called AvoChat?

Look at the name of the repository :)

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

We decided that the entirety of AvoChat should be open-sourced, and allow for unlimited distribution and usage by anyone on the Internet. This is because we recognize that it is a University project and also that this was built heavily through the usage of tutorials that were also open-sourced and made available to all. We think that simply putting it together does not entitle us to any rights from it (this is our interpretation). Therefore, we made use of the MIT license, which is showcased in our codebase, and also in this repository.

We are also not looking for any commerical gain, which further substantiates our choice of using the MIT license. As far as the compatibility of the MIT license with the tools that we have made use of, we find it still valid, as we are only licensing the distribution and usage of our codebase, and not that of the tools we are using. Additionally, the tools that we have made use of are not particularly open-source, and only allow for free usage for development purposes. 

In this regard, we find it important to include the terms of use of the tools that we have used as well, as a safety measure to insulate us from any legal issues. These are as follow:

### [getStream Terms of Use](https://getstream.io/legal/)

### [Heroku Terms of Use](https://www.heroku.com/policy/aup)

### [Netlify Terms of Use](https://www.netlify.com/legal/terms-of-use/)

## Working Modules & Challenges Faced

Throughout this project, a major challenge we faced was the fact that there were some already deprecated components from the getStream package that were removed in the new version of getStream that caused quite a few problems in terms of the functionality of the AvoChat app. Namely, the actual chat interface has quite a few flaws which noticed immediately upon usage. The following are the flaws:

1. The Profile Pictures of recipient users do not display. Instead, a simple blue circle is displayed, which can be rather confusing.
2. The names of recipient users are displayed, however in very small text, that is a little problematic, when combined with flaw 1.

Additionally, the stylization of the Channel List Container (section where the Team Channels and Direct Message Channels) is impacted as well due to the removal of deprecated components from the getStream package. The containers display a rather poorly stylized display of "You have no Channels". This is fortunately not the worst flaw, since it's purely on stylization, rather than functionality. 

The reason behind the chat interface flaws is encapsulated in the fact that the tutorial we used to build the chat application was dated. This means that the components that were used in the tutorial were not deprecated or removed, but at the time of coding, we figured that it was. The specific component that was deprecated and removed is the MessageTeam component in the ChannelContainer.jsx file in the Components directory of the client. In place of MessageTeam, we chose to make use of the updated MessageSimple component from getStream as a patch. This patch works, but the downfall here is the abovementioned flaws. 

After some investigation, we found in the [getStream documentations](https://getstream.io/chat/docs/sdk/react/release-guides/upgrade-to-v10/) that the MessageTeam component was not rereleased, or had an alternative component that would function exactly. Additionally, we also found out that getStream's entire Message logic had an overhaul, which was in contradiction with the tutorial that we based AvoChat on. Fortunately, we were able to find MessageSimple, read its documentation and use that component in our application to make the chat functionality work.

This is far from an optimal situation, and goes to show that following a dated tutorial definitely has its downfalls, but we learned from this mistake that it is very important to go through the documentation and components of an API/package to be used to make sure that they are still available. To go a step even further, it would be better to first see if they are deprecated, as that already means that they are in the process of being removed from service. 

Apart from these two flaws in our AvoChat, the other modules work per specification, and function optimally, which we are very proud of. 

