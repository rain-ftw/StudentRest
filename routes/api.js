import express from 'express'
import db from '../db.js'

const app = express()
const router = express.Router();

app.use(express.json())

db.connect()

router.route('/students')
    .get((req, res) => {
    db.query('SELECT * from student', (error, results, fields) => {
        if (error) throw error
        return res.send({ students: results })
    })
    })

router.route('/student')
.post((req, res) => {
    let student = req.body
    console.log(student)
    if (!student) res.send("Provide Data")

    db.query("INSERT into student VALUES(?,?,?,?,?,?,?,?,?,?)",
    [ student.regNo,
        student.studentName,
        student.age,
        student.standard,
        student.hindi,
        student.english,
        student.science,
        student.maths,
        student.social,
        student.percentage
    ],
        (error, results, fields) => {
            if (error) throw error
            res.send("Insertion Successfull")
        }
    )
})


router.route('/student/:id')
    .get((req, res) => {
    db.query('SELECT * FROM student WHERE regNo=?', req.params.id, (error, results, fields) => {
        if (error) throw error
        return res.send({ results })
    })
})
    .put((req, res) => {
        let student = req.body;
        let q = 'UPDATE student set studentName = ?, age = ?, standard = ?, hindi = ?, english = ?, science = ?, maths = ?, social = ?, percentage = ? WHERE regNo = ?'
        db.query(q,
            [  student.studentName,
                student.age,
                student.standard,
                student.hindi,
                student.english,
                student.science,
                student.maths,
                student.social,
                student.percentage,
                req.params.id],
            (error, results, fields) => {
                if (error) throw error
                return res.send('Student Updated')
            })
    })
    .delete((req, res) => {
        db.query('DELETE FROM student WHERE regNo=?', req.params.id, (error, results, fields) => {
            if (error) throw error
            return res.send('Student Deleted')
        })
    })

router.route('/students/sort/:prop')
    .get((req, res) => {
        let sortKey = req.params.prop;
        let q = `SELECT * from student ORDER BY ${sortKey}`
        db.query(q,(error, results, fields) => {
            if (error) throw error
            return res.send({ results })
    })
})

router.route('/students/result')
.get((req, res) => {
    let sortKey = req.query.pass.toString();
    let q;
    if(sortKey === 'true')
        q = 'SELECT * from student WHERE percentage > 60'
    else if(sortKey === 'false')
        q = 'SELECT * from student WHERE percentage < 60'
    else 
        return res.send("Invalid Query")

    db.query(q,(error, results, fields) => {
        if (error) throw error
        return res.send({ results })
})
})


export default router;