<#ftl attributes={"sql":"s01030_sms,s01030_smsMax"}>
return {
    calculable : false,
    color:['#00E1FF'],
    tooltip : {
        trigger: 'axis'
    },
    xAxis : [
        {
            type: 'category',
            axisLabel : {
                interval: 1,
                textStyle : {
                    color : '#fff',
                    fontSize : 20,
                }
            },
            splitLine : {
                show:false
            },
            data : [ <#list s01030_sms as item>'${item.start_time}'<#if item_has_next>,</#if></#list>]
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
            },
            max:
            <#if (s01030_smsMax[0].max > 16000)>
                   ${s01030_smsMax[0].max}
            </#if>
             <#if (s01030_smsMax[0].max < 16000)>
                   17000
            </#if>
        }
    ],
    grid: {
             borderWidth: '0'
        },
    series : [
        {
            type:'bar',
            name:'瞬时短信',
            data:[ <#list s01030_sms as item>'${item.moment_sms_num}'<#if item_has_next>,</#if></#list>],
            markLine : {
                data : [
                            [
                                  {name: '', value: 15000, xAxis: -50, yAxis: 15000, itemStyle:{normal:{color:'#FFFF00',lineStyle : {type:'solid'}}}},
                                  {name: '', xAxis: 1000, yAxis: 15000, itemStyle:{normal:{color:'#FFFF00',lineStyle : {type:'solid'}}}},
                            ],
                            [
                                {name: '', value: 16000, xAxis: -150, yAxis: 16000, itemStyle:{normal:{color:'#FF0000',lineStyle : {type:'solid'}}}},
                                {name: '', xAxis: 1000, yAxis: 16000, itemStyle:{normal:{color:'#FF0000',lineStyle : {type:'solid'}}}},
                            ]

                ]
            }
        }
    ]

};