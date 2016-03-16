<#ftl attributes={"sql":"s01030_traf"}>
return {
    
        tooltip : {
            trigger: 'axis'
        },
        calculable: false,  
        legend: {
            data:['2G','3G'],
            textStyle : {
                color : '#FFF',
                fontSize : 26,
            },
            itemGap: 70
        },
        color:['#2F6452','#2E80B3'],
        xAxis : [
            {
                type: 'category', 
                boundaryGap: false,  
                axisLine : {   
                    lineStyle : {
                        color : '#51BEDC',
                        width : 1,
                        type : 'solid'
                    },
                    show : true
                },
                axisLabel : {
                    interval: 2,
                    textStyle : {
                        color : '#fff',
                        fontSize : 20,
                    }
                },
                splitLine : {
                    show:false
                },
                data : [ <#list s01030_traf as item>'${item.start_time}'<#if item_has_next>,</#if></#list>]
            }
        ],
        yAxis : [
            {
                type: 'value',
                axisLabel: {
                    textStyle : {
                        color : '#fff',
                        fontSize : 20,
                    }
                },
                splitLine : {
                    show:false
                }
            }
        ],
        grid: {
             borderWidth: '0'
        },
        series : [
            {
                name:'2G',
                type:'line',
                smooth:true,
                symbol:'none',
                itemStyle: {
                    normal : {
                        areaStyle : {
                            color : (function (){
                                var zrColor = require('zrender/tool/color');
                                return zrColor.getLinearGradient(
                                    0, 100, 0, 200,
                                    [[0.8, 'rgba(37,73,69,0.7)'],[0.2, 'rgba(37,73,69,0.4)']]
                                )
                            })()
                        }
                    }
                },
                data:[ <#list s01030_traf as item>'${(item.gsm_traf_num)!""}'<#if item_has_next>,</#if></#list>]
            },
            {
                name:'3G',
                type:'line',
                smooth:true,
                symbol:'none',
                itemStyle: {
                    normal : {
                        areaStyle : {
                            color : (function (){
                                var zrColor = require('zrender/tool/color');
                                return zrColor.getLinearGradient(
                                    0, 100, 0, 200,
                                    [[0.8, 'rgba(39,102,146,0.7)'],[0.2, 'rgba(39,102,146,0.4)']]
                                )
                            })()
                        }
                    }
                },
                data:[ <#list s01030_traf as item>'${(item.td_traf_num)!""}'<#if item_has_next>,</#if></#list>]
            }
        ]
                    
};