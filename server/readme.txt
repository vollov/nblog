Simple blog 

[1] To setup test environment in a fresh workspace:
$mongo localhost:27017/nblog schema.js
$redis-cli
>hmset f2cb3e8d653f46008272113c6c72422843901ef3 username wendy@abc.com role 2
mongoimport -d nths -c message --type csv --file ./message.csv --headerline
f2cb3e8d653f46008272113c6c72422843901ef3

