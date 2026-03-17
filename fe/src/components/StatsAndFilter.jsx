import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FilterType } from '@/lib/data'
import { Filter } from 'lucide-react'


const StatsAndFilter = ({completedTaskCount , activeTaskCount , filter , setFilter }) => {
  console.log(completedTaskCount)
  return (
    <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
      {/* Thống kê */}
      <div className='flex gap-3'>
        <Badge
        variant="secondary"
        className="border-info/20 bg-white/50 text-accent-foreground "
        >
        {activeTaskCount} {FilterType.active}  
        </Badge>
        
        <Badge
        variant="secondary"
        className="border-success/20 bg-white/50 text-success"
        >
        {completedTaskCount} {FilterType.completed}  
        </Badge>
        </div>
        {/*  Filter */}
        <div className='flex flex-col gap-2 sm:flex-row'>
          {Object.keys(FilterType).map((type)=>(
            <Button
            key={type}
            variant={filter === type ? "gradient": "ghost"}
            size='sm'
            className="capitalize"
            onClick={()=>setFilter(type)}
            >
              <Filter className='size-4'/>
              {FilterType[type]}
              
            </Button>
          ))}
          
        </div>
      
    </div>
  )
}

export default StatsAndFilter