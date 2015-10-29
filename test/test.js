var assert = require('assert');
var testFile = require('../script');

describe('test script.js', function(){
	describe('test GameMap', function(){
		describe('test GameMap.init()', function(){
			it('should init every grid\'s value to 0', function(){
				testFile.GameMap.init();
				for(var i = 0; i < testFile.GameMap.row + 2*testFile.mapOffset; i++){
					for(var j = 0; j < testFile.GameMap.column; j++){
						assert.equal(testFile.GameMap.dataA[i][j], 0);
						assert.equal(testFile.GameMap.dataB[i][j], 0);
						assert.equal(testFile.GameMap.dataWall[i][j], 0);
					}
				}
			});
		});

		describe('test GameMap.setSize()', function(){
			it('GameMap.row and GameMap.column should be newSize', function(){
				testFile.GameMap.setSize(5);
				assert.equal(testFile.GameMap.row, 5);
				assert.equal(testFile.GameMap.column, 5);

				testFile.GameMap.setSize(-1);
				var flag = true;
				if(testFile.GameMap.row == -1 || testFile.GameMap.column == -1)
					flag = false;
				assert.equal(flag, true);

				testFile.GameMap.setSize(testFile.maxSize+1);
				var flag = true;
				if(testFile.GameMap.row == (testFile.maxSize+1) || testFile.GameMap.column == (testFile.maxSize+1))
					flag = false;
				assert.equal(flag, true);

				testFile.GameMap.setSize(50);
			});
		});

		describe('test GameMap.changeWall()', function(){
			it('dataWall should be changed correctly', function(){
				testFile.GameMap.init();
				testFile.GameMap.changeWall(20, 25);
				assert.equal(testFile.GameMap.dataWall[20][25], 1);	
				testFile.GameMap.changeWall(20, 25);
				assert.equal(testFile.GameMap.dataWall[20][25], 0);				
			});
		});

		describe('test GameMap.updateData()', function(){
			it('should have correct neighbors(from dataA to dataB)', function(){
				testFile.GameMap.setSize(4);

				testFile.GameMap.init();
				testFile.GameMap.dataFlag = true;

				mapOffset = testFile.mapOffset;

				testFile.GameMap.changeWall(1+mapOffset, 1+mapOffset);
				testFile.GameMap.changeWall(2+mapOffset, 2+mapOffset);
				testFile.GameMap.changeWall(1+mapOffset, 2+mapOffset);

				testFile.GameMap.dataA[0+mapOffset][1+mapOffset] = 1;
				testFile.GameMap.dataA[0+mapOffset][2+mapOffset] = 1;
				testFile.GameMap.dataA[0+mapOffset][3+mapOffset] = 1;

				testFile.GameMap.dataA[1+mapOffset][0+mapOffset] = 1;
				testFile.GameMap.dataA[1+mapOffset][3+mapOffset] = 1;

				testFile.GameMap.dataA[2+mapOffset][0+mapOffset] = 1;
				testFile.GameMap.dataA[2+mapOffset][3+mapOffset] = 1;

				testFile.GameMap.dataA[3+mapOffset][0+mapOffset] = 1;
				testFile.GameMap.dataA[3+mapOffset][2+mapOffset] = 1;

				testFile.GameMap.updateData();

				assert.equal(testFile.GameMap.dataB[0+mapOffset][0+mapOffset], 0);
				assert.equal(testFile.GameMap.dataB[0+mapOffset][1+mapOffset], 1);
				assert.equal(testFile.GameMap.dataB[0+mapOffset][2+mapOffset], 1);
				assert.equal(testFile.GameMap.dataB[0+mapOffset][3+mapOffset], 0);

				assert.equal(testFile.GameMap.dataB[1+mapOffset][0+mapOffset], 1);
				assert.equal(testFile.GameMap.dataB[1+mapOffset][1+mapOffset], 0);
				assert.equal(testFile.GameMap.dataB[1+mapOffset][2+mapOffset], 0);
				assert.equal(testFile.GameMap.dataB[1+mapOffset][3+mapOffset], 1);

				assert.equal(testFile.GameMap.dataB[2+mapOffset][0+mapOffset], 1);
				assert.equal(testFile.GameMap.dataB[2+mapOffset][1+mapOffset], 1);
				assert.equal(testFile.GameMap.dataB[2+mapOffset][2+mapOffset], 0);
				assert.equal(testFile.GameMap.dataB[2+mapOffset][3+mapOffset], 1);

				assert.equal(testFile.GameMap.dataB[3+mapOffset][0+mapOffset], 1);
				assert.equal(testFile.GameMap.dataB[3+mapOffset][1+mapOffset], 0);
				assert.equal(testFile.GameMap.dataB[3+mapOffset][2+mapOffset], 0);
				assert.equal(testFile.GameMap.dataB[3+mapOffset][3+mapOffset], 1);
			});

			it('should have correct neighbors(from dataB to dataA)', function(){
				testFile.GameMap.init();
				testFile.GameMap.dataFlag = false;

				mapOffset = testFile.mapOffset;

				testFile.GameMap.changeWall(1+mapOffset, 1+mapOffset);
				testFile.GameMap.changeWall(2+mapOffset, 2+mapOffset);
				testFile.GameMap.changeWall(1+mapOffset, 2+mapOffset);

				testFile.GameMap.dataB[0+mapOffset][1+mapOffset] = 1;
				testFile.GameMap.dataB[0+mapOffset][2+mapOffset] = 1;
				testFile.GameMap.dataB[0+mapOffset][3+mapOffset] = 1;

				testFile.GameMap.dataB[1+mapOffset][0+mapOffset] = 1;
				testFile.GameMap.dataB[1+mapOffset][3+mapOffset] = 1;

				testFile.GameMap.dataB[2+mapOffset][0+mapOffset] = 1;
				testFile.GameMap.dataB[2+mapOffset][3+mapOffset] = 1;

				testFile.GameMap.dataB[3+mapOffset][0+mapOffset] = 1;
				testFile.GameMap.dataB[3+mapOffset][2+mapOffset] = 1;

				testFile.GameMap.updateData();

				assert.equal(testFile.GameMap.dataA[0+mapOffset][0+mapOffset], 0);
				assert.equal(testFile.GameMap.dataA[0+mapOffset][1+mapOffset], 1);
				assert.equal(testFile.GameMap.dataA[0+mapOffset][2+mapOffset], 1);
				assert.equal(testFile.GameMap.dataA[0+mapOffset][3+mapOffset], 0);

				assert.equal(testFile.GameMap.dataA[1+mapOffset][0+mapOffset], 1);
				assert.equal(testFile.GameMap.dataA[1+mapOffset][1+mapOffset], 0);
				assert.equal(testFile.GameMap.dataA[1+mapOffset][2+mapOffset], 0);
				assert.equal(testFile.GameMap.dataA[1+mapOffset][3+mapOffset], 1);

				assert.equal(testFile.GameMap.dataA[2+mapOffset][0+mapOffset], 1);
				assert.equal(testFile.GameMap.dataA[2+mapOffset][1+mapOffset], 1);
				assert.equal(testFile.GameMap.dataA[2+mapOffset][2+mapOffset], 0);
				assert.equal(testFile.GameMap.dataA[2+mapOffset][3+mapOffset], 1);

				assert.equal(testFile.GameMap.dataA[3+mapOffset][0+mapOffset], 1);
				assert.equal(testFile.GameMap.dataA[3+mapOffset][1+mapOffset], 0);
				assert.equal(testFile.GameMap.dataA[3+mapOffset][2+mapOffset], 0);
				assert.equal(testFile.GameMap.dataA[3+mapOffset][3+mapOffset], 1);

				testFile.GameMap.setSize(50);
			});
		});

		describe('test GameMap.randomSet()', function(){
			it('live cell\'s rate should be correct', function(){
				testFile.GameMap.init();
				testFile.GameMap.randomSet();

				row = testFile.GameMap.row + testFile.mapOffset;
				column = testFile.GameMap.column + testFile.mapOffset;
				counter = 0;

				for(var i = testFile.mapOffset; i < row; i++){
					for(var j = testFile.mapOffset; j < column; j++){
						counter += testFile.GameMap.dataA[i][j];
					}
				}

				var flag = false;
				rate = counter / (row * column);
				if(rate >= testFile.GameMap.rate - 0.05 && rate <= testFile.GameMap.rate + 0.05)
					flag = true;

				assert.equal(flag, true);
			});
		});

		describe('test GameMap.changeCell()', function(){
			it('dataA and dataB should be changed correctly', function(){
				testFile.GameMap.init();
				Clock.beginFlag = true;
				Clock.flag = false;

				testFile.GameMap.changeCell(20, 25);
				assert.equal(testFile.GameMap.dataA[20][25], 1);
				assert.equal(testFile.GameMap.dataB[20][25], 1);	
				testFile.GameMap.changeCell(20, 25);
				assert.equal(testFile.GameMap.dataA[20][25], 0);
				assert.equal(testFile.GameMap.dataB[20][25], 0);				
			});
		});
	});
});