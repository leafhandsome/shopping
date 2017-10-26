const key = "buyGoodsCount";

//存储
export function setItem(goodsinfo) {
    var goodsObj = getItem();
    if (goodsObj[goodsinfo.gid]) {
        goodsObj[goodsinfo.gid] = goodsObj[goodsinfo.gid] + goodsinfo.bcount;
    } else {
        goodsObj[goodsinfo.gid] = goodsinfo.bcount;
    }
    // console.log(goodsObj);

    localStorage.setItem(key, JSON.stringify(goodsObj));

}


// 获取

export function getItem() {
    var gStr = localStorage.getItem(key);

    var obj = JSON.parse(gStr);
    // 如果为空
    if (!obj) {
        localStorage.setItem(key, JSON.stringify("{}"));
        return {};
    }
    return obj;
}

// 删除
export function removeItem(goodsid) {
    //获取
    var goodsObj = getItem();
    // 删除
    delete goodsObj[goodsid]
        // 重新设置
    localStorage.setItem(key, JSON.stringify(goodsObj))
}