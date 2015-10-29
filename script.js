/*eslint-env browser */
//全局变量
mapOffset = 2; //地图大小偏移量
maxSize = 300; //地图大小限制
liveCellColor = 'rgb(0,0,0)'; //活细胞颜色
//deadCellColor = 'rgb(255,255,255)'; //死细胞颜色
wallColor = 'rgb(127,127,127)'; //墙壁颜色
bgColor = 'rgb(255,255,255)'; //背景颜色
gridColor = 'rgb(0,0,0)'; //网格线颜色

//GameMap类
GameMap = {};
GameMap.row = 50;
GameMap.column = 50;
GameMap.dataA = new Array();
GameMap.dataB = new Array();
GameMap.dataWall = new Array();
GameMap.dataFlag = true; //True表示使用dataA False表示使用dataB
GameMap.rate = 0.5; //随机初始化活细胞比率

GameMap.init = function () {
    //初始化data
    this.dataFlag = true;
    this.dataA = new Array();
    this.dataB = new Array();
    this.dataWall = new Array();

    for (var i = 0; i < this.row + 2*mapOffset; i++)
    {
        this.dataA[i] = new Array();
        this.dataB[i] = new Array();
        this.dataWall[i] = new Array();
        for (var j = 0; j < this.column + 2*mapOffset; j++)
        {
            this.dataA[i][j] = 0;
            this.dataB[i][j] = 0;
            this.dataWall[i][j] = false;
        }
    }
}

GameMap.setSize = function (newSize) {
    //设置地图尺寸
    if(newSize < 1 || newSize > maxSize)
        return;
    this.row = newSize;
    this.column = newSize;
    this.init();
}

GameMap.updateData = function () {
    //更新下一代细胞
    var counter = 0;
    var row = this.row + mapOffset;
    var column = this.column + mapOffset;
    this.dataFlag = !this.dataFlag;

    if (!this.dataFlag) {
        for (var i = mapOffset; i < row; i++) {
            for (var j = mapOffset; j < column; j++) {
                counter = this.dataA[i - 2][j] + this.dataA[i - 1][j] + this.dataA[i + 1][j] + this.dataA[i + 2][j] + this.dataA[i][j - 2] + this.dataA[i][j - 1] + this.dataA[i][j + 1] + this.dataA[i][j + 2];
                if (!this.dataWall[i][j])
                {
                    if (counter == 3)
                        this.dataB[i][j] = 1;
                    else if (counter != 2)
                        this.dataB[i][j] = 0;
                    else
                        this.dataB[i][j] = this.dataA[i][j];
                }
            }
        }
    }
    else
    {
        for (var i = mapOffset; i < row; i++)
        {
            for (var j = mapOffset; j < column; j++)
            {
                counter = this.dataB[i - 2][j] + this.dataB[i - 1][j] + this.dataB[i + 1][j] + this.dataB[i + 2][j] + this.dataB[i][j - 2] + this.dataB[i][j - 1] + this.dataB[i][j + 1] + this.dataB[i][j + 2];
                if (!this.dataWall[i][j])
                {
                    if (counter == 3)
                        this.dataA[i][j] = 1;
                    else if (counter != 2)
                        this.dataA[i][j] = 0;
                    else
                        this.dataA[i][j] = this.dataB[i][j];
                }
            }
        }
    }
}

GameMap.randomSet = function () {
    //随机初始化
    var row = this.row + mapOffset;
    var column = this.column + mapOffset;

    for (var i = mapOffset; i < row; i++)
    {
        for (var j = mapOffset; j < column; j++)
        {
            if (!this.dataWall[i][j])
                this.dataA[i][j] = (Math.random() < this.rate) ? 1 : 0;
        }
    }
}

GameMap.changeCell = function (row, column) {
    //转化当前细胞状态（用于响应手动设置操作）
    if (!Clock.flag && Clock.beginFlag)
    {
        this.dataA[row][column] = 1 - this.dataA[row][column];
        this.dataB[row][column] = 1 - this.dataB[row][column];
    }
}

GameMap.changeWall = function (row, column) {
    //设置墙壁
    if (!Clock.beginFlag)
    {
        this.dataWall[row][column] = !this.dataWall[row][column];
    }
}


//Clock计时类
Clock = {};
Clock.interval = 100;
Clock.flag = false; //False表示游戏为暂停状态 True为运行状态
Clock.beginFlag = false; //False表示游戏未开始 True为游戏开始

Clock.start = function () {
    //开始游戏
    Clock.over();
    this.beginFlag = true;
    GameMap.randomSet();
    paint();
    this.run();
}

Clock.over = function () {
    //结束游戏
    if(this.beginFlag)
    {
        this.stop();
        this.beginFlag = false;
        paintGrid();
        GameMap.init();
    }
}

Clock.run = function () {
    //触发细胞更新
    this.flag = true;
    timer = setInterval("paint()", this.interval);
    document.getElementById('myState').innerHTML = "STOP";
}

Clock.stop = function () {
    //暂停游戏
    this.flag = false;
    try{
        clearInterval(timer);
    } catch (e) { }
    document.getElementById('myState').innerHTML = 'RUN';
}


function paintGrid() {
    //绘制表格
    var mx = mycanvas.width / GameMap.column;
    var my = mycanvas.height / GameMap.row;

    mycontext.fillStyle = bgColor;
    mycontext.fillRect(0, 0, mycanvas.width, mycanvas.height);

    mycontext.strokeStyle = gridColor;
    for (var i = 0; i <= GameMap.row; i++)
    {
        mycontext.beginPath();
        mycontext.moveTo(0, i * my);
        mycontext.lineTo(mycanvas.width, i * my);
        mycontext.stroke();
    }
    for (var i = 0; i <= GameMap.column; i++)
    {
        mycontext.beginPath();
        mycontext.moveTo(i * mx, 0);
        mycontext.lineTo(i * mx, mycanvas.height);
        mycontext.stroke();
    }
}


function paint() {
    GameMap.updateData();

    //根据data绘制canvas
    var data;
    if(GameMap.dataFlag)
        data = GameMap.dataA;
    else
        data = GameMap.dataB;

    paintGrid();

    var mx = mycanvas.width / GameMap.column;
    var my = mycanvas.height / GameMap.row;    

    //绘制细胞
    var row = GameMap.row + mapOffset;
    var column = GameMap.column + mapOffset;

    for (var i = mapOffset; i < row; i++)
    {
        for (var j = mapOffset; j < column; j++)
        {
            if (GameMap.dataWall[i][j])
            {
                mycontext.fillStyle = wallColor;
                mycontext.fillRect((j - mapOffset) * mx, (i - mapOffset) * my, mx, my);
            }
            else if (data[i][j])
            {
                mycontext.fillStyle = liveCellColor;
                mycontext.fillRect((j - mapOffset) * mx, (i - mapOffset) * my, mx, my);
            }
        }
    }
}


module.exports.GameMap = GameMap;
module.exports.Clock = Clock;
module.exports.mapOffset = mapOffset;
module.exports.maxSize = maxSize;
