export default function Routes (suggestions){

  
    async function clientPage(req, res){

        res.render('client', {

        })

    }
    async function addUser(req, res){

        let name = req.body.username

        let code = await suggestions.registerClient(name)


        req.flash('success', 'Authentication code: ' + code)

        res.redirect('/login/' + name)
    }

    async function Login(req, res){
        let username = req.params.name
        res.render('login',{
            username
        })
    }

    async function getUsersCode(req, res){

        let code = req.body.addCode
        let username = req.params.name
        let getCode = await suggestions.clientLogin(code)

         await suggestions.registerClient(username);

         if (getCode.code === code) {
            req.flash('success', 'Succesful')
    
        res.redirect('/Addsuggestion/' + username)
         }

         else if (getCode.code === null) {

            req.flash('errormsg', 'code invalid')

            res.redirect("/login/" + username)
        }

    }

    async function Addsuggestion(req, res){
        let username = req.params.name

        res.render('Addsuggestion',{
            username
        })

    }

    return{
        addUser,
        clientPage,
        getUsersCode,
        Login,
        Addsuggestion        
    }
}