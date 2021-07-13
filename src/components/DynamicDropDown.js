import React from 'react'
import { createPopper } from '@popperjs/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const DynamicDropdown = ({ linkTextList }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false)
  const [dropdownStyle, setDropdownStyle] = React.useState('bg-white text-green-500')

  const btnDropdownRef = React.createRef()
  const popoverDropdownRef = React.createRef()
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start'
    })
    setDropdownPopoverShow(true)
    setDropdownStyle('bg-green-500 text-white')
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false)
    setDropdownStyle('bg-white text-green-500')
  }
  // bg colors
  //   let bgColor
  const renderedLinks = linkTextList
    ? linkTextList.map((textLinkKeys, index) => {
      return (
        <a
        key={index}
          href="#pablo"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap text-green-500 hover:text-white hover:bg-green-500'
          }
          onClick={textLinkKeys.onClickCallback}
        >
          {textLinkKeys.linkText}
        </a>

      )
    })
    : ''
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="relative inline-flex align-middle w-full">
          <button className={(dropdownStyle) + '  hover:bg-green-500 hover:text-white active:text-white rounded-full w-6 h-6'}

              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover()
              }}
            >
                <FontAwesomeIcon className="fa-xs" icon={faEllipsisV} />
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? 'block ' : 'hidden ') +
                'bg-white  text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1'
              }
            >
            {renderedLinks}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DynamicDropdown
