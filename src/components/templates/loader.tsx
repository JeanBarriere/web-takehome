import { forwardRef, HTMLAttributes } from "react";
import ClubLogoSvg from 'icons/club-logo.svg'

type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  loaded: boolean
}

const Loader = forwardRef<HTMLDivElement, LoaderProps>(({ loaded, ...props }, ref) => {
  return (
    <div
      {...props}
      className={`flex flex-col transition-all duration-500 justify-center items-center ${loaded ? 'scale-0' : ''}`}
    >
      <ClubLogoSvg className="w-[100px] text-black dark:text-white" />
      <p className="text-black dark:text-white text-[23px] mt-[8px]">
        takehome
      </p>
    </div>
  )
})

Loader.displayName = 'LoaderTpl'

export default Loader
