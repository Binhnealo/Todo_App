import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import api from '@/lib/axios'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

const AddTask = ({ handleNewAddedTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const handleAddTask = async () => {
    if(newTaskTitle.trim()){
      try {
        await api.post("/todos", {title: newTaskTitle})
        toast.success(`added task: ${newTaskTitle} successfully!`)
        handleNewAddedTask()
      } catch (error) {
        console.error("Error adding task:", error)
        toast.error("Failed to add task. Please try again later.")
      }
      setNewTaskTitle("")
    }else{
      toast.error("Task title cannot be empty.")
    } 
  }
  const handleKeyPress = (e) =>{
    if(e.key === "Enter"){
      handleAddTask()
    }
  }
  return (
    <Card className="p-6 shadow-custom-lg bg-gradient-card ">
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Input
        type = "text" 
        placeholder="Add a new task..."
        className="h-12 text-base border-border/50 bg-slate-50 sm:flex-1 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(e)=>setNewTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
        variant='gradient'
        size='xl'
        className="px-6 cursor-pointer"
        onClick={handleAddTask}
        disabled={!newTaskTitle.trim()}
        >
          <Plus className='size-5'/>
          Add
        </Button>
      </div>
    </Card>
  )
}

export default AddTask