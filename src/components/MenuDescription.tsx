import React from 'react'

const MenuDescription = ({ description }: { description: string }) => {
  return (
    <p className="italic text-sm text-gray-600 dark:text-gray-300 px-2">
      {description}
    </p>
  )
}

export default MenuDescription