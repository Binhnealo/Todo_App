import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilter from "@/components/StatsAndFilter";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState("today")
  const [page, setPage] = useState(1);
  
  useEffect(()=>{
    fetchTasks()
  },[dateQuery])
  useEffect(() =>{
    setPage(1);
  },[filter,dateQuery])
  
  const handleTaskChange = () =>{
    fetchTasks()
  }
  
  const fetchTasks = async () =>{
    try {
        const res = await api.get(`/todos?filter=${dateQuery}`)
        setTaskBuffer(res.data.todos)
        setActiveTaskCount(res.data.activeCount)
        setCompletedTaskCount(res.data.completeCount)
    } catch (error) {
      console.error("Error fetching tasks:", error)
      toast.error("Failed to fetch tasks. Please try again later.")
    }
  }
  
  const filteredTasks = taskBuffer.filter((task)=>{
    switch(filter){
      case "active":
        return task.status === "active";
      case "completed":
        return task.status === "completed";
      default:        
        return true;
    }
  })
  
  const handleNextPage = () => {
    if(page < totalPages) setPage((prev)=>prev+1);
  }
  const handlePrevPage = () => {
    if(page > 1) setPage((prev)=>prev-1);
  }
  const handlePageChange = (newPage) =>{
    setPage(newPage);
  }
  
  const visibleTask = filteredTasks.slice((page-1)*visibleTaskLimit, visibleTaskLimit*page);
  if(visibleTask.length===0){
    handlePrevPage();
  }
  
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit)
  
  
  return (
    <div className="relative w-full min-h-screen">
  {/* Radial Gradient Background from Top */}
  <div
    className="absolute inset-0 z-0"
    style={{
      background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #475569 100%)",
    }}
  />
  <div className="container relative z-10 pt-8 mx-auto">
      <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
        {/* Đầu Trang */}
        <Header />
        {/* Thêm công việc */}
        <AddTask handleNewAddedTask={handleTaskChange} />
        {/* Thống kê và bộ lọc */}
        <StatsAndFilter 
          filter={filter}
          setFilter={setFilter}
          completedTaskCount={completedTaskCount}
          activeTaskCount={activeTaskCount}
        />
        {/* Danh sách công việc */}
        <TaskList FilteredTask={visibleTask } filter={filter} handleTaskChange={handleTaskChange} />

        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <TaskListPagination 
          handleNextPage={handleNextPage}
          handlePrevPage={handlePrevPage}
          handlePageChange={handlePageChange}
          page={page}
          totalPages={totalPages}
          
          />

          <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
        </div>
        {/* Chân trang */}
        <Footer
        completedTaskCount={completedTaskCount}
          activeTaskCount={activeTaskCount}  />
      </div>
    </div>
</div>

    
  );
};

export default HomePage;
