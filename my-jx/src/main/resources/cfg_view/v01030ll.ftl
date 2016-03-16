<#ftl attributes={"sql":"s01030_flow"}>
return {
    
        tooltip : {
            trigger: 'axis'
        },
        calculable: false,  
        legend: {
            data:['2G','3G','4G'],
            textStyle : {
                color : '#FFF',
                fontSize : 26,
            },
            itemGap: 50
        },
        color:['#2F6452','#2E80B3','#B37BD0'],
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
                data : [ <#list s01030_flow as item>'${item.start_time}'<#if item_has_next>,</#if></#list>]
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
                data:[ <#list s01030_flow as item>'${item.gsm_flow_num}'<#if item_has_next>,</#if></#list>]
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
                data:[ <#list s01030_flow as item>'${item.td_flow_num}'<#if item_has_next>,</#if></#list>]
            },
            {
                name:'4G',
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
                                    [[0.8, 'rgba(179,123,208,0.7)'],[0.2, 'rgba(179,123,208,0.4)']]
                                )
                            })()
                        }
                    }
                },
                data:[ <#list s01030_flow as item>'${item.lte_flow_num}'<#if item_has_next>,</#if></#list>]
            }
        ]
                    
};