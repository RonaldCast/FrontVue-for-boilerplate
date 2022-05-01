export default interface CreateUser {
    emailAddress: string
    isActive: boolean
    name: string
    password: string
    roleNames: Array<string>
    surname: string
    userName: string
}