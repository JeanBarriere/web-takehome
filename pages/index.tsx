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
import { useRouter } from 'next/dist/client/router';

interface LandingPageProps {
  users: UserInterface[];
  chats: ChatInterface[];
  messages: MessageInterface[];
};


type LoadingState = 'LOADING' | 'ANIMATION_START' | 'ANIMATION_END'

const LandingPage = ({ users, chats, messages}: LandingPageProps) => {
  const [search, setSearch] = useState('')
  const router = useRouter()
  const filteredChats = useMemo(() => chats.filter(c => users.find(u => u.id === c.withUser).name.toLowerCase().includes(search.toLowerCase().trim())), [search, chats, users])
  const [loading, setLoading] = useState<LoadingState>('LOADING')

  // should maybe use the next router here for proper routing
  const [currentChat, setCurrentChat] = useState(chats[0])

  // const [filteredChats, setFilteredChats] = useState(chats.slice())

  // useEffect(() => {
  //   setFilteredChats()
  // }, [search])

  // TODO: find something like the <Transition> component in Vue to interact with templates in Next.js
  // Fast & easy trick for now
  useEffect(() => {
    if (loading === 'LOADING') {
      setTimeout(() => {
        setLoading('ANIMATION_START')
        setTimeout(() => {
          setLoading('ANIMATION_END')
          router.push(`/chat/${chats[0].id}`)
        }, 500)
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
        <Loader loaded={loading === 'ANIMATION_START'} />
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

  console.log(users, chats)

  return {
    props: {
      users, chats, messages,
    },
  };
}

export default LandingPage;
