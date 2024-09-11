import db from "../db.js";

// Get tasks
export const getTasks = async (req, res) => {
  const sql = "SELECT * FROM `tasks` WHERE 1";

  try {
    const tasks = await db.query(sql);
    res.json(tasks);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json(error);
  }
};

// Delete task
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM `tasks` WHERE `id`= ?";

  try {
    await db.query(sql, [id]);
    res
      .status(200)
      .json({ message: `The id: ${id} task has been deleted successfully.` });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Create new task
export const createTask = async (req, res) => {
  const { title, description, priority, status } = req.body;

  const sql = `INSERT INTO tasks (
                              title, 
                              priority,
                              status, 
                              description) 
                          VALUES (?,?,?,?)`;

  try {
    await db.query(sql, [title, priority, status, description]);
    res.status(200);
    res.json("succes");
  } catch (error) {
    res.status(500);
    res.json(error);
    console.log(error);
  }
};

// Get task to update
export const getTask = async (req, res) => {
  const { id } = req.params;

  const sql = `SELECT id,
                      title,
                      priority,
                      status,
                      description
                FROM tasks 
                WHERE id = ?`;

  try {
    const task = await db.query(sql, [id]);
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json(error);
  }
};

// Update task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, priority, status, description } = req.body;

  const sql = `UPDATE tasks SET title=?,
                                priority=?,
                                status=?,
                                description=? 
                            WHERE id=?`;

  try {
    await db.query(sql, [title, priority, status, description, id]);
    res.status(200);
    res.json("succes");
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json(error);
  }
};
