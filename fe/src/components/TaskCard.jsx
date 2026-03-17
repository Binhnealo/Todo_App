import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import api from '@/lib/axios'
import { cn } from '@/lib/utils'
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

const TaskCard = ({task, index, handleTaskChange}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isUpdateTaskTitle, setIsUpdateTaskTitle] = useState(task.title || "")
  
  const deleteTask = async (taskId) =>{
    try {
      await api.delete(`/todos/${taskId}`)
      toast.success("Task deleted successfully!")
      handleTaskChange()
    } catch (error) {
      console.log("Error deleting task:", error)
      toast.error("Failed to delete task. Please try again later.")
    }
  }
  const handleUpdateTask = async () =>{
   if(isUpdateTaskTitle.trim()){
     try {
      setIsEditing(false)
      await api.put(`/todos/${task._id}`,{
        title: isUpdateTaskTitle,
      })
      handleTaskChange()
      toast.success("Task updated successfully!")
      
    } catch (error) {
      console.log("Error updating task:", error)
      toast.error("Failed to update task. Please try again later.")
    }
   }else{
    toast.error("Task title cannot be empty.")
   }
  }
  const handleToggleTaskStatus = async () =>{
    try {
      if(task.status === 'active'){
        await api.put(`/todos/${task._id}`,{
          status: 'completed',
          completeAt: new Date().toISOString()
        })
        toast.success(`Task "${task.title}" marked as completed!`)
      }else{
        await api.put(`/todos/${task._id}`,{
          status: 'active',
          completeAt: null
        })
        toast.success(`Task "${task.title}" marked as active!`)
      }
      handleTaskChange()
    } catch (error) {
      console.log("Error updating task status:", error)
      toast.error("Failed to update task status. Please try again later.")
    }
  }
  
  const handleKeyPress = (e) =>{
    if(e.key === "Enter"){
      handleUpdateTask()
    }
  }
  
  return (
    <Card className={cn("p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
      task.status === 'completed' && 'opacity-75'
    )}
    style={{animationDelay: `${index * 50}ms`}}
    >
      <div className='flex items-center gap-4'>
        {/* Task Status Toggle */}
        <Button 
        variant='ghost'
        size='icon'
        className={cn(
          "shrink-0 size-8 rounded-full transition-all duration-200 ",
          task.status === 'completed'? 'text-success hover:text-success/80': 'text-muted-foreground hover:text-primary'
        )}
        onClick={handleToggleTaskStatus}
        >
          {task.status === 'completed' ? (<CheckCircle2 className='size-5'/>) : (<Circle className='size-5'/>)}
          
        </Button>
        {/* Task Title */}
        <div className='flex-1 min-w-0'>
          {
            isEditing ? (
              <Input
              placeholder='Edit task title...'
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
              type="text"
              value={isUpdateTaskTitle}
              onChange={(e)=>setIsUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur ={() =>{
                setIsEditing(false)
                setIsUpdateTaskTitle(task.title || "")
                handleUpdateTask()
              }
              }
              >
              </Input>
            ) : (<p className={cn(
              "text-base transition-all duration-200",
              task.status === 'completed' ?'line-through text-muted-foreground':' text-foreground'
            )}>
              {task.title}
            </p>)
          }
          {/* Task Dates */}
        <div className='flex items-center gap-2 mt-1'>
          
            <Calendar className='size-3 text-muted-foreground'/>
            <span className='text-xs text-muted-foreground '>
            {new Date(task.createdAt).toLocaleString()}  
            </span> 
            {
              task.completeAt && (
                <>
                <spam className="text-xs text-muted-foreground"> - </spam>
                <Calendar className='size-3 text-muted-foreground'/>
                <span className='text-xs text-muted-foreground'>
                {new Date(task.completeAt).toLocaleString()}
                  
                </span>
                </>
              )
            }
        </div>
        </div>
        
        {/* Edit Button */}
        <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
          <Button
            variant='ghost'
            size='icon'
            className="transition-colors shrink-0 size-8 text-muted-foreground hover:text-info"
            onClick={() => {
              setIsEditing(true)
              setIsUpdateTaskTitle(task.title || "")
            }}
            
          >
            <SquarePen className='size-4'/>
          </Button>
          {/* Delete Button */}
          <Button
          variant='ghost'
          size='icon'
          className="transition-colors shrink-0 size-8 text-muted-foreground hover:text-destructive"
          onClick={()=>deleteTask(task._id)}
          >
            <Trash2 className='size-4'/>
          </Button>
        </div>
        
      </div>
    </Card>
  )
}

export default TaskCard