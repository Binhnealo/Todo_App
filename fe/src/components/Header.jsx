import React from 'react'

const Header = () => {
  return (
    <div className='space-y-2 text-center' >
      <h1 className='text-4xl font-bold text-transparent bg-primary bg-clip-text'>Todo App</h1>
      <p className='text-muted-foreground'>Your tasks at a glance</p>
    </div>
  )
}

export default Header