import React from 'react'
import { StreamChat } from 'stream-chat'
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from 'stream-chat-react'

import 'stream-chat-react/dist/css/index.css'

const chatClient = StreamChat.getInstance('6pshcp5ym8m7')
const userToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic2h5LWdyYXNzLTIifQ.sffYAuTp42oR96YuhQd8zGFHpHwJNhYlwujE40freOg'

chatClient.connectUser(
  {
    id: 'shy-grass-2',
    name: 'shy-grass-2',
    image: 'https://getstream.io/random_png/?id=shy-grass-2&name=shy-grass-2',
  },
  userToken
)

const channel = chatClient.channel('messaging', 'shy-grass-2', {
  // add as many custom fields as you'd like
  image: 'https://www.drupal.org/files/project-images/react.png',
  name: 'Talk about React',
  members: ['shy-grass-2'],
})

const ChatFunction = () => (
  <Chat client={chatClient} theme='messaging light'>
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
)

export default ChatFunction
