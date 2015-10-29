//运行部分代码
var mycanvas = document.getElementById("myCanvas");
var mycontext = mycanvas.getContext('2d');
paintGrid();
GameMap.init();

//响应鼠标点击事件，手动更改细胞状态
mycanvas.onclick = function (e) {
    if (!Clock.flag && Clock.beginFlag)
    //只有在游戏暂停状态才可以手动更改细胞状态
    {
        var x = Math.floor(e.offsetX / (mycanvas.width / GameMap.column)) + mapOffset;
        var y = Math.floor(e.offsetY / (mycanvas.height / GameMap.row)) + mapOffset;
                
        GameMap.changeCell(y, x);
        paint();
    }
    if (!Clock.beginFlag)
    {
        var x = Math.floor(e.offsetX / (mycanvas.width / GameMap.column)) + mapOffset;
        var y = Math.floor(e.offsetY / (mycanvas.height / GameMap.row)) + mapOffset;

        GameMap.changeWall(y, x);
        paint();
    }
}

//设置行列数size
document.getElementById('SetSize').onclick = function () {
    var mySize = parseInt(document.getElementById('mySizeInput').value);
    if (mySize > 0 && mySize <= maxSize)
    {
        document.getElementById('mySizeInput').value = "";
        Clock.over();
        GameMap.setSize(mySize);
        paintGrid();
    }
    else 
    {
        document.getElementById('mySizeInput').value = "";
        alert("地图尺寸设置范围1~" + maxSize + "！");
    }
}

//设置刷新间隔
document.getElementById('setInterval').onclick = function () {
    var newInterval = parseInt(document.getElementById('interval').value);
    if (Clock.beginFlag)
        Clock.over();
    Clock.interval = newInterval;
}

//设置活细胞比例
document.getElementById('setRate').onclick = function () {
    var newRate = parseInt(document.getElementById('rate').value);
    if (Clock.beginFlag)
        Clock.over();
    GameMap.rate = newRate / 10;
}

//游戏开始
document.getElementById('start').onclick = function () {
    Clock.start();
}

//游戏运行/暂停切换
document.getElementById('myState').onclick = function () {
    if (Clock.beginFlag)
    {
        if (!Clock.flag) {
            Clock.run();
        }
        else {
            Clock.stop();
        }
    }
}

//重置游戏
document.getElementById('reset').onclick = function () {
    Clock.over();
}