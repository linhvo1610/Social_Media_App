export const API={
    login:'http://192.168.102.16:3000/users?username=',
    getlistarticle:"http://192.168.102.16:3000/posts?_expand=users",
    getlistuser:"http://192.168.102.16:3000/users/",
    updatearticleadmin:'http://192.168.102.16:3000/posts/',
    updatelikearticleadmin:'http://192.168.102.16:3000/posts?likes=0',
    deletearticleadmin:'http://192.168.102.16:3000/posts/',
    getlistcommentadmin:"http://192.168.102.16:3000/comments?_expand=users&postsId=",
    getlistcommentguest:"http://192.168.102.16:3000/comments?_expand=users&postsId=",
    addcommentadmin:"http://192.168.102.16:3000/comments",
    addcommentguest:"http://192.168.102.16:3000/comments",
    deletecommentadmin:"http://192.168.102.16:3000/comments/",
    deletecommentguest:"http://192.168.102.16:3000/comments/",
    deleteuser:"http://192.168.102.16:3000/users/",
    updatecommentadmin:"http://192.168.102.16:3000/comments/"
}