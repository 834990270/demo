if [ -d $1 ]; then
  echo '$1 已经存在'
  exit 1
else
mkdir $1
cd $1
mkdir css js
touch index.html css/style.css js/main.js
echo "<!DOCTYPE html>
<html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="css/style.css">
    <script type="text/javascript" src="js/main.js"></script>
    <title>hello</title>
    <h1>Hi</h1>
</html>" >> index.html
  echo "h1{color: red;}" >> css/style.css
  echo "var string = 'Hello World'; alert(string);" >> js/main.js
  echo 'success'
exit 0
fi
