export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return regex.test(email)
}

export const getInitials = (name) => {
    if (!name) return '' ; 
    const initials = name.split(' ').map((word) => word[0]).join('') ; 
    
    return initials ;
}