class Person {
    constructor(name, age){
        this.name = name
        this.age = age
    }

    printName() {
        console.log(this.name)
    }

    static goodName = 'Alexander' //only avaliable on the class itself

}

const newPerson = new Person('Alex', 30)


class User{
    constructor(email, password, language){
        this.email = email
        this.password = password
        this.language = language
    }
    printPassword(){
        console.log(this.password)
    }
    get name(){
        return this.email.split('@')[0]
    }
    
    set name(vlaue){
        const [,suffix] = this.email.split('@')
        this.email = value + '@' + suffix
    }
}

function UserProtorype(email, password, language){
    this.email  = email
    this.password = password
    this.language = language
    this.printPassword = function(){
        console.log(this.password)
    }
}

UserProtorype.prototype.printPassword2 = function(){
    console.log(this.password)
}