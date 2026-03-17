import Todo from "../models/todo.js";

export const getAllTodos = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case "week": {
      const mondayDate =
        now.getDate() - (now.getDate() - 1) - (now.getDate === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case "all":
    default: {
      startDate = null;
    }
  }
  const query = startDate ? { createdAt : { $gte: startDate } } : {};

  try {
    const result = await Todo.aggregate([
      { $match: query },
      {
        $facet: {
          todos: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completeCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    const todos = result[0].todos;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completeCount = result[0].completeCount[0]?.count || 0;
    res.status(200).json({ todos, activeCount, completeCount });
  } catch (err) {
    console.log("lỗi khi gọi getAllTodos", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todo = new Todo({ title });
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.log("lỗi khi gọi createTodo", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { title, status, completeAt } = req.body;
    const updateTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completeAt,
      },
      { new: true },
    );
    if (!updateTodo) {
      return res.status(404).json({ message: "Không tìm thấy todo" });
    }
    res.status(200).json(updateTodo);
  } catch (error) {
    console.log("lỗi khi gọi updateTodo", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Không tìm thấy todo" });
    }
    res.status(200).json({ message: "Xóa todo thành công" });
  } catch (error) {
    console.log("lỗi khi gọi deleteTodo", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
