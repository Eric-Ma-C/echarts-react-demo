import React from 'react';
import ReactEcharts from 'echarts-for-react';
import data from './data.json';

class Show extends React.Component {

    getOption() {

        var itemStyle = {
            normal: {
                opacity: 0.8,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        };

        var sizeFunction = function (x) {
            var y = x/100;
            return y;
        };
        // Schema:
        var schema = [
            {name: 'TotalAssets', index: 0, text: '房地产企业固定资产', unit: '亿元'},
            {name: 'Sales', index: 1, text: '住宅销售额', unit: '亿元'},
            {name: 'GDP', index: 2, text: '地区生产总值', unit: '亿元'},
            {name: 'City', index: 3, text: '城市', unit: ''}
        ];

        var option = {
            baseOption: {
                timeline: {
                    axisType: 'category',
                    orient: 'vertical',
                    autoPlay: true,
                    inverse: true,
                    playInterval: 1000,
                    left: null,
                    right: 0,
                    top: 20,
                    bottom: 20,
                    width: 55,
                    height: null,
                    label: {
                        normal: {
                            textStyle: {
                                color: '#999'
                            }
                        },
                        emphasis: {
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    symbol: 'none',
                    lineStyle: {
                        color: '#555'
                    },
                    checkpointStyle: {
                        color: '#bbb',
                        borderColor: '#777',
                        borderWidth: 2
                    },
                    controlStyle: {
                        showNextBtn: false,
                        showPrevBtn: false,
                        normal: {
                            color: '#666',
                            borderColor: '#666'
                        },
                        emphasis: {
                            color: '#aaa',
                            borderColor: '#aaa'
                        }
                    },
                    data: []
                },
                backgroundColor: '#404a59',
                title: [{
                    text: data.timeline[0],
                    textAlign: 'center',
                    left: '63%',
                    top: '55%',
                    textStyle: {
                        fontSize: 100,
                        color: 'rgba(255, 255, 255, 0.7)'
                    }
                }, {
                    text: '浙江省各市固定投资与GDP关系演变',
                    left: 'center',
                    top: 10,
                    textStyle: {
                        color: '#aaa',
                        fontWeight: 'normal',
                        fontSize: 20
                    }
                }],
                tooltip: {
                    padding: 5,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    formatter: function (obj) {
                        var value = obj.value;
                        return schema[3].text + '：' + value[3] + '<br>'
                            + schema[1].text + '：' + value[1] + schema[1].unit + '<br>'
                            + schema[0].text + '：' + value[0] + schema[0].unit + '<br>'
                            + schema[2].text + '：' + value[2] + '<br>';
                    }
                },
                grid: {
                    top: 100,
                    containLabel: true,
                    left: 30,
                    right: '110'
                },
                xAxis: {
                    type: 'log',
                    name: '房地产企业固定资产',
                    max: 400,
                    nameGap: 25,
                    nameLocation: 'middle',
                    nameTextStyle: {
                        fontSize: 18
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisLabel: {
                        formatter: '{value} 亿元'
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '住宅销售额',
                    max: 3500,
                    nameTextStyle: {
                        color: '#ccc',
                        fontSize: 18
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        formatter: '{value} 亿元'
                    }
                },
                visualMap: [
                    {
                        show: false,
                        dimension: 3,
                        categories: data.cities,
                        calculable: true,
                        precision: 0.1,
                        textGap: 30,
                        textStyle: {
                            color: '#ccc'
                        },
                        inRange: {
                            color: (function () {
                                var colors = ['#bcd3bb', '#e88f70', '#edc1a5', '#9dc5c8', '#e1e8c8', '#7b7c68'];
                                return colors.concat(colors);
                            })()
                        }
                    }
                ],
                series: [
                    {
                        type: 'scatter',
                        itemStyle: itemStyle,
                        data: data.series[0],
                        symbolSize: function (val) {
                            return sizeFunction(val[2]);
                        }
                    }
                ],
                animationDurationUpdate: 1000,
                animationEasingUpdate: 'quinticInOut'
            },
            options: []
        };

        for (var n = 0; n < data.timeline.length; n++) {
            option.baseOption.timeline.data.push(data.timeline[n]);
            option.options.push({
                title: {
                    show: true,
                    'text': data.timeline[n] + ''
                },
                series: {
                    name: data.timeline[n],
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: data.series[n],
                    symbolSize: function (val) {
                        return sizeFunction(val[2]);
                    }
                }
            });
        }

        return option;
    }


    render() {
        return (
            <div id="main">
                <ReactEcharts
                    option={this.getOption()}
                    style={{height: '700px', width: '100%'}}
                />
            </div>
        );
    }


}

export default Show;