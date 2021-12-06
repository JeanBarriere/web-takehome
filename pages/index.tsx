import generateUsers from 'data/users';
import generateChats from 'data/chats';

import UserInterface from 'types/users';
import ChatInterface from 'types/chats';
import MessageInterface from 'types/messages';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import moment from 'moment';
import Loader from 'components/templates/loader'
import Chats from 'components/templates/chats'

interface LandingPageProps {
  users: UserInterface[];
  chats: ChatInterface[];
  messages: MessageInterface[];
};

// TODO: maybe move this to some helpers
moment.locale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s:  'seconds',
    ss: '%ss',
    m:  'Now',
    mm: '%dm',
    h:  'an hour',
    hh: '%dh',
    d:  '1d',
    dd: '%dd',
    M:  'a month',
    MM: '%dM',
    y:  'a year',
    yy: '%dy'
  }
})

type LoadingState = 'LOADING' | 'ANIMATION_START' | 'ANIMATION_END'

const LandingPage = ({ users, chats, messages}: LandingPageProps) => {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState<LoadingState>('LOADING')

  // should maybe use the next router here for proper routing
  const [currentChat, setCurrentChat] = useState(chats[0])

  const [filteredChats, setFilteredChats] = useState(chats.slice())

  useEffect(() => {
    setFilteredChats(chats.filter(c => users.find(u => u.id === c.withUser).name.toLowerCase().includes(search.toLowerCase().trim())))
  }, [search])

  // TODO: find something like the <Transition> component in Vue to interact with templates in Next.js
  // Fast & easy trick for now
  useEffect(() => {
    if (loading === 'LOADING') {
      setTimeout(() => {
        setLoading('ANIMATION_START')
        setTimeout(() => setLoading('ANIMATION_END'), 500)
      }, 200)
    }
  }, [loading])

  const pageStatusFromLoadingState = (loading: LoadingState) => {
    switch (loading) {
      case 'LOADING':
        return 'Loading...'
      case 'ANIMATION_START':
        return 'Welcome'
      case 'ANIMATION_END':
        return 'Chats';
    }
  }

  const template = (
    <>
      <Head>
        <title>TakeHome - { pageStatusFromLoadingState(loading) }</title>
      </Head>
      <div className={`bg-white dark:bg-black h-screen w-full flex flex-col items-center justify-center`}>
        { loading !== 'ANIMATION_END' && <Loader loaded={loading === 'ANIMATION_START'} /> }
        { loading === 'ANIMATION_END' &&
          <Chats
            chats={filteredChats}
            search={search}
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            setSearch={setSearch}
            messages={messages}
            users={users}
          /> }
      </div>
    </>
  );

  return template
};

export const getServerSideProps = () => {
  // This is only an exemple of how you could pass data from server to client,
  // you may create another page and not use that use
  const users: UserInterface[] = generateUsers();
  const { chats, messages }: { chats: ChatInterface[], messages: MessageInterface[] } = generateChats();

  return {
    props: {
      users, chats, messages,
    },
  };
}

export default LandingPage;
