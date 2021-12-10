
import { ChangeEvent, forwardRef, HTMLAttributes, useRef } from "react";
import ClubLogoSvg from 'icons/club-logo.svg'
import Image from 'next/image'
import moment from 'moment';
import SearchIconSvg from 'icons/search-icon.svg';
import UserInterface from "types/users";
import MessageInterface from "types/messages";
import ChatInterface from "types/chats";
import Link from 'next/link'


type ChatsProps = HTMLAttributes<HTMLDivElement> & {
  chats: ChatInterface[]
  messages: MessageInterface[]
  users: UserInterface[]
  currentChat: ChatInterface
  setSearch: (query: string) => void
  search: string
}

const Chats = forwardRef<HTMLDivElement, ChatsProps>(({ chats, currentChat, setSearch, search, messages, users, ...props }, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  return (
    <div {...props} ref={ref} className="flex transition-all duration-200 w-full flex-grow opacity-100">
          <div data-name="chats" className="flex flex-col flex-none w-36 laptop:w-80 transition-all px-2 py-1 max-h-full overflow-auto justify-start items-center border-r border-gray-200 dark:border-gray-700">
            <div className="my-5">
              <ClubLogoSvg className="w-[100px] text-black dark:text-white" />
            </div>
            <div className="flex flex-row justify-between items-center w-full px-2">
              <Image src="https://source.unsplash.com/64x64/?profile" alt="my profile" width={35} height={35} className="w-[35px] h-[35px] rounded-full" />
              <p className="text-black dark:text-white">{chats.length} chats</p>
            </div>
            <div className="py-4 px-2 w-full">
              <div className="bg-gray-bubble bg-opacity-20 hover:bg-opacity-25 flex flex-row rounded-full justify-start items-center py-1 px-2.5 cursor-text overflow-hidden" onClick={() => { inputRef.current.focus() }}>
                <label htmlFor="chatSearch">
                  <SearchIconSvg className="w-2.5 text-black dark:text-white" />
                </label>
                <input ref={inputRef} value={search} onChange={handleSearch} id="chatSearchInput" name="chatSearch" type="text" placeholder="Search a person" className="bg-transparent border-none outline-none text-black dark:text-white ml-2.5" />
              </div>
            </div>
            <div className="w-full">
              {chats.map((chat) => {
                const user = users.find(u => u.id === chat.withUser)
                const lastMessage = messages.find(m => m.id === chat.lastMessage)
                if (!user) {
                  // returning an empty div so we ignore the chat?? not really sure yet
                  return <></>
                }
                return (
                  <Link href={`/chat/${chat.id}`} key={chat.id}>
                    <a className={`${currentChat.id === chat.id ? 'bg-gray-card' : 'bg-transparent'} bg-opacity-20 p-2 rounded-card flex w-full cursor-pointer justify-start`} onClick={() => { setSearch('') }}>
                      <div className="flex w-[50px] h-[50px]">
                        <Image src={user.profilePicture} layout="fixed" alt="my profile" width={50} height={50} className="w-[50px] h-[50px] rounded-full" />
                      </div>
                      <div className="tablet:mx-4 hidden tablet:flex flex-col w-fit-content overflow-hidden">
                        <span className="text-lg text-black dark:text-white">{ user.name }</span>
                        <p className="text-sm text-gray-subtext overflow-ellipsis overflow-hidden whitespace-nowrap">{ lastMessage.content }</p>
                      </div>
                      <div className="hidden tablet:block text-right text-gray-subtext flex-grow h-full self-end text-sm">
                        <p>{ moment(lastMessage.date).fromNow(true) }</p>
                      </div>
                    </a>
                  </Link>
                )
              })}
            </div>
          </div>
          <div data-name="messages" className="flex flex-grow flex-col">
            {currentChat.messages.map((id) => {
              const message = messages.find(m => m.id === id)

              if (!message) {
                return (<></>)
              }

              return (
                <div className="text-black dark:text-white" key={id}>
                  { message.content}
                </div>
              )
            })}
          </div>
          <div data-name="details" className="flex flex-none w-0 laptop:w-80"></div>
        </div>
  )
})

Chats.displayName = 'ChatsTpl'

export default Chats
