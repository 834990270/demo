if [ -d $1 ]; then
  echo 'error: dir exists'
  exit
else

mkdir $1
cd $1
mkdir css js
touch index.html css/style.css js/main.js
echo "<!DOCTYPE><title>Hello</title><link rel="stylesheet" href="css/style.css"><script type="text/javascript" src="js/main.js"></script><h1>Hi</h1></html>" >> index.html
  echo "h1{color: red;}" >> css/style.css
  echo "var string = 'Hello World'; alert(string);" >> js/main.js

  echo 'success'

  exit 

fi

