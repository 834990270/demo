var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

let sessions = {
  
}
var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)

  if (path === '/') {
    var users = fs.readFileSync('./db/users','utf8')
    try{users =JSON.parse(users)
    }catch{
      users = []
    }
    let string = fs.readFileSync('./index.html', 'utf8')
    let cookies = ''
    if(request.headers.cookie){
      cookies = request.headers.cookie.split(';')
    }
    let hash = {}
    for(i=0 i<Cookies.length;i++){
      let parts =cookies[i].split('=')
      let key=parts[0]
      let value = parts[1]
      hash[key] = value
    }
    let mySession = sessions[hash.sessionId]
    let email
    if(mySession){
      email=mySession.sign_in_email
    }
    var users = fs.readFileSync('./db/users','utf8')
    users = JSON.parse(users)
    for(i=0 i<users.length;i++){
      if(users[i].email === email){
        foundUser =users[i]
        break
      }
    }
    if(foundUser){
      string = string.replace('--password--',foundUser.password)
    }else{
      string = string.replace('--password--','不知道')
    }
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/sign_up' && method === 'GET') {
    let string = fs.readFileSync('./sign_up', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/sign_up' && method === 'POST') {
    readBody(request).then((body)=>{
      let strings=body.split('&')
      let hash ={}
      strings.forEach((string)=>{
        let parts=string.split('=')
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value)
    })
      let {email,password,password_confirmation}= hash
      if(email.indexOf('@') === -1){
        response.statusCode = 400
        response.setHeader('Content-Type', 'application/json;charset=utf-8')
        response.write(`{
          "errors":{
            "email":"invalid"
          }
        }`)
      }else if(password !== password_confirmation){
        response.write('password not match')
      }else{
        var users = fs.readFileSync('./db/users','utf8')
        try{users =JSON.parse(users)
        }catch{
          users = []
        }
        let inUse = false
        for(let i=0 i<users.length; i++){
          let users = users[i]
          for(users === users[i]){
            inUse = true
            break;
          }
        }
        if(inuse){
          response.statusCode = 400
          response.write(email in use)
        }else {
        users=JSON.parse(users)
        users.push({email:email,password:password})
        var usersString = JSON.stringify(users)
        fs.writeFileSync('./db/users',usersString)
        response.statusCode = 200
        }
      }
      response.end()
    });
  }else if(path === '/sign_in' && method === 'GET'){
    let string = fs.readFileSync('./sign_in.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  } else if(path === '/sign_in' && method === 'POST'){
    readBody(request).then((body)=>{
      let strings=body.split('&')
      let hash ={}
      strings.forEach((string)=>{
        let parts=string.split('=')
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value)
    })
    let {email,password,}= hash
    console.log('email')
    console.log(email)
    console.log('password')
    console.log(password)
    var users = fs.readFileSync('./db/users','utf8')
    try{users =JSON.parse(users)
    }catch{
      users = []
    }
    let fount
    for(let i=0 i<users.length; i++){
      if(email === email[i] && password === password[i]){
        fount = true
        break
      }
      if(fount){
        let sessionId =Math.random() *100000
        sessions[sessionId] = {sign_in_email:email}
        //Set-Cookie: <cookie-name>=<cookie-value> 
        response.setHeader('Set-Cookie',`sessionId=${sessionId}`)
        response.statusCode = 200
      }else{
        response.statusCode = 401
      }
    }
    response.end()
  })
  }else if (path === '/main.js') {
    let string = fs.readFileSync('./main.js', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(string)
    response.end()
  } else if (path === '/xxx') {
    response.statusCode = 200
    response.setHeader = ('Content-Type', 'text/json;charset=utf-8')
    //CORS跨域
    response.setHeader = ('Access-Control-Allow-Origin', 'http://frank.com:8001')
    //允许这个域名CORS他
    response.write(`
    <?xml version="1.0" encoding="UTF-8"?>
    {
      "note":{
        "to":"小谷"
        "from":"方方"
        "heading":"打招呼"
        "content":"hi"
      }
    }
    `)
    // response.setHeader=('Content-Type','text/xml')
    // response.write(`
    // <?xml version="1.0" encoding="UTF-8"?>
    // <note>
    //   <to>Tove</to>
    //   <from>Jani</from>
    //   <heading>Reminder</heading>
    //   <body>Don't forget me this weekend!</body>
    //   </note>
    // `)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('呜呜呜')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})
function readBody(request){
  return new Promise((resolve,reject)=>{
    let body=[]
    request.on('data')
    request.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      resolve(body)
    });
  })
}

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)

