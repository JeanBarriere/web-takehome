import generateUsers from 'data/users';
import generateChats from 'data/chats';

import UserInterface from 'types/users';
import ChatInterface from 'types/chats';
import MessageInterface from 'types/messages';

import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import moment from 'moment';
import Loader from 'components/templates/loader'
import Chats from 'components/templates/chats'

interface LandingPageProps {
  users: UserInterface[];
  chats: ChatInterface[];
  messages: MessageInterface[];
  currentChat: ChatInterface
};


type LoadingState = 'LOADING' | 'ANIMATION_START' | 'ANIMATION_END'

const LandingPage = ({ users, chats, messages, currentChat }: LandingPageProps) => {
  const [search, setSearch] = useState('')
  const filteredChats = useMemo(() => chats.filter(c => users.find(u => u.id === c.withUser).name.toLowerCase().includes(search.toLowerCase().trim())), [search, chats, users])
  const [loading, setLoading] = useState<LoadingState>('LOADING')

  // should maybe use the next router here for proper routing
  // const [currentChat, setCurrentChat] = useState(chats[0])

  const template = (
    <>
      <Head>
        <title>TakeHome - { users.find(u => u.id === currentChat.withUser).name }</title>
      </Head>
      <div className={`bg-white dark:bg-black h-screen w-full flex flex-col items-center justify-center`}>
        <Chats
          chats={filteredChats}
          search={search}
          currentChat={currentChat}
          setSearch={setSearch}
          messages={messages}
          users={users}
        />
      </div>
    </>
  );

  return template
};

export const getServerSideProps = (ctx) => {
  // This is only an exemple of how you could pass data from server to client,
  // you may create another page and not use that use
  const users: UserInterface[] = generateUsers();
  const { chats, messages }: { chats: ChatInterface[], messages: MessageInterface[] } = generateChats();

  const chatId = ctx.query.id

  console.log('changing to ', chatId, chats.find(c => c.id === chatId))

  return {
    props: {
      users, chats, messages, currentChat: chats.find(c => c.id === chatId)
    },
  };
}

export default LandingPage;
