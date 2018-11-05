(function ($, root) {

    // 日期初始化
    function dateInit() {
        laydate.render({
            elem: '#test1',
        });
    }


    // 渲染学校列表
    function renSchollList(data) {

    }
    // 渲染 应到 实到 请假
    function renBeHere(data) {
        $(".yingdao-item").eq(0).find(".yd-right").text(data[0] + " 人")
        $(".yingdao-item").eq(1).find(".yd-right").text(data[1] + " 人")
        $(".yingdao-item").eq(2).find(".yd-right").text(data[2].length + " 人")
        // 修复没数据错误
        root.erroCorrect()
    }
    // 渲染请假人
    function renLeave(data) {
        let tsArr = []
        $(".list-two").empty()
        console.log(data)
        data.forEach(function (item) {
            let html = `
                <li class="detail-item" data-id="${item["id"]}">
                    <span class="banji">${item["room_num"]}</span>
                    <span class="student-name">${item["name"]}</span>
                </li>
            `
            let htmlTs = `  
                <div class="detail-hid" style="display:block;">
                    <div class="det-item">请假人：${item["name"]}</div>
                    <div class="det-item">班级：${item["room_num"]}</div>
                    <div class="det-item">请假理由：${item["leave_reason"]}</div>
                </div> 
              `

            $(".list-two").append(html)
            //页面层

            tsArr.push(htmlTs)
            console.log(tsArr)
        })
        $(".detail-item").on("click", function () {
            let stuNum = $(this).index()
            layer.open({
                type: 1,
                skin: 'layui-layer-rim', //加上边框
                area: ['420px', '240px'], //宽高
                content: tsArr[stuNum]
            });
        })
    }
    // 如果应到 实到 请假 人数为undefind
    let erroCorrect = () => {
        $(document).ready(function () {
            $(".yingdao-item").each(function () {
                let data = $(this).find(".yd-right").text()
                console.log(data)
                if (data === "undefined 人") {
                    $(this).find(".yd-right").text("0 人")
                }
            })
        })
    }

    // 饼图
    function bingChart(data) {
        console.log(data)
        let quexi = Number(data[0] - data[1])
        let qiandao = Number(data[1])
        let percent1 = qiandao / data[0]
        let percent2 = quexi / data[0]
        var data = [{
            amount: qiandao,
            ratio: percent1,
            memo: '实到',
            const: 'const'
        }, {
            amount: quexi,
            ratio: percent2,
            memo: '未到',
            const: 'const'
        }];

        var chart = new F2.Chart({
            id: 'mountNode',
            pixelRatio: window.devicePixelRatio
        });

        chart.source(data);
        chart.coord('polar', {
            transposed: true,
            innerRadius: 0.4,
            radius: 0.8
        });
        chart.axis(false);
        chart.legend(false);
        chart.tooltip(false);
        chart.guide().html({
            position: ['50%', '50%'],
            html: '<div style="width: 100px;height: 20px;text-align: center;line-height: 20px;" id="textContent"></div>'
        });
        chart.interval().position('const*ratio').color('memo', ['#6dd66d', '#fb5c5c']).adjust('stack');
        chart.render();

        // 绘制内阴影
        var frontPlot = chart.get('frontPlot');
        var coord = chart.get('coord'); // 获取坐标系对象
        frontPlot.addShape('sector', {
            attrs: {
                x: coord.center.x,
                y: coord.center.y,
                r: coord.circleRadius * coord.innerRadius * 1.2, // 全半径
                r0: coord.circleRadius * coord.innerRadius,
                fill: '#000',
                opacity: 0.15
            }
        });

        // 开始绘制文本
        var ANCHOR_OFFSET = 5; // 锚点偏移量
        var OFFSET = 18; // 连接线拐弯点偏移量
        var APPEND_OFFSET = 30; // 文本同 canvas 四边的偏移值
        var center = coord.center; // 极坐标圆心坐标
        var r = coord.circleRadius; // 极坐标半径
        var canvas = chart.get('canvas'); // 获取 canvas 对象
        var canvasWidth = chart.get('width'); // 获取 canvas 的宽度

        var drawnLabels = []; // 用于存储被绘制的文本图形对象
        var labelGroup = canvas.addGroup(); // 用于存储文本以及文本连接线

        // 判断两个矩形是否相交
        function _isOverlap(label1, label2) {
            var label1BBox = label1.getBBox();
            var label2BBox = label2.getBBox();
            return Math.max(label1BBox.minX, label2BBox.minX) <= Math.min(label1BBox.maxX, label2BBox.minX) && Math.max(
                label1BBox.minY, label2BBox.minY) <= Math.min(label1BBox.maxY, label2BBox.maxY);
        }

        function _getEndPoint(center, angle, r) {
            return {
                x: center.x + r * Math.cos(angle),
                y: center.y + r * Math.sin(angle)
            };
        }

        // 绘制文本连接线
        function _drawLabelLine(label, labelGroup) {
            var _anchor = label._anchor,
                _router = label._router,
                fill = label.fill,
                y = label.y,
                _side = label._side;

            var lastPoint = {
                x: _side === 'left' ? APPEND_OFFSET : canvasWidth - APPEND_OFFSET,
                y: y
            };

            // 绘制锚点
            labelGroup.addShape('Circle', {
                attrs: {
                    x: _anchor.x,
                    y: _anchor.y,
                    r: 2,
                    fill: fill
                }
            });

            // 绘制文本连接线
            labelGroup.addShape('Polyline', {
                attrs: {
                    points: [_anchor, _router, lastPoint],
                    lineWidth: 1,
                    stroke: fill
                }
            });
        }

        // 绘制文本
        function _drawLabel(label) {
            var _data = label._data,
                y = label.y,
                _side = label._side;

            var group = new F2.G.Group({
                origin: _data // 存储原始数据
            });
            // 新建分类名的 text shape, 加入到 group 中
            group.addShape('text', {
                attrs: {
                    x: _side === 'left' ? APPEND_OFFSET : canvasWidth - APPEND_OFFSET,
                    y: y,
                    fontSize: 20, // 字体大小
                    fill: '#808080',
                    text: _data.memo,
                    textBaseline: 'bottom',
                    textAlign: _side === 'left' ? 'left' : 'right',
                    lineHeight: 16
                },
                origin: _data // 存储原始数据
            });
            // 新建数字 text shaoe，加入到 group 中
            group.addShape('text', {
                attrs: {
                    x: _side === 'left' ? APPEND_OFFSET : canvasWidth - APPEND_OFFSET,
                    y: y,
                    fontSize: 20, // 字体大小
                    fill: '#000',
                    text: _data.amount.toFixed(0) + "人",
                    textBaseline: 'top',
                    textAlign: _side === 'left' ? 'left' : 'right',
                    lineHeight: 16,
                    fontWeight: 'bold'
                },
                origin: _data // 存储原始数据
            });

            return group;
        }

        // 查找被点击的 label
        function _findClickedLabel(point) {
            var clickedShape = void 0;
            for (var i = 0, len = drawnLabels.length; i < len; i++) {
                var shape = drawnLabels[i];
                var bbox = shape.getBBox();
                if (point.x >= bbox.minX && point.x <= bbox.maxX && point.y >= bbox.minY && point.y <= bbox.maxY) {
                    clickedShape = shape;
                    break;
                }
            }

            return clickedShape;
        }

        // 开始添加饼图的文本
        function addPieLabel(chart) {
            labelGroup && labelGroup.clear();

            // 获取 top5 的数据
            var top5 = [];
            var cloneData = data.concat([]);
            cloneData.sort(function (obj1, obj2) {
                return obj2.ratio - obj1.ratio;
            });
            cloneData.map(function (obj, index) {
                if (index <= 4) {
                    top5.push(obj.memo);
                }
            });

            var labels = []; // 存储要绘制的文本
            // 获取文本的信息
            var geom = chart.get('geoms')[0];
            var shapes = geom.get('container').get('children');
            shapes.forEach(function (shape) {
                var shapeAttrs = shape.attr();
                var origin = shape.get('origin');
                if (top5.indexOf(origin._origin.memo) !== -1) {
                    // 只展示 top5 的文本
                    var startAngle = shapeAttrs.startAngle,
                        endAngle = shapeAttrs.endAngle;

                    var middleAngle = (startAngle + endAngle) / 2;
                    var edgePoint = _getEndPoint(center, middleAngle, r + ANCHOR_OFFSET);
                    var routerPoint = _getEndPoint(center, middleAngle, r + OFFSET);
                    var label = {
                        _anchor: edgePoint,
                        _router: routerPoint,
                        _data: origin._origin,
                        x: routerPoint.x,
                        y: routerPoint.y,
                        r: r + OFFSET,
                        fill: origin.color // 字体颜色
                    };
                    // 判断文本的方向
                    if (edgePoint.x < center.x) {
                        label._side = 'left';
                        labels.push(label);
                    } else {
                        label._side = 'right';
                        labels.push(label);
                    }
                }
            });

            var last_label = void 0; // 存储上一个 label 对象，用于检测文本是否重叠
            for (var i = 0; i < labels.length; i++) {
                var label = labels[i];
                var labelShape = _drawLabel(label); // 绘制文本图形对象

                if (last_label) {
                    if (_isOverlap(labelShape, last_label)) {
                        // 重叠了就不绘制
                        last_label = labelShape;
                        continue;
                    }
                }
                drawnLabels.push(labelShape);

                labelGroup.add(labelShape);
                _drawLabelLine(label, labelGroup);
                last_label = labelShape;
            }

            canvas.draw();
        }

        addPieLabel(chart);
        // 绑定事件
        $('#mountNode').on('touchstart', function (ev) {
            var point = {};
            var touches = ev.targetTouches;
            if (touches && touches.length > 0) {
                point.x = touches[0].clientX;
                point.y = touches[0].clientY;
            } else {
                point.x = ev.clientX;
                point.y = ev.clientY;
            }
            var canvasPoint = F2.Util.getRelativePosition(point, canvas);
            var pieData = chart.getSnapRecords(canvasPoint);
            var clickedLabel = _findClickedLabel(canvasPoint);

            if (pieData.length) {
                $('#textContent').text(pieData[0]._origin.memo);
            }

            if (clickedLabel) {
                $('#textContent').text(clickedLabel.get('origin').memo);
            }
        });

        // ================= 改变数据 ========================
        function randomData(data) {
            data.map(function (obj) {
                obj.ratio = Math.random();
                return obj;
            });
            return data;
        }
        $('#changeData').on('click', function () {
            chart.changeData(randomData(data));
            setTimeout(function () {
                drawnLabels = [];
                addPieLabel(chart);
            }, 350); // 必须在更新动画结束之后再绘制，默认的更新时间是 300
        });
    }


    root.erroCorrect = erroCorrect
    root.bingChart = bingChart
    root.dateInit = dateInit
    root.renSchollList = renSchollList
    root.renBeHere = renBeHere
    root.renLeave = renLeave

}(window.$, window.signIn || (window.signIn = {})))