/**
 * 包含应用中所有接口请求函数的模块
 * 每个函数返回值都是promise对象
 */
import ajax from './ajax'
require('../setupProxy');

//登录
export const reqLogin = (username, password) => ajax('/api/login', { username, password }, 'POST')

//添加用户
export const reqAddUser = (user) => ajax('/api/manage/user/add', user, 'POST')

export const reqWeather = () => ajax('/apc/weather/v1/?district_id=330108&data_type=all&ak=XZAqRfdBfrEH8rKRpY9PmO4tVIhGGGsH', {})


// 获取一级/二级分类的列表
export const reqCategorys = (parentId) => ajax('/api/manage/category/list',{parentId})

// 添加分类
export const reqAddCategory = (categoryName,parentId) => ajax('/api/manage/category/add',{categoryName,parentId},'POST')

// 更新分类
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax('/api/manage/category/update',{categoryId,categoryName},'POST')

// 更新商品的状态(上架/下架)
export const reqUpdateStatus = (productId, status) => ajax('/api/manage/product/updateStatus', {productId, status}, 'POST')

// 获取商品分页列表
export const reqProducts = (pageNum, pageSize) => ajax('/api/manage/product/list', {pageNum, pageSize})

// 获取一个分类
export const reqCategory = (categoryId) => ajax('/api/manage/category/info', {categoryId})

// 删除指定名称的图片
export const reqDeleteImg = (name) => ajax('/api/manage/img/delete', {name}, 'POST')

/*
搜索商品分页列表 (根据商品名称/商品描述)
searchType: 搜索的类型, productName/productDesc
 */
export const reqSearchProducts = ({pageNum, pageSize, searchName, searchType}) => ajax('/api/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]: searchName,
  })

  // 添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax('/api/manage/product/' + ( product._id?'update':'add'), product, 'POST')


/**
 * json请求的接口请求函数
 */
// export const reqWeather = () => {

//     return new Promise( (resolve,reject) => {
//         debugger
//         const url = '/weather/v1/?district_id=330108&data_type=all&ak=XZAqRfdBfrEH8rKRpY9PmO4tVIhGGGsH'
//         // const url = 'https://free-api.heweather.net/s6/weather/now?location=beijing&key=8e10c53739dc46ff9e4d18bb567d777d'
//         jsonp(url,{}, (err, data) => {
//             debugger
//             console.log('jsonp',err,data);

//             if(!err && data.status === 0) {
//                 const {text_day} = data.result.forecasts[0]
//                 resolve(text_day);
//             }else {
//                 message.error("请求数据失败")
//             }
//         })
//     })


// }