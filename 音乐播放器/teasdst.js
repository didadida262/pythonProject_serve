let foo  = {name : 'alice',age : 11}
let bar  = {name : 'bob',sex : 'male'}
bar.__proto__ = foo
console.log('foo:',foo)
console.log('bar.age:',bar.name)

