const API='/api'
//注册
const addUser=API+'/addUser'
const login=API+'/login'

//申请店铺
const addUseradmin=API+'/addUseradmin'

//用户修改
const updatedUser=API+'/updatedUser'
const findUser=API+'/findUser'
const changePassUser=API+'/changePassUser'

// 轮播图
const findBanner=API+'/findBanner'
// 类型
const findNav=API+'/findNav'

//收货地址
const address=API+'/address'
const findAddress=API+'/findAddress'
const delAddress=API+'/delAddress'
const updateAddress=API+'/updateAddress'

//商品
const findWares=API+'/findWares'

//收藏
const addCollection=API+'/addCollection'
const findCollection=API+'/findCollection'
const delCollection=API+'/delCollection'

//加入购物车
const addCart=API+'/addCart'
const findCart=API+'/findCart'
const delCart=API+'/delCart'

//购买
const addBuy=API+'/addBuy'
const addBuy1=API+'/addBuy1'
const findBuy=API+'/findBuy'
const delBuy=API+'/delBuy'

//评论
const addComment=API+'/addComment'
const findComment=API+'/findComment'

// 点赞
const addPoint=API+'/addPoint'
const findpoint=API+'/findpoint'
//退出登录
const exit=API+'/exit'

export default{
    addUser,
    login,
    address,
    findAddress,
    delAddress,
    updateAddress,
    addUseradmin,
    updatedUser,
    findUser,
    changePassUser,
    findBanner,
    findNav,
    findWares,
    addCollection,
    findCollection,
    delCollection,
    addCart,
    findCart,
    delCart,
    addBuy,
    addBuy1,
    findBuy,
    delBuy,
    addComment,
    findComment,
    addPoint,
    findpoint,
    exit
}