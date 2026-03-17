import React from 'react'

const Footer = ({completedTaskCount, activeTaskCount }) => {

  
  return (
    <>
    {completedTaskCount>0 && completedTaskCount + activeTaskCount > 0 && (
      <div>
        <div className='text-center text-foreground/70'>
        Congratulations! You have completed {completedTaskCount} tasks 
        {activeTaskCount > 0 && ` and have ${activeTaskCount} active tasks remaining.`}
        </div>
      </div>
    )}
    {completedTaskCount === 0 && activeTaskCount >0 && (
      <div className='text-center text-foreground/70'>
      let's get started! You have {activeTaskCount} active tasks to complete.
      </div>
    )}
    
    </>
  )
}

export default Footer