const db = require('../models')
const user = db.User

class UserService{
  async createUsers(req, res, data){
    const { mail, name, password, confirmPassword } = data
    try{
      if (!mail || !password) {
        req.flash('error', 'mail 及 password 為必填')
        return res.redirect('back')
    }
    
    if (password !== confirmPassword) {
        req.flash('error', '驗證密碼與密碼不符')
        return res.redirect('back')
    }

    return user.count({ where: { mail }})
        .then((rowCount) => {
            if (rowCount > 0) {
                req.flash('error', 'email 已註冊')
                return
            }
            return user.create({ mail, name, password })
        })
        .then((user) => {
            if (!user) {
                return res.redirect('back')
            }

            req.flash('success', '註冊成功')
            return res.redirect('/login')
        })
    } catch (err){
        console.log(err)
        throw err
        }        
 }
}

module.exports = new UserService();