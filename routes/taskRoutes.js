const express = require('express')
const router = express.Router();
const Task = require('../models/Task')
const User = require('../models/User')
const ExcelJS = require('exceljs')

router.get('/', async(req, res) => {
    const users = await User.query()
    res.render('tasks', { users })
})


router.post('/add', async(req, res) => {
    const { user_id, task_name, task_status } = req.body
    await Task.query().insert({ user_id, task_name, task_status })
    res.redirect('/tasks')
})
router.get('/export', async(req, res) => {
    const workbook = new ExcelJS.Workbook();
    const userSheet = workbook.addWorksheet('Users')
    const taskSheet = workbook.addWorksheet('Tasks')

    const users = await User.query()
    const tasks = await Task.query()

    userSheet.columns = [
        { header: 'ID', key: 'id' },
        { header: 'Name', key: 'name' },
        { header: 'Email', key: 'email' },
        { header: 'Mobile', key: 'mobile' },
    ];
    userSheet.addRows(users);

    taskSheet.columns = [
        { header: 'ID', key: 'id' },
        { header: 'User ID', key: 'user_id' },
        { header: 'Task Name', key: 'task_name' },
        { header: 'Task Status', key: 'task_status' },
    ];
    taskSheet.addRows(tasks);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=users_tasks.xlsx');

    await workbook.xlsx.write(res);
    res.end();
})

router.get('/:id', async(req, res) => {
    const tasks = await Task.query().where('user_id', req.params.id)
    res.json(tasks);
})

module.exports = router;